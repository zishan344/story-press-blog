Task
Build a simple application using Next.js (App Router). The app should have public and protected pages with authentication using NextAuth.js or any other Auth Service.
You can choose any idea to implement the task, e.g., event management, course management, eCommerce, blog, etc., or any of your custom ideas.
Focus on polished UI, responsiveness, and layout consistency. Functionality can be minimal, but must include the protected page and login.

1. Landing Page
   Must include 7 sections:
   Navbar – logo, 4+ routes, login/register, sticky, responsive
   After login, show a dropdown with:
   Logged-in user info (replacing login/register)
   Add Product
   Manage Products
   Hero – headline, subtitle, primary CTA, optional background
   4 Relevant Sections – choose based on theme (e.g., features, items, testimonials, banner)
   Cards/layout must be uniform with hover/focus states
   Clear hierarchy, spacing, and responsive design
   Footer – links, optional social icons, copyright, consistent spacing
2. Login/Register Page
   Social login (Google) and credentials form
   Redirect to home (/) after login
3. Item List Page
   Page title + short description
   Search bar and optional category filter (UI only)
   Grid of a minimum of 6 cards
   Each card includes:
   Image or icon
   Title
   Short description (1–2 lines, ellipsis)
   Price/meta
   Details button
4. Item Details Page
   Large image/banner
   Product title
   Full description
   Meta info (price/date/priority)
   Back button
5. Protected Page: Add Product
   Only accessible when logged in; redirect others to /login
   Form fields:
   Title
   Short description
   Full description
   Price/date/priority/relevant field
   Optional image URL
   Buttons: Submit (add)
   On success: show toast or confirmation message
6. Protected Page: Manage Products
   List all products in a table/grid
   Each row/card with actions: View, Delete
   Layout should be clean, readable, and responsive
   Overall UI Guidelines
   Layout & Responsiveness – consistent spacing, clean layouts, adaptive for mobile/tablet/desktop.
   Typography & Colors – clear hierarchy, readable fonts, consistent color palette.
   Cards, Lists & Forms – uniform cards with hover/focus, responsive grids, clean forms with inline validation, and optional loading states.
   Interactions & Consistency – hover/focus for interactive elements, visual consistency across pages, and optional micro-animations.
   Technologies
   Next.js (App Router) for the frontend application
   NextAuth.js or any other auth for authentication
   For the backend, you can choose your technology
   Backend:
   node,express
   Submission Requirements
   GitHub Repository link
   Live demo (Vercel recommended)
   README.md including:
   Short project description
   Setup & installation instructions
   Route summary
