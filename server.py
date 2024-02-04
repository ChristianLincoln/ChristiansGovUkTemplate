import json
from flask import Flask, render_template, request
from logging import FileHandler, WARNING
import chatbot

app = Flask(__name__,
            static_url_path='',
            static_folder='',
            template_folder='')


@app.route('/')
def index(name=None):
    return render_template("index.html", name=name)


@app.route('/chatbot',methods=['POST'])
def submit():
    if request.method == 'POST':
        print("POST received!")
        messages = request.get_json()
        print(messages)
        return {"result": chatbot.ask(messages)}
