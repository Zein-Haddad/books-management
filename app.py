from flask import Flask, render_template, jsonify, redirect, session, request
from db import DB, get_random_books

import users


app = Flask(__name__)
app.secret_key = 'xBv9U-GlcVP5VclXTyCuggKTzf2W6XPNJtrCiSJb-PE'


@app.route("/")
def index():
    # Check if the user is logged in
    logged_in = session.get('user_id') != None
    username = session.get('username')
    
    # Get random books
    random_books = get_random_books(5)

    return render_template("index.html", logged_in=logged_in, random_books=random_books, username=username)


@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    result = users.login(username, password)

    if result['status'] == 0:
        session['user_id'] = result['user_id']
        session['username'] = username

    return jsonify(result=result['status'])


@app.route("/register", methods=['POST'])
def register():
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
    confirmation = request.form.get("confirmation")
    result = users.register(username, email, password, confirmation)
    return jsonify(result=result)


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/error")
def error():
    return "TODO"


@app.route("/book/<int:book_id>")
def book(book_id):
    return "TODO"


@app.route("/user/<username>")
def user(username):
    return "TODO"


if __name__ == '__main__':
    app.run(debug=True)
