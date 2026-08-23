console.log("System Script Initialized!");

function runClock() {
  var d = new Date();
  var clockEl = document.getElementById('clock-display');
  if (clockEl) {
    clockEl.innerText = d.toLocaleTimeString();
  }
}
setInterval(runClock, 1000);
runClock();

function closeWin(id) {
  var target = document.getElementById(id);
  if (target) {
    target.style.display = 'none';
  }
}

function makeDraggable(winId, handleId) {
  var win = document.getElementById(winId);
  var handle = document.getElementById(handleId);
  var x1 = 0, y1 = 0, x2 = 0, y2 = 0;

  if (!win || !handle) {
    console.log("Error: Could not find window elements for " + winId);
    return;
  }

  handle.onmousedown = function(e) {
    e.preventDefault();
    x2 = e.clientX;
    y2 = e.clientY;

    document.onmousemove = function(e) {
      e.preventDefault();
      x1 = x2 - e.clientX;
      y1 = y2 - e.clientY;
      x2 = e.clientX;
      y2 = e.clientY;

      win.style.top = (win.offsetTop - y1) + "px";
      win.style.left = (win.offsetLeft - x1) + "px";
    };

    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

makeDraggable('win-terminal', 'win-terminal-bar');
makeDraggable('win-notes', 'win-notes-bar');

var termInput = document.getElementById('cmd-input');
var termLogs = document.getElementById('term-logs');

if (termInput && termLogs) {
  termInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var txt = termInput.value.trim();
      if (txt === '') return;

      var userLine = document.createElement('p');
      userLine.innerText = '> ' + txt;
      userLine.style.margin = '2px 0';
      termLogs.appendChild(userLine);

      var botLine = document.createElement('p');
      botLine.style.margin = '2px 0';
      var cmd = txt.toLowerCase();

      if (cmd === 'help') {
        botLine.innerText = 'Commands: help, info, clear, date';
      } else if (cmd === 'info') {
        botLine.innerText = 'Couscous OS v1.0';
      } else if (cmd === 'date') {
        botLine.innerText = new Date().toDateString();
      } else if (cmd === 'clear') {
        termLogs.innerHTML = '';
        termInput.value = '';
        return;
      } else {
        botLine.innerText = 'Unknown command: ' + txt;
      }

      termLogs.appendChild(botLine);
      termInput.value = '';
      termLogs.scrollTop = termLogs.scrollHeight;
    }
  });
} else {
  console.log("Error: Terminal input or log area not found!");
}
