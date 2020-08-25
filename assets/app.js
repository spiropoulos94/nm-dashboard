document.addEventListener("DOMContentLoaded", onloadFn);

let navBar = document.querySelector("div.nav-bar");
let deleteButton = document.querySelector(".delete-btn");
window.addEventListener("resize", function() {
    if (window.innerWidth < 730) {
        navBar.className += " not-visible";
    } else {
        navBar.classList.remove("not-visible");
    }
});

// The following function was added for development purposes.
function KeyPress(e) {
    var evtobj = window.event ? event : e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        sessionStorage.clear();
        window.location.reload();
        console.log("Session storage cleared");
    }
}

document.onkeydown = KeyPress;

function onloadFn() {
    //when page loads the spinner becomes hidden

    let spinner = document.getElementById("wholePageSpinner");

    document.querySelector(".data").innerHTML = "";

    spinner.style.display = "none";

    let data = document.querySelector(".data");
    let mainHeading = document.querySelector(".main-heading");

    let info = document.getElementById("info");
    let mainHeaderContainer = document.getElementsByClassName(
        "main-header-container"
    )[0];
    let flexibleField = document.querySelector(".flexible");
    let displayLength = document.querySelector(".length");
    let dataTable = document.querySelector(".data-table");

    let tableHead = document.querySelector("table-head");

    let burgerMenu = document.querySelector("button.ham");

    // TODO For this project either use eventListeners on events. What is the difference between the two?
    //Answer : Events overwrite each other while even listeners don't.

    function toggleNavbar() {
        navBar.classList.toggle("not-visible");
    }

    burgerMenu.addEventListener("click", toggleNavbar);

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
    // spinner mesa sta screens TODO

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
                <p class="color-code" style="color:${color.color}" >${color.color}</p>
                <div class="color-info">
                <p class="color-year">${color.year}</p>
                <p class="color-name">${color.name}</p>
                </div>
                `;
                    data.appendChild(imageDiv);
                });
            });
    }

    // Users Screen ----------------
    let sessionStorageData = JSON.parse(
        window.sessionStorage.getItem("usersData")
    );

    function hydrateUsers(fetchedData) {
        let displaySpace = document.getElementById("space");
        let displaySpaceWrapper = document.getElementById("display-wrapper");
        let tableStringHTML = "";

        // console.log(tableStringHTML);

        data.innerHTML = `<div class="bd-example">
        <div class="table-responsive">
            <table id="myTable" cell-spacing="0" cell-padding="0" class="data-table">
                <thead>
                    <tr class="table-head">
                        <th></th>
                        <th>ID</th>
                        <th>LAST NAME</th>
                        <th>FIST NAME</th>
                        <th>EMAIL</th>
                        <th>AVATAR</th>
                    </tr>
                </thead>
                <tbody class="tbody"></tbody>
            </table>
        </div>
    </div>`;

        mainHeading.innerText = "User Data";
        displaySpace.innerHTML =
            '<button class="delete-btn" type="button" disabled>Delete</button>';

        let deleteButton = document.querySelector(".delete-btn");

        if (displaySpace.children.length > 1) {
            displaySpace.removeChild(displaySpace.lastChild);
        }

        displayLength.innerHTML = "";

        //  Converting Data to Table

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
        document.querySelector(".tbody").innerHTML = tableStringHTML;

        let checkboxes = document.querySelectorAll("input.delete-checkbox");
        let selectedRow = null;
        let userID = null;

        bdexample = document.querySelector(".bd-example");
        tableResponsive = document.querySelector(".table-responsive");

        // Note if any selector you are trying to immediately use is not in the DOM then you'll have an error
        deleteButton &&
            deleteButton.addEventListener("click", () => {
                deleteUser(selectedRow, userID, deleteButton);
            });
    }

    document.querySelector("tbody") &&
        document.querySelector("tbody").addEventListener("change", (e) => {
            deleteButton.removeAttribute("disabled");
            selectedRow = e.target.parentNode.parentNode;
            userID = selectedRow.children[1].innerText;
        });
}

// Deleting a user/row
// TODO Review the following function
function deleteUser(selectedRow, userID, deleteButton) {
    userID = selectedRow.children[1].innerText;
    confirm(`Are you sure you want to delete user with ID ${userID} ?`);
    // check confirm

    //remove from table
    selectedRow.parentNode.removeChild(selectedRow);

    //remove from session storage
    let arrayJson = JSON.parse(window.sessionStorage.getItem("usersData"));

    let newArr = arrayJson.filter(
        (entry) => parseInt(entry.id) != parseInt(userID)
    );

    // Set button to disabled
    // TODO You might need to learn more about boolean attributes

    deleteButton.setAttribute("disabled", false);

    // Update storage
    window.sessionStorage.setItem("usersData", JSON.stringify(newArr));
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
                console.log("users hydrated by fetching data");
                hydrateUsers(res.data);

                window.sessionStorage.setItem("usersData", JSON.stringify(res.data));
            });
    }
}

// Views eventListeners
document.getElementById("colours").addEventListener("click", getColours);
document.getElementById("users").addEventListener("click", getUsers);
// reposition similar fns
window.removeEventListener("load", onloadFn);