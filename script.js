"use strict";

let numColors,
    colors,
    pickedColor;

const colorDisplay = document.getElementById('color-display-inner'),
      hintButton = document.querySelector('.btn-hint'),
      resetButton = document.querySelector('.btn-reset'),
      message = document.querySelector('.message'),
      easyButton = document.querySelector('.btn-easy'),
      hardButton = document.querySelector('.btn-hard'),
      squares = document.querySelectorAll('.square');


init();


function init() {
  hardButton.classList.contains("chosen") ? numColors = 6 : numColors = 3;

  colors = setColors(),
  pickedColor = pickColor();

  hintButton.innerText = "Hint?";
  resetButton.innerText = "New colors?";
  colorDisplay.innerText = pickedColor;
  message.innerText = "";

  setUpSquares();
  setupButtons();
}

function setColors() {
  const arr = [];
  for (let i = 0; i < numColors; i++) {
    arr.push(generateColor());
  }
  return arr;
}

function generateColor() {
  const r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256);
  return `#${numToHex(r)}${numToHex(g)}${numToHex(b)}`;
}

function numToHex(n) {
  let hex = n.toString(16);
  if (hex.length < 2) hex = "0" + hex;
  return `${hex}`;
}

function pickColor() {
  const random = Math.floor(Math.random() * numColors);
  return colors[random];
}

function setUpSquares() {
  squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.display = 'block';
      square.style.backgroundColor = colors[i];
    } else {
      square.style.display = 'none';      
    }

    square.addEventListener('click', function () {
      let currColor = this.style.backgroundColor;
      currColor = rgbToHex(currColor);
      
      if (currColor === pickedColor) {
        changeSquares();
        message.innerText = "CORRECT!";
        resetButton.innerText = "Play again?";
      } else {
        this.style.backgroundColor = '#232323';
        this.style.boxShadow = 'none';
      }
    });
  });
}

function rgbToHex(rgb) {
  rgb = rgb.split('(');
  rgb = rgb[1].split(',')
              .map(n => parseInt(n, 10))
              .map(n => numToHex(n));             
  return `#${rgb.join('')}`;
}

function changeSquares() {
  squares.forEach(square => {
    square.style.backgroundColor = pickedColor;
  });
}

function setupButtons() {
  hintButton.addEventListener("click", function () {
    this.innerText = hexToRgb(pickedColor);
  });

  resetButton.addEventListener("click", reset);

  easyButton.addEventListener("click", function() {
    this.classList.add("chosen");
    hardButton.classList.remove("chosen");
    init();
  });

  hardButton.addEventListener("click", function() {
    this.classList.add("chosen");
    easyButton.classList.remove("chosen");
    init();
  });
}

function hexToRgb(hex) {
  hex = hex.split('');
  hex.shift();

  let newHex = [hex[0] + hex[1], hex[2] + hex[3], hex[4] + hex[5]];

  return `rgb(${parseInt(newHex[0], 16)}, \
  ${parseInt(newHex[1], 16)}, ${parseInt(newHex[2], 16)})`;
}
