from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User Models
class UserBase(BaseModel):
    full_name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Resume Models
class PersonalDetails(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    address: Optional[str] = ""
    city: Optional[str] = ""
    state: Optional[str] = ""
    zip_code: Optional[str] = ""
    linkedin: Optional[str] = ""
    website: Optional[str] = ""
    summary: str

class Education(BaseModel):
    id: str
    institution: str
    degree: str
    field_of_study: str
    start_date: str
    end_date: str
    gpa: Optional[str] = ""
    description: Optional[str] = ""

class Experience(BaseModel):
    id: str
    company: str
    position: str
    start_date: str
    end_date: str
    current: bool = False
    location: str
    description: str

class Skills(BaseModel):
    technical: List[str] = []
    soft: List[str] = []

class ResumeData(BaseModel):
    personal: PersonalDetails
    education: List[Education] = []
    experience: List[Experience] = []
    skills: Skills

class ResumeCreate(BaseModel):
    title: str
    data: ResumeData

class ResumeUpdate(BaseModel):
    title: Optional[str] = None
    data: Optional[ResumeData] = None

class Resume(BaseModel):
    id: str
    title: str
    user_id: str
    data: ResumeData
    created_at: datetime
    updated_at: datetime
    status: str = "draft"  # draft, active
    
    class Config:
        from_attributes = True

class ResumeListItem(BaseModel):
    id: str
    title: str
    status: str
    created_at: datetime
    updated_at: datetime

# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
