let defaultSelect = document.getElementsByClassName("default-select")[0];
let options = document.getElementById("search-options");
let headers = document.querySelectorAll("th");

let jobData = [
	{
		code: 'JPC - 300',
		title: 'Software Engineer',
		city: 'New York City',
		state: 'New York',
		by: 'Michael Flores',
		on: '08/20/2020 10:20', 
		pipeline: 1
	},
	{
		code: 'JPC - 301',
		title: 'Web Engineer',
		city: 'Los Angeles',
		state: 'California',
		by: 'Michael Flores',
		on: '08/21/2020 10:25',
		pipeline: 2
	}
];

defaultSelect.addEventListener("click", function(event) {
	if(options.style.display === "none") {
		options.style.display = "block";
	}
	else {
		options.style.display = "none";
	}
}, false);

for(const option of document.querySelectorAll(".custom-option")) {
	option.addEventListener('click', function() {
		if(!this.classList.contains("selected")) {
			this.parentNode.parentNode.querySelector("li a.custom-option.selected").classList.remove("selected");
			this.classList.add("selected");
			this.closest(".search-dropdown").querySelector(".default-select span").textContent = this.textContent;
		}
	});
}

for(let header of headers) {
	header.addEventListener("click", function() {
		let column = this.getAttribute("data-column");
		let order = this.getAttribute("data-order");
		let icon = this.querySelector("i");
        icon.classList.remove("fa-sort-down") || icon.classList.remove("fa-sort-up");

		if(order == "desc") {
			this.setAttribute("data-order", "asc");
			jobData = jobData.sort((a,b) => a[column] > b[column] ? 1: -1);
			icon.classList.add("fa-sort-up");
		}
		else {
			this.setAttribute("data-order", "desc");
			jobData = jobData.sort((a,b) => a[column] < b[column] ? 1: -1);
			icon.classList.add("fa-sort-down");
		}
		loadTableData(jobData);
	});
}

function loadTableData(jobData) {
	const tableBody = document.getElementById("tableData");
	tableBody.innerHTML = ``;

	let dataHTML = ``;

	for(let job of jobData) {
		dataHTML += `<tr>
						<td>
							<input type="Checkbox" name="select-row">
						</td>
						<td>
							<div class="details-container">
								<div class="block">+</div>
								<div class="block">0</div>
								<div class="block">${job.pipeline}</div>
							</div>
						</td>
						<td>${job.code}</td>
						<td><a href="#" style="text-decoration: none; color: #0000ff;">${job.title}</a></td>
						<td>${job.city}</td>
			 			<td>${job.state}</td>
						<td>${job.by}</td>
						<td>${job.on}</td>
					</tr>
					`;
	}
	tableBody.innerHTML = dataHTML;
}

let searchInput = document.getElementById("search-input");

function searchTable(value, data) {
	let filteredData = [];

	for(let i = 0; i < data.length; i++) {
		value = value.toLowerCase();
		let selected = document.querySelector("a.custom-option.selected");
		let searchCredential = null;

		if(selected.innerHTML === "City ") {
			searchCredential = data[i].city.toLowerCase();
		}
		else {
			searchCredential = data[i].title.toLowerCase();
		}

		if(searchCredential.includes(value)) {
			filteredData.push(data[i]);
		}
	}

	return filteredData;
}

searchInput.addEventListener("keyup", function() {
	let value = this.value;

	let newData = searchTable(value, jobData);
	loadTableData(newData);
});

window.addEventListener("click", function(event) {
	const select = document.querySelector('.search-dropdown');
    if (!select.contains(event.target)) {
		options.style.display = "none";
    }
});

window.onload = () => {
	loadTableData(jobData);
};