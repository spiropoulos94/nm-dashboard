const main_content = document.getElementsByClassName("main-screen-content")[0];

let mainHeading = document.createElement("h1")

function welcomeScreen() {

    mainHeading.innerText = "Welcome"
    main_content.appendChild(mainHeading)
    main_content.innerHTML = "<p>fafasfafas</p>"
    console.log(mainHeading)
}

function getColours() {
    fetch("https://reqres.in/api/products/")
        .then((res) => res.json())
        .then((res) => {
            colours = res.data;
            console.log("Colors Data", colours);
            let h1 = document.createElement('h1')
            h1.innerText = "Colours"
                //main_content.innerHTML = "<h1>Colours</h1>";
            let blurbsContainer = document.createElement("div");
            blurbsContainer.className = "blurbs-container";
            main_content.innerHTML = ""
            main_content.appendChild(h1)
            main_content.appendChild(blurbsContainer);

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
            main_content.innerHTML = "<h1>Users</h1>";
        });
}