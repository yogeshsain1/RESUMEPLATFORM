import json
import redis
from datetime import datetime
import uuid
from passlib.context import CryptContext

# Initialize password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

# Connect to Redis
try:
    redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
    redis_client.ping()
    print("✅ Connected to Redis successfully")
except redis.ConnectionError:
    print("❌ Failed to connect to Redis. Make sure Redis is running.")
    exit(1)

def create_demo_user():
    """Create the required demo user with credentials"""
    demo_user_data = {
        "id": "demo_user_001",
        "full_name": "Demo User",
        "email": "hire-me@anshumat.org",
        "hashed_password": get_password_hash("HireMe@2025!"),
        "created_at": datetime.utcnow().isoformat(),
        "resumes": []
    }
    
    user_key = f"user:{demo_user_data['email']}"
    redis_client.set(user_key, json.dumps(demo_user_data))
    print("✅ Demo user created successfully")
    print("📧 Email: hire-me@anshumat.org")
    print("🔑 Password: HireMe@2025!")
    return demo_user_data

def create_sample_resumes(user_id):
    """Create sample resumes for the demo user"""
    
    # Sample Resume 1: Software Engineer
    resume1_data = {
        "title": "Software Engineer Resume",
        "template": "modern",
        "data": {
            "personalDetails": {
                "fullName": "Demo User",
                "email": "hire-me@anshumat.org",
                "phone": "+1 (555) 123-4567",
                "location": "San Francisco, CA",
                "website": "https://demo-portfolio.com",
                "linkedin": "https://linkedin.com/in/demo-user",
                "github": "https://github.com/demo-user"
            },
            "experience": [
                {
                    "id": str(uuid.uuid4()),
                    "company": "Tech Innovations Inc.",
                    "position": "Senior Software Engineer",
                    "startDate": "2022-01",
                    "endDate": "2024-12",
                    "current": True,
                    "description": "Led development of scalable web applications using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines and mentored junior developers. Increased application performance by 40% through optimization techniques."
                },
                {
                    "id": str(uuid.uuid4()),
                    "company": "StartupXYZ",
                    "position": "Full Stack Developer",
                    "startDate": "2020-06",
                    "endDate": "2021-12",
                    "current": False,
                    "description": "Built responsive web applications using React and Express.js. Designed and implemented RESTful APIs. Collaborated with cross-functional teams to deliver high-quality software solutions."
                }
            ],
            "education": [
                {
                    "id": str(uuid.uuid4()),
                    "school": "University of California, Berkeley",
                    "degree": "Bachelor of Science",
                    "field": "Computer Science",
                    "startDate": "2016-08",
                    "endDate": "2020-05",
                    "gpa": "3.8",
                    "description": "Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering"
                }
            ],
            "skills": [
                "JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", 
                "MongoDB", "AWS", "Docker", "Git", "Agile/Scrum"
            ]
        }
    }
    
    # Sample Resume 2: Product Manager
    resume2_data = {
        "title": "Product Manager Resume",
        "template": "modern",
        "data": {
            "personalDetails": {
                "fullName": "Demo User",
                "email": "hire-me@anshumat.org",
                "phone": "+1 (555) 123-4567",
                "location": "San Francisco, CA",
                "website": "https://demo-portfolio.com",
                "linkedin": "https://linkedin.com/in/demo-user",
                "github": ""
            },
            "experience": [
                {
                    "id": str(uuid.uuid4()),
                    "company": "Product Solutions Corp",
                    "position": "Senior Product Manager",
                    "startDate": "2021-03",
                    "endDate": "2024-12",
                    "current": True,
                    "description": "Led product strategy and roadmap for B2B SaaS platform serving 10,000+ users. Collaborated with engineering, design, and sales teams to deliver features that increased user engagement by 35%. Managed product lifecycle from ideation to launch."
                },
                {
                    "id": str(uuid.uuid4()),
                    "company": "Innovation Labs",
                    "position": "Product Manager",
                    "startDate": "2019-01",
                    "endDate": "2021-02",
                    "current": False,
                    "description": "Defined product requirements and user stories for mobile applications. Conducted user research and A/B testing to optimize user experience. Worked closely with UX designers to create intuitive interfaces."
                }
            ],
            "education": [
                {
                    "id": str(uuid.uuid4()),
                    "school": "Stanford University",
                    "degree": "Master of Business Administration",
                    "field": "Technology Management",
                    "startDate": "2017-09",
                    "endDate": "2019-06",
                    "gpa": "3.9",
                    "description": "Focus on technology strategy, product management, and entrepreneurship"
                }
            ],
            "skills": [
                "Product Strategy", "User Research", "Data Analysis", "Agile Methodologies", 
                "Roadmap Planning", "Stakeholder Management", "A/B Testing", "SQL", "Figma"
            ]
        }
    }
    
    # Create resumes in database
    resumes = [resume1_data, resume2_data]
    created_resumes = []
    
    for resume_data in resumes:
        resume_id = str(uuid.uuid4())
        resume_data["id"] = resume_id
        resume_data["user_id"] = user_id
        resume_data["created_at"] = datetime.utcnow().isoformat()
        resume_data["updated_at"] = datetime.utcnow().isoformat()
        
        # Store resume
        resume_key = f"resume:{resume_id}"
        redis_client.set(resume_key, json.dumps(resume_data))
        
        # Add to user's resume list
        user_resumes_key = f"user_resumes:{user_id}"
        redis_client.sadd(user_resumes_key, resume_id)
        
        created_resumes.append(resume_data)
        print(f"✅ Created sample resume: {resume_data['title']}")
    
    return created_resumes

def verify_setup():
    """Verify that everything is set up correctly"""
    print("\n🔍 Verifying setup...")
    
    # Check if demo user exists
    user_data = redis_client.get("user:hire-me@anshumat.org")
    if user_data:
        user = json.loads(user_data)
        print(f"✅ Demo user found: {user['full_name']} ({user['email']})")
        
        # Check resumes
        user_resumes_key = f"user_resumes:{user['id']}"
        resume_ids = redis_client.smembers(user_resumes_key)
        print(f"✅ Found {len(resume_ids)} sample resumes")
        
        for resume_id in resume_ids:
            resume_data = redis_client.get(f"resume:{resume_id}")
            if resume_data:
                resume = json.loads(resume_data)
                print(f"   - {resume['title']}")
    else:
        print("❌ Demo user not found")
        return False
    
    print("\n🎉 Setup verification complete!")
    return True

def main():
    print("🚀 Setting up demo data for Resume Platform...")
    print("=" * 50)
    
    # Create demo user
    demo_user = create_demo_user()
    
    # Create sample resumes
    print("\n📄 Creating sample resumes...")
    create_sample_resumes(demo_user["id"])
    
    # Verify setup
    verify_setup()
    
    print("\n" + "=" * 50)
    print("✅ Demo setup complete!")
    print("\nDemo Login Credentials:")
    print("📧 Email: hire-me@anshumat.org")
    print("🔑 Password: HireMe@2025!")
    print("\nYou can now:")
    print("1. Start the backend server: python scripts/backend/main.py")
    print("2. Start the frontend: npm run dev")
    print("3. Login with the demo credentials")
    print("4. Test all features including PDF download")

if __name__ == "__main__":
    main()
