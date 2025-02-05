# Blog Management System - MERN Stack (Admin)

Welcome to the Blog Management System, a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This README focuses specifically on the **Admin panel** of the system, which is developed using React.js, and allows administrators to manage blog posts. The backend (Express.js/Node.js) and the database (MongoDB) setup will be handled separately.

## 🚀 Features

### User Features:

- **User Registration & Login**: Users can register and log in to the platform to view blog posts.
- **Search Posts**: Users can search and browse through the blog posts. Each post displays the number of views it has.
- **Like Posts**: Users can like their favorite posts.
- **Comment on Posts**: Users can leave comments on posts they read.

### Admin Features:

- **Manage Categories**: Admins can create and manage categories for blog posts.
- **Manage Posts**: Admins have the ability to create, update, and delete posts.
- **Analytics**: Admins can view statistics, such as the total number of posts, likes, and comments.

## 🛠️ Technologies Used

- **FrontEnd**: ReactJs, Typescript
- **Backend (for reference)**: Node.js, Express.js, MongoDB (not included in this repository)
- **Styling**: Tailwind

## Installation & Setup

### Clone the repository

To get started with the project, first, clone the repository to your local machine using Git:

git clone https://github.com/devarsh281/Admin.git

## Install the required dependencies:

npm install

## Run the frontend server:

npm run dev

## 📥 Installation & Setup

### Clone the repository

To get started with the project, first, clone the repository to your local machine using Git:

git clone https://github.com/devarsh281/Admin.git

### 📝 Notes:

**Backend Integration**: This repository contains only the frontend. The backend (Node.js + Express) and database (MongoDB) services are not included here, but they are necessary for full functionality. You will need to set up the backend separately and ensure that the frontend is connected to it using appropriate API endpoints.

**Authentication**: The login and registration functionality will be connected to the backend's authentication system (e.g., JWT-based authentication). Ensure the backend server is running before trying to log in or interact with user-specific features.
