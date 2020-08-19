const data = document.getElementsByClassName("data")[0];
const mainHeading = document.getElementsByClassName("main-heading")[0];

function welcomeScreen() {
    data.innerHTML = "";
    mainHeading.innerText = "Welcome";
}

function getColours() {
    fetch("https://reqres.in/api/products/")
        .then((res) => res.json())
        .then((res) => {
            colours = res.data;
            console.log("Colors Data", colours);

            mainHeading.innerText = "Colours";

            let blurbsContainer = document.createElement("div");
            blurbsContainer.className = "blurbs-container";
            data.innerText = "";

            colours.forEach((color) => {
                let imageDiv = document.createElement("div");
                imageDiv.className = "blurb";
                imageDiv.innerHTML = `
                <div style="background-color:${color.color};">
                <h3 >${color.color}</h3>
                <div class="color-info">            
                
                <p class="color-year">${color.year}</p>
                <p class="color-code">${color.name}</p>
                </div>
                </div>
                `;
                data.appendChild(imageDiv);
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
    data.innerHTML = "";
    mainHeading.innerText = "User Data";
}