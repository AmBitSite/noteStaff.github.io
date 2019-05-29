let data;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const wLine = 500;
var hLine = 20;
var WNote = hLine;

canvas.setAttribute('width', wLine);

function drawStaff(y, w) {
    ctx.fillStyle = '#000';
    ctx.fillRect(10, y, w, 1);
};
drawStaff(`${hLine}`, wLine);
drawStaff(`${hLine +=10}`, wLine);
drawStaff(`${hLine +=10}`, wLine);
drawStaff(`${hLine +=10}`, wLine);
drawStaff(`${hLine +=10}`, wLine);

class NoteConstructor {
    constructor() {
        this.drawNote = (pageX, pageY) => {
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.arc(pageX, pageY, 4, 1, 2 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.fillRect(pageX + 3, pageY - 18, 1, 17);
            ctx.fill();
        }
    }
}
class NoteConstructor2 {
    constructor() {
        this.drawNote = (pageX, pageY, pageX2, pageY2) => {
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.arc(pageX, pageY, 4, 1, 2 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.fillRect(pageX + 3, pageY - 18, 1, 17);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.arc(pageX2 + 10, pageY2, 4, 1, 2 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.fillRect(pageX2 + 10 + 3, pageY2 - 18, 1, 17);
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.moveTo(pageX + 4, pageY - 17);
            ctx.lineTo(pageX2 + 14, pageY2 - 17);
            ctx.stroke();
            ctx.fill();
        }
    }
}
const Note = new NoteConstructor();
const Note2 = new NoteConstructor2();

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
readTextFile("./data.json", function(text) {
    data = JSON.parse(text);
    console.log(data.length);

    function createNote1(q, w) {
        return Note.drawNote(q, w);
    }

    function createNote2(q, w, e, r) {
        return Note2.drawNote(q, w, e, r);
    }
    for (let i = 0, j = data.length; i < j; i++) {
        if (data[i].note.length == 2) {
            createNote1(data[i].note[0], data[i].note[1]);
        } else if (data[i].note.length == 4) {
            createNote2(data[i].note[0], data[i].note[1], data[i].note[2], data[i].note[3]);
        }
    }
});