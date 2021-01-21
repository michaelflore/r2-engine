let defaultSelect = document.getElementsByClassName("default-select")[0];
let searchOptions = document.getElementById("search-options");

let tableHeaders = document.querySelectorAll("th");
let searchInput = document.getElementById("search-input");

//Search Dropdown
defaultSelect.addEventListener("click", function() {
	if(searchOptions.classList.contains("dn")) {
		searchOptions.classList.remove("dn");
		searchOptions.classList.add("db");
	}
	else {
		searchOptions.classList.remove("db");
		searchOptions.classList.add("dn");
	}
}, false);

window.addEventListener("click", function(event) {
	const select = document.querySelector('.search-dropdown');
	if (!select.contains(event.target)) {
		searchOptions.classList.remove("db");
		searchOptions.classList.add("dn");
	}
});

for(const option of document.querySelectorAll(".custom-option")) {
	option.addEventListener('click', function () {
		if (!this.classList.contains("selected")) {
			this.parentNode.parentNode.querySelector("li span.custom-option.selected").classList.remove("selected");
			this.classList.add("selected");
			this.closest(".search-dropdown").querySelector(".default-select span").textContent = this.textContent;
		}
	});
}

function loadTableData(personData) {
	const tableBody = document.getElementById("tableData");
	// tableBody.innerHTML = '';

	let output = '';

	for(let person of personData) {
		output += `<tr>
						<td>
							<input type="Checkbox" name="select-row">
						</td>
						<td>
							<div class="details-container">
							<div class="block">+</div>
								<div class="block">0</div>
								<div class="block">${person.pipeline}</div>
							</div>
						</td>
						<td>${person.id}</td>
						<td><a href="profile.html" style="text-decoration: none; color: #0000ff;">${person.name}</a></td>
						<td>${person.jobTitle}</td>
						<td>${person.mobileNumber}</td>
						<td>${person.email}</td>
						<td>${person.location}</td>
						<td>${person.reliability}</td>
					</tr>
					`;
	}
	tableBody.innerHTML = output;
}

function searchTable(value, applicants) {

	let filteredData = applicants.filter(function (applicant) {

		//Get Selected
		let selected = document.querySelector("span.custom-option.selected");
		let searchCredential = '';

		switch (selected.innerHTML) {
			case "ID":
				searchCredential = applicant.id + '';
				break;
			case "Name":
				searchCredential = applicant.name.toLowerCase();
				break;
			case "Job Title":
				searchCredential = applicant.jobTitle.toLowerCase();
				break;
			case "Mobile":
				searchCredential = applicant.mobileNumber.toLowerCase();
				break;
			case "Email":
				searchCredential = applicant.email.toLowerCase();
				break;
			case "Location":
				searchCredential = applicant.location.toLowerCase();
				break;
			case "Reliability":
				searchCredential = applicant.reliability + '';
				break;
			default:
				searchCredential = applicant.name.toLowerCase();
		}

		return searchCredential.includes(value) === true;
	});

	return filteredData;
}

window.onload = () => {
	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			let applicants = JSON.parse(xhttp.responseText);

			//Load table
			loadTableData(applicants);

			//Reloading table on each keyup
			searchInput.addEventListener("keyup", function() {
				let value = this.value.toLowerCase();

				let newData = searchTable(value, applicants); //Returns array of filtered data
				loadTableData(newData);
			});

			//Sort table data when clicking on each header
			for(let header of tableHeaders) {
				header.addEventListener("click", function() {
					let dataCred = this.getAttribute("data-column");
					let order = this.getAttribute("data-order");

					let icon = this.querySelector("i");
					icon.classList.remove("fa-sort-down") || icon.classList.remove("fa-sort-up");

					if(order === "desc") {
						this.setAttribute("data-order", "asc");
						applicants = applicants.sort((a,b) => a[dataCred] > b[dataCred] ? 1: -1);
						icon.classList.add("fa-sort-up");
					}
					else {
						this.setAttribute("data-order", "desc");
						applicants = applicants.sort((a,b) => a[dataCred] < b[dataCred] ? 1: -1);
						icon.classList.add("fa-sort-down");
					}
					loadTableData(applicants);
				});
			}

		}
	};
	xhttp.open("GET", "/api/applicant", true);
	xhttp.send();
};