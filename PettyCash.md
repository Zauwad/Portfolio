Here is a comprehensive overview of the project designed for your portfolio. It is structured into clear sections (Overview, The Problem, System Features, Technical Architecture, and Deployment) so visitors can easily understand both the visual polish and the backend engineering depth.

---

# PettyCash – Multi-Tenant Operations & Requisition Platform

**🏆 Winner of 2nd Place at Cross-Company Hackathon (A Maze Venture, mYnt Connect, and Braincount)**

### 🔗 Project Links
[Live Demo](http://20.219.32.255) | [Client Codebase](#) | [Server Codebase](#)

---

## 📌 Project Overview
PettyCash is a full-stack, multi-tenant Operations Management System (OMS) built solo under hackathon time constraints. It automates two critical business workflows—Petty Cash Requisitions and Leave Approvals—across three sister companies. Instead of a basic prototype, PettyCash was engineered as a production-ready SaaS product featuring high-fidelity visual design, robust data isolation security, and a containerized cloud deployment.

---

## 🛑 The Problem
Before PettyCash, A Maze Venture, mYnt Connect, and Braincount managed office expense requests and employee leaves manually. This lack of digitization led to:
* **No audit trails**: Lost email threads and paper receipts made accounting checks tedious.
* **Approval delays**: Approvers (Team Leads, CEOs) had no centralized dashboard to review, delegate, or track requests.
* **Data fragmentation**: Running three different companies meant they needed isolated company data without the heavy infrastructure cost of maintaining three separate database servers.

---

## ✨ Core System Features

### 🎨 Custom UI/UX & Visual Polish
* **Dynamic Company Themes**: The entire user interface dynamically shifts its color palette and branding styles depending on which sister company the logged-in user belongs to, creating a unified yet distinct experience.
* **Aceternity Spotlight Backgrounds**: Animated spotlight beams sweep across the login and main layouts upon loading to create a premium, modern aesthetic.
* **Time-Aware Personalized Greetings**: The dashboard greets users dynamically based on their local time (e.g., *"Good morning, Zawad!"*) to provide a warm, welcoming home feel.
* **GSAP Micro-Animations**: Smooth, interactive transitions on dashboard cards, metrics, and data charts to make the experience feel highly responsive.

### ⚙️ Backend Logic & Security
* **Row-Level Multi-Tenancy**: Built a secure multi-tenant architecture using Django REST Framework on a shared database. Data is strictly isolated at the query level so users from A Maze Venture, mYnt Connect, and Braincount can never view or access cross-company records.
* **Approval Delegation Engine**: Features an Out-of-Office (OOO) delegation tracker. If a General Manager or the CEO is away, they can delegate their approval authority to a colleague dynamically.
* **Dynamic Approvals Stepper**: A visual timeline progress bar that updates in real-time, showing the exact approval status of a request (Team Lead -> CEO -> HR).
* **Physical Voucher Exports**: To ensure physical transparency for accounting departments, the system auto-generates a clean, printable PDF disbursement voucher on final payout.
* **Role-Scoped Audit Logging**: Tracks every operation. The activity feed is securely filtered based on role permission (e.g., CEOs see all company activity, Team Leads only see department activity, and regular employees have access blocked).

---

## 🛠️ Technical Architecture & Stack

### Frontend
* **React & Vite**: Quick build times and hot-module replacement for optimal development speed.
* **Tailwind CSS v4 & DaisyUI v5**: Used for building utility-first styling and a custom theme-switched dark mode design.
* **GSAP (GreenSock)**: Orchestrates micro-interactions and smooth layout animations.

### Backend
* **Django REST Framework (DRF)**: Powers the REST APIs, custom middleware, and authentication filters.
* **JWT (JSON Web Tokens)**: Used for secure, stateless user authentication.
* **SQLite**: Selected as a lightweight database engine, utilizing raw SQL logic and DRF filters.

### DevOps & Cloud
* **Docker & Docker Compose**: Containerized into two isolated services (Django backend running with **Gunicorn** + React frontend served by **Nginx** acting as a reverse proxy).
* **Docker Volumes**: Implemented file-persistence mapping to protect database state, static files, and media uploads during container lifecycle restarts.
* **Azure VM Deployment**: Deployed on an Ubuntu Azure virtual machine, configured with standard reboot policies (`restart: always`) for high availability.