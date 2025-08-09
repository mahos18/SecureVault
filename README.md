# 📦 SecureVault

> **Your Personal Digital Safe — Encrypted, Secure, and Accessible Anywhere.**  
> Store passwords, notes, and other sensitive data with AES encryption and access them from any device.

![Vercel Deploy](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ Features
- 🔒 **AES-256 Encryption** – All vault data is encrypted before storage.  
- 🗂 **Organized Vault** – Store passwords, links, and notes.  
- 📄 **Copy to Clipboard** – Instantly copy decrypted data.  
- 📝 **Edit & Delete** – Manage vault items easily.  
- 🎨 **Responsive UI** – TailwindCSS + smooth animations.  
- 🔑 **JWT Auth** – Secure login/register.  
- 🌍 **Cross-Platform** – Access from anywhere.

---

## 🎥 Preview
> *(Replace with your GIF or screenshot collage)*  
![App Preview](https://via.placeholder.com/900x450?text=SecureVault+Preview)

---

## 🛠 Tech Stack

**Frontend**  
- React (Vite) ⚡  
- Tailwind CSS 🎨  
- Axios 🌐  

**Backend**  
- Node.js 🚀  
- Express.js 🌉  
- MongoDB + Mongoose 🍃  
- CryptoJS (AES Encryption) 🔐  
- JWT Authentication 🛡  

**Deployment**  
- **Frontend** → Vercel  
- **Backend** → Render / Railway  

---

## 📂 Folder Structure
SecureVault/
│
├── backend/ # Node.js + Express API
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ └── routes/
│
├── frontend/ # React + Vite app
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ └── App.jsx
│
└── README.md

---

## ⚡ Local Setup

### 1️⃣ Clone Repo
```bash
git clone https://github.com/mahos18/SecureVault.git
cd SecureVault

cd backend
npm install
