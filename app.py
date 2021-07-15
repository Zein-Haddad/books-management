from flask import Flask, render_template, jsonify, redirect, session, request
from db import DB, get_random_books, get_book, search_books, get_saved_books, update_book, delete_book

import users


app = Flask(__name__)
app.secret_key = 'xBv9U-GlcVP5VclXTyCuggKTzf2W6XPNJtrCiSJb-PE'


@app.route("/")
def index():
    # Get random books
    random_books = get_random_books(5)

    return render_template("index.html", random_books=random_books, saved_books=get_saved_books(session.get('user_id')))


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
    if book_id == None:
        return redirect("/error")

    book = get_book(book_id)
    if len(book) == 0:
        return redirect("/error")
    else:
        return render_template("book.html", book=book[0], saved_books=get_saved_books(session.get('user_id')))


@app.route("/user/<username>")
def user(username):
    return "TODO"


@app.route("/my_books")
def my_books():
    if session.get('user_id') == None:
        return redirect("/")
    return "TODO"


@app.route("/search")
def search():
    q = request.args.get('q')
    if not q:
        return redirect("/")
    
    results = search_books(q)
    return render_template('search.html', results=results, q=q, saved_books=get_saved_books(session.get('user_id')))


@app.route("/update_book", methods=["POST"])
def update():
    book_id = request.form.get('book_id')
    user_id = session.get('user_id')
    status = request.form.get('status')

    if not book_id or not user_id or not status:
        return jsonify(result=False)

    return jsonify(result=update_book(book_id, user_id, status))


@app.route("/delete_book", methods=["POST"])
def delete():
    book_id = request.form.get('book_id')
    user_id = session.get('user_id')

    if not user_id or not book_id:
        return jsonify(result=False)

    return jsonify(result=delete_book(book_id, user_id))


if __name__ == '__main__':
    app.run(debug=True)
