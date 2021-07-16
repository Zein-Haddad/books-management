import sqlite3


DB = './books.db'


def get_random_books(num):
    with sqlite3.connect(DB) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute("SELECT * FROM books ORDER BY RANDOM() LIMIT ?", [num])
        result = cur.fetchall()
    return result


def get_book(book_id):
    with sqlite3.connect(DB) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute("SELECT * FROM books WHERE id = ?", [book_id])
        return cur.fetchall()


'''
Book status:
1 = want to read
2 = currently reading
3 = read
'''
def get_saved_books(user_id):
    if not user_id:
        return None

    with sqlite3.connect(DB) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute("SELECT * FROM saved_books WHERE user_id = ?", [user_id])
        result = cur.fetchall()
    
    books = {}
    for r in result:
        books[r['book_id']] = r['status']

    return books


def get_my_books(user_id):
    if not user_id:
        return None
    
    with sqlite3.connect(DB) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute("SELECT * FROM saved_books JOIN books ON saved_books.book_id = books.id WHERE user_id = ?", [user_id])
        result = cur.fetchall()

    my_books = {1: [], 2: [], 3: []}
    for row in result:
        my_books[row['status']].append(row)
    
    return my_books


'''
if success return true, otherwise return false
'''
def update_book(book_id, user_id, status):
    try:
        with sqlite3.connect(DB) as con:
            con.row_factory = sqlite3.Row
            cur = con.cursor()
            cur.execute("SELECT * FROM saved_books WHERE book_id = ? AND user_id = ?", [book_id, user_id])
            result = cur.fetchall()

            if len(result) == 0:
                cur.execute("INSERT INTO saved_books (book_id, user_id, status) VALUES (?, ?, ?)", [book_id, user_id, status])
                con.commit()
                return True
            else:
                cur.execute("UPDATE saved_books SET status = ? WHERE book_id = ? AND user_id = ?", [status, book_id, user_id])
                con.commit()
                return True
    except:
        return False


def delete_book(book_id, user_id):
    try:
        with sqlite3.connect(DB) as con:
            cur = con.cursor()
            cur.execute("DELETE FROM saved_books WHERE book_id = ? AND user_id = ?", [book_id, user_id])
            con.commit()
            return True
    except:
        return False


def search_books(query):
    with sqlite3.connect(DB) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute("SELECT * FROM books WHERE title LIKE ?", ['%' + query + '%'])
        return cur.fetchall()