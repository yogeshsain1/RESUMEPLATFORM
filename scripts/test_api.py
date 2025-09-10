import requests
import json
from datetime import datetime

# API Configuration
API_BASE_URL = "http://localhost:8000"
DEMO_EMAIL = "hire-me@anshumat.org"
DEMO_PASSWORD = "HireMe@2025!"

class APITester:
    def __init__(self):
        self.token = None
        self.session = requests.Session()
    
    def test_health_check(self):
        """Test API health endpoint"""
        print("🔍 Testing health check...")
        try:
            response = self.session.get(f"{API_BASE_URL}/health")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Health check passed - Redis: {data['redis']}")
                return True
            else:
                print(f"❌ Health check failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Health check error: {e}")
            return False
    
    def test_login(self):
        """Test user login"""
        print("🔍 Testing login...")
        try:
            response = self.session.post(
                f"{API_BASE_URL}/auth/login",
                json={"email": DEMO_EMAIL, "password": DEMO_PASSWORD}
            )
            if response.status_code == 200:
                data = response.json()
                self.token = data["access_token"]
                self.session.headers.update({"Authorization": f"Bearer {self.token}"})
                print("✅ Login successful")
                return True
            else:
                print(f"❌ Login failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            print(f"❌ Login error: {e}")
            return False
    
    def test_get_user_profile(self):
        """Test getting user profile"""
        print("🔍 Testing user profile...")
        try:
            response = self.session.get(f"{API_BASE_URL}/auth/me")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ User profile retrieved: {data['full_name']}")
                return True
            else:
                print(f"❌ Profile retrieval failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Profile error: {e}")
            return False
    
    def test_get_resumes(self):
        """Test getting user resumes"""
        print("🔍 Testing resume retrieval...")
        try:
            response = self.session.get(f"{API_BASE_URL}/resume")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Retrieved {len(data)} resumes")
                for resume in data:
                    print(f"   - {resume['title']}")
                return data
            else:
                print(f"❌ Resume retrieval failed: {response.status_code}")
                return []
        except Exception as e:
            print(f"❌ Resume retrieval error: {e}")
            return []
    
    def test_pdf_download(self, resume_id, resume_title):
        """Test PDF download"""
        print(f"🔍 Testing PDF download for '{resume_title}'...")
        try:
            response = self.session.get(f"{API_BASE_URL}/resume/{resume_id}/download")
            if response.status_code == 200:
                # Save PDF to verify it's valid
                filename = f"test_{resume_title.replace(' ', '_')}.pdf"
                with open(filename, 'wb') as f:
                    f.write(response.content)
                print(f"✅ PDF downloaded successfully: {filename}")
                return True
            else:
                print(f"❌ PDF download failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ PDF download error: {e}")
            return False
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting API Tests...")
        print("=" * 50)
        
        tests_passed = 0
        total_tests = 0
        
        # Test 1: Health Check
        total_tests += 1
        if self.test_health_check():
            tests_passed += 1
        
        # Test 2: Login
        total_tests += 1
        if self.test_login():
            tests_passed += 1
        else:
            print("❌ Cannot continue without login")
            return
        
        # Test 3: User Profile
        total_tests += 1
        if self.test_get_user_profile():
            tests_passed += 1
        
        # Test 4: Get Resumes
        total_tests += 1
        resumes = self.test_get_resumes()
        if resumes:
            tests_passed += 1
            
            # Test 5: PDF Downloads
            for resume in resumes[:2]:  # Test first 2 resumes
                total_tests += 1
                if self.test_pdf_download(resume['id'], resume['title']):
                    tests_passed += 1
        
        print("\n" + "=" * 50)
        print(f"🎯 Test Results: {tests_passed}/{total_tests} tests passed")
        
        if tests_passed == total_tests:
            print("🎉 All tests passed! The API is working correctly.")
        else:
            print("⚠️  Some tests failed. Please check the output above.")

def main():
    tester = APITester()
    tester.run_all_tests()

if __name__ == "__main__":
    main()
