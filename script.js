function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}
setInterval(updateClock, 1000);
updateClock();

function closeWindow(id) {
  document.getElementById(id).style.display = 'none';
}

function makeDraggable(winId, headerId) {
  const win = document.getElementById(winId);
  const header = document.getElementById(headerId);
  let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

  header.onmousedown = (e) => {
    if (e.target.classList.contains('btn')) return; // Don't drag when clicking traffic buttons
    e.preventDefault();
    mouseX = e.clientX;
    mouseY = e.clientY;

    document.onmousemove = (e) => {
      e.preventDefault();
      offsetX = mouseX - e.clientX;
      offsetY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      win.style.top = (win.offsetTop - offsetY) + "px";
      win.style.left = (win.offsetLeft - offsetX) + "px";
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

makeDraggable('window1', 'window1-header');