//Application State
let currentPage = 1

//DOM Elements
const monsterContainer = document.querySelector("#monster-container")
const newMonsterForm = document.querySelector("#new-monster-form")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")

//Fetchs
function getAllMonsters(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(r => r.json())
        .then(renderAllMonsters);
}


//Event Listeners
forwardButton.addEventListener('click', () => {
    currentPage++
    getAllMonsters(currentPage)
})

backButton.addEventListener('click', () => {
   
        currentPage--
        getAllMonsters(currentPage)

})


newMonsterForm.addEventListener('submit', e => {
    e.preventDefault()

    // get info from form
const newMonster = {
     name: e.target.name.value, 
     age: parseInt(e.target.age.value), 
     description: e.target.description.value 
    }
    //make POST with that info on the body
fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
},  body: JSON.stringify(newMonster)
})
    .then(r => r.json())
    .then(actualNewMonster => renderMonster(actualNewMonster))

})



//Render Helpers 
function renderMonster(monster) {
    const h1 = document.createElement("h1")
    h1.textContent = monster.renderAllMonsters

    const h4 = document.createElement('h4')
    h4.textContent = monster.age

    const p = document.createElement("p")
    p.textContent = monster.description

    monsterContainer.append(h1, h4, p)

}

function renderAllMonsters(monsters) {
    monsters.forEach(renderMonster)
}

//Initial Fetch & Render

getAllMonsters(currentPage)