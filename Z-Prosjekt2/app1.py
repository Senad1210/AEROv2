from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

# --- DATABASE CONNECTION ---
# Change these to match your MySQL setup
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="your_password",  # <-- change this
        database="AERO_SHOP"
    )


# --- ROUTES ---
# A route is a URL that the browser can visit

@app.route("/")
def home():
    db = get_db()
    cursor = db.cursor(dictionary=True)  # dictionary=True means rows come back as dicts

    cursor.execute("SELECT * FROM inventory")
    products = cursor.fetchall()  # gets all rows as a list

    cursor.close()
    db.close()

    return render_template("index.html", products=products)


# Run the app
if __name__ == "__main__":
    app.run(debug=True)  # debug=True shows errors in the browser