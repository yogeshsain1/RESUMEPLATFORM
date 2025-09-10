"""
Script to set up the demo user for the resume platform
Run this script to create the required demo user account
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.database import db
from backend.auth import get_password_hash
from datetime import datetime

def create_demo_user():
    """Create the demo user as required by the assignment"""
    
    if not db.is_connected():
        print("❌ Redis is not connected. Please start Redis server first.")
        return False
    
    demo_user_data = {
        "id": "demo_user_001",
        "full_name": "Demo User",
        "email": "hire-me@anshumat.org",
        "hashed_password": get_password_hash("HireMe@2025!"),
        "created_at": datetime.utcnow().isoformat(),
        "resumes": []
    }
    
    try:
        # Check if demo user already exists
        existing_user = db.get_user_by_email("hire-me@anshumat.org")
        if existing_user:
            print("✅ Demo user already exists")
            print("📧 Email: hire-me@anshumat.org")
            print("🔑 Password: HireMe@2025!")
            return True
        
        # Create the demo user
        db.create_user(demo_user_data)
        print("✅ Demo user created successfully!")
        print("📧 Email: hire-me@anshumat.org")
        print("🔑 Password: HireMe@2025!")
        print("\nYou can now use these credentials to test the application.")
        return True
        
    except Exception as e:
        print(f"❌ Failed to create demo user: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Setting up demo user for ResumeBuilder Pro...")
    success = create_demo_user()
    
    if success:
        print("\n✨ Demo user setup complete!")
        print("You can now start the FastAPI server and test the authentication.")
    else:
        print("\n💥 Demo user setup failed!")
        print("Please check Redis connection and try again.")
