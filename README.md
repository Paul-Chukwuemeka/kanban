# Kanban Board

A simple Kanban board application built with Next.js, Redux, and Tailwind CSS.

## About the Project

This project is a simple Kanban board application that allows users to create and manage their tasks. Users can create new boards, columns, and tasks, and they can move tasks between columns using drag-and-drop. The application is built with Next.js, Redux, and Tailwind CSS, and it uses `localStorage` to persist the data.

## Features

- Create new boards, columns, and tasks
- Edit and delete boards, columns, and tasks
- Move tasks between columns using drag-and-drop
- Dark mode
- Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/kanban.git
```

2. Install the dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To-Do

- [ ] Write unit tests for Redux slices and helper functions.
- [ ] Write component tests for the main components.
- [ ] Write end-to-end tests to simulate user flows.
- [ ] Add user authentication to allow multiple users to have their own boards.
- [ ] Replace `localStorage` with a database (e.g., PostgreSQL, MongoDB) to store user data.
- [ ] Create a proper backend API to handle data persistence instead of relying on `localStorage`.
- [ ] Add animations for task transitions.
- [ ] Add a search bar to filter tasks.
- [ ] Add a feature to assign users to tasks.
- [ ] Add a feature to set due dates for tasks.