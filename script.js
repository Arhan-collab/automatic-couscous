// 1. Live System Clock
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    const now = new Date();
    clockElement.innerText = now.toLocaleTimeString();
  }
}
setInterval(updateClock, 1000);
updateClock();

// 2. Drag-and-Drop Mechanics
function makeDraggable(windowEl, headerEl) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  headerEl.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    
    // Bring clicked window to top
    document.querySelectorAll('.window').forEach(w => w.style.zIndex = "1");
    windowEl.style.zIndex = "10";
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    windowEl.style.top = (windowEl.offsetTop - pos2) + "px";
    windowEl.style.left = (windowEl.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Bind draggable logic to both windows
makeDraggable(
  document.getElementById('terminal-window'),
  document.getElementById('terminal-header')
);
makeDraggable(
  document.getElementById('info-window'),
  document.getElementById('info-header')
);

// 3. Terminal Command Processing
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('terminal-output');

if (termInput) {
  termInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = termInput.value.trim().toLowerCase();
      
      const cmdLine = document.createElement('p');
      cmdLine.innerHTML = `<span class="prompt">guest@webos-x1:~$</span> ${termInput.value}`;
      termOutput.appendChild(cmdLine);

      const response = document.createElement('p');
      switch (command) {
        case 'help':
          response.innerHTML = 'Commands: <b>help</b>, <b>about</b>, <b>clear</b>, <b>date</b>';
          break;
        case 'about':
          response.innerText = 'WebOS X1 - Vanilla JavaScript Desktop Environment.';
          break;
        case 'date':
          response.innerText = new Date().toString();
          break;
        case 'clear':
          termOutput.innerHTML = '';
          termInput.value = '';
          return;
        case '':
          response.innerText = '';
          break;
        default:
          response.innerText = `Command not found: ${command}. Type 'help' for options.`;
      }

      if (response.innerText !== '') {
        termOutput.appendChild(response);
      }

      termInput.value = '';
      termOutput.scrollTop = termOutput.scrollHeight;
    }
  });
}