
const monContainer = document.querySelector('#monster-container')
const baseUrl = "http://localhost:3000/monsters/?_limit=50&_page="
let page = 1



function addForm(){
  const formContainer = document.querySelector('#create-monster')
  const form = document.createElement('form')
  form.innerHTML = `
    <label type="text" name="name">name</label>
    <input type="text" name="name"></input> 
    <label type="text" name="age">age</label>
    <input type="text" name="age"></input> 
    <label type="text" name="description">description</label>
    <textarea class="form-control" name="description" id="review-content" rows="3"></textarea>
    <input type="submit" class="btn btn-primary"></input>
  `
  formContainer.append(form)
  form.addEventListener('submit', e => {
    e.preventDefault()
    newMonObj = {
      "name": e.target.name.value,
      "age": e.target.age.value,
      "description": e.target.description.value
    }
    createMon(newMonObj)
  })
}

function createMon(monObj){

  const createUrl = "http://localhost:3000/monsters/"
  fetch(createUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(monObj)
  })
  .then(res => res.json())
  .then(monObj => {
    renderOneMonster(monObj)
    clearForm()
  })

}
function getMonstersPage(page){
  fetch(baseUrl+`${page}`)
  .then(res => res.json())
  .then(renderMonsters)
}

function renderMonsters(mons){
  monContainer.innerHTML = ""
  mons.forEach(renderOneMonster);
  console.log(page)
}

function renderOneMonster(mon){
  // console.log(mon)
  createMonsterCard(mon)
  
}

function createMonsterCard(mon){
  const card = document.createElement('div'),
        name =  document.createElement('h2'),
        age = document.createElement('h5'),
        des = document.createElement('p')
  name.textContent = mon.id +' '+ mon.name
  age.textContent = mon.age
  des.textContent = mon.description
  card.append(name)
  card.append(age)
  card.append(des)
  monContainer.append(card)
} 

function forwardBtnEvent(){
  const forwardBtn = document.querySelector('#forward')
  forwardBtn.addEventListener('click', e=>{
    (page < 21) ? page ++ : page = 21
    getMonstersPage(page)
  })
}

function backBtnEvent(){
  const backBtn = document.querySelector('#back')
  backBtn.addEventListener('click', e=>{

    (page > 1) ? page -- : page = 1
    getMonstersPage(page)
  })
}

function clearForm(){
  const form = document.querySelector('form')
  form.reset()
}

addForm()
getMonstersPage(page)
forwardBtnEvent()
backBtnEvent()