"use strict";

(function () {
  // 'use strict'; TODO enable strict mode and correct your code DONE

  let navBar = document.querySelector("div.nav-bar");

  // The following function was added for development purposes.
  function clearStorageShortcut(e) {
    var evtobj = window.event ? event : e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
      sessionStorage.clear();
      window.location.reload();
      console.log("Session storage cleared");
    }
  }

  document.onkeydown = clearStorageShortcut;

  function onloadFn() {
    let spinner = document.getElementById("wholePageSpinner");
    let mainScreen = document.querySelector(".main-screen");
    let data = document.querySelector(".data");
    let mainHeading = document.querySelector(".main-heading");
    let info = document.getElementById("info");
    // let mainHeaderContainer = document.getElementsByClassName(
    //   "main-header-container"
    // )[0]; // TODO

    // NOTE: Selectors should be more specific
    let flexibleField = document.querySelector(".flexible");
    let displayLength = document.querySelector(".length");

    let dataTable = document.querySelector(".data-table");
    // let tableHead = document.querySelector(".table-head"); // TODO
    let burgerMenu = document.querySelector("button.ham");
    // let options = document.getElementById("data-length"); // TODO
    // Reset main section data
    document.querySelector(".data").innerHTML = ""; // TODO

    // Hide spinner
    spinner.style.display = "none";

    // Welcome Screen ----------------

    function welcomeScreen() {
      data.innerHTML = "";
      mainHeading.innerText = "Welcome";
      flexibleField.innerHTML = ``;
      displayLength.innerHTML = ``;
    }

    document
      .getElementsByClassName("logo-txt")[0] // TODO
      .addEventListener("click", welcomeScreen);

    // Colours Screen ------------------
    // spinner mesa sta screens TODO

    function getColours() {
      // TODO Q: In the feature if we have 2 new views will we have to write the next 5 lines of code in the functions that will render those views?
      mainScreen.appendChild(spinner); // TODO Review
      spinner.setAttribute("style", "display:flex;");
      document
        .querySelector(".main-screen-content")
        .setAttribute("style", "display:none");
      // END

      fetch("https://reqres.in/api/products/")
        .then((res) => res.json())
        .then((res) => {
          document
            .querySelector(".main-screen-content")
            .setAttribute("style", "display:block");

          let colours = res.data; // TODO DONE

          // Sorted with code from https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
          colours.sort(function (a, b) {
            var keyA = a.year,
              keyB = b.year;
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });
          //console.log(colours);
          // TODO Use sort DONE
          mainHeading.innerText = "Colours";

          let blurbsContainer = document.createElement("div");
          blurbsContainer.className = "blurbs-container";
          data.innerText = "";

          flexibleField.innerHTML = `<p>items :</p>`;
          displayLength.innerHTML = `<p>${colours.length}</p>`;

          colours.map((color) => {
            // TODO use map DONE
            // map seems to be slighly faster according to https://www.measurethat.net/Benchmarks/Show/2090/0/array-loop-vs-foreach-vs-map#latest_results_block
            // and it also returns a new arr so it can be possibly chained to other methods https://codeburst.io/javascript-map-vs-foreach-f38111822c0f
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

            spinner.setAttribute("style", "display:none;");
          });
        });
    }

    // Deleting a user/row
    // TODO Review the following function  DONE https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    function deleteUser(selectedRow, userID, deleteButton) {
      userID = selectedRow.children[1].innerText;

      if (confirm(`Are you sure you want to delete user ${userID} ?`)) {
        //remove from table
        selectedRow.parentNode.removeChild(selectedRow);

        //remove from session storage
        let arrayJson = JSON.parse(window.sessionStorage.getItem("usersData"));

        let newArr = arrayJson.filter(
          (entry) => parseInt(entry.id) != parseInt(userID) // TODO equality strict
        );

        // Set button to disabled
        deleteButton.setAttribute("disabled", "disabled");

        // Update storage
        window.sessionStorage.setItem("usersData", JSON.stringify(newArr));

        alert(`User ${userID} deleted!`);
        deleteButton.setAttribute("disabled", ""); // TODO DONE https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
      }
    }

    function getUsers() {
      mainScreen.appendChild(spinner);
      spinner.setAttribute("style", "display:flex;");
      document
        .querySelector(".main-screen-content")
        .setAttribute("style", "display:none");

      if (window.sessionStorage.getItem("usersData")) {
        let sessionStorageData = JSON.parse(
          window.sessionStorage.getItem("usersData")
        );
        hydrateUsers(sessionStorageData);
      } else {
        fetch("https://reqres.in/api/users")
          .then((res) => res.json())
          .then((res) => {
            hydrateUsers(res.data);

            window.sessionStorage.setItem(
              "usersData",
              JSON.stringify(res.data)
            );
          });
      }
    }

    // Users Screen ----------------
    let sessionStorageData = JSON.parse(
      window.sessionStorage.getItem("usersData")
    );

    function hydrateUsers(fetchedData) {
      spinner.setAttribute("style", "display:flex;");
      document
        .querySelector(".main-screen-content")
        .setAttribute("style", "display:block");

      let displaySpace = document.getElementById("space");
      let displaySpaceWrapper = document.getElementById("display-wrapper");
      let tableStringHTML = "";

      data.innerHTML = `
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

      let bdexample = document.querySelector(".bd-example");
      let tableResponsive = document.querySelector(".table-responsive");

      deleteButton &&
        deleteButton.addEventListener("click", () => {
          deleteUser(selectedRow, userID, deleteButton);
        });

      document.querySelector("tbody") &&
        document.querySelector("tbody").addEventListener("change", (e) => {
          deleteButton.removeAttribute("disabled");
          selectedRow = e.target.parentNode.parentNode;
          userID = selectedRow.children[1].innerText;
        });
    }

    function toggleNavbar() {
      navBar.classList.toggle("not-visible");
    }

    burgerMenu && burgerMenu.addEventListener("click", toggleNavbar);

    // Views eventListeners
    document.getElementById("colours").addEventListener("click", () => {
      getColours();
      document.getElementById("colours").className += " active-link";
      document.getElementById("users").classList.remove("active-link");
    });

    document.getElementById("users").addEventListener("click", getUsers);

    document.getElementById("users").addEventListener("click", () => {
      getUsers();
      document.getElementById("users").className += " active-link";
      document.getElementById("colours").classList.remove("active-link");
    });
  }

  // TODO review
  document.addEventListener("DOMContentLoaded", onloadFn);
  window.removeEventListener("load", onloadFn);

  window.addEventListener("resize", function () {
    if (window.innerWidth < 730) {
      navBar.className += " not-visible";
    } else {
      navBar.classList.remove("not-visible");
    }
  });
})();
