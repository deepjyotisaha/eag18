import asyncio
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='frontend', static_url_path='')

# Dummy async agent logic for demonstration
async def agent_responds(query):
    # Replace this with your real async agent logic
    await asyncio.sleep(1)  # Simulate async work
    return f"Agent received: {query}"

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json(silent=True)
    if not data or 'question' not in data:
        return jsonify({'response': 'Invalid request: missing \"question\"'}), 400
    question = data['question']
    # Call the async agent logic from sync Flask route
    response = asyncio.run(agent_responds(question))
    return jsonify({'response': response})

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True)