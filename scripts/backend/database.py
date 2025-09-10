import redis
import json
from typing import Optional, List
from datetime import datetime
import os

class RedisDatabase:
    def __init__(self):
        # Try to connect to Redis
        try:
            self.client = redis.Redis(
                host=os.getenv('REDIS_HOST', 'localhost'),
                port=int(os.getenv('REDIS_PORT', 6379)),
                db=0,
                decode_responses=True
            )
            self.client.ping()
            print("✅ Connected to Redis successfully")
        except redis.ConnectionError:
            print("❌ Failed to connect to Redis")
            self.client = None
    
    def is_connected(self) -> bool:
        return self.client is not None and self.client.ping()
    
    # User operations
    def create_user(self, user_data: dict) -> dict:
        if not self.client:
            raise Exception("Database connection failed")
        
        user_key = f"user:{user_data['email']}"
        self.client.set(user_key, json.dumps(user_data))
        
        # Add to users index
        self.client.sadd("users:index", user_data['email'])
        
        return user_data
    
    def get_user_by_email(self, email: str) -> Optional[dict]:
        if not self.client:
            return None
        
        user_data = self.client.get(f"user:{email}")
        if user_data:
            return json.loads(user_data)
        return None
    
    def update_user(self, email: str, user_data: dict) -> dict:
        if not self.client:
            raise Exception("Database connection failed")
        
        user_key = f"user:{email}"
        self.client.set(user_key, json.dumps(user_data))
        return user_data
    
    # Resume operations
    def create_resume(self, resume_data: dict) -> dict:
        if not self.client:
            raise Exception("Database connection failed")
        
        resume_key = f"resume:{resume_data['id']}"
        self.client.set(resume_key, json.dumps(resume_data))
        
        # Add to user's resume list
        user_resumes_key = f"user_resumes:{resume_data['user_id']}"
        self.client.sadd(user_resumes_key, resume_data['id'])
        
        # Add to global resumes index
        self.client.sadd("resumes:index", resume_data['id'])
        
        return resume_data
    
    def get_resume_by_id(self, resume_id: str) -> Optional[dict]:
        if not self.client:
            return None
        
        resume_data = self.client.get(f"resume:{resume_id}")
        if resume_data:
            return json.loads(resume_data)
        return None
    
    def get_user_resumes(self, user_id: str) -> List[dict]:
        if not self.client:
            return []
        
        user_resumes_key = f"user_resumes:{user_id}"
        resume_ids = self.client.smembers(user_resumes_key)
        
        resumes = []
        for resume_id in resume_ids:
            resume_data = self.get_resume_by_id(resume_id)
            if resume_data:
                resumes.append(resume_data)
        
        # Sort by updated_at descending
        resumes.sort(key=lambda x: x.get('updated_at', ''), reverse=True)
        return resumes
    
    def update_resume(self, resume_id: str, resume_data: dict) -> dict:
        if not self.client:
            raise Exception("Database connection failed")
        
        resume_data['updated_at'] = datetime.utcnow().isoformat()
        resume_key = f"resume:{resume_id}"
        self.client.set(resume_key, json.dumps(resume_data))
        return resume_data
    
    def delete_resume(self, resume_id: str, user_id: str) -> bool:
        if not self.client:
            return False
        
        # Remove from user's resume list
        user_resumes_key = f"user_resumes:{user_id}"
        self.client.srem(user_resumes_key, resume_id)
        
        # Remove from global index
        self.client.srem("resumes:index", resume_id)
        
        # Delete the resume data
        resume_key = f"resume:{resume_id}"
        return bool(self.client.delete(resume_key))
    
    # Utility methods
    def get_all_users(self) -> List[str]:
        if not self.client:
            return []
        return list(self.client.smembers("users:index"))
    
    def get_all_resumes(self) -> List[str]:
        if not self.client:
            return []
        return list(self.client.smembers("resumes:index"))
    
    def clear_all_data(self):
        """WARNING: This will delete all data in the Redis database"""
        if self.client:
            self.client.flushdb()
            print("🗑️  All data cleared from Redis")

# Global database instance
db = RedisDatabase()
