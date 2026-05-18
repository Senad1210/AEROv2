from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="12345",
        database="MONTANA"
    )



if __name__ == "__main__":
    app.run(debug=True) 