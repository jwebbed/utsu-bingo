function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+";";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function eraseCookie(name) {
    createCookie(name,"",-1);
}

function setClickCookie(i, clicked){
	var id = "c" + i.toString();
	var cookie = readCookie(id);

	if (cookie != null || !clicked){
		eraseCookie(id);
	} else if (clicked) {
		createCookie(id, clicked);
	}
}

function CellClickedEh(i) {
	var id = "c" + i.toString();
	var cookie = readCookie(id);
	return cookie == "true";
}


function generate() {
  var c = [];
  var i, j;
  var table = document.getElementById("main");

	var cookieElements = readCookie("cells");
	if (cookieElements != null) {
		var shuffledElements = JSON.parse(cookieElements);
	} else {
		var shuffledElements = shuffleArray(elements);
	}



  for (i = 0; i < table.children[0].children.length; i++){
    var row = table.children[0].children[i];
    for (j = 0; j < row.children.length; j++){
      var cell = row.children[j];
			cell._index = i * 5 + j;
			if (cell._index == 12){
				cell.innerHTML = "YOU GOT A SAMOSA"
				cell.style.fontWeight = "bold";
				cell.onclick = click.bind(cell);
			} else {
				cell.innerHTML = shuffledElements[i * 5 + j];
				cell.onclick = click.bind(cell);
			}
			cell.clicked = CellClickedEh(cell._index);
			if (cell.clicked) {
				cell.style.backgroundColor = "red";
			} else {
				cell.style.backgroundColor = "white";
			}

    }
  }

  return shuffledElements.slice(0, 25);
};

function click() {
  if (!this.clicked) {
    this.style.backgroundColor = "red";
    this.clicked = true;
  } else {
    this.style.backgroundColor = "white";
  	this.clicked = false;
  }
	setClickCookie(this._index, this.clicked);
}


function reset() {
	var i, id;
	eraseCookie("cells");
	for (i = 0; i < 25; i++){
		id = "c" + i.toString();
		eraseCookie(id);
	}

	// repopulate
	var cells = generate();
	var cellstr = JSON.stringify(cells);
	createCookie("cells", cellstr);
}



function init () {
	var cells = generate();
	var cellstr = JSON.stringify(cells);
	createCookie("cells", cellstr);
	document.getElementById("button").onclick = reset;

	var header = document.getElementById("header");
	header.style.width = document.getElementById('main').clientWidth;
}

window.onload = init;
