function printHeader(hd, txt) {
	var header = document.createElement(hd);
	var text = document.createTextNode(txt);
	header.append(text);
	document.body.appendChild(header);
}
var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
printHeader("H1", "Sean Piedmonte");
printHeader("H2", date);