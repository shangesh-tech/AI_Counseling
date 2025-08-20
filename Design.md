### Project Overview
This is an AI counseling web application for 12th-grade students to select universities. It uses React for the frontend, Node.js for the backend, and Groq Cloud SDK for AI features.

### Features
1. **Onboarding:** Students input skills, knowledge, interests, and passions.
2. **Job Interest:** Suggests top future jobs based on trends.
3. **Eligibility Checker:** Checks eligibility using 12th marks, SAT, and JEE.
4. **Course/University Selector:** Recommends courses and universities.
5. **Roadmap/Resources:** Provides learning timelines and free/paid resources.
6. **AI Voice Agent:** Offers real-time voice assistance.

### Tech Stack
- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **AI:** Groq Cloud SDK
- **Database:** MongoDB
- **Deployment:** Vercel/Heroku

### Architecture Overview
- **Client-Side (React):** Handles UI with forms, dashboards, and voice input, making API calls to the backend.
- **Server-Side (Node.js):** Manages RESTful APIs, processes data, and integrates with Grok SDK.
- **Database (MongoDB):** Stores student profiles, universities, and resources.
- **External Service (Groq SDK):** Provides AI-driven insights and voice processing.

### Database Models and Relationships in MongoDB

- **Student Model**
  - Fields: `_id`, `name`, `skills` (array), `knowledge` (array), `interests` (array), `passions` (array), `marks` (number), `exams` (object: {sat: number, jee: number}), `jobPreferences` (array)
  - Relationships: None (standalone collection).

- **University Model**
  - Fields: `_id`, `name`, `courses` (array), `eligibilityCriteria` (object: {marks: number, sat: number, jee: number}), `location`
  - Relationships: None (standalone), but linked via `RecommendationEngine` logic.

- **Resource Model**
  - Fields: `_id`, `course`, `type` (string: "paid" or "free"), `link` (string), `description`
  - Relationships: Linked to `University.courses` via `course` field.

- **Relationships:**
  - Student data is used by `RecommendationEngine` to query `University` collection.
  - `Resource` documents are fetched based on `University.courses` selected.

### Performance Overview
- **Latency:** API responses should be under 2 seconds, optimized by caching frequent queries (e.g., university data) in Node.js.
- **Scalability:** MongoDB handles up to 1,000 concurrent users; scale with sharding if needed.
- **Load:** Frontend optimized with lazy loading; backend uses load balancing on Heroku.
- **Reliability:** 99.9% uptime with Vercel deployment; error handling for API failures.
