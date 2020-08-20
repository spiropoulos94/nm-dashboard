window.addEventListener("load", function() {
    let data = document.getElementsByClassName("data")[0];
    let mainHeading = document.getElementsByClassName("main-heading")[0];
    let info = document.getElementById("info");
    let mainHeaderContainer = document.getElementsByClassName(
        "main-header-container"
    )[0];
    let flexibleField = document.getElementsByClassName("flexible")[0];
    let displayLength = document.getElementsByClassName("length")[0];
    let dataTable = document.getElementsByClassName("data-table")[0];
    console.log(dataTable);
    let tableHead = document.getElementsByClassName("table-head")[0];

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

                colours.reverse();
                console.log("Colours sorted", colours);

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
                //let usersData = res.data;
                localStorage.setItem("usersData", JSON.stringify(res.data));
                let usersData = JSON.parse(localStorage.getItem("usersData"));
                //confirm(`Are you sure you want to delete this user?`);

                data.innerHTML = "";
                mainHeading.innerText = "User Data";

                let deleteButton = document.createElement("button");
                deleteButton.innerHTML = "DELETE";
                deleteButton.setAttribute("disabled", true);
                deleteButton.className = "delete-btn";
                console.log(deleteButton);

                let displaySpace = document.getElementById("space");
                let displaySpaceWrapper = document.getElementById("display-wrapper");

                displaySpace.appendChild(deleteButton);

                if (displaySpace.children.length > 1) {
                    displaySpace.removeChild(displaySpace.lastChild);
                }

                document
                    .getElementsByClassName("delete-btn")[0]
                    .addEventListener("click", () => {
                        deleteUser();
                    });

                function deleteUser(e) {
                    console.log("USER DELETEEEED");
                }
                displayLength.innerHTML = ``;
                //Converting Data to Table

                dataTable.classList.remove("not-visible");
                data.appendChild(dataTable);

                usersData.forEach((user) => {
                    let tr = document.createElement("tr");
                    tr.innerHTML = `
                    <td class="td user-checkbox"><input type="checkbox" id="delete-check"> <label for="delete-check"></label> </td>
                    <td class="td user-id">${user.id}</td>
                    <td class="td user-last">${user.last_name}</td>
                    <td class="td user-first">${user.first_name}</td>
                    <td class="td user-email">${user.email}</td>
                    <td class="td user-avatar"> ${user.avatar.substring(
                      user.avatar.lastIndexOf("r/") + 2,
                      user.avatar.lastIndexOf("/128")
                    )}</td>
                    `;
                    dataTable.appendChild(tr);
                    //on the following line I used the -1 on dataTable length because it includes the table head elements.
                    if (dataTable.children.length - 1 > usersData.length) {
                        dataTable.removeChild(dataTable.lastChild);
                    }
                });
            });
    }
    document.getElementById("users").addEventListener("click", () => {
        getUsers();
    });
});