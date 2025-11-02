🗓️ Google Calendar Clone — Fullstack Web Application
📘 Overview

This project is a high-fidelity fullstack clone of Google Calendar, built to replicate its core features — including event creation, editing, deletion, and dynamic calendar views — while ensuring a smooth, responsive, and interactive user experience.

The goal of this project is to demonstrate fullstack development skills by integrating a React frontend with a Node.js + Express backend and a SQL database for data persistence.

🎯 Objectives

Build a realistic and visually accurate Google Calendar clone.

Implement CRUD operations for calendar events (Create, Read, Update, Delete).

Deliver smooth transitions, modals, and event interactions.

Connect frontend and backend using RESTful APIs.

Maintain event data in a SQL database for persistence.

🧠 Features
Functionality	Description
🗓️ Calendar Views	Monthly, Weekly, and Daily views powered by FullCalendar.
➕ Add Events	Create new events by selecting a date or time range.
✏️ Edit Events	Click on an event to modify details such as title, description, start & end time, color, etc.
❌ Delete Events	Remove any existing event using the Delete button.
🔄 Drag & Drop	Move or resize events to adjust their schedule dynamically.
💾 Backend Sync	Events are stored and retrieved from a SQL database via Express APIs.
🎨 Smooth UI	Interactive modals, responsive design, and color customization for events.
🧩 Tech Stack
🖥️ Frontend

ReactJS (Vite)

FullCalendar (for views and interaction)

CSS3 (custom styles and modal design)

Axios (for API requests)

⚙️ Backend

Node.js + Express.js

SQLite / MySQL (SQL database for event storage)

CORS (to allow cross-origin requests)


<img width="1128" height="835" alt="image" src="https://github.com/user-attachments/assets/cf4ead06-21ad-47d0-9d6a-860b92179d45" />







🏗️ Project Structure
calendar-clone-final/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   └── events.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── components/
│   │   │   ├── CalendarView.jsx
│   │   │   └── EventModal.jsx
│   │   └── styles/
│   │       └── EventModal.css
│   ├── package.json
│
├── README.md
└── package.json

⚡️ How to Run the Project
🧭 Step 1: Clone the repository
git clone https://github.com/sucharithamalepati-2005/calendar-clone-final.git
cd calendar-clone-final

🖥️ Step 2: Setup Backend
cd backend
npm install
node server.js


The backend will start on http://localhost:5000

Make sure your database file (events.db) is automatically created or preloaded.

🌐 Step 3: Setup Frontend
cd ../frontend
npm install
npm run dev


The frontend will start on http://localhost:5173
 (Vite default)

🔗 Step 4: Verify Connection

The app will automatically fetch events from your backend and display them on the calendar.
You can now create, edit, delete, and drag events dynamically.

⚙️ API Endpoints
Method	Endpoint	Description
GET	/api/events	Fetch all events
POST	/api/events	Create a new event
PUT	/api/events/:id	Update an existing event
DELETE	/api/events/:id	Delete an event
💡 Business Logic Notes

Events are uniquely identified using their id.

Supports both all-day and timed events.

Dragging or resizing an event automatically updates the backend.

Validation ensures start and end dates are always valid.

🧠 Edge Cases Handled

Empty title or invalid date range validation.

Overlapping event handling through user adjustments.

Real-time updates without page reload after CRUD actions.

Color customization for event differentiation.

🎨 Animations & Interactions

Event modal opens with a smooth overlay.

Interactive buttons for save, cancel, and delete.

Dynamic calendar updates (via FullCalendar state refresh).


👩‍💻 Author

Sucharita Malepati
B.Tech (CSE - AI & ML), Bennett University
📧 Email: e22cseu0324@bennett.edu.in
