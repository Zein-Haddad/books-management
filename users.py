from werkzeug.security import generate_password_hash, check_password_hash
from db import DB
import sqlite3
import re


'''
Status code:
0 = Success
1 = Wrong username or password
2 = Username or password empty
'''
def login(username, password):
    if not username or not password:
        return 2

    with sqlite3.connect(DB) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute("SELECT * FROM users WHERE username = ?", [username])
        result = cur.fetchall()

    if len(result) != 1 or not check_password_hash(result[0]['password'], password):
        return 1
    else:
        return 0


'''
Status code:
0 = Success
1 = One of inputs is empty
2 = Username already exists
3 = Username contains spaces
4 = Passwords do not match
'''
def register(username, email, password, confirmation):
    if not username or not email or not password or not confirmation:
        return 1

    if password != confirmation:
        return 4

    if re.search(' ', username) != None:
        return 3

    with sqlite3.connect(DB) as con:
        cur = con.cursor()
        cur.execute("SELECT * FROM users WHERE username = ?", [username])
        if len(cur.fetchall()) > 0:
            return 2

        data = [username, email, generate_password_hash(password)]
        cur.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", data)
        con.commit()
    
    return 0


def is_logged_in():
    pass