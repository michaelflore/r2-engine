const form = document.getElementById("signup-form");

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

    formData.forEach((value, key) => personObject[key] = value);

    let json = JSON.stringify(personObject);

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(xhttp.responseText);
        }
    };

    xhttp.open("POST", "/api/auth/signup", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(json);

    resetForm();
});