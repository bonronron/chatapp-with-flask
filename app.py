from flask import Flask,render_template,session,url_for,request,redirect
from flask_socketio import SocketIO
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
socketio = SocketIO(app)

    

@app.route("/")
@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/logincheck",methods=["POST","GET"])
def logincheck():
    if request.method == "POST":
        session["username"] = request.form["username"]
        return redirect(url_for("chat", session=session))
    else:
        return render_template("login.html")


@app.route("/chat")
def chat():
    return render_template("chat.html")


@socketio.on('connectnew')
def handle_message(connectnew):
    socketio.emit('connectnew',session['username'])
    print('\n\n\n' + connectnew['data']+session['username'])


@socketio.on('sendchat')
def sendchat(chat):
    username = session['username']
    print('\n\n\n' + username  +" : "+ chat['data'] )
    socketio.emit('chatrec', {"username":username,"msg":chat['data']})
    username = " "


if __name__=="__main__":
    app.run()


