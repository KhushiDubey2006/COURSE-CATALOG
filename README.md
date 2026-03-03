# Course Catalog System

## Overview

The Course Catalog System is a Full Stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to manage academic courses efficiently. The system provides complete CRUD functionality along with bookmarking, filtering, sorting, and dynamic UI updates.

This project demonstrates full-stack architecture, RESTful API development, database modeling, and modular frontend component design.

---

## Features

### Course Management (CRUD Operations)

- Create new courses with validation
- Retrieve and display all courses
- Update existing course details
- Delete courses with confirmation
- Maintain Active / Inactive course status
- Automatic `createdAt` and `updatedAt` timestamps using Mongoose

### Bookmark System

- Toggle bookmark status
- Persistent bookmark storage using a Boolean field (`isBookmarked`)
- Dedicated Bookmark page
- Dynamic calculation of total bookmarked credits

### Search, Filter and Sort

- Search courses by name
- Filter courses by department
- Sort courses by semester (ascending and descending)

### User Interface

- Responsive layout
- Loading state handling
- Empty state handling
- Clean UI using Tailwind CSS and DaisyUI
- Toast notifications using React Hot Toast

---

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- Lucide React
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

---

## System Architecture

Client (React Frontend)  
        ↓  
REST API (Express Backend)  
        ↓  
MongoDB Database  

The frontend communicates with the backend using RESTful APIs. The backend processes requests, applies business logic, and interacts with MongoDB using Mongoose models.

---

## CRUD Implementation

### Create
Courses are created using a `POST` request with required field validation before storing in MongoDB.

### Read
Courses are retrieved using `GET` requests and rendered dynamically in a structured card layout.

### Update
Course details are modified using `PUT` requests. The `updatedAt` field is automatically managed through Mongoose timestamps.

### Delete
Courses are permanently removed using `DELETE` requests after confirmation.

---

## API Endpoints

```
GET     /courses
GET     /courses/:id
POST    /courses
PUT     /courses/:id
DELETE  /courses/:id
PATCH   /courses/:id/bookmark
```

---

## Database Schema

Each course document includes:

- courseName (String)
- courseCode (String)
- program (String)
- department (String)
- semester (Number)
- credits (Number)
- courseType (String)
- courseStatus (String)
- isBookmarked (Boolean)
- createdAt (Date)
- updatedAt (Date)

---

## Project Structure

```
Course-Catalog/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── courseController.js
│   │   ├── models/
│   │   │   └── courseModel.js
│   │   ├── routes/
│   │   │   └── courseRoutes.js
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   └── CourseNotFound.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreatePage.jsx
│   │   │   ├── CourseDetailPage.jsx
│   │   │   └── BookmarkCoursePage.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Installation and Setup

### Backend Setup

```
cd backend
npm install
npm start
```

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## Learning Outcomes

- Full Stack MERN development
- REST API design and implementation
- Database schema modeling using Mongoose
- React state management
- Event handling and propagation
- Conditional rendering
- Dynamic UI updates without page reload
- Modular project structuring

---

## Author

Khushi Dubey