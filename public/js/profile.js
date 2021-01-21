let view = document.getElementById("view-resume");
let overlay = document.getElementsByClassName("overlay")[0];
let close = document.querySelector("p#close");

view.addEventListener("click", function(event) {
	event.preventDefault();
	overlay.style.width = "50%";
}, false);

close.addEventListener("click", function(event) {
	event.preventDefault();
	overlay.style.width = "0%";
}, false);