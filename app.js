const main_content = document.getElementsByClassName("main-screen-content")[0];

let mainHeading = document.getElementsByClassName("main-heading")[0];

function welcomeScreen() {
    mainHeading.innerText = "Welcome";
}

function getColours() {
    fetch("https://reqres.in/api/products/")
        .then((res) => res.json())
        .then((res) => {
            colours = res.data;
            console.log("Colors Data", colours);

            let blurbsContainer = document.createElement("div");
            blurbsContainer.className = "blurbs-container";

            colours.forEach((color) => {
                let imageDiv = document.createElement("div");
                imageDiv.className = "blurb";
                imageDiv.innerHTML = `<h3>${color.name}</h3>
                <p>${color.year}</p>
                `;
                blurbsContainer.appendChild(imageDiv);
            });
        });
}

function getUsers() {
    fetch("https://reqres.in/api/users")
        .then((res) => res.json())
        .then((res) => {
            let users = res.data;
            console.log("User Data", users);
        });
}