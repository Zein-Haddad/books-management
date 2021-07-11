import sqlite3


DB = './books.db'


def get_random_books(num):
    with sqlite3.connect(DB) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute("SELECT * FROM books ORDER BY RANDOM() LIMIT ?", [num])
        result = cur.fetchall()
    return result


def search_books(query):
    pass