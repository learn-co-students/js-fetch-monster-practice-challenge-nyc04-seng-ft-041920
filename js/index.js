//get all the monsters

const monsterContainer = document.querySelector ("#monster-container");
const monsterForm = document.querySelector("#create-monster");
const backBtn = document.querySelector("#back");
const forwardBtn = document.querySelector("#forward");
let page=1
fetchData(page)

function fetchData(pageNumber) {
monsterContainer.innerHTML = ""
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
.then(resp => resp.json())
.then(listingObj => {
    listingObj.forEach((monster) => {
    monsterContainer.innerHTML += `
        <h2>${monster.name}</h2>
        <h2>${monster.id}</h2>
        <p>Age: ${monster.age}</p>
        <p>Bio: ${monster.description}</p>
`
} )
})
}

backBtn.addEventListener("click", (event)=> {
    if(page > 1){
        page -= 1 
        fetchData(page)
    }
})

forwardBtn.addEventListener("click", (event)=> {
    if(page < 21){
        page += 1 
        fetchData(page)
    }
})

//add a monster
monsterForm.addEventListener("submit", function(event) {
    event.preventDefault()

    const listingObj = {
        name: event.target.name.value,
        id: event.target.id.value,
        age: event.target.age.value,
        bio: event.target.description.value
    }

fetch(`http://localhost:3000/monsters`, {
method: "POST",
headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
},
body: JSON.stringify(listingObj)
})
.then(r => r.json())
.then(monster => {
    monsterContainer.innerHTML += `
    <h2>${monster.name}</h2>
    <h2>${monster.id}</h2>
    <p>Age: ${monster.age}</p>
    <p>Bio: ${monster.description}</p>`
})
    
    });
    

