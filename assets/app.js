window.addEventListener("load", function() {
    let data = document.getElementsByClassName("data")[0];
    let mainHeading = document.getElementsByClassName("main-heading")[0];
    let info = document.getElementById("info");
    let mainHeaderContainer = document.getElementsByClassName(
        "main-header-container"
    )[0];

    let flexibleField = document.getElementsByClassName("flexible")[0];
    let displayLength = document.getElementsByClassName("length")[0];

    function welcomeScreen() {
        data.innerHTML = "";
        mainHeading.innerText = "Welcome";
        flexibleField.innerHTML = ``;
        displayLength.innerHTML = ``;
    }

    let options = document.getElementById("data-length");

    document
        .getElementsByClassName("logo-txt")[0]
        .addEventListener("click", () => {
            welcomeScreen();
        });

    function getColours() {
        fetch("https://reqres.in/api/products/")
            .then((res) => res.json())
            .then((res) => {
                colours = res.data;
                console.log("Colours length", colours.length);
                console.log("Colors Data", colours);

                mainHeading.innerText = "Colours";

                let blurbsContainer = document.createElement("div");
                blurbsContainer.className = "blurbs-container";
                data.innerText = "";

                flexibleField.innerHTML = `<p>items :</p>`;
                displayLength.innerHTML = `<p>${colours.length}</p>`;

                colours.forEach((color) => {
                    let imageDiv = document.createElement("div");
                    imageDiv.className = "blurb";
                    imageDiv.setAttribute("style", `background-color:${color.color}`);
                    imageDiv.innerHTML = `
                <h3 class="color-code" style="color:${color.color}" >${color.color}</h3>
                <div class="color-info">
                <p class="color-year">${color.year}</p>
                <p class="color-name">${color.name}</p>
                </div>
                `;
                    data.appendChild(imageDiv);
                });
            });
    }

    document.getElementById("colours").addEventListener("click", () => {
        getColours();
    });

    function getUsers() {
        fetch("https://reqres.in/api/users")
            .then((res) => res.json())
            .then((res) => {
                let users = res.data;
                console.log("User Data", users);
            });
        data.innerHTML = "";
        mainHeading.innerText = "User Data";

        flexibleField.innerHTML = `<button class="delete-btn">Delete</button>`;

        displayLength.innerHTML = ``;
    }

    document.getElementById("users").addEventListener("click", () => {
        getUsers();
    });
});