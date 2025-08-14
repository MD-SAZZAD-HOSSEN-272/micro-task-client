# MicroTasker - Client (Frontend)

MicroTasker is a microtasking web platform that connects task creators (Buyers) with task doers (Developers). This is the **frontend** of the application built with **React**, styled using **Tailwind CSS**, and powered by **React Query** and **Firebase Authentication**.

---

## ✨ Key Features

- 🔐 **Authentication & Authorization** (Firebase + Context API)
  - Email/Password login and Google OAuth
  - Role-based access (admin/buyer/developer)
- 🧠 **Dashboard** with custom views per user role
- 📋 **Task Management System**
  - Buyers post tasks
  - Developers see tasks and submit work
- 🧾 **Work Submission & Review**
  - Developers submit work with evidence
  - Buyers/admins can approve or reject
- 📤 **Image Upload via ImgBB**
- 📬 **Notification System**
  - Real-time pop-up notifications and in-database storage
- 🪙 **Coin-based Reward System**
  - Developers earn coins for approved tasks
- 🌐 **Fully Responsive UI**
  - Mobile-friendly navigation with dropdown on avatar
- ⚡ **React Query** for fetching and caching
- 🛡️ **Secure API calls** via custom `useAxiosSecure` hook

---


## 🚀 Getting Started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root with:

```
VITE_API_URL=https://your-vercel-server.vercel.app
VITE_IMGBB_KEY=your_imgbb_api_key
```

3. Start the development server:

```bash
npm run dev
```

4. Build the app:

```bash
npm run build
```

---

## 🔗 Important Links

- 🔗 [Vercel Live Client Site](https://micro-task-cd4b7.web.app/)
- 💻 [GitHub Repo](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MD-SAZZAD-HOSSEN-272)

---

## 📦 Dependencies

- react
- react-router
- axios
- react-query
- firebase
- tailwindcss

---

## 👨‍💻 Author

**Md. Sazzad Hossen**