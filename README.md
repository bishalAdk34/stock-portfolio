
# Stock Portfolio App

A modern React-based stock portfolio management application with interactive charts, CRUD operations, and real-time portfolio tracking.

## Features

### 📊 Data Visualization
- **Line Chart**: Stock price trends over 30 days using Highcharts
- **Column Chart**: Trading volume and daily gain/loss analysis
- Interactive tooltips and smooth animations
- Responsive design for all screen sizes

### 💼 Portfolio Management
- View all stocks in a sortable, filterable table
- Display comprehensive stock metrics (ticker, company, quantity, prices, gains/losses)
- Global search functionality (search by ticker or company name)
- Column-based sorting (ascending/descending)

### ➕ Add/Edit/Delete Operations
- Add new stocks via modal form
- Edit existing stocks with pre-filled data
- Delete stocks with confirmation dialog
- Form validation using React Hook Form + Zod
- Real-time UI updates (optimistic updates)

### 💾 Data Persistence
- Automatic localStorage persistence
- Zustand state management
- Portfolio data persists across browser sessions

### 🎨 Responsive Design
- Mobile-first approach
- Responsive drawer navigation (hamburger menu on mobile)
- Adaptive layout for all screen sizes
- Material-UI styling

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server

### State Management & Data
- **Zustand** - State management with localStorage persistence
- **TanStack Query** - Data fetching and caching
- **TanStack Table** - Advanced table functionality

### UI & Styling
- **Material-UI (MUI) v7** - Component library
- **Emotion** - CSS-in-JS styling

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Charts
- **Highcharts** - Professional charting library
- **highcharts-react-official** - React wrapper

### Routing
- **React Router v7** - Client-side routing

## Prerequisites

Before running the application, ensure you have:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

Check your versions:
```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/bishalAdk34/stock-portfolio.git
cd stock-portfolio-app
```

2. **Install dependencies**
```bash
npm install
```

## Running the Application

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at:
- Local: `http://localhost:5173/` (or next available port)
- Network: Check terminal output for your machine's IP






