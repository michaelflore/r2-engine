let form = document.forms[0];

function resetForm() {
    [...form.elements].forEach(function (element) {
        element.value = '';
    });
}

function loadForm(applicant) {
    [...form.elements].forEach(function (element) {
        element.value = applicant[element.name];
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    //Just to see its working
    for (const formElement of formData) {
        console.log(formElement);
    }

    let newPersonObject = {};

    formData.forEach((value, key) => newPersonObject[key] = value);

    let json = JSON.stringify(newPersonObject);
    const routeId = window.location.pathname.split("/")[3];

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState === 4) {
            window.location.href = "/applicants";
        }
    };

    xhttp.open("PUT", `/api/edit/${routeId}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(json);
    resetForm();
});

//Get the individuals credentials instead of all
window.onload = () => {
    let xhttp = new XMLHttpRequest();
    const routeId = window.location.pathname.split("/")[3];

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let applicant = JSON.parse(xhttp.responseText);

            loadForm(applicant);
        }
    };

    xhttp.open("GET", `/api/applicant/${routeId}`, true);
    xhttp.send();
};
