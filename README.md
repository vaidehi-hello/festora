# Festora – Event Management Website

> K Explore – Web Designing task: a responsive event management website where users explore upcoming events, view details and register.

**Live demo:** [https://YOUR-SITE.vercel.app](https://YOUR-SITE.vercel.app)
**Repository:** [https://github.com/vaidehi-hello/festora](https://github.com/vaidehi-hello/festora)


## Features

**Core (from the problem statement)**
- Hero section with search, category shortcuts and a live "next event" countdown card
- Popular events carousel with arrows, dots, swipe and auto-scroll
- Event cards showing image, name, date, venue, short description, price and seats left
- Events page with search, category filter, sorting and a "free only" toggle (filters are kept in the URL)
- Event details page with full information, countdown, add-to-calendar (.ics) and share link
- Registration form (name, email, phone, selected event) with JavaScript validation and a confirmation dialog
- Fully responsive layout for phones, tablets and desktops

**Bonus challenge**
- Dark / light mode (remembers your choice)
- Event countdown timers
- Scroll animations and smooth transitions (respects "reduce motion")
- Local Storage based registration management with a **My tickets** page (view and cancel)

## Requirement checklist

| Requirement | Where it is implemented |
|---|---|
| Hero section | `src/components/Hero.jsx` |
| Featured / upcoming events | `src/components/EventCarousel.jsx`, `src/pages/Events.jsx` |
| Event cards | `src/components/EventCard.jsx` |
| Search and category filter | `src/pages/Events.jsx` |
| Event details | `src/pages/EventDetails.jsx` |
| Registration + validation + confirmation | `src/components/RegisterForm.jsx`, `ConfirmModal.jsx` |
| Responsive design | Tailwind breakpoints across all components |
| Dark / light mode | `src/hooks/useTheme.js`, CSS variables in `src/index.css` |
| Countdown timers | `src/hooks/useCountdown.js`, `src/components/Countdown.jsx` |
| Animations | `src/components/Reveal.jsx`, keyframes in `tailwind.config.js` |
| Local Storage | `src/lib/storage.js` |

## Tech stack

- **React 18** with **React Router 6** (HashRouter, so it works on any static host)
- **Tailwind CSS 3** for styling, with CSS variables for theming
- **Vite 5** for development and builds
- **Lucide** icons, **Fraunces** and **Manrope** fonts (Google Fonts)
- Git and GitHub for version control, Vercel for deployment

## Getting started

Requires Node.js 18 or higher.

```bash
git clone https://github.com/YOUR-USERNAME/festora.git
cd festora
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build in /dist
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/   Navbar, Hero, EventCarousel, EventCard, Categories, RegisterForm,
                ConfirmModal, Countdown, Reveal, Toast, Poster, Footer
  pages/        Home, Events, EventDetails, MyTickets, About, NotFound
  data/         events.js  (all events and categories)
  hooks/        useCountdown, useTheme, useTitle
  lib/          storage.js (Local Storage store), format.js, ics.js
  App.jsx       routes and layout
  index.css     theme variables, gradients, base styles
```

## How it works

**Data.** Events and categories live in `src/data/events.js`. Event dates are generated relative to today, so countdowns always show upcoming events.

**Routing.** `HashRouter` provides `/`, `/events`, `/events/:slug`, `/tickets` and `/about`. Hash routing means refreshing any page works on static hosting without server rules.

**Search and filter.** The Events page stores `q`, `category`, `sort` and `free` in the URL query string, so filtered views can be shared and the back button works. Category cards and footer links on other pages deep-link into a filtered list.

**Registration and validation.** The form validates on blur and on submit and shows inline error messages:

| Field | Rule |
|---|---|
| Name | Required, 2–60 characters, letters, spaces and `. ' -` only |
| Email | Required, valid format, and not already registered for the same event |
| Phone | Required, valid 10-digit Indian mobile number starting with 6–9 (`+91`, `91`, `0`, spaces and dashes are accepted) |
| Event | Pre-selected from the page; sold-out events cannot be chosen |

On success the registration is saved, a confirmation dialog shows a ticket ID, and the user can add the event to their calendar or open **My tickets**.

**Local Storage.** `src/lib/storage.js` keeps registrations under one key and exposes them with React's `useSyncExternalStore`, so every component (navbar badge, seats left, My tickets) updates instantly. Seats left = total seats − already booked − registrations on this device. The theme is stored separately.

**Carousel.** Built with CSS scroll-snap. One card is shown on phones, two on tablets and three on desktops. It supports arrows, dots, touch swipe and auto-scroll that pauses on hover, focus and touch, and is switched off for users who prefer reduced motion.

**Theming.** Colours are CSS variables switched by a `dark` class on the root element. The hero and category sections stay dark in both modes for visual contrast.

**Animations.** Sections fade in once on scroll using `IntersectionObserver`. Other motion is plain CSS transitions and keyframes.

**Responsive design.** Mobile-first Tailwind breakpoints: phones (below 768px), tablets (`md`, 768px and up) and desktops (`lg`, 1024px and up). Tested from 320px wide up to large desktop screens.

**Accessibility.** Semantic HTML, labelled form fields with `aria-invalid` and error text, keyboard-friendly controls, visible focus styles, and a reduced-motion fallback.

## Design

| Colour | Hex | Use |
|---|---|---|
| Navy | `#003049` | Text, hero background |
| Maroon | `#780000` | Primary buttons (light mode) |
| Crimson | `#C1121F` | Accents, date badges |
| Cream | `#FDF0D5` | Page background |
| Sky blue | `#669BBC` | Borders, soft tints |

## Deployment

Deployed on Vercel from the `main` branch. Every push to GitHub redeploys the site automatically.

## Known limitations and future work

- Registrations are stored in the browser (Local Storage). A backend with a database would be needed for real bookings.
- Events are static sample data. An admin panel or API would allow creating events.
- Possible additions: user accounts, payment integration, email confirmations.

## Credits

Event photos from [Unsplash](https://unsplash.com), icons from [Lucide](https://lucide.dev), fonts from Google Fonts. Event names, organisers and venues are sample data created for this project.

## Author

**[VAIDEHI]**, B.Tech CSE, KIIT Bhubaneswar
GitHub: [@vaidehi-hello](https://github.com/vaidehi-hello)