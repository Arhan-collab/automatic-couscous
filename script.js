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

  if (!win || !handle) return;

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

if (termInput) {
  termInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      var txt = termInput.value.trim();
      if (txt === '') return;

      var userLine = document.createElement('p');
      userLine.innerText = '> ' + txt;
      termLogs.appendChild(userLine);

      var botLine = document.createElement('p');
      var cmd = txt.toLowerCase();

      if (cmd === 'help') {
        botLine.innerText = 'Commands: help, info, clear';
      } else if (cmd === 'info') {
        botLine.innerText = 'Couscous OS - Custom Vanilla JS project.';
      } else if (cmd === 'clear') {
        termLogs.innerHTML = '';
        termInput.value = '';
        return;
      } else {
        botLine.innerText = 'Command not found: ' + txt;
      }

      termLogs.appendChild(botLine);
      termInput.value = '';
      termLogs.scrollTop = termLogs.scrollHeight;
    }
  });
}
