// Format code
// TODO keep styling in your CSS file
// "workbench.colorCustomizations": {
//   "editorUnnecessaryCode.border": "#dd7aab"
// },  ==> added this to setting folder to auto-find the unused ones.
// TODO remove redundant code

(function () {
  ("use strict");

  let responsiveTable = document.querySelector(".table-responsive");
  let wholePage = document.querySelector(".whole-page");
  let coloursLink = document.getElementById("colours");
  let spinner = document.createElement("div");
  responsiveTable.className += " not-visible";
  // TODO Why use string interpolation? What is the difference between "", '', and ``?
  // ANSWER  Inside the `` quotes we can use variables using the ${} syntax
  spinner.innerHTML = `<div id="wholePageSpinner" class="loader-wrapper"><div class="loader"></div><p class="loading-msg">loading...</p></div> `;
  let navBar = document.querySelector("div.nav-bar");
  document.body.appendChild(spinner);

  wholePage.className += " not-visible";

  document.querySelector(".loader-wrapper").display = "block";

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
    document.body.removeChild(spinner);

    wholePage.classList.remove("not-visible");

    let data = document.querySelector(".data");
    let mainHeading = document.querySelector(".main-heading");
    let mainHeader = document.querySelector(".main-head-top-text");

    let flexibleField = document.querySelector(".flexible");
    let displayColorsLength = document.querySelector(".length");
    let burgerMenu = document.querySelector(".burger");

    function showSpinner() {
      data.appendChild(spinner);
      mainHeader.style.display = "none";
    }

    // Welcome Screen ----------------

    function welcomeScreen() {
      responsiveTable.className += " not-visible";

      if (!mainHeader.classList.contains("block")) {
        mainHeader.className += " block";
      }

      if (!data.classList.contains("not-visible")) {
        data.className += " not-visible";
      }

      mainHeading.innerText = "Welcome";
      flexibleField.innerHTML = ``;
      displayColorsLength.innerHTML = ``;
    }

    document
      .querySelector(".header-start")
      .addEventListener("click", welcomeScreen);

    // Colours Screen ------------------

    function getColours() {
      showSpinner();
      data.classList.remove("not-visible");
      coloursLink.className += " active-link";
      document.getElementById("users").classList.remove("active-link");
      if (responsiveTable) {
        responsiveTable.className += " not-visible";
      }

      fetch("https://reqres.in/api/products/")
        .then((res) => res.json())
        .then((res) => {
          document
            .querySelector(".loader-wrapper")
            .setAttribute("style", "display:none");
          let mainScreenContent = document.querySelector(
            ".main-screen-content"
          );

          mainScreenContent.setAttribute("style", "display:block");

          document
            .querySelector(".main-head-top-text")
            .setAttribute("style", "display:flex");

          data.setAttribute("style", "height:initial");
          data.style.width = "105%";

          let coloursDataDiv = document.createElement("div");
          coloursDataDiv.className = "colours-data";

          if (data.children.length < 3) {
            data.appendChild(coloursDataDiv);
          }

          let colours = res.data;

          // Sorted with code from https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
          colours.sort(function (a, b) {
            var keyA = a.year,
              keyB = b.year;
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });

          mainHeading.innerText = "Colours";

          let blurbsContainer = document.createElement("div");
          blurbsContainer.className = "blurbs-container";

          flexibleField.innerHTML = "<p>items :</p>";
          displayColorsLength.innerHTML = `<p>${colours.length}</p>`;
          if (data.getElementsByClassName("blurb").length < colours.length) {
            colours.map((color) => {
              // TODO use map DONE
              // map seems to be slightly faster according to
              // https://www.measurethat.net/Benchmarks/Show/2090/0/array-loop-vs-foreach-vs-map#latest_results_block
              // and it also returns a new arr so it can be possibly chained to other methods
              // https://codeburst.io/javascript-map-vs-foreach-f38111822c0f
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

              coloursDataDiv.appendChild(imageDiv);
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert(`Request failed. Please try again later. Error:${err}`);
        });
    }

    // Deleting a user/row
    // TODO Review the following function
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    
    function deleteUser() {
      //  TODO get delete button element not from variable
      // let deleteButton = document.querySelector(".delete-btn");


      //ANTI NA PERASEIS THN SELECTED ROW KAI TO USERID VRES TA APO TO GLOBAL SCOPE KAI KALESE TA MESA STO FUNCTION
      //otan kanei klik vale to na vrei pio row einai selected kai meta na to svisei

      //pws ma exw access sto button mesa ston event handler!(delete user)
      //vres selectedRow kai userID
      let selectedRow = null;
      let userID = null;
      
      
      let userCheckboxes = document.querySelectorAll(".delete-checkbox")
      

      let userCheckboxesArray = Array.from(userCheckboxes)
      console.log(userCheckboxesArray)

      for(let i=0; i<userCheckboxesArray.length; i++){
        if(userCheckboxesArray[i].checked){
          console.log(userCheckboxesArray[i].id)
          userID = i + 1
          console.log(userID)
        }
      }

     
      
      
      
      
      //after specifying UserID and selectedRow proceed with the following  confirmation
    //  if (confirm(`Are you sure you want to delete user ${userID} ?`)) {
    //    //remove from table
    //    selectedRow.parentNode.removeChild(selectedRow);
    //    //remove from session storage
    //    let arrayJson = JSON.parse(window.sessionStorage.getItem("usersData"));
    //    let newArr = arrayJson.filter(
    //      (entry) => parseInt(entry.id) != parseInt(userID) // TODO equality strict
    //    );
    //    // Update storage
    //    window.sessionStorage.setItem("usersData", JSON.stringify(newArr));
    //    deleteButton.setAttribute("disabled", "disabled");
    //    // Tip: we usually set the name of attribute as the value for our code to be more clear and descriptive
    //    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    //  }
     
    }

    function getUsers() {
      showSpinner();
      
      data.style.width = "100%";
      if (document.querySelector(".colours-data")) {
        data.removeChild(document.querySelector(".colours-data"));
      }
      if (window.sessionStorage.getItem("usersData")) {
        let sessionStorageData = JSON.parse(
          window.sessionStorage.getItem("usersData")
        );
        sessionStorageData && hydrateUsers(sessionStorageData);
      } else {
        fetch("https://reqres.in/api/users")
          .then((res) => res.json())
          .then((res) => {
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
            window.sessionStorage.setItem(
              "usersData",
              JSON.stringify(res.data)
            );
          })
          .catch((err) => {
            console.log(err);
            alert(`Request failed. Please try again later. Error: ${err}`);
          });
      }
    }

    function hydrateUsers(fetchedData) {
      // declare vars
      spinner.setAttribute("style", "display:none");
      responsiveTable.classList.remove("not-visible");

      data.style.display = "block";
      // let blurbs = document.getElementsByClassName("blurb") || "";
      document
        .querySelector(".main-screen-content")
        .setAttribute("style", "display:block");

      mainHeader.setAttribute("style", "display:flex;");
      
      let displaySpace = document.getElementById("space");
      // let displaySpaceWrapper = document.getElementById("display-wrapper");
      let tableStringHTML = "";
      // let deleteButton = document.querySelector(".delete-btn");
      // let selectedRow = null;
      // let userID = null;

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
      let deleteButton = document.querySelector(".delete-btn")
     

      document.querySelector(".tbody").addEventListener("change", (e) => {
        console.log(deleteButton)
        deleteButton.removeAttribute("disabled");
        selectedRow = e.target.parentNode.parentNode;
        userID = selectedRow.children[1].innerText;
        deleteButton && deleteButton.addEventListener("click", deleteUser);
      });
    }

    function toggleNavbar() {
      navBar.classList.toggle("nav-bar-open");
    }
    burgerMenu && burgerMenu.addEventListener("click", toggleNavbar);

    // Views eventListeners
    coloursLink.addEventListener("click", getColours);
    //move inside getUsers
    document.getElementById("users").addEventListener("click", () => {
      getUsers();
      document.getElementById("users").className += " active-link";
      coloursLink.classList.remove("active-link");
    });
  }

  document.addEventListener("DOMContentLoaded", onloadFn);
  // window.removeEventListener("load", onloadFn);
})();
