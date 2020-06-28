// - When the page loads, show the first 50 monsters. Each monster's name, age, and
//   description should be shown.


// GET http://localhost:3000/monsters/?_limit=20&_page=3
const monsterContainer = document.getElementById('monster-container');
const form = document.getElementById('monster-form');
const backBtn = document.getElementById('back')
const fwdBtn = document.getElementById('forward')
let page = 1

function fetchMonsters() {

    const url = `http://localhost:3000/monsters/?_limit=50&_page=${page}`;
    fetch(url).then(resp => resp.json()).then(json => {
        let monsterDiv = document.createElement('div');
        json.forEach(element => {
            monsterDiv.innerHTML += `
        <h5>Name:${element.name}</h3>
        <h5>Age:${element.age}</h5>
        <p>Description:${element.description}</p>
        `
        });
        monsterContainer.appendChild(monsterDiv)
        monsterDiv.scrollBottom = monsterDiv.scrollHeight
    })
    page++
}
fetchMonsters()

const url2 = 'http://localhost:3000/monsters';
form.addEventListener('submit', (event) => {
    event.preventDefault()
    let age = parseInt(event.target.age.value)
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: event.target.name.value,
            age: age,
            description: event.target.description.value
        })
    })
        .then(resp => resp.json()).then(console.log);
})

fwdBtn.addEventListener('click', fetchMonsters)
backBtn.addEventListener('click', () => {
    page--
    fetchMonsters()
    window.scrollBy(0, -window.innerHeight);
})


