// Interactive Terminal Engine (Extra Feature)
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('terminal-output');

if (termInput) {
  termInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = termInput.value.trim().toLowerCase();
      
      // Print command entry
      const cmdLine = document.createElement('p');
      cmdLine.innerHTML = `<span class="prompt">guest@webos-x1:~$</span> ${termInput.value}`;
      termOutput.appendChild(cmdLine);

      // Process response
      const response = document.createElement('p');
      switch (command) {
        case 'help':
          response.innerHTML = 'Available commands: <b>help</b>, <b>about</b>, <b>clear</b>, <b>date</b>';
          break;
        case 'about':
          response.innerText = 'WebOS X1 - Built with Vanilla JS, HTML5, and CSS3.';
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