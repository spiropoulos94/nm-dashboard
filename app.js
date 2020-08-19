const main_content = document.getElementsByClassName("main-screen-content")[0]


function welcomeScreen() {
    main_content.innerHTML = "<h1>Welcome </h1>"
}

function getColours() {
    fetch("https://reqres.in/api/products/")
        .then(res => res.json())
        .then(res => {
            colours = res.data
            console.log('Colors Data', colours)
            main_content.innerHTML = "<h1>Colours</h1>"
            colours.forEach(colour => {
                let colorTab = document.createElement('div')

            });
        })
}



function getUsers() {
    fetch("https://reqres.in/api/users")
        .then(res => res.json())
        .then(res => {
            let users = res.data
            console.log("User Data", users)
            main_content.innerHTML = "<h1>Users</h1>"
        })
}