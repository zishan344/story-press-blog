# Frontend Requirements - Blog Website

## Project Overview

Build a polished blog website frontend using Next.js with the App Router. The application must include public pages, protected pages, authentication UI, responsive layouts, and consistent visual design.

The blog should allow visitors to browse posts, view post details, and log in. Logged-in users can access protected pages for adding and managing blog posts.

## Technology Requirements

- Use Next.js with the App Router.
- Use React components with clean, reusable structure.
- Use NextAuth.js or another authentication service.
- Support Google login and credentials login/register UI.
- Connect to the backend API for blog data and protected blog actions.

## Required Pages and Features

### Landing Page

Route: `/`

The landing page must include 7 sections:

1. Sticky responsive navbar.
2. Hero section.
3. Featured posts or latest posts section.
4. Categories section.
5. Why read this blog or platform features section.
6. Testimonials, newsletter, or call-to-action banner section.
7. Footer.

Navbar requirements:

- Show logo or site name.
- Include at least 4 public routes, such as Home, Blogs, Categories, About, or Contact.
- Before login, show Login and Register links/buttons.
- After login, replace Login/Register with a user dropdown.
- User dropdown must show logged-in user info.
- User dropdown must include links for Add Blog and Manage Blogs.
- Navbar must be sticky, responsive, and usable on mobile.

Hero requirements:

- Include a headline.
- Include a subtitle.
- Include a primary CTA, such as Browse Blogs or Start Reading.
- Optional background image or visual treatment.

Layout requirements:

- Sections should have clear hierarchy, consistent spacing, and responsive behavior.
- Cards and layouts must be uniform.
- Interactive elements must include hover and focus states.

### Login/Register Page

Routes: `/login`, `/register`

Requirements:

- Include credentials form fields.
- Include Google social login button.
- Redirect users to `/` after successful login.
- Show inline validation for required fields.
- Show clear loading, error, or success feedback where appropriate.

### Blog List Page

Route: `/blogs`

Requirements:

- Include page title and short description.
- Include a search bar.
- Include an optional category filter UI.
- Display at least 6 blog cards.
- Each blog card must include:
  - Image or icon.
  - Blog title.
  - Short description limited to 1-2 lines with ellipsis.
  - Metadata such as category, date, author, read time, or priority.
  - Details button linking to the blog details page.
- Grid must be responsive across mobile, tablet, and desktop.

### Blog Details Page

Route: `/blogs/[id]`

Requirements:

- Show a large image, banner, or visual header.
- Show blog title.
- Show full blog description/content.
- Show metadata such as category, author, date, read time, or priority.
- Include a back button.
- Layout must remain readable on all screen sizes.

### Protected Add Blog Page

Route: `/add-blog`

Requirements:

- Only logged-in users can access this page.
- Unauthenticated users must be redirected to `/login`.
- Include form fields:
  - Title.
  - Short description.
  - Full description/content.
  - Category, date, priority, or another relevant blog field.
  - Optional image URL.
- Include Submit button to add the blog post.
- Show inline validation for required fields.
- On success, show a toast or confirmation message.

### Protected Manage Blogs Page

Route: `/manage-blogs`

Requirements:

- Only logged-in users can access this page.
- Unauthenticated users must be redirected to `/login`.
- Show all blog posts in a clean table, grid, or responsive list.
- Each row/card must include actions:
  - View.
  - Delete.
- Layout must be readable and usable on mobile and desktop.
- Show loading, empty, and delete confirmation states where appropriate.

## UI and Responsiveness Requirements

- Use consistent typography, spacing, border radius, colors, and component styles.
- Maintain clear visual hierarchy across all pages.
- Cards, lists, forms, and buttons must look consistent.
- Forms should be clean, readable, and include inline validation.
- Interactive elements must include hover and focus states.
- The application must be responsive for mobile, tablet, and desktop.
- Optional micro-animations may be used if they improve the experience.

## Frontend Route Summary

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page with navbar, hero, blog sections, CTA, and footer |
| `/blogs` | Public | Blog list page with search/filter UI and blog cards |
| `/blogs/[id]` | Public | Single blog details page |
| `/login` | Public | Login page with credentials and Google login |
| `/register` | Public | Register page with credentials form |
| `/add-blog` | Protected | Form for logged-in users to create a blog post |
| `/manage-blogs` | Protected | Logged-in user page for viewing and deleting blog posts |

## Acceptance Criteria

- The frontend uses Next.js App Router.
- The landing page includes all required 7 sections.
- The navbar changes based on authentication state.
- Login redirects to `/` after success.
- Blog list shows at least 6 blog cards.
- Blog details page shows full blog information.
- Add Blog and Manage Blogs pages are protected.
- UI is polished, responsive, and visually consistent.
- README or final project documentation includes setup instructions and route summary.
