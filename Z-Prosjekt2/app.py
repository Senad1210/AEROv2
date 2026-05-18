from flask import Flask, render_template, request, redirect, session
import pymysql, bcrypt, os

app = Flask(__name__)
app.secret_key = os.urandom(24)

DB = {"host": "localhost", "user": "root", "password": "", "database": "auth_demo", "cursorclass": pymysql.cursors.DictCursor}

def db():
    return pymysql.connect(**DB)

def init_db():
    c = pymysql.connect(host="localhost", user="root", password="")
    c.cursor().execute("CREATE DATABASE IF NOT EXISTS auth_demo")
    c.commit(); c.close()
    conn = db()
    conn.cursor().execute("""CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(120) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL)""")
    conn.commit(); conn.close()

@app.route("/")
def index():
    return redirect("/dashboard" if "user" in session else "/login")

@app.route("/register", methods=["GET", "POST"])
def register():
    error = None
    if request.method == "POST":
        u, e, p, c = request.form["username"], request.form["email"], request.form["password"], request.form["confirm"]
        if p != c:
            error = "Passwords don't match."
        else:
            try:
                conn = db()
                conn.cursor().execute("INSERT INTO users (username,email,password) VALUES(%s,%s,%s)",
                    (u, e, bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()))
                conn.commit(); conn.close()
                return redirect("/login")
            except:
                error = "Username or email already taken."
    return render_template("register.html", error=error)

@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        conn = db()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE username=%s OR email=%s", (request.form["id"], request.form["id"]))
        user = cur.fetchone(); conn.close()
        if user and bcrypt.checkpw(request.form["password"].encode(), user["password"].encode()):
            session["user"] = user["username"]
            return redirect("/dashboard")
        error = "Wrong username or password."
    return render_template("login.html", error=error)

@app.route("/dashboard")
def dashboard():
    if "user" not in session: return redirect("/login")
    return render_template("dashboard.html", username=session["user"])

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

if __name__ == "__main__":
    init_db()
    app.run(debug=True)