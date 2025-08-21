### System Overview

- This web app helps 12th-grade students select suitable universities, courses, and career paths using AI-powered recommendations.

**Frontend (React):** User interface with forms, dashboards, and voice features.

**Backend (Node.js + Express):** REST APIs, data validation, and AI integration.

**Database (MongoDB):** Stores profiles, universities, and resources.

**AI (Groq SDK):** Provides job, course, and roadmap recommendations, plus voice agent support.

### Frontend Components & Responsibilities

**OnboardingForm**

- Collects student data: name, skills, knowledge, interests, passions.

- Submits profile to backend for storage.

**JobInterest**

- Displays AI-recommended future jobs.

- Fetches results from backend.

**EligibilityChecker**

- Takes marks, SAT, and JEE scores.

- Calls backend to fetch eligible universities.

**CourseSelector**

- Shows recommended courses/universities tailored to the student.

**Roadmap**

- Displays a study timeline and resources (free/paid).

**VoiceAgent**

- Provides real-time voice assistance.

- Uses speech-to-text (STT) and Groq’s conversational AI.

### Frontend → Backend Data Flows

*Onboarding Flow*

**Input:** { name, skills, knowledge, interests, passions }

**Backend API:** /api/student/onboarding

**Output:** { status: success, studentId, message }

*Job Recommendation Flow*

**Input:** studentId

**Backend API:** /api/recommend/jobs/:studentId

**Output:** { jobs: [ "AI Research Scientist", "Robotics Engineer" ] }

*Eligibility Check Flow*

**Input:** { marks, exams: { sat, jee } }

**Backend API:** /api/recommend/eligibility

**Output:** { eligibleUniversities: [ { name, course } ] }

*Course Recommendation Flow*

**Input:** { studentId }

**Backend API:** /api/recommend/university

**Output:** { courses: [ { name, university } ] }

*Roadmap & Resources Flow*

**Input:** { studentId, course }

**Backend API:** /api/recommend/roadmap

**Output:** { timeline: [ … ], resources: [ { course, type, link, description } ] }

*Voice Agent Flow*

**Input:** Real-time speech query from user.

**Backend API:** /api/voice/query → Groq SDK.

**Output:** AI-generated voice/text response.

### Backend API Design

**Endpoints**

- `POST /api/student/onboarding` → Save student profile.

- `GET /api/recommend/jobs/:studentId` → Return AI job suggestions.

- `POST /api/recommend/eligibility` → Return universities based on marks/exams.

- `POST /api/recommend/university` → Recommend universities + courses.

- `POST /api/recommend/roadmap` → Generate learning roadmap + resources.

- `POST /api/voice/query` → Handle AI voice Q&A.

### Database Models (MongoDB)

*Student*

- Fields: `_id`, `name`, `skills[]`, `knowledge[]`, `interests[]`, `passions[]`, `marks`, `exams {sat, jee}`, j`obPreferences[]`.

*University*

- Fields: `_id`, `name`, `courses[]`, `eligibilityCriteria {marks, sat, jee}`, `location`.

*Resource*

- Fields: `_id`, `course`, `type (free/paid)`, `link`, `description`.

### AI Integration (Groq SDK)

*Inputs to LLM:*

- Student profile (skills, interests, passions).

- Marks and exam scores (for eligibility).

- Selected course/university (for roadmap).

- Real-time user queries (for voice agent).

*Outputs from LLM:*

- Top jobs aligned with student’s background.

- Refined eligibility suggestions.

- Personalized learning roadmap.

- Conversational answers for voice queries.

### Data Flow Examples

*Eligibility Check Example*

- **Frontend:** Student enters marks + exams.

- **Backend:** Validates → queries University collection.

- **Groq SDK:** Optionally refines suggestions.

- **Frontend:** Displays eligible universities list.

### Roadmap Example

- **Frontend:** Student selects course.

- **Backend:** Fetches resources for that course.

- **Groq SDK:** Generates study timeline.

- **Frontend:** Displays roadmap & resources.

#### Performance & Reliability

- **Response Latency:** Under 2s (caching frequently queried universities).

- **Scalability:** MongoDB supports >1,000 concurrent users; shard when needed.

- **Load Handling:** Lazy-loading UI, backend load balancing.

- **Reliability:** 99.9% uptime with Vercel/Heroku; error fallback for API/AI failures.
