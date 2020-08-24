// the following event listener is responsible for displaying or not the menu based on the window width

window.addEventListener("resize", function() {
    let navBar = document.querySelector("div.nav-bar");
    if (window.innerWidth < 730) {
        navBar.className += " not-visible";
    } else {
        navBar.classList.remove("not-visible");
    }
});

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
    let flexibleField = document.querySelector(".flexible");
    let displayLength = document.querySelector(".length");
    let dataTable = document.querySelector(".data-table");

    let tableHead = document.querySelector("table-head");

    let burgerMenu = document.querySelector("button.ham");

    burgerMenu.onclick = function() {
        let navBar = document.querySelector("div.nav-bar");
        navBar.classList.toggle("not-visible");
    };

    // Welcome Screen ----------------

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

    // Colours Screen ------------------

    function getColours() {
        fetch("https://reqres.in/api/products/")
            .then((res) => res.json())
            .then((res) => {
                colours = res.data;

                colours.reverse();

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

    // Users Screen ----------------
    let sessionStorageData = JSON.parse(
        window.sessionStorage.getItem("usersData")
    );

    function hydrateUsers(fetchedData) {
        data.innerHTML = "";
        mainHeading.innerText = "User Data";

        let displaySpace = document.getElementById("space");
        let displaySpaceWrapper = document.getElementById("display-wrapper");
        displaySpace.innerHTML =
            '<button class="delete-btn" type="button" disabled>Delete</button>';

        //TODO review
        if (displaySpace.children.length > 1) {
            displaySpace.removeChild(displaySpace.lastChild);
        }

        displayLength.innerHTML = "";
        //  Converting Data to Table

        dataTable.classList.remove("not-visible");
        let bdxample = document.createElement("div");
        bdxample.className = "bd-example";

        let tableResponsive = document.createElement("div");
        tableResponsive.className = "table-responsive";

        data.appendChild(bdxample);
        bdxample.appendChild(tableResponsive);
        tableResponsive.appendChild(dataTable);

        let tableStringHTML = "";

        fetchedData.forEach((user) => {
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
        let selectedRow = null;
        let userID = null;

        // Deleting a user/row  -----------------------------------------------------------------

        function deleteUser(selectedRow, userId) {
            confirm(`Are you sure you want to delete user with ID ${userID} ?`);

            //remove from table
            selectedRow.parentNode.removeChild(selectedRow);
            // console.log(userID, parseInt(selectedRow.children[1].innerText));

            //remove from session storage
            let arrayJson = JSON.parse(window.sessionStorage.getItem("usersData"));

            let newArr = arrayJson.filter(
                (entry) => parseInt(entry.id) != parseInt(userID)
            );
            window.sessionStorage.setItem("usersData", JSON.stringify(newArr));
            // console.log("new arr is ", newArr);
            document.querySelector(".delete-btn").setAttribute("disabled", true);
        }

        document.querySelector(".delete-btn").addEventListener("click", () => {
            deleteUser(selectedRow);
        });

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function(e) {
                if (this.checked) {
                    document.querySelector(".delete-btn").removeAttribute("disabled");

                    selectedRow = this.parentNode.parentNode;
                    userID = selectedRow.children[1].innerText;
                }
            });
        });
    }

    function getUsers() {
        if (window.sessionStorage.getItem("usersData")) {
            let sessionStorageData = JSON.parse(
                window.sessionStorage.getItem("usersData")
            );
            console.log("users hydrated from local storage");
            hydrateUsers(sessionStorageData);
        } else {
            fetch("https://reqres.in/api/users")
                .then((res) => res.json())
                .then((res) => {
                    window.sessionStorage.setItem("usersData", JSON.stringify(res.data));
                    console.log("users hydrated by fetching data");
                    hydrateUsers(res.data);
                });
        }
    }
    document.getElementById("users").addEventListener("click", getUsers);
});