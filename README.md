# 📘 DSA Sheet Question Progress Tracker

A single-page web app built to help users **track their progress** while solving questions from **Striver’s DSA Sheets (200 & 400 sheets)**.  
The project is built with **Angular** for the frontend and uses **Firebase** as a backend database to store user progress.  
It’s lightweight, fully client-side, and requires **no authentication or backend server** — just your Firebase configuration.

---

## 🚀 Features

- ✅ All questions and sections from **Striver’s DSA Sheet 200** and **Striver’s DSA Sheet 400**
- 📊 Track solved/unsolved questions in real-time
- 🔄 Data stored securely in your **own Firebase Realtime Database**
- 💾 Saves Firebase config locally so you only enter it once
- 🌐 Fully deployed and accessible online via **Github Pages**
- ⚡ Built with **Angular** for fast and reactive UI

---

## 🧠 How It Works

1. On your first visit, you’ll be prompted to enter your **Firebase configuration**.
2. Your config will be saved **locally** in your browser.
3. As you mark questions as solved, progress is stored in **your Firebase database**.
4. Your progress persists even after reload or browser close.

---

## 🛠️ Tech Stack

| Component     | Technology Used |
|----------------|-----------------|
| **Frontend**   | Angular |
| **Database**   | Firebase Realtime Database |
| **Hosting**    | GitHub Pages |
| **Language**   | TypeScript, HTML, CSS |

---

## 🧩 Firebase Setup

You’ll need to create a Firebase project if you don’t have one.

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Click **Add Project**
- Set up a new **Realtime Database**

### 2. Get Firebase Config
- Go to **Project Settings → Your Apps → SDK setup and configuration**
- Copy the Firebase config object. It should look like this:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  databaseURL: "https://YOUR_DATABASE_URL.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
