# Couscous OS 

Couscous OS is a lightweight, browser-based desktop environment built from scratch using plain HTML, CSS, and Vanilla JavaScript. It simulates standard OS conventions like window management, dragging mechanics, and a command-line terminal directly in the web browser.

## How I built it

I decided to explore how far I can build functional UI components just through plain web code.

1. **Window Moving:** I put in some `onmousedown` event listeners on window headers. If you move your mouse after clicking, JavaScript calculates the offset between start positions of cursor movement (`clientX`, `clientY`) and new ones, then continually moves window CSS `top` and `left` properties.
2. **Terminal Logic:** In order to work terminal, input listens to `onEnter` event and reads entered string from the text input field, writes it in new `<p>` element in the scrollable log panel and evaluates the command using basic `if/else` statement to write down response.

## The worst times with GitHub Pages cache

* **GitHub Pages Cache:** I spent much time debugging a piece of code, which in fact wasn’t faulty at all because GitHub Pages served me an old cached version of my `script.js`. Learned that hard refresh (`Ctrl+Shift+R`) is a major player during tests.
