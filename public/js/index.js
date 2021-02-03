let admin = document.getElementById("admin-name");
let dropdown = document.getElementsByClassName("dropdown-content")[0];
const logout = document.getElementById("logout-btn");

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

logout.addEventListener("click", function (e) {
	e.preventDefault();
	localStorage.removeItem('user');
	window.location.href = "/";
})

function getCurrentUser() {
	return JSON.parse(localStorage.getItem('user'));;
}

let currentUser = getCurrentUser();

admin.innerHTML = `${currentUser.username} <i class="fas fa-chevron-down"></i>`