  function getCurrentDateTime() {
    var currentDateTime = new Date().toLocaleString();
    document.getElementById("currentDateTime").innerHTML = currentDateTime;
  }
  getCurrentDateTime();
  setInterval(getCurrentDateTime, 1000);


  // JavaScript
function changeFontSize(action) {
  const body = document.getElementById('cuerpo');
  const currentFontSize = window.getComputedStyle(body).fontSize;
  let newFontSize;

  if (action === 'increase') {
    newFontSize = parseInt(currentFontSize) * 1.1 + 'px';
  } else if (action === 'decrease') {
    newFontSize = parseInt(currentFontSize) * 0.9 + 'px';
  }

  body.style.fontSize = newFontSize;
}

