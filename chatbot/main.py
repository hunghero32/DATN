from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_logic import chatbot_response

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message', '')
        if not user_message:
            return jsonify({
                'status': 'error',
                'message': 'No message provided'
            })

        response = chatbot_response(user_message)
        return response

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

if __name__ == '__main__':
    app.run(port=5000)