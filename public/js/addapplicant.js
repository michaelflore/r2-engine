const form = document.forms[0];

function resetForm() {
	[...form.elements].forEach(function (element) {
		element.value = '';
	});
}

form.addEventListener("submit", function(event) {
	event.preventDefault();
	const formData = new FormData(this);

	//Just to see its working
	for (const formElement of formData) {
		console.log(formElement);
	}

	let personObject = {};
	//Generate random id
	// let randomID = Math.floor(Math.random() * 100000) + 1;
	// personObject["id"] = randomID;

	formData.forEach((value, key) => personObject[key] = value);

	let json = JSON.stringify(personObject);

	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			console.log(xhttp.responseText);
		}
	};


	xhttp.open("POST", "/api/add", true);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(json);

	resetForm();
});

function handleFile(elem) {

	let uploadBtn = document.getElementById("upload");

	let fileName = document.getElementById("fileName");
	fileName.innerHTML = `File Name: ${elem.name}`;

	//Setting as a cookie
	document.cookie = `filesize=${elem.size}`;

	let file = elem;
	let fileReader = new FileReader();
	let row = document.getElementsByClassName("upload-container")[0];

	uploadBtn.style.display = "inline-block";

	if(file.type !== "application/pdf"){
		console.error(file.name, "is not a pdf file.");
		return;
	}
	row.style.height = "100%";

	fileReader.onload = function() {
		let typedarray = new Uint8Array(this.result);

			PDFJS.getDocument(typedarray).then((pdf) => { //pdfjsLib
				pdf.getPage(pdf.numPages).then((page) => {
					let viewport = page.getViewport(1.0);
					let canvas = document.querySelector("canvas");
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					page.render({
						canvasContext: canvas.getContext('2d'),
						viewport: viewport
					});
				});
			});
	};
	    fileReader.readAsArrayBuffer(file);
}

//Drag and Drop example
let dropArea = document.getElementById("drop-area");

//Prevent Defaults for all events
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
	dropArea.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach((eventName) => {
	dropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
	dropArea.addEventListener(eventName, unhighlight, false);
});

function handleDrop(event) {
	let dt = event.dataTransfer;
	let files = dt.files;
	console.log(files)
	handleFile(files[0]);
}

dropArea.addEventListener("drop", handleDrop, false);

function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
}

function highlight(e) {
	dropArea.classList.add("highlight");
}

function unhighlight(e) {
	dropArea.classList.remove("highlight");
}