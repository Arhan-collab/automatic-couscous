# Couscous OS 

Couscous OS is a lightweight, browser-based desktop environment built from scratch using plain HTML, CSS, and Vanilla JavaScript. It simulates standard OS conventions like window management, dragging mechanics, and a command-line terminal directly in the web browser.

---

##  About & Motivation

I wanted to see how much of a desktop experience could be built using only raw web technologies without leaning on heavy frameworks, UI libraries, or external dependencies. 

The goal was to build two main interactive components from scratch:
1. A custom drag-and-drop window manager using native browser mouse coordinate math.
2. An interactive terminal shell that parses and responds to user commands in real time.

---

## Features

- **Draggable Windows:** Click and move window headers around the desktop canvas seamlessly.
- **Interactive Terminal:** Custom input handler supporting built-in commands (`help`, `info`, `date`, `clear`).
- **Real-Time Clock:** Live updating time display in the system navigation bar.
- **Minimalist Dark UI:** Custom styled UI with dark mode color palettes and custom scrollbars.
- **Zero Dependencies:** Pure HTML5, CSS3, and ES6 JavaScript.

---

## 🛠️ How It Works

### Window Management Engine
The window dragging mechanic relies on tracking relative mouse coordinates on the desktop area:
- A `mousedown` event on a window header captures the initial cursor coordinates (`clientX`, `clientY`).
- Active `mousemove` listeners calculate the difference (`x1`, `y1`) as the cursor moves across the screen.
- The target window container's `top` and `left` CSS positions are updated dynamically in real time.
- A `mouseup` listener clears the tracking functions to drop the window in place.

### Terminal Logic
The terminal uses a standard text input field attached to a keydown event listener:
- Pressing `Enter` captures the string, sanitizes it using `.trim().toLowerCase()`, and appends the command to the log window.
- A basic command parser evaluates the input against conditional logic to generate responses or clear the terminal output.
