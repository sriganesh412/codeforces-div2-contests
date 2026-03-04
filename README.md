# Codeforces Div 2 Contests Tracker

A simple, fast, and production-ready React web application to track your progress in Codeforces Division 2 contests. It lists the 100 most recent Div. 2 contests and allows you to enter your Codeforces handle to instantly see which problems (A, B, C, D) you have successfully solved.

## 🌟 How This Can Be Helpful

This tool was designed specifically for competitive programmers who focus on Codeforces Division 2 contests to improve their rating and problem-solving skills. 

- **Targeted Upsolving**: Instantly identify which problems you missed in past contests. Instead of scrolling through Codeforces pages, you get a clean matrix showing exactly what you need to work on.
- **Visual Progress Tracking**: Seeing a grid of green, solved problems is highly motivating. You can use this to set specific goals (e.g., "I want to make sure I've solved every A and B problem from the last 20 contests").
- **Time Saving**: Fetches your submissions and maps them to recent contests in seconds, giving you a top-down view of your performance instantly.
- **Seamless Experience**: Remembers your handle locally so you don't have to re-enter it every time you want to check your progress.

## ✨ Features

- **Live Data**: Fetches real-time data from the official [Codeforces API](https://codeforces.com/apiHelp).
- **Production Grade Codebase**: Written entirely in TypeScript for reliability, with properly abstracted API layers.
- **Modern UI Feedback**: Interactive loading states, clean error handling, and beautiful modern toast notifications via [Sonner](https://sonner.emilkowal.ski/).
- **Persistent State**: Automatically remembers your Codeforces handle on return visits using `localStorage`.

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codeforces-div2-contests
```

2. Install the dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will be running at `http://localhost:3000`.

### Building for Production

To create an optimized production build, run:
```bash
npm run build
```
The optimized files will be generated in the `build` directory, ready to be deployed.

## 🛠️ Tech Stack

- **React** (Bootstrapped with Create React App)
- **TypeScript**
- **Axios** (Data fetching)
- **Sonner** (Toast notifications)
- **CSS** (Custom styling)
