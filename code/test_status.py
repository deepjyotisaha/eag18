#!/usr/bin/env python3
"""
Simple test script to verify the status endpoint works
"""

import requests
import json

def test_status_endpoint():
    """Test the /status endpoint"""
    try:
        # Test the status endpoint
        response = requests.get('http://127.0.0.1:5000/status')
        
        if response.status_code == 200:
            status_data = response.json()
            print("✅ Status endpoint working!")
            print(f"Status: {status_data.get('status', 'unknown')}")
            print(f"Message: {status_data.get('message', 'No message')}")
            
            if status_data.get('status') == 'running':
                progress = status_data.get('progress', {})
                print(f"Progress: {progress.get('completed', 0)}/{progress.get('total', 0)} ({progress.get('percentage', 0)}%)")
                print(f"Current Step: {status_data.get('current_step', {}).get('description', 'Unknown')}")
                print(f"Execution Time: {status_data.get('execution_time', 0)}s")
            
            return True
        else:
            print(f"❌ Status endpoint returned error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure the server is running on http://127.0.0.1:5000")
        return False
    except Exception as e:
        print(f"❌ Error testing status endpoint: {e}")
        return False

def test_health_endpoint():
    """Test the /health endpoint"""
    try:
        response = requests.get('http://127.0.0.1:5000/health')
        
        if response.status_code == 200:
            health_data = response.json()
            print("✅ Health endpoint working!")
            print(f"Status: {health_data.get('status', 'unknown')}")
            print(f"Agent Initialized: {health_data.get('agent_initialized', False)}")
            return True
        else:
            print(f"❌ Health endpoint returned error: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure the server is running on http://127.0.0.1:5000")
        return False
    except Exception as e:
        print(f"❌ Error testing health endpoint: {e}")
        return False

if __name__ == "__main__":
    print("Testing EAG18 Status Endpoints...")
    print("=" * 40)
    
    # Test health endpoint first
    print("\n1. Testing /health endpoint:")
    health_ok = test_health_endpoint()
    
    # Test status endpoint
    print("\n2. Testing /status endpoint:")
    status_ok = test_status_endpoint()
    
    print("\n" + "=" * 40)
    if health_ok and status_ok:
        print("✅ All endpoints working correctly!")
    else:
        print("❌ Some endpoints failed. Check the server logs.") 