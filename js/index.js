
// console.log(monsterContainer)
let page = 1

// on page load get the first 50
function getMonsters(pageNum){

  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
  .then(response => response.json())
  .then(data => {
    // if we got to the end
    if (data.length == 0){
      alert("No more pages in this direction")
      //reset to the last page, becuase we already incremented up
      page--
    }
    else{
      const monsterContainer = document.querySelector("#monster-container")
      for (monster of data){
        const monsterDiv = document.createElement("div")
        const monsterName = document.createElement("h2")
        const monsterAge = document.createElement("h4")
        const monsterDesc = document.createElement("p")
        monsterName.textContent = monster.name
        monsterAge.textContent = monster.age
        monsterDesc.textContent = monster.description
        monsterDiv.append(monsterName, monsterAge, monsterDesc)
        monsterContainer.append(monsterDiv)
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function(e){
  //on page load do the first get request for first 50
  getMonsters(page)

  // on page load, create monster form
  const formLocation = document.querySelector("#create-monster")
  console.log(formLocation)
  const monsterForm = document.createElement("form")
  monsterForm.setAttribute("id", "monster-form")
  monsterForm.innerHTML = `<input type="text" id="name" placeholder="name">
  <input id="age" placeholder="age"><input type="text" id="description" placeholder="description">
  <button id="submit" type="submit">Create</button>`
  formLocation.append(monsterForm)


  // event listener for the form
  monsterForm.addEventListener("submit", function(e){
    e.preventDefault()
    // POST

    console.log(e.target.name.value)
      fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        {
          name: e.target.name.value,
          age: parseInt(e.target.age.value),
          description: e.target.description.value
        })
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  })

  // page buttons
  const nextPage = document.querySelector("#forward")
  const prevPage = document.querySelector("#back")

  nextPage.addEventListener("click", function(e){
    console.log(e.target)
    page++
    getMonsters(page)
  })  

  prevPage.addEventListener("click", function(e){
    console.log(e.target)
    if (page == 1){
      alert("This is the first page, there are no more pages in this direction")
    }
    else{
      page--
      getMonsters(page)
    }
  }) 

})




