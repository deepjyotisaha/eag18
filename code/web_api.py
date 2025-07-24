import asyncio
import threading
import json
import traceback
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import yaml
from dotenv import load_dotenv
from pathlib import Path
import sys
import os

# Add the current directory to Python path to import modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from mcp_servers.multiMCP import MultiMCP
from agentLoop.flow import AgentLoop4
from agentLoop.output_analyzer import analyze_results

app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app)  # Enable CORS for frontend integration

# Global variables to store initialized components
multi_mcp = None
agent_loop = None
initialization_complete = False

# --- Persistent event loop for all async agent operations ---
event_loop = None

def start_background_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

def run_in_loop(coro):
    future = asyncio.run_coroutine_threadsafe(coro, event_loop)
    return future.result()

# ---

def load_server_configs():
    """Load MCP server configurations from YAML file"""
    config_path = Path("config/mcp_server_config.yaml")
    if not config_path.exists():
        print(f"MCP server config not found: {config_path}")
        return []
    
    with open(config_path, "r") as f:
        config = yaml.safe_load(f)
    
    return config.get("mcp_servers", [])

async def initialize_agent_system():
    """Initialize the agent system components"""
    global multi_mcp, agent_loop, initialization_complete
    
    try:
        # Load environment variables
        load_dotenv()
        
        # Load server configs and initialize MultiMCP
        print("📥 Loading MCP Servers...")
        server_configs = load_server_configs()
        multi_mcp = MultiMCP(server_configs)
        await multi_mcp.initialize()
        
        # Initialize AgentLoop4
        agent_loop = AgentLoop4(multi_mcp)
        initialization_complete = True
        print("✅ Agent system initialized successfully")
        return True
        
    except Exception as e:
        print(f"❌ Failed to initialize agent system: {e}")
        traceback.print_exc()
        initialization_complete = False
        return False

async def agent_responds(query, uploaded_files=None, file_manifest=None):
    """
    Wrapper function to invoke the agent system
    This is a replica function that doesn't disturb existing agent code
    """
    global multi_mcp, agent_loop, initialization_complete
    
    # Check if initialization was completed
    if not initialization_complete or agent_loop is None:
        return "Agent system is not initialized. Please restart the server."
    
    try:
        # Prepare file inputs (empty if no files)
        if uploaded_files is None:
            uploaded_files = []
        if file_manifest is None:
            file_manifest = []
        
        # Run the agent system
        print(f"🔄 Processing query: {query}")
        execution_context = await agent_loop.run(query, file_manifest, uploaded_files)
        
        # Extract results from execution context
        if hasattr(execution_context, 'get_final_output'):
            final_output = execution_context.get_final_output()
        else:
            # Fallback: analyze results and return summary
            final_output = "Task completed successfully. Check the execution context for detailed results."
        
        return final_output
        
    except Exception as e:
        error_msg = f"Error processing query: {str(e)}"
        print(f"❌ {error_msg}")
        traceback.print_exc()
        return error_msg

@app.route('/ask', methods=['POST'])
def ask():
    """Handle chat requests from the frontend"""
    try:
        data = request.get_json(silent=True)
        if not data or 'question' not in data:
            return jsonify({'response': 'Invalid request: missing "question"'}), 400
        
        question = data['question']
        uploaded_files = data.get('uploaded_files', [])
        file_manifest = data.get('file_manifest', [])
        
        print(f" Received question: {question}")
        
        # Run the agent asynchronously
        answer = run_in_loop(agent_responds(question, uploaded_files, file_manifest))
        
        return jsonify({
            'response': answer,
            'status': 'success'
        })
        
    except Exception as e:
        error_msg = f"Server error: {str(e)}"
        print(f"❌ {error_msg}")
        return jsonify({
            'response': error_msg,
            'status': 'error'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    global initialization_complete
    return jsonify({
        'status': 'healthy' if initialization_complete else 'initializing',
        'message': 'EAG18 Web API is running',
        'agent_initialized': initialization_complete
    })

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    print(" Starting EAG18 Web API...")
    
    # Start persistent event loop in background thread
    event_loop = asyncio.new_event_loop()
    t = threading.Thread(target=start_background_loop, args=(event_loop,), daemon=True)
    t.start()

    # Initialize agent system on the persistent event loop
    print(" Initializing agent system at startup...")
    success = run_in_loop(initialize_agent_system())
    
    if success:
        print("✅ Agent system ready. Starting Flask server...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("❌ Failed to initialize agent system. Exiting...")
        sys.exit(1)