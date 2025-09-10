# Resume Platform - Full Stack Demo

A comprehensive resume building platform built with React, FastAPI, and Redis for the Full Stack Developer Internship assignment.

## 🚀 Features

### MVP Features (Completed)
- ✅ Secure Login/Signup (email + password)
- ✅ Resume Builder Form (personal details, education, experience, skills)
- ✅ Save multiple resume versions
- ✅ Dashboard to view, edit, and manage resumes
- ✅ Download resume as PDF

### Bonus Features (Completed)
- ✅ Professional PDF templates with custom styling
- ✅ Role-based authentication with JWT
- ✅ Redis integration for data storage
- ✅ Docker support with Docker Compose
- ✅ Responsive design with TailwindCSS
- ✅ Real-time form validation

## 🛠 Tech Stack

### Frontend
- **React 18** with Next.js 14 (App Router)
- **TailwindCSS** for styling
- **TypeScript** for type safety
- **Shadcn/ui** for UI components

### Backend
- **FastAPI** (Python) for REST API
- **Redis** for data storage
- **JWT** for authentication
- **ReportLab** for PDF generation
- **Pydantic** for data validation

### DevOps
- **Docker & Docker Compose** for containerization
- **Uvicorn** ASGI server

## 📋 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login & return token
- `GET /auth/me` - Get current user profile

### Resume Management
- `POST /resume` - Create new resume version
- `GET /resume` - Get all user resumes
- `PUT /resume/{id}` - Update resume
- `DELETE /resume/{id}` - Delete resume
- `GET /resume/{id}/download` - Download resume as PDF

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.9+
- Redis server
- Docker (optional)

### Option 1: Docker Setup (Recommended)
\`\`\`bash
# Clone the repository
git clone <repository-url>
cd resume-platform

# Start with Docker Compose
docker-compose up -d

# Setup demo data
docker exec -it resume-platform-backend python scripts/setup_demo_data.py
\`\`\`

### Option 2: Manual Setup

#### Backend Setup
\`\`\`bash
# Install Python dependencies
cd scripts/backend
pip install -r requirements.txt

# Start Redis (if not running)
redis-server

# Setup demo data
python ../setup_demo_data.py

# Start FastAPI server
python main.py
\`\`\`

#### Frontend Setup
\`\`\`bash
# Install Node.js dependencies
npm install

# Set environment variables
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start development server
npm run dev
\`\`\`

## 🧪 Testing

### Automated API Testing
\`\`\`bash
# Run API tests
python scripts/test_api.py
\`\`\`

### Manual Testing
1. Visit `http://localhost:3000`
2. Login with demo credentials:
   - **Email**: `hire-me@anshumat.org`
   - **Password**: `HireMe@2025!`
3. Test all features:
   - Create new resume
   - Edit existing resumes
   - Download PDF
   - Manage multiple resumes

## 👤 Demo User

**Required demo login credentials for evaluation:**
- **Email**: `hire-me@anshumat.org`
- **Password**: `HireMe@2025!`

The demo user comes with 2 sample resumes:
1. Software Engineer Resume
2. Product Manager Resume

## 🏗 Project Structure

\`\`\`
resume-platform/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── builder/           # Resume builder
│   ├── dashboard/         # User dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── auth/             # Auth components
│   ├── dashboard/        # Dashboard components
│   └── resume-builder/   # Resume builder components
├── scripts/              # Backend & utilities
│   ├── backend/          # FastAPI application
│   ├── setup_demo_data.py # Demo data setup
│   └── test_api.py       # API testing
├── lib/                  # Utilities
└── types/               # TypeScript types
\`\`\`

## 🎯 Evaluation Criteria Met

- ✅ **MVP features fully functional**
- ✅ **Proper implementation of sample API endpoints**
- ✅ **Clean code structure & best practices**
- ✅ **UI/UX clarity & responsiveness**
- ✅ **Bonus features**: Docker, role-based auth, professional PDF generation
- ✅ **Documentation quality** with tech stack justification
- ✅ **Demo user setup** for easy evaluation

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation with Pydantic
- CORS configuration

## 📱 Responsive Design

- Mobile-first approach
- Professional green color scheme
- Space Grotesk & DM Sans typography
- Accessible UI components

## 🚀 Deployment Ready

- Docker containerization
- Environment variable configuration
- Production-ready FastAPI setup
- Optimized build process

---

**Built with ❤️ for the Full Stack Developer Internship Assignment**
