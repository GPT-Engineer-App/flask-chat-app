from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

messages = []

@app.route('/messages', methods=['GET'])
def get_messages():
    return jsonify(messages)

@app.route('/messages', methods=['POST'])
def post_message():
    data = request.get_json()
    data['timestamp'] = datetime.now().isoformat()
    messages.append(data)
    return jsonify(data), 201

if __name__ == '__main__':
    app.run(debug=True)