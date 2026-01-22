Employee Leave & Attendance Management System
📌 Project Overview

The Employee Leave & Attendance Management System is a full-stack web application designed to manage employee leave requests and daily attendance efficiently.
It provides role-based access for Employees and Admins.

🔹 Key Features
Employee

●Employee registration & login
●Apply for leave (Casual, Sick, Paid)
●View leave history & leave status
●Mark daily attendance (Present / Absent)
●View attendance history
●View leave balance summary

Admin
●Admin login
●View all employees
●Approve / Reject leave requests
●View attendance of all employees
●Filter attendance by employee or date
●Monitor overall leave & attendance records

🛠️ Tech Stack & Justification

Frontend
●React.js – Component-based UI, fast rendering
●React Router DOM – Client-side routing
●Axios – API communication
●CSS – Custom styling for forms, dashboard, tables

Backend
●Node.js – JavaScript runtime
●Express.js – RESTful API framework
●JWT (JSON Web Token) – Secure authentication
●bcryptjs – Password hashing

Database
●MongoDB – NoSQL database, flexible schema
●Mongoose – ODM for MongoDB, schema validation

Why This Stack?
●MERN stack is scalable, widely used in industry
●Easy separation of frontend & backend
●Suitable for role-based systems and dashboards

⚙️ Installation Steps
1️⃣ Clone the Repository
●git clone <repository-url>
●cd Employee-Leave-Attendance-Management-System

2️⃣ Backend Setup
●cd backend
●npm install


Create .env file:
●MONGO_URI=mongodb://localhost:27017/HRSystem
●JWT_SECRET=supersecretkey
●PORT=5000
●HOST="localhost"


Run backend:
nodemon index.js

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173


Backend runs on:
http://localhost:5000

ADMIN LOGIN :
Email : Admin01@gmail.com
Password : 1234



🔐 Environment Variables

Variable	Description
PORT	    Backend server port
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT authentication

🔗 API Endpoints

🔹 Authentication

Method	Endpoint	                Description
POST	/api/employee/register	    Employee registration
POST	/api/employee/login	        Employee login
POST	/api/admin/adminlogin	    Admin login

🔹 Leave Management

Method	Endpoint	                Description
POST	/api/leave/apply	        Apply for leave
GET	    /api/leave/employee/:id	    Get employee leaves
GET	    /api/admin/leaves	        Get all leave requests
PUT	    /api/admin/leave/:id	    Approve / Reject leave
DELETE	/api/leave/:id	            Delete leave request

🔹 Attendance

Method	Endpoint	                    Description
POST	/api/attendance/mark	        Mark attendance
GET	    /api/attendance/employee/:id	Employee attendance
GET	    /api/admin/attendance	        All attendance records

🔹 Dashboard

Method	Endpoint	                    Description
GET	    /api/empdashboard/:id	    Employee dashboard data

🤖 AI Tools Declaration

ChatGPT
Used for:
●Code debugging
●UI/UX improvements
●Styling part & alignment 
●Error resolution guidance

Time Spent
Approx. 20 ~ 23hrs

●Backend API's : 12 hours
●Frontend UI & logic : 6 hours
●Debugging & testing : 5 hours

Conclusion 

This project demonstrates 

●Full-Stack MERN development
●Role-based authentication
●Real-world HR use case
●Clean REST API design
