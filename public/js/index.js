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
	document.cookie = `access=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
	window.location.href = "/";
})

function getCurrentUser() {
	return JSON.parse(localStorage.getItem('user'));;
}

let currentUser = getCurrentUser();

// if(!currentUser) {
// 	window.location.href = "/";
// }
admin.innerHTML = `${currentUser.username} <i class="fas fa-chevron-down"></i>`

// let xhr = new XMLHttpRequest();
//
// xhr.onreadystatechange = function() {
// 	if (this.readyState === 4 && this.status === 200) {
// 		console.log("succ");
// 	}
// };
//
// xhr.open("GET", "/home", true);
// xhr.setRequestHeader("x-access-token", localStorage.getItem("user").accessToken);
// xhr.send();