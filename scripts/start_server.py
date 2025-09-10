"""
Script to start the FastAPI server with proper setup
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

import uvicorn
from backend.main import app
from setup_demo_user import create_demo_user

def main():
    print("🚀 Starting ResumeBuilder Pro API Server...")
    
    # Create demo user first
    print("\n📝 Setting up demo user...")
    create_demo_user()
    
    print("\n🌐 Starting FastAPI server on http://localhost:8000")
    print("📚 API Documentation available at http://localhost:8000/docs")
    print("🔍 Alternative docs at http://localhost:8000/redoc")
    print("\n⚡ Server is running with auto-reload enabled")
    print("Press Ctrl+C to stop the server\n")
    
    # Start the server
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["scripts/backend"]
    )

if __name__ == "__main__":
    main()
