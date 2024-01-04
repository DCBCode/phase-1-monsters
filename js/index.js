let currentPage = 1;

function fetchMonsters() {
  fetch(`http://localhost:3000/monsters?page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
      const monsterForm = document.createElement("form");
      document.body.appendChild(monsterForm);
      const monsterList = document.createElement("ul");

      data.forEach(monster => {
        const monsterItem = document.createElement("li");
        monsterItem.innerHTML = `
          <h3>Name: ${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;

        monsterList.appendChild(monsterItem);
      });

      document.body.appendChild(monsterList);

      const nameInput = document.createElement("input");
      nameInput.setAttribute("type", "text");
      nameInput.setAttribute("placeholder", "Name");
      monsterForm.appendChild(nameInput);

      const ageInput = document.createElement("input");
      ageInput.setAttribute("type", "number");
      ageInput.setAttribute("placeholder", "Age");
      monsterForm.appendChild(ageInput);

      const descriptionInput = document.createElement("input");
      descriptionInput.setAttribute("type", "text");
      descriptionInput.setAttribute("placeholder", "Description");
      monsterForm.appendChild(descriptionInput);

      const createButton = document.createElement("button");
      createButton.innerText = "Create Monster";
      monsterForm.appendChild(createButton);

      createButton.addEventListener("click", () => {
        const name = nameInput.value;
        const age = ageInput.value;
        const description = descriptionInput.value;

        createMonster(name, age, description);

        // Clear the input fields after creating the monster
        nameInput.value = "";
        ageInput.value = "";
        descriptionInput.value = "";
      });

      const loadMoreButton = document.createElement("button");
      loadMoreButton.innerText = "Load More";
      document.body.appendChild(loadMoreButton);

      loadMoreButton.addEventListener("click", loadNextMonsters);
    })
    .catch(error => console.error(error));
}

// Call the fetchMonsters function when the page loads
window.addEventListener("load", fetchMonsters);

function createMonster(name, age, description) {
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age, description }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
    })
    .catch(error => console.error(error));
}

function loadNextMonsters() {
  currentPage++;

  fetch(`http://localhost:3000/monsters?page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
      const monsterList = document.querySelector("ul");

      data.forEach(monster => {
        const monsterItem = document.createElement("li");
        monsterItem.innerHTML = `
          <h3>Name: ${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;

        monsterList.appendChild(monsterItem);
      });
    })
    .catch(error => console.error(error));
}