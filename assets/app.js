// the following event listener is responsible for displaying or not the menu based on the window width

// TODO remove unused variables
// TODO Avoid selecting the same element more than once

window.addEventListener("resize", function() {
    let navBar = document.querySelector("div.nav-bar");
    if (window.innerWidth < 730) {
        navBar.className += " not-visible";
    } else {
        navBar.classList.remove("not-visible");
    }
});

function onloadFn() {
    //when page loads the spinner becomes hidden
    // TODO IDs naming convention
    let spinner = document.getElementById("whole-page-spinner");

    spinner.style.display = "none";

    let data = document.getElementsByClassName("data")[0];
    let mainHeading = document.getElementsByClassName("main-heading")[0];
    let info = document.getElementById("info");
    let mainHeaderContainer = document.getElementsByClassName("main-header-container")[0];
    let flexibleField = document.querySelector(".flexible");
    let displayLength = document.querySelector(".length");
    let dataTable = document.querySelector(".data-table");

    let tableHead = document.querySelector("table-head");

    let burgerMenu = document.querySelector("button.ham");

    // TODO For this project either use eventListeners on events. What is the difference between the two?
    burgerMenu.onclick = function () {
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
                    // TODO Review HTML headings order & headings use cases.
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

    // Users Screen ----------------
    let sessionStorageData = JSON.parse(window.sessionStorage.getItem("usersData"));

    function hydrateUsers(fetchedData) {
        let displaySpace = document.getElementById("space");
        let displaySpaceWrapper = document.getElementById("display-wrapper");
        let bdxample = document.createElement("div");
        let tableResponsive = document.createElement("div");
        let tableStringHTML = "";

        data.innerHTML = "";
        mainHeading.innerText = "User Data";
        displaySpace.innerHTML ='<button class="delete-btn" type="button" disabled>Delete</button>';

        if (displaySpace.children.length > 1) {
            displaySpace.removeChild(displaySpace.lastChild);
        }

        displayLength.innerHTML = "";

        //  Converting Data to Table
        dataTable.classList.remove("not-visible");
        bdxample.className = "bd-example";
        tableResponsive.className = "table-responsive";

        data.appendChild(bdxample);
        bdxample.appendChild(tableResponsive);
        tableResponsive.appendChild(dataTable);

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

        // Note if any selector you are trying to immediately use is not in the DOM then you'll have an error
        document.querySelector(".delete-btn").addEventListener("click", () => {
            deleteUser(selectedRow, userID);
        });

        document.querySelector("tbody").addEventListener("change", (e) => {
            document.querySelector(".delete-btn").removeAttribute("disabled");
            selectedRow = e.target.parentNode.parentNode;
            userID = selectedRow.children[1].innerText;
        });
    }

    // Deleting a user/row
    // TODO Review the following function
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

        // Set button to disabled
        // TODO You might need to learn more about boolean attributes
        document.querySelector(".delete-btn").setAttribute("disabled", "disabled");

        // Update storage
        window.sessionStorage.setItem("usersData", JSON.stringify(newArr));
    }

    function getUsers() {
        if (window.sessionStorage.getItem("usersData")) {
            let sessionStorageData = JSON.parse(window.sessionStorage.getItem("usersData"));
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

    window.removeEventListener("load", onloadFn);
}

// TODO Code should execute when the HTML is loaded, and the DOM tree is built.
window.addEventListener("load", onloadFn);