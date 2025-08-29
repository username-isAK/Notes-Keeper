# 📒 Notes Keeper

**🔐 A Secure Cloud-Based Notes Manager**

Notes Keeper is a full-stack web application that allows users to securely create, manage, and organize their notes online. It supports features such as user authentication, dynamic note creation, point-wise descriptions, PDF export, search, and responsive design for both desktop and mobile devices.

---

## 🌐 Features

- **🪪 User Authentication**
  - Secure login and signup using JWT tokens.
  - Session persistence via local storage.
  - Users can delete their account, removing all associated notes.

- **📝 Notes Management**
  - Create, edit, and delete notes.
  - Add tags to notes for better organization.
  - Support for point-wise descriptions with automatic formatting.
  - Pin notes to top for quick access
  - Export as PDF

- **📱 Responsive Design**
  - Mobile-first layout using Bootstrap.
  - Navbar, notes, and forms adapt seamlessly to different screen sizes.
  - Dark mode support with preference saved in local storage.

---

## 🚀 Tech Stack

- **Frontend:** React.js, Bootstrap 5  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **PDF Generation:** jsPDF  

---

## 🔧 Additional Highlights

- **Security & Privacy**: Passwords hashed with bcrypt, authenticated access only.
- **RESTful API**: Full CRUD operations for notes and users.
- **State Management**: React Context API for seamless data flow.
- **Pinned Notes**: Always displayed at the top, across sessions.
- **Smooth UX**: Alerts, modals, and toggles for actions like delete, edit, and pin.

