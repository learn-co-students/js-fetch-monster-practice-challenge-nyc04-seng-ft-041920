// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
const monsterContainer = document.querySelector("#monster-container")
const monsterForm = document.querySelector("form")
const btnContainer = document.querySelector("#btnContainer")
let pageCount = 1

btnContainer.addEventListener('click', e => {
  if (e.target.id === 'forward') {
    console.log("1 page forward pls")
    pageCount++
    monsterPages(pageCount)

  } else {
    console.log("no go back pls")
    pageCount--
    monsterPages(pageCount)

  }
})

monsterForm.addEventListener('submit', e => {
  e.preventDefault();
  let newMonster = {
    name: e.target.name.value,
    age: parseInt(e.target.age.value),
    description: e.target.description.value
  }
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newMonster)
  }).then(r => r.json()).then(newNewMonster => renderMonster(newNewMonster))

  monsterForm.reset();
})

function monsterPages(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(r => r.json())
  .then(renderMonsters)
}

function renderMonster(monster) {
  const monsterBio = document.createElement('div')
  monsterBio.dataset.id = monster.id
  monsterBio.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}</p>
  `
  monsterContainer.appendChild(monsterBio)
}

function renderMonsters(monsters) {
  monsterContainer.innerHTML = "" // this is for each page to clear, and not add
  monsters.forEach(renderMonster)
}

monsterPages(pageCount)
