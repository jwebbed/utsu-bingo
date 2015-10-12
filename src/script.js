'use strict';

(function () {

// ========================================================================= //
// Customizable contents                                                     //
// ========================================================================= //

var title       = 'UTSU Bingo'
var centre_tile = 'YOU GOT A SAMOSA';

var elements = [
  'Accusations of St George Superiority',
  'Procedural Showboating',
  'Discussion of Privilege',
  'Chair gets challenged',
  'Personal copy of Roberts Rules seen',
  'Criticism of new proxy system',
  'Dramatic exit',
  'Abrupt Adjournment',
  'Vuvuzela!',
  'Chair threatens to kick someone out',
  'Uncomfortable silence',
  'Motion to recess',
  'Technical Difficulties',
  'Anti-Harper sentiment',
  'Pierre Harfouche',
  'Mention of a lawsuit',
  'Shawn Desman is mentioned',
  'Someone starts a frosh cheer',
  'Premature BINGO!',
  'Tears',
  'Room is full',
  'Samosas run out before start of motions',
  'CFS is mentioned',
  'Inappropriate pun',
  'Throwaway war on Twitter',
  'Someone references Ashkon',
  'Someone orders a pizza'
];

// ========================================================================= //
// End of customizable contents                                              //
// ========================================================================= //


var boardItems;
var boardClicked;


function shuffleArray (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateBoard (reset) {
  var board = document.getElementById('board');

  // Fetch board from localStorage
  if (reset !== true && localStorage['board'] !== undefined) {
    boardItems = JSON.parse(localStorage['board']);
  } else {
    boardItems = shuffleArray(elements).slice(0, 25);
    localStorage['board'] = JSON.stringify(boardItems);
  }

  // Fetch clicked items from localStorage
  if (reset !== true && localStorage['clicked'] !== undefined) {
    boardClicked = JSON.parse(localStorage['clicked']);
  } else {
    boardClicked = [];
    localStorage['clicked'] = JSON.stringify(boardClicked);
  }

  // Populate the board
  for (var i = 0; i < board.children[0].children.length; i++) {
    var row = board.children[0].children[i];

    for (var j = 0; j < row.children.length; j++) {
      var cell = row.children[j];
      cell.index = i * 5 + j;
      cell.clicked = false;

      if (boardClicked.indexOf(cell.index) > -1) {
        cell.clicked = true;
      }

      if (cell.index === 12) {
        cell.innerHTML = centre_tile;
        cell.style.fontWeight = 'bold';
      } else {
        cell.innerHTML = boardItems[i * 5 + j];
      }

      cell.onclick = onCellClick.bind(cell);

      cell.style.backgroundColor = cell.clicked ? 'red' : '';
    }
  }
}

function onCellClick () {
  this.style.backgroundColor = this.clicked ? '' : 'red';
  this.clicked = !this.clicked;

  saveClickedState(this.index, this.clicked);
}

function saveClickedState (index, clicked) {
  if (clicked) {
    boardClicked.push(index);
  } else {
    boardClicked.splice(boardClicked.indexOf(index), 1);
  }

  localStorage['clicked'] = JSON.stringify(boardClicked);
}

// Regenerate the board
function resetBoard () {
  generateBoard(true);
}

// Load the board
window.onload = function () {
  generateBoard();

  document.getElementById('reset').onclick = resetBoard;

  document.getElementById('title').textContent = title;
  document.title = title;
};

})();
