# Global News Portal
A dynamic, full-stack digital newspaper platform built for modern content delivery. This application allows users to publish stories, categorize news, and manage content through a secure, role-based dashboard.

# Key Features
Role-Based Access Control: Secure separation between Admin users and standard contributors.

Dynamic Content Management: Full CRUD (Create, Read, Update, Delete) functionality for articles.

Secure Authentication: Integrated with Clerk for seamless user sign-in and management.

Role-Specific Actions: Advanced UI logic that restricts editing permissions to original authors while allowing Admins broader control.

Responsive News Feed: A masonry-style grid layout featuring a dynamic hero story and categorized sections.

Interactive Contact System: Integrated feedback form with Nodemailer for automated email delivery directly to the newsroom.

# Tech Stack
Framework: Next.js 15 (App Router)

Database: MongoDB and Cloudinary

Styling: Tailwind CSS & Shadcn UI

Authentication: Clerk

Email: Nodemailer

Deployment: Vercel

Icons: Lucide React

# Getting Started
## Prerequisites
Node.js (v18+)

Gmail Account (for Nodemailer)

Installation
Clone the repository:

Bash
https://github.com/ashiniaththanayaka/news_website.git
cd news_website

Install dependencies:

Bash
npm install

Configure environment variables (.env.local):
Create a .env.local file in the root directory and add:

Code snippet
MONGODB_URI=mongodb://sudheeradilum_db_user:IV438rJVOYt8wcXL@ac-gnfothg-shard-00-00.roemcee.mongodb.net:27017,ac-gnfothg-shard-00-01.roemcee.mongodb.net:27017,ac-gnfothg-shard-00-02.roemcee.mongodb.net:27017/?ssl=true&replicaSet=atlas-as873j-shard-0&authSource=admin&appName=newsCluster
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=diwszldgt
CLOUDINARY_API_KEY=449657574494586
CLOUDINARY_API_SECRET=KaiXsoX_fsK0WOnmqnF0CnL0_Ng

# Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJpbmctYmx1ZWdpbGwtMjQuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_cvxIYH39tFMur2zJHqjcx1W8e6fQ3X31r09jXE5s9A

ADMIN_EMAIL=sudheeradilum@gmail.com
EMAIL_USER=replace_your_email_after_signup_to_login_as_admin
EMAIL_APP_PASSWORD=vfxhuivnoftgzrcx

# Run the development server:

Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.
