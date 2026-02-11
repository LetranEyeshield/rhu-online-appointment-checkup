# 🏥 RHU Manaoag Online Appointment System

An online appointment booking system for a Rural Health Unit (RHU) built using **Next.js**, **TypeScript**, and **MongoDB Atlas**.

This system allows patients to book check-up appointments by selecting an available date and time slot while automatically preventing booking on weekends, past dates, and holidays.

---

## 🚀 Live Features

- 📅 Interactive Date Picker (React Day Picker)
- ❌ Automatically disables:
  - Past dates
  - Saturdays & Sundays
  - Holidays
- ⏰ Dynamic time slot availability
- 🎫 Auto-generated Appointment Code
- 📱 Fully responsive (mobile-friendly)
- 🧾 Printable Appointment Ticket
- 🔔 Toast notifications for feedback
- 🌐 Clean UI with Tailwind CSS

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB Atlas
- **HTTP Client:** Axios
- **Date Picker:** react-day-picker
- **Notifications:** react-hot-toast

---

## 📸 Screens Included

- Home Page
- Appointment Form
- Date & Time Slot Selection
- Success / Ticket Modal
- Mobile Responsive View

---

## 🧠 How It Works

### 1️⃣ Date Selection
- Loads automatically on page load
- Defaults to today's date
- Disables weekends, holidays, and past dates

### 2️⃣ Time Slot Selection
- Slots are fetched from backend
- Fully booked slots are disabled
- Available count is displayed beside each slot

### 3️⃣ Appointment Booking
- Generates a unique appointment code
- Saves booking to MongoDB
- Displays confirmation modal
- Allows print or screenshot

---

## 📂 Project Structure

app/
├── appointment/
│ └── page.tsx
├── components/
│ ├── Header.tsx
│ ├── Banner.tsx
│ └── Footer.tsx
├── lib/
│ └── axios.ts
└── page.tsx



