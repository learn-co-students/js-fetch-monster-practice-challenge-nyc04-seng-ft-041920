const monsterContainer = document.querySelector("#monster-container")
const backBtn = document.querySelector("#back")
const forwardBtn = document.querySelector("#forward")
let page = 1
fetchData(page)

function fetchData(pageNum) {
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(json => {
        //  json = json.sort((a, b) => b.id - a.id);
        json.forEach((monster) => {
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



const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const name = event.target.name.value 
    const age = event.target.age.value 
    const description = event.target.description.value 

    const createdMonster = `
    <h2>${name}</h2>
    <p>Age: ${age}</p>
    <p>Bio: ${description}</p>
`
    monsterContainer.innerHTML =  createdMonster +   monsterContainer.innerHTML 

    fetch(`http://localhost:3000/monsters`, 
    {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name, 
            age: age,
            description: description
        })
    }
    )
})