# Smart Leads Dashboard

A **full-stack Lead Management Dashboard** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) using **TypeScript**.  
This dashboard allows users to manage leads efficiently, with authentication, role-based access, filtering, pagination, CSV export, and more.

---

##  Tech Stack

- **Frontend:** React.js, TypeScript, TailwindCSS  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, bcrypt  
- **Other Tools:** Docker (setup ready), CSV Export  

---

##  Features

### Authentication
- JWT-based authentication
- User registration and login
- Password hashing with bcrypt
- Role-based access (Admin / Sales User)
- Protected routes

### Leads Management (CRUD)
- Add, update, delete, and view leads
- Lead fields: Name, Email, Status (New / Contacted / Qualified / Lost), Source (Website / Instagram / Referral), Created At
- Single lead view

### Advanced Filtering & Search
- Filter by Status or Source
- Search by Name or Email (debounced)
- Sort by Latest / Oldest
- Multiple filters can work together

### Pagination
- Backend pagination (10 records per page)
- Pagination metadata included in API responses

### UI & UX
- Responsive design
- Reusable components
- Loading states, empty states, and error handling
- Form validation

Create a .env file in the backend folder using .env.example as reference:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

### Additional Features
- CSV export of leads
- Docker setup ready
- Dark mode support (bonus)

---
