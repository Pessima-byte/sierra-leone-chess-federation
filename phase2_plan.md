# Phase 2: The Interactive & Dynamic Portal

This phase focuses on completing the administrative CRUD cycle and enhancing the player-facing interactivity across the platform.

## 1. Administrative Mastery (Full CRUD)
The goal is to allow administrators to not just create and delete, but also **modify** existing data to fix errors or update information.

- [ ] **Member Editing**: Create `updateMember` server action and `EditMemberDialog`.
- [ ] **Event Editing**: Create `updateEvent` server action and `EditEventDialog`.
- [ ] **News Editing**: Create `updateNews` server action and `EditNewsDialog`.
- [ ] **Admin Sidebar Refinement**: Ensure the admin navigation feels like a professional terminal.

## 2. Dynamic Calendar & Events
Enhance the public calendar to be the "source of truth" for Sierra Leonean Chess.

- [ ] **Event Registration**: Implement a mock registration flow that tracks "Interest" (since we don't have a payments system yet).
- [ ] **Live Filtering**: Refine month/year navigation and category-specific views.
- [ ] **Dynamic Sync**: Ensure events added via Admin panel reflect instantly with all details in the interactive timeline.

## 3. News & Transmission Refinement
The news feed should feel like a living broadcast.

- [ ] **Search & Pagination**: Complete the pagination logic and ensure deep search (tags, content) is active. (Partially done).
- [ ] **Interactive Utilities**: Active "Share", "Save", and "Subscribe" micro-interactions.

## 4. Player Identity (Member Profiles)
Turn the directory into a network.

- [ ] **Player Stats**: Dynamically calculate rankings and win rates from recorded games.
- [ ] **Match History**: Allow expanding full move lists if recorded (PGN support).
- [ ] **Interactive Challenges**: Mock "Challenge" button that simulates sending a notification to a player.

---
*Next Action: Implement Update server actions and Admin Edit Dialogs.*
