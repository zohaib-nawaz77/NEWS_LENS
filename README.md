NewsLens - AI-Powered News Website


NewsLens is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to deliver the latest news from various categories. It fetches real-time news using the NewsAPI, generates AI-powered summaries for articles using the Gemini API, and allows users to subscribe to daily news updates via email. The project aims to provide a seamless and informative news-reading experience.

Features
Real-Time News Fetching: Retrieve the latest news articles from NewsAPI based on categories (e.g., general, technology, sports).
AI-Generated Summaries: Click the "Summary" button on any article to get a concise summary powered by the Gemini API.
Email Subscriptions: Users can subscribe to receive daily news updates at 9:00 AM and 6:00 PM (Asia/Kolkata timezone) via email.
Responsive Frontend: Built with React for a modern and user-friendly interface (deployed on Vercel: https://the-news-lens.vercel.app).
Backend API: Powered by Express.js and Node.js with MongoDB for storing subscriber data.
CORS Support: Configured to allow requests from the deployed frontend.
Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB (via Mongoose)
APIs:
NewsAPI (for fetching news articles)
Gemini API (for AI-generated summaries)
Email Service: Nodemailer (using Gmail SMTP)
Scheduling: Third-party cron job service (e.g., Cron-Job.org) for daily news emails
Deployment:
Frontend: Vercel
Backend: Local (port 3001) or deployable to platforms like Heroku, Render, etc.
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14.x or higher)
MongoDB (local or cloud instance like MongoDB Atlas)
A Gmail account for Nodemailer (with an App Password if 2FA is enabled)
API keys for:
NewsAPI (API_KEY)
Gemini API (for summaries, add your key as GEMINI_API_KEY)
Installation
Clone the Repository
bash

Collapse

Wrap

Copy
git clone https://github.com/your-username/newslens-api.git
cd newslens-api
Install Dependencies
bash

Collapse

Wrap

Copy
npm install
Set Up Environment Variables Create a .env file in the root directory and add the following:
plaintext

Collapse

Wrap

Copy
API_KEY=your_newsapi_key
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
MONGODB_URI=your_mongodb_connection_string
Run the Server
bash

Collapse

Wrap

Copy
npm start
The server will run on http://localhost:3001.
Frontend Setup (Assumed separate repo)
Ensure your React frontend is configured to make API calls to http://localhost:3001 during development or to the deployed backend URL in production.
Usage
API Endpoints
GET /
Description: Home route.
Response: { "message": "Welcome.! This is Home Route!" }
GET /api/news
Description: Fetch latest news articles.
Query Parameters: category (optional, e.g., technology, sports, defaults to general)
Response: Array of news articles from NewsAPI.
POST /subscribe
Description: Subscribe an email for daily news updates.
Request Body: { "email": "user@example.com" }
Response:
Success: { "message": "You have subscribed successfully!", "email": "user@example.com" }
Error: { "message": "Email is required" } or { "message": "You are already subscribed!" }
GET /api/daily-news
Description: Trigger sending daily news emails to all subscribers (used by the cron job service).
Response: { "message": "Daily news sent successfully" }
Frontend Features
Browse news articles by category.
Click the "Summary" button on any article to view an AI-generated summary (powered by Gemini API).
Subscribe via the subscription form to receive daily news emails.
Email Subscriptions
Welcome Email: Sent immediately upon subscription with a branded welcome message.
Daily News Email: Sent to all subscribers at 9:00 AM and 6:00 PM (Asia/Kolkata) via a third-party cron job hitting the /api/daily-news endpoint.
Learning Experience: Solving the Serverless Cron Challenge
One challenge I encountered during development was scheduling daily news emails in a serverless environment. Initially, I used node-cron to schedule tasks within the Node.js server, but I discovered it doesn’t work reliably in serverless deployments (e.g., Vercel), where the server isn’t always running. This was a problem I’d never tackled before, and solving it helped me grow as a developer.

Solution: I created a dedicated endpoint (/api/daily-news) and offloaded the scheduling to a third-party service like Cron-Job.org. I configured it to hit the endpoint at 9:00 AM and 6:00 PM (Asia/Kolkata timezone). This approach decoupled the scheduling logic from the server, making it compatible with serverless architectures and more reliable for production use.

Project Structure
text

Collapse

Wrap

Copy
newslens-api/
├── config/
│   └── mongodb.js         # MongoDB connection setup
├── model/
│   └── subscriber.js     # Mongoose schema for subscribers
├── subscription.js       # Email logic (welcome and daily news)
├── server.js             # Main Express server
├── package.json          # Project metadata and dependencies
└── .env                  # Environment variables (not tracked)
Deployment
Backend: Deploy to a platform like Heroku, Render, or AWS. Update CORS origin in server.js to match your deployed frontend URL.
Frontend: Deployed on Vercel at https://the-news-lens.vercel.app.
Cron Jobs: Set up a third-party service (e.g., Cron-Job.org) to hit /api/daily-news at 9:00 AM and 6:00 PM (Asia/Kolkata). Example cron expression: 0 9,18 * * *.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.
License
This project is licensed under the ISC License.

Contact
For questions or feedback, reach out to me.
