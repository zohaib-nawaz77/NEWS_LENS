# NewsLens - AI-Powered News Website

![NewsLens Logo](https://via.placeholder.com/150) <!-- Replace with your actual logo if you have one -->

NewsLens is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to deliver the latest news from various categories. It fetches real-time news using the [NewsAPI](https://newsapi.org/), generates AI-powered summaries for articles using the Gemini API, and allows users to subscribe to daily news updates via email. The project aims to provide a seamless and informative news-reading experience.

## Features

- **Real-Time News Fetching**: Retrieve the latest news articles from NewsAPI based on categories (e.g., general, technology, sports).
- **AI-Generated Summaries**: Click the "Summary" button on any article to get a concise summary powered by the Gemini API.
- **Email Subscriptions**: Users can subscribe to receive daily news updates at 9:00 AM and 6:00 PM (Asia/Kolkata timezone) via email.
- **Responsive Frontend**: Built with React for a modern and user-friendly interface (deployed on Vercel: [https://the-news-lens.vercel.app](https://the-news-lens.vercel.app)).
- **Backend API**: Powered by Express.js and Node.js with MongoDB for storing subscriber data.
- **CORS Support**: Configured to allow requests from the deployed frontend.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **APIs**: 
  - [NewsAPI](https://newsapi.org/) (for fetching news articles)
  - Gemini API (for AI-generated summaries)
- **Email Service**: Nodemailer (using Gmail SMTP)
- **Scheduling**: Third-party cron job service (e.g., [Cron-Job.org](https://cron-job.org/)) for daily news emails
- **Deployment**: 
  - Frontend: Vercel
  - Backend: Local (port 3001) or deployable to platforms like Heroku, Render, etc.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance like MongoDB Atlas)
- A Gmail account for Nodemailer (with an App Password if 2FA is enabled)
- API keys for:
  - [NewsAPI](https://newsapi.org/) (`API_KEY`)
  - Gemini API (for summaries, add your key as `GEMINI_API_KEY`)

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/newslens-api.git
   cd newslens-api
