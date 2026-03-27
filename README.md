# 🚀 Revadoo8: The Ultimate Gamified Platform

Welcome to the official repository for **Revadoo8**, a modern, high-performance platform designed for gamified earning and learning. This project is built with a focus on premium user experience, robust backend logic, and scalable architecture.

---

## 📖 Table of Contents
1. [Overview](#-overview)
2. [Tech Stack](#%EF%B8%8F-tech-stack)
3. [Getting Started](#-getting-started)
4. [User Dashboard: Deep Dive](#-user-dashboard-deep-dive)
5. [React Theory for Beginners](#-react-theory-for-beginners)
6. [Design Philosophy](#-design-philosophy)
7. [Architecture & Data Flow](#-architecture--data-flow)

---

## 🌟 Overview
Revadoo8 allows users to participate in quizzes, complete tasks, and earn rewards through a virtual wallet system. It features separate dashboards for **Users** (for participation and earnings) and **Admins** (for management and oversight).

---

## 🛠️ Tech Stack
This project uses the **MERN** (MongoDB, Express, React, Node) stack with modern enhancements:

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion (Animations), Recharts (Data Visualization).
- **Backend**: Node.js, Express 5, MongoDB with Mongoose 9.
- **Security**: JSON Web Tokens (JWT) & Bcryptjs.
- **Storage/CMS**: Sanity (for content management) and Multer (for file uploads).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account or local MongoDB instance.

### 2. Backend Setup
```bash
cd Backend
npm install
npm run dev   # Starts server with nodemon
```

### 3. Frontend Setup
```bash
# In the root directory
npm install
npm run dev   # Starts Vite development server
```

---

## 🖥️ User Dashboard: Deep Dive
The User Dashboard is the heart of Revadoo8. It is designed to be **informative, interactive, and visually stunning.**

### Key Components:
- **Stats System**: A dual-view system (`StatsLeft` & `StatsRight`) that fetches live data (Earnings, Tasks, Referrals) and visualizes it in real-time using dynamic bar charts.
- **Quick Actions**: A premium navigation hub featuring interactive buttons for Games, Wallet (Deposit/Withdraw), and Ads.
- **Wallet Integration**: A complex financial module that tracks credits, manages transactions, and handles withdrawal requests.

---

## ⚛️ React Theory for Beginners
If you're learning React through this project, here are the key concepts we used:

### A. Components
Everything you see is a "LEGO block" called a component. For example, the `StatCard` is a reusable component used 4 times on the dashboard.

### B. Props (Properties)
We pass information from a parent component to a child using **Props**.
*   *Example*: The Dashboard sends the number of points to the `StatCard` via a prop.

### C. State & Hooks
- **`useState`**: Used to remember information that changes (like which tab is selected).
- **`useEffect`**: Used for "side effects," like fetching your wallet balance from the server as soon as the page loads.

---

## 🎨 Design Philosophy
We follow a **"Premium & Modern"** design approach using Tailwind CSS:

- **Glassmorphism**: Using transparent backgrounds and blur effects for a futuristic look.
- **Micro-Animations**: Transitions and hover effects powered by Framer Motion to make the UI feel reactive.
- **Mobile-First**: The entire dashboard is fully responsive, switching between 2-column and 4-column layouts depending on whether you're on a phone or a laptop.

---

## 🔄 Architecture & Data Flow
1. **Frontend Action**: A user clicks "Start Quiz".
2. **API Call**: React sends a request to the Node.js API using `Axios`.
3. **Backend Processing**: The Express server validates the user's token and fetches the quiz from MongoDB.
4. **Data Delivery**: The server sends the quiz data back as JSON.
5. **UI Update**: React updates the state, and the quiz appears instantly without refreshing the page.

---

### 💡 Need Help?
Check out the specific implementation files in `src/pages/userdashboard` or contact the technical lead.
