# Document Summarizer App

A powerful document summarization tool built with modern web technologies and AI integration.

## Video Demo
https://drive.google.com/file/d/1W65uqC5Keh-4_nvNPgEvnMHtfhvTmmzV/view?usp=sharing

## Live Demo
https://doc-summarizer-fullstack.vercel.app/


## Features

- **Document Upload**: Support for various file formats including PDF, DOCX, and TXT.
- **AI-Powered Summarization**: Utilizes Gemini AI for accurate and concise document summarization.
- **User Authentication**: Secure login and registration system using JWT.
- **Responsive Design**: Fully responsive interface for seamless use across devices.
- **API Integration**: RESTful API endpoints for easy integration with other applications.
- **History Tracking**: Users can view and manage their summarization history.
- **Customizable Summaries**: Options to adjust summary length and focus areas.

## Technologies Used

- **Frontend**:
  - Next.js
  - Tailwind CSS
  - React
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - PostgreSQL
  - Supabase (for real-time features and storage)
- **ORM**:
  - Prisma
- **Authentication**:
  - JSON Web Tokens (JWT)
- **AI Integration**:
  - Gemini AI


## Local Installation

Follow these steps to set up the project locally for development:

### Frontend Setup

1. Clone the repository: git clone https://github.com/AryanChopraa/doc-summarizer-fullstack
2. Navigate to the frontend directory: cd document-summarizer-fullstack/frontend
3. Install dependencies: npm i 
4. Set up environment variables:
- Create a `.env.local` file in the frontend directory
- Add the following variable:
  NEXT_PUBLIC_API_URL=''

5. Start the development server: npm run dev

### Backend Setup

1. Open a new terminal and navigate to the backend directory:cd document-summarizer-fullstack/backend
2. Install dependencies: npm i 
3. Set up environment variables:
- Create a `.env` file in the backend directory
- Add the following variables:
  ```
  JWT_SECRET=your_jwt_secret_key
  DATABASE_URL=your_postgres_database_url
  DIRECT_URL=your_direct_database_url
  GEMINI_API_KEY=your_gemini_ai_api_key
  FRONTEND_URL=''
  ```
  

4. Run database migrations: npx prisma migrate deploy
5. Modify the `authController.js` file:
- Locate the login function and update the `res.cookie()` call: (For running it locally else skip)

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  });


- Locate the logout function and update the `res.clearCookie()` call:

  res.clearCookie('token', {
    httpOnly: true
  });


6. Start the server: nodemon server.js

After completing these steps, your local development environment should be set up and running.

Live Demo : https://doc-summarizer-fullstack.vercel.app/

Video Demo : https://drive.google.com/file/d/1W65uqC5Keh-4_nvNPgEvnMHtfhvTmmzV/view?usp=sharing







