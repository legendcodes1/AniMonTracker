🌸 Anime & Manga Tracker
A full-stack CRUD application that lets users log in and track anime/manga titles they've watched or read — including genre, chapters, rating, and status. Built with React, Express.js, Supabase, and PostgreSQL.

✅ Live demo coming soon on Vercel

📸 Screenshots
Home Page (Logged In)	Add New Entry	Postman Testing	Supabase ERD
Insert screenshot	Insert screenshot	Insert screenshot	Insert screenshot of Supabase ERD

📘 Features
🔐 User Authentication via Supabase Auth

🧾 Create, Read, Update, Delete (CRUD) your personal anime/manga entries

🎯 Users only see their own tracked titles (data is scoped per user)

🖼️ Uploads include name, genre, chapters, rating, image URL, and status

⚡ Fast & responsive React frontend with dynamic modals

🔧 Tech Stack
Frontend	Backend	Database	Auth
React	Express.js	PostgreSQL via Supabase	Supabase Auth

📐 Entity Relationship Diagram (ERD)
Supabase automatically manages database schemas. Here's the actual ERD used:
<img width="1225" height="687" alt="image" src="https://github.com/user-attachments/assets/5adaea3a-fde9-49f4-9a6b-520e51b12fec" />


📮 API Routes (Express Backend)
Route	Method	Description	Auth Required
/register	POST	Register new user (via Supabase)	❌
/login	POST	Log in user (get token)	❌
/mangas	GET	Fetch all entries for current user	✅
/mangas/:id	PUT	Update entry	✅
/mangas/:id	DELETE	Delete entry	✅
/mangas	POST	Add new manga/anime	✅

🧪 Postman Tests
I've included Postman screenshots testing all core routes:

✅ Register

✅ Login

✅ Create new manga

✅ Get logged-in user’s manga list

✅ Update manga

✅ Delete manga

Insert Postman screenshots here

🛠 How to Run Locally
🔹 Prerequisites
Node.js (v18+)

Supabase project (free tier)

Vercel account (optional for deploy)

🔸 Backend Setup
bash
Copy
Edit
cd backend
npm install
# Add your Supabase keys to .env
npm run dev
.env example:

ini
Copy
Edit
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_ANON_KEY=...
🔸 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
App should now be running at http://localhost:5173

🔸 Deploy (Vercel)
Push frontend to GitHub

Connect repo to vercel.com

Set frontend environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

Deploy 🎉

✍️ What I Learned or applied
This project helped me:

🔐 Learn and apply authentication using Supabase Auth

📦 Created a simple Express.js backend with secure routes

🔄 Implemented full CRUD operations 

🎨 Build a focused and niche UI/UX for anime/manga fans

🧠 Understand user-based data isolation (foreign keys, access control)

🧪 Use Postman for API testing

🗃️ Use Supabase as a lightweight but powerful hosted PostgreSQL database

📚 Future Improvements
Add search and filter by genre, status, or rating

Support for image uploads

Add light/dark mode toggle

Let users track both anime and manga separately
