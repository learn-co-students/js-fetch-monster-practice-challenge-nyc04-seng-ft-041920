document.addEventListener("DOMContentLoaded", function() {
    fetchMonsters()
    createMonster()
    forwardButton()
    backButton()
})

let page = 1;

function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(function(res) {
        return res.json();
    })
    .then(function(json) {
        console.log(json)
        json.forEach(function(monster) {
            renderMonster(monster)
        })
    })
}

function renderMonster(monsterObj) {
    const monsterContainer = document.querySelector("#monster-container")
    const monsterLi = document.createElement("li")
    monsterLi.innerHTML = 
        `<strong> Name: ${monsterObj.name} </strong> <br>
        Age: ${Math.round(monsterObj.age)} <br>
        Description: ${monsterObj.description} 
        `
    monsterContainer.append(monsterLi)
}


//on submit post request, with results render? or refetch?
function createMonster() {
    const createMonsterForm = document.querySelector("#create-monster-form")
    createMonsterForm.addEventListener("submit", function(e) {
        e.preventDefault();
        //get object
        const newMonsterObj = {
            "name": createMonsterForm.name.value,
            "age": createMonsterForm.age.value,
            "description": createMonsterForm.description.value
        }
        //pass object into post req function
        postReq(newMonsterObj)
    })
}

function postReq(monsterObj) {
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(monsterObj)
        }
    fetch("http://localhost:3000/monsters", configObj)
    .then(function(res) {
        return res.json();
    })
    .then(function(json) {
        //this will render monster at bottom of page just as a quick way to confirm creation
        //however, since monsters are ordered by IDs, any new monster would normally be rendered
        //many pages in
        renderMonster(json)
    })
}

function forwardButton() {
    const fwdButton = document.querySelector("#forward")
    fwdButton.addEventListener("click", function(e) {
        page++;
        clearScreen()
        fetchMonsters()
    })
}

function backButton() {
    const bckButton = document.querySelector("#back")
    bckButton.addEventListener("click", function(e) {
        page--;
        clearScreen()
        fetchMonsters()
    })
}

function clearScreen() {
    const monsterContainer = document.querySelector("#monster-container")
    monsterContainer.innerHTML = ""
}