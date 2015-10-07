function shuffleArray(t){for(var r,c,i=t.length;0!==i;)c=Math.floor(Math.random()*i),i-=1,r=t[i],t[i]=t[c],t[c]=r;return t}


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

var elements = [
	"Accusations of St George Superiority",
  "Procedural Showboating",
  "Discussion of Privilege",
  "Chair gets challenged",
  "Personal copy of Roberts Rules seen",
  "Criticism of new proxy system",
  "Dramatic exit",
  "Abrupt Adjournment",
  "Vuvuzela!",
  "Chair threatens to kick someone out",
  "Uncomfortable silence",
  "YOU ATE A SAMOSA",
  "Motion to recess",
  "Technical Difficulties",
  "Anti-Harper sentiment",
  "Pierre Harfouche",
  "Mention of a lawsuit",
  "Shawn Desman is mentioned",
  "Someone starts a frosh cheer",
  "Premature BINGO!",
  "Tears",
  "Room is full",
  "Samosas run out before start of motions",
  "CFS is mentioned",
  "Inappropriate pun",
	"Throwaway war on Twitter"
];


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
	return readCookie(id) != null;
}


function generate() {
  var c = [];
  var i, j;
  var table = document.getElementById("main");
  var shuffledElements = shuffleArray(elements);

  for (i = 0; i < table.children[0].children.length; i++){
    var row = table.children[0].children[i];
    for (j = 0; j < row.children.length; j++){
      var cell = row.children[j];
			cell._index = i * 5 + j;
			cell.innerHTML = shuffledElements[i * 5 + j];
			cell.onclick = click.bind(cell);
			cell.clicked = CellClickedEh(cell._index);





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




function init () {
	generate();
}

window.onload = init;
