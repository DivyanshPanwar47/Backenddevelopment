from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend server running"

@app.route("/details")
def details():
    data = {
        "name": "Dev",
        "age": 25
    }
    return data

@app.route("/strings")
def strings():
    values = ["divyansh", "shivanshu", "abhishar"]
    return values

if __name__ == "__main__":
    app.run(debug=True)