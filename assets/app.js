window.addEventListener("load", function() {
    //when page loads the spinner becomes hidden
    let spinner = document.getElementById("whole-page-spinner");

    spinner.style.display = "none";

    let data = document.getElementsByClassName("data")[0];
    let mainHeading = document.getElementsByClassName("main-heading")[0];
    let info = document.getElementById("info");
    let mainHeaderContainer = document.getElementsByClassName(
        "main-header-container"
    )[0];
    let flexibleField = document.getElementsByClassName("flexible")[0];
    let displayLength = document.getElementsByClassName("length")[0];
    let dataTable = document.getElementsByClassName("data-table")[0];

    let tableHead = document.getElementsByClassName("table-head")[0];

    let burgerMenu = document.getElementById("dropdown");
    burgerMenu.onclick = function() {
        let navBar = document.querySelector("div.nav-bar");
        if (burgerMenu.checked) {
            console.log("Its is checked!");
            navBar.setAttribute("style", "display:flex;");
        } else {
            navBar.setAttribute("style", "display:none;");
            navBar.className += "mobile-navbar";
        }
    };

    function welcomeScreen() {
        data.innerHTML = "";
        mainHeading.innerText = "Welcome";
        flexibleField.innerHTML = ``;
        displayLength.innerHTML = ``;
    }

    let options = document.getElementById("data-length");

    document
        .getElementsByClassName("logo-txt")[0]
        .addEventListener("click", welcomeScreen);

    function getColours() {
        fetch("https://reqres.in/api/products/")
            .then((res) => res.json())
            .then((res) => {
                colours = res.data;
                // console.log("Colours length", colours.length);

                colours.reverse();
                // console.log("Colours sorted", colours);

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

    document.getElementById("colours").addEventListener("click", getColours);

    function getUsers() {
        fetch("https://reqres.in/api/users")
            .then((res) => res.json())
            .then((res) => {
                localStorage.setItem("usersData", JSON.stringify(res.data));
                let usersData = JSON.parse(localStorage.getItem("usersData"));

                // function deleteFromStorage(v) {
                //     console.log(usersData[v]);
                //     usersData.splice(v, 1);
                //     console.log("user data  inside DELETE FOM STORAGE ,", usersData);
                //     return usersData;
                // }

                //console.log("user data outside is", usersData);

                data.innerHTML = "";
                mainHeading.innerText = "User Data";

                let displaySpace = document.getElementById("space");
                let displaySpaceWrapper = document.getElementById("display-wrapper");
                displaySpace.innerHTML =
                    '<button class="delete-btn" type="button" disabled>Delete</button>';

                if (displaySpace.children.length > 1) {
                    displaySpace.removeChild(displaySpace.lastChild);
                }

                displayLength.innerHTML = ``;
                //  Converting Data to Table

                dataTable.classList.remove("not-visible");
                data.appendChild(dataTable);

                let tableStringHTML = "";

                usersData.forEach((user) => {
                    tableStringHTML += `<tr>
                    <td class="td user-checkbox "><input type="radio" name="radio-btn" class="delete-checkbox " id="${
                      user.id
                    }" /> 
                      <label for="radio-btn"></label> </td>
                    <td class="td user-id">${user.id}</td>
                    <td class="td user-last">${user.last_name}</td>
                    <td class="td user-first">${user.first_name}</td>
                    <td class="td user-email">${user.email}</td>
                    <td class="td user-avatar"> ${user.avatar.substring(
                      user.avatar.lastIndexOf("r/") + 2,
                      user.avatar.lastIndexOf("/128")
                    )}</td></tr>
                  `;
                });

                dataTable.querySelector("tbody").innerHTML = tableStringHTML;
                let checkboxes = document.querySelectorAll("input.delete-checkbox");

                function selectUser() {
                    // console.log(checkboxes);
                    checkboxes.forEach((checkbox) => {
                        if (checkbox.checked) {
                            let v = checkbox.id;

                            document.getElementById("myTable").deleteRow(checkbox.id);
                        }
                    });
                }

                checkboxes.forEach((checkbox) => {
                    checkbox.addEventListener("change", function() {
                        if (this.checked) {
                            document
                                .querySelector("button.delete-btn")
                                .removeAttribute("disabled");
                            const deleteButton = document.querySelector("button.delete-btn");
                            console.log("a radio is checked, button is enabled");
                            deleteButton.addEventListener("click", selectUser);
                        }
                    });
                });
            });
    }
    document.getElementById("users").addEventListener("click", getUsers);
});