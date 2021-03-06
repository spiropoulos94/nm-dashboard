"use strict";
// Format code
// TODO remove redundant code

(function () {
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
    let responsiveTable = document.querySelector(".table-responsive");
    let wholePage = document.querySelector(".whole-page");
    let coloursLink = document.getElementById("colours");
    let usersLink = document.getElementById("users")
    let menuItems = document.querySelector(".menu-items")
    let navBar = document.querySelector("div.nav-bar");
    let data = document.querySelector(".data");
    let mainHeading = document.querySelector(".main-heading");
    let mainHeader = document.querySelector(".main-head-top-text");
    let flexibleField = document.querySelector(".flexible");
    let displayColorsLength = document.querySelector(".length");
    let burgerMenu = document.querySelector(".burger");
    let spinner = document.createElement("div");
    spinner.innerHTML ='<div id="wholePageSpinner" class="loader-wrapper dflex align-center flex-direction-col w100 h100"><div class="loader"></div><p class="loading-msg">loading...</p></div>';
    document.body.appendChild(spinner);
    menuItems.addEventListener('click', toggleNavbar)
    hideElement(responsiveTable);
    hideElement(wholePage);
    document.body.removeChild(spinner);
    showElement(wholePage);
    burgerMenu && burgerMenu.addEventListener("click", toggleNavbar);
     // Views eventListeners
    document.querySelector(".header-start").addEventListener("click", welcomeScreen);
    coloursLink.addEventListener("click", getColours);
    usersLink.addEventListener("click", getUsers);

    function toggleNavbar() {
      navBar.classList.toggle("nav-bar-open");
    }
    function hideElement(el) {
      if (!el.classList.contains("not-visible")) {
        el.classList.add("not-visible")
      }
    }
    function showElement(el) {
      if (el.classList.contains("not-visible")) {
        el.classList.remove("not-visible");
      }
    }
    function enableLink(domEltoEnable) {
      domEltoEnable.classList.add("active-link");
    }
    function disableLink(domEltoDisable) {
      domEltoDisable.classList.remove("active-link");
    }
    function showSpinner() {
      data.appendChild(spinner);
      hideElement(mainHeader);
    }
    const fetchURL = (url) => {
      const fetchedData = fetch(url)
        .then((result) => result.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.error(err.message);
        });

      return fetchedData;
    };
    // Welcome Screen ----------------
    function welcomeScreen() {
      hideElement(responsiveTable);
      disableLink(coloursLink);
      disableLink(usersLink);
      hideElement(data);
      hideElement(flexibleField)
      hideElement(displayColorsLength)
      mainHeading.innerText = "Welcome";
      
    }
    // Colours Screen ------------------
    function getColours() {
      let coloursDataDiv = document.createElement("div");
      let blurbsContainer = document.createElement("div");
      showElement(displayColorsLength)
      showElement(flexibleField)
      mainHeading.innerText = "Colours";
      showSpinner();
      showElement(data);
      showElement(document.querySelector(".main-head-top-text"));
      enableLink(coloursLink)
      disableLink(usersLink)

      if (responsiveTable) {
        hideElement(responsiveTable);
      }

      function renderColours(responseData) {
        hideElement(document.querySelector(".loader-wrapper"));
        coloursDataDiv.classList.add("colours-data", 'dflex', 'w100', 'h100')
        if (data.children.length < 3) {
          data.appendChild(coloursDataDiv);
        }

        let colours = responseData;

        colours.sort(function (a, b) {
          let keyA = a.year,
            keyB = b.year;
          // Compare the 2 dates
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        });

        blurbsContainer.classList.add("blurbs-container")

        flexibleField.innerText = "items :";
        displayColorsLength.innerText = `${colours.length}`;
        if (data.getElementsByClassName("blurb").length < colours.length) {
          colours.map((color) => {
            let imageDiv = document.createElement("div");
            imageDiv.classList.add("blurb","flex-direction-col")
            imageDiv.setAttribute("style", `background-color:${color.color}`);

            imageDiv.innerHTML = `
                          <p class="color-code" style="color:${color.color}" >${color.color}</p>
                          <div class="color-info dflex aling-center justify-between">
                          <p class="color-year">${color.year}</p>
                          <p class="color-name">${color.name}</p>
                          </div>
                          `;

            coloursDataDiv.appendChild(imageDiv);
          });
        }
      }

      fetchURL("https://reqres.in/api/products/").then((responseObj) => {
        // console.log(responseObj)
        renderColours(responseObj.data);
      });
    }
    //Users Screen ------------------
    function getUsers() {
      
      showElement(flexibleField)
      showSpinner();
      enableLink(usersLink)
      disableLink(coloursLink);
      
      
      if (document.querySelector(".colours-data")) {
        hideElement(document.querySelector(".colours-data"));
      }
      if (document.querySelector(".colours-data")) {
        data.removeChild(document.querySelector(".colours-data"));
      }
      if (window.sessionStorage.getItem("usersData")) {
        let sessionStorageData = JSON.parse(
          window.sessionStorage.getItem("usersData")
        );
        sessionStorageData && hydrateUsers(sessionStorageData);
      } else {
        fetchURL("https://reqres.in/api/users").then((responseObj) =>
          renderUsers(responseObj)
        );
      }
      function renderUsers(res) {
        //res.data.map((user) => (user.id = Math.random())); tried to give users random id values to test the following sorting function
        res.data.sort(function (a, b) {
          var keyA = a.id,
            keyB = b.id;
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return +1;
          return 0;
        });
        hydrateUsers(res.data);
        window.sessionStorage.setItem("usersData", JSON.stringify(res.data));
      }
    }
    function deleteUser() {
      let userID = null;
      let selectedRow = null;
      let userCheckboxes = document.querySelectorAll(".delete-checkbox");
      let userCheckboxesArray = Array.from(userCheckboxes);
      let deleteButton = this;

      //ANTI NA PERASEIS THN SELECTED ROW KAI TO USER ID VRES TA APO TO GLOBAL SCOPE KAI KALESE TA MESA STO FUNCTION
      for (let i = 0; i < userCheckboxesArray.length; i++) {
        if (userCheckboxesArray[i].checked) {
          userID = userCheckboxesArray[i].id;
          selectedRow = userCheckboxesArray[i].parentElement.parentElement;
        }
      }

      // after specifying UserID and selectedRow proceed with the following  confirmation
      if (confirm(`Are you sure you want to delete user ${userID} ?`)) {
        //remove from table
        selectedRow.parentNode.removeChild(selectedRow);
        //remove from session storage
        let arrayJson = JSON.parse(window.sessionStorage.getItem("usersData"));
        let newArr = arrayJson.filter(
          (entry) => parseInt(entry.id) !== parseInt(userID) 
        );
        // Update storage
        window.sessionStorage.setItem("usersData", JSON.stringify(newArr));
        deleteButton.setAttribute("disabled", "disabled");
        // Tip: we usually set the name of attribute as the value for our code to be more clear and descriptive
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
      }
    }
    function hydrateUsers(fetchedData) {
      let displaySpace = document.getElementById("space");
      let tableStringHTML = "";
      hideElement(spinner);
      showElement(responsiveTable);
      showElement(data);
      showElement(mainHeader);

      mainHeading.innerText = "User Data";
      displaySpace.innerHTML =
        '<button class="delete-btn" type="button" disabled>Delete</button>';

      if (displaySpace.children.length > 1) {
        displaySpace.removeChild(displaySpace.lastChild);
      }
      displayColorsLength.innerHTML = "";
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

      document.querySelector(".tbody").addEventListener("change", () => {
        document.querySelector(".delete-btn").removeAttribute("disabled");

        document.querySelector(".delete-btn") &&
          document
            .querySelector(".delete-btn")
            .addEventListener("click", deleteUser);
      });
    }
}
  document.addEventListener("DOMContentLoaded", onloadFn);
})();
