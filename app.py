from flask import Flask, render_template, sessions, request, jsonify

from werkzeug.utils import redirect
from db import DB, get_random_books
import users


app = Flask(__name__)

@app.route("/")
def index():
    # Check if the user is logged in
    logged_in = False
    
    # Get random books
    random_books = get_random_books(5)

    return render_template("index.html", logged_in=logged_in, random_books=random_books)

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    return jsonify(result=users.login(username, password))

@app.route("/register", methods=['POST'])
def register():
    return "TODO"

@app.route("/logout")
def logout():
    return "TODO"

@app.route("/error")
def error():
    return "TODO"

@app.route("/book/<int:book_id>")
def book(book_id):
    return "TODO"

@app.route("/user/<username>")
def user(username):
    return "TODO"
