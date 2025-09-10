from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import redis
import json
import os
from typing import Optional, List
import uuid
from pdf_generator import generate_resume_pdf

# Initialize FastAPI app
app = FastAPI(title="ResumeBuilder Pro API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = "your-secret-key-here-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Redis connection
try:
    redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
    redis_client.ping()
    print("✅ Connected to Redis successfully")
except redis.ConnectionError:
    print("❌ Failed to connect to Redis. Make sure Redis is running.")
    redis_client = None

class PersonalDetails(BaseModel):
    fullName: str
    email: str
    phone: str
    location: str
    website: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None

class Education(BaseModel):
    id: str
    school: str
    degree: str
    field: str
    startDate: str
    endDate: str
    gpa: Optional[str] = None
    description: Optional[str] = None

class Experience(BaseModel):
    id: str
    company: str
    position: str
    startDate: str
    endDate: str
    current: bool = False
    description: str

class ResumeData(BaseModel):
    personalDetails: PersonalDetails
    education: List[Education]
    experience: List[Experience]
    skills: List[str]

class ResumeCreate(BaseModel):
    title: str
    template: str = "modern"
    data: ResumeData

class ResumeUpdate(BaseModel):
    title: Optional[str] = None
    template: Optional[str] = None
    data: Optional[ResumeData] = None

class Resume(BaseModel):
    id: str
    title: str
    template: str
    data: ResumeData
    created_at: datetime
    updated_at: datetime
    user_id: str

# Existing Pydantic models
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str
    full_name: str
    email: str
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Utility functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_by_email(email: str):
    if not redis_client:
        return None
    
    user_data = redis_client.get(f"user:{email}")
    if user_data:
        return json.loads(user_data)
    return None

def create_user(user_data: dict):
    if not redis_client:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    user_key = f"user:{user_data['email']}"
    redis_client.set(user_key, json.dumps(user_data))
    return user_data

def authenticate_user(email: str, password: str):
    user = get_user_by_email(email)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user

def create_resume_in_db(resume_data: dict, user_id: str):
    if not redis_client:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
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
    
    return resume_data

def get_user_resumes(user_id: str):
    if not redis_client:
        return []
    
    user_resumes_key = f"user_resumes:{user_id}"
    resume_ids = redis_client.smembers(user_resumes_key)
    
    resumes = []
    for resume_id in resume_ids:
        resume_data = redis_client.get(f"resume:{resume_id}")
        if resume_data:
            resumes.append(json.loads(resume_data))
    
    # Sort by updated_at descending
    resumes.sort(key=lambda x: x["updated_at"], reverse=True)
    return resumes

def get_resume_by_id(resume_id: str, user_id: str):
    if not redis_client:
        return None
    
    resume_data = redis_client.get(f"resume:{resume_id}")
    if resume_data:
        resume = json.loads(resume_data)
        if resume["user_id"] == user_id:
            return resume
    return None

def update_resume_in_db(resume_id: str, update_data: dict, user_id: str):
    if not redis_client:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    resume = get_resume_by_id(resume_id, user_id)
    if not resume:
        return None
    
    # Update fields
    for key, value in update_data.items():
        if value is not None:
            resume[key] = value
    
    resume["updated_at"] = datetime.utcnow().isoformat()
    
    # Save updated resume
    resume_key = f"resume:{resume_id}"
    redis_client.set(resume_key, json.dumps(resume))
    
    return resume

def delete_resume_from_db(resume_id: str, user_id: str):
    if not redis_client:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    resume = get_resume_by_id(resume_id, user_id)
    if not resume:
        return False
    
    # Remove from Redis
    resume_key = f"resume:{resume_id}"
    redis_client.delete(resume_key)
    
    # Remove from user's resume list
    user_resumes_key = f"user_resumes:{user_id}"
    redis_client.srem(user_resumes_key, resume_id)
    
    return True

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_email(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

# API Routes
@app.get("/")
async def root():
    return {"message": "ResumeBuilder Pro API", "version": "1.0.0", "status": "running"}

@app.post("/auth/signup", response_model=Token)
async def signup(user: UserCreate):
    # Check if user already exists
    if get_user_by_email(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    user_id = f"user_{int(datetime.utcnow().timestamp())}"
    
    user_data = {
        "id": user_id,
        "full_name": user.full_name,
        "email": user.email,
        "hashed_password": hashed_password,
        "created_at": datetime.utcnow().isoformat(),
        "resumes": []
    }
    
    create_user(user_data)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/auth/login", response_model=Token)
async def login(user: UserLogin):
    user_data = authenticate_user(user.email, user.password)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_data["email"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=User)
async def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    return User(
        id=current_user["id"],
        full_name=current_user["full_name"],
        email=current_user["email"],
        created_at=datetime.fromisoformat(current_user["created_at"])
    )

@app.post("/resume", response_model=Resume)
async def create_resume(resume: ResumeCreate, current_user: dict = Depends(get_current_user)):
    resume_data = {
        "title": resume.title,
        "template": resume.template,
        "data": resume.data.dict()
    }
    
    created_resume = create_resume_in_db(resume_data, current_user["id"])
    
    return Resume(
        id=created_resume["id"],
        title=created_resume["title"],
        template=created_resume["template"],
        data=ResumeData(**created_resume["data"]),
        created_at=datetime.fromisoformat(created_resume["created_at"]),
        updated_at=datetime.fromisoformat(created_resume["updated_at"]),
        user_id=created_resume["user_id"]
    )

@app.get("/resume", response_model=List[Resume])
async def get_resumes(current_user: dict = Depends(get_current_user)):
    resumes = get_user_resumes(current_user["id"])
    
    return [
        Resume(
            id=resume["id"],
            title=resume["title"],
            template=resume["template"],
            data=ResumeData(**resume["data"]),
            created_at=datetime.fromisoformat(resume["created_at"]),
            updated_at=datetime.fromisoformat(resume["updated_at"]),
            user_id=resume["user_id"]
        )
        for resume in resumes
    ]

@app.put("/resume/{resume_id}", response_model=Resume)
async def update_resume(resume_id: str, resume_update: ResumeUpdate, current_user: dict = Depends(get_current_user)):
    update_data = {}
    if resume_update.title is not None:
        update_data["title"] = resume_update.title
    if resume_update.template is not None:
        update_data["template"] = resume_update.template
    if resume_update.data is not None:
        update_data["data"] = resume_update.data.dict()
    
    updated_resume = update_resume_in_db(resume_id, update_data, current_user["id"])
    
    if not updated_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )
    
    return Resume(
        id=updated_resume["id"],
        title=updated_resume["title"],
        template=updated_resume["template"],
        data=ResumeData(**updated_resume["data"]),
        created_at=datetime.fromisoformat(updated_resume["created_at"]),
        updated_at=datetime.fromisoformat(updated_resume["updated_at"]),
        user_id=updated_resume["user_id"]
    )

@app.delete("/resume/{resume_id}")
async def delete_resume(resume_id: str, current_user: dict = Depends(get_current_user)):
    success = delete_resume_from_db(resume_id, current_user["id"])
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )
    
    return {"message": "Resume deleted successfully"}

@app.get("/resume/{resume_id}/download")
async def download_resume_pdf(resume_id: str, current_user: dict = Depends(get_current_user)):
    resume = get_resume_by_id(resume_id, current_user["id"])
    
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )
    
    try:
        # Generate PDF
        pdf_buffer = generate_resume_pdf(resume)
        
        # Create filename
        safe_title = "".join(c for c in resume["title"] if c.isalnum() or c in (' ', '-', '_')).rstrip()
        filename = f"{safe_title}_Resume.pdf"
        
        # Return PDF as streaming response
        return StreamingResponse(
            iter([pdf_buffer.getvalue()]),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating PDF: {str(e)}"
        )

# Health check endpoint
@app.get("/health")
async def health_check():
    redis_status = "connected" if redis_client and redis_client.ping() else "disconnected"
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "redis": redis_status
    }

if __name__ == "__main__":
    import uvicorn
    
    # Create demo user on startup
    demo_user_data = {
        "id": "demo_user_001",
        "full_name": "Demo User",
        "email": "hire-me@anshumat.org",
        "hashed_password": get_password_hash("HireMe@2025!"),
        "created_at": datetime.utcnow().isoformat(),
        "resumes": []
    }
    
    if redis_client:
        try:
            create_user(demo_user_data)
            print("✅ Demo user created successfully")
            print("📧 Email: hire-me@anshumat.org")
            print("🔑 Password: HireMe@2025!")
        except Exception as e:
            print(f"⚠️  Demo user creation failed: {e}")
    
    print("🚀 Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
