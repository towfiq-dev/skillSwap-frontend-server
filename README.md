<div align="center">

# 🎯 SkillSwap — Frontend

### A Modern Freelancing Marketplace Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 📌 Project Overview

**SkillSwap** is a fully featured freelancing marketplace web application where clients can post tasks and freelancers can submit proposals to win those projects. Similar to platforms like Fiverr or Upwork, SkillSwap bridges the gap between skilled freelancers and clients looking to get work done — all in one place.

---

## 🎯 Purpose

This platform was built to:

- Connect skilled freelancers with clients who need work done
- Simplify work transactions through secure online payments
- Create a trustworthy and transparent working environment
- Digitally support and grow the freelancing economy

---

## 👥 Who Is It For?

| User | Role |
|---|---|
| 🧑‍💼 **Client** | Posts tasks, reviews proposals, and hires freelancers |
| 👨‍💻 **Freelancer** | Sells their skills, submits proposals, and earns from projects |
| 🛡️ **Admin** | Manages and monitors the entire platform |

---

## ✨ Key Features

### 🏠 Homepage
- Attractive hero banner section
- Latest featured tasks display
- Top-rated freelancers showcase
- Smart workflow guide
- Step-by-step "How SkillSwap Works" section
- Category browsing section

### 🔐 Authentication System
- Email & password registration / login
- **Google OAuth** social login
- Forgot password / reset functionality
- JWT-based session management via **Better Auth**
- Blocked user guard (auto-detection and logout)

### 📋 Task Browsing
- Filter and search all open tasks
- Detailed task view (budget, category, deadline)
- Proposal submission form for freelancers

### 👤 Freelancer Browsing
- Browse all registered freelancers
- Individual freelancer profile pages
- Ratings, skills, and completed task statistics

### 🧑‍💼 Client Dashboard
- Post new tasks
- Manage all posted tasks (edit / delete)
- Review incoming proposals for each task
- **Accept** or **Reject** proposals
- Pay freelancers via **Stripe Checkout**
- Client statistics overview (total tasks, spending, active work)

### 👨‍💻 Freelancer Dashboard
- Browse available tasks and submit proposals
- Track proposal statuses
- Manage active projects
- **Submit deliverables** for completed work
- View earnings and payment history
- Update profile (skills, bio, hourly rate, etc.)

### 🛡️ Admin Dashboard
- Full user management (block / unblock users)
- View and delete any task on the platform
- Monitor all payment history
- Platform-wide statistics overview

### 💳 Payment System
- **Stripe Checkout** integration
- Payment success and cancel pages
- Task automatically marked as "paid" after successful payment

### ⚙️ Settings & Profile
- Update personal information (name, photo, bio)
- Set freelancer skills and hourly rate
- Manage account settings

---

## 🛠️ Tech Stack

### Core Framework & Libraries

| Technology | Version | Usage |
|---|---|---|
| **Next.js** | 16.2.9 | React framework, SSR, App Router |
| **React** | 19.2.4 | UI library |
| **Tailwind CSS** | v4 | Styling |
| **Framer Motion** | 12.x | Animations |
| **HeroUI** | 3.x | UI component library |

### Authentication & Database

| Technology | Usage |
|---|---|
| **Better Auth** | Email+password and Google OAuth authentication |
| **JWT (jose)** | Token-based session management |
| **MongoDB** | Database (Atlas Cloud) |

### Payments & Icons

| Technology | Usage |
|---|---|
| **Stripe.js** | Payment gateway integration |
| **Lucide React** | Icon library |
| **React Icons** | Additional icon set |
| **Iconify** | Dynamic icons |

### Notifications & Charts

| Technology | Usage |
|---|---|
| **React Hot Toast** | Toast notifications |
| **React Toastify** | Notification system |
| **Recharts** | Data visualization charts |

---

## 📁 Folder Structure

```
skillSwap-frontend-server/
├── public/                     # Static files (logos, images)
├── src/
│   ├── app/
│   │   ├── api/auth/           # Better Auth API routes
│   │   ├── browse-freelancers/ # Freelancer browsing page
│   │   │   └── [id]/           # Freelancer profile details
│   │   ├── browse-tasks/       # Task browsing page
│   │   │   └── [id]/           # Task details & proposal form
│   │   ├── contact/            # Contact page
│   │   ├── dashboard/
│   │   │   ├── admin/          # Admin dashboard
│   │   │   │   ├── payments/   # Payment management
│   │   │   │   ├── tasks/      # Task management
│   │   │   │   └── users/      # User management
│   │   │   ├── client/         # Client dashboard
│   │   │   │   ├── proposals/  # Proposal review
│   │   │   │   └── tasks/      # Task management
│   │   │   └── freelancer/     # Freelancer dashboard
│   │   │       ├── earnings/   # Earnings page
│   │   │       ├── profile/    # Profile management
│   │   │       ├── projects/   # Active projects
│   │   │       └── proposals/  # Proposal tracking
│   │   ├── forgetPassword/     # Password reset page
│   │   ├── login/              # Login page
│   │   ├── payment/
│   │   │   ├── success/        # Payment success page
│   │   │   └── cancel/         # Payment cancel page
│   │   ├── profile/            # Public profile page
│   │   ├── settings/           # User settings
│   │   ├── signup/             # Registration page
│   │   └── unauthorized/       # Unauthorized access page
│   ├── components/
│   │   ├── homepage/           # Homepage section components
│   │   │   ├── Banner.jsx
│   │   │   ├── BrowseCategories.jsx
│   │   │   ├── SkillSwapHowItWorks.jsx
│   │   │   └── SmartWorkflow.jsx
│   │   ├── NavBar.jsx          # Navigation bar
│   │   ├── Footer.jsx          # Footer
│   │   ├── FeaturedTasks.jsx   # Featured task cards
│   │   ├── TopFreelancers.jsx  # Top freelancers section
│   │   ├── DashboardSideBar.jsx # Dashboard sidebar
│   │   ├── BlockedUserGuard.jsx # Blocked user protection
│   │   ├── EditTaskModal.jsx   # Task edit modal
│   │   └── DeleteTaskAlert.jsx # Task delete confirmation
│   └── lib/
│       ├── auth.js             # Better Auth configuration
│       └── auth-client.js      # Client-side Auth helper
└── next.config.mjs             # Next.js configuration
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js (v18 or above)
- npm or yarn
- MongoDB Atlas account
- Google OAuth credentials
- Stripe account (test keys)


## 🌐 Page Routes

| Route | Description | Access |
|---|---|---|
| `/` | Homepage | Public |
| `/login` | Login page | Public |
| `/signup` | Registration page | Public |
| `/forgetPassword` | Password reset | Public |
| `/browse-tasks` | All tasks listing | Public |
| `/browse-tasks/[id]` | Task details | Public |
| `/browse-freelancers` | Freelancer listing | Public |
| `/browse-freelancers/[id]` | Freelancer profile | Public |
| `/contact` | Contact page | Public |
| `/dashboard/client` | Client dashboard | Client only |
| `/dashboard/freelancer` | Freelancer dashboard | Freelancer only |
| `/dashboard/admin` | Admin dashboard | Admin only |
| `/settings` | Account settings | Logged-in users |
| `/payment/success` | Payment success page | Logged-in users |
| `/payment/cancel` | Payment cancel page | Logged-in users |

---

## 🔒 Security

- **JWT Token Verification** — every protected request validates the token
- **Role-based Access Control** — separate access levels for client, freelancer, and admin
- **Blocked User Guard** — blocked users are automatically logged out
- **HTTP-only Cookies** — sessions stored securely
- **Google OAuth** — trusted third-party authentication

---

Make sure to add all environment variables in the Vercel dashboard before deploying.

---

## 🤝 Contributing

1. **Fork** this repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

---

<div align="center">

**SkillSwap** — Sell your skills. Find the best talent. 🚀

*Made with ❤️ using Next.js & React*

</div>
