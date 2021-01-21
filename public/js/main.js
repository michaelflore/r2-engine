let admin = document.getElementById("admin-name");
let dropdown = document.getElementsByClassName("dropdown-content")[0];

//Username Dropdown
admin.addEventListener("click", function() {
	dropdown.classList.add("db");
} ,false);

//When they click outside of it to close
window.addEventListener("click", function(event) {
	if(!event.target.matches("#admin-name")) {
		if(dropdown.classList.contains("db")) {
			dropdown.classList.remove("db");
		}
	}
});