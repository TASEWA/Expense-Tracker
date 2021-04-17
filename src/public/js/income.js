const modal = document.getElementById("myModal");
const btn = document.getElementById("addBtn");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  incName.value = "";
  incNumber.value = "";
  incomeForm.style.display = "block";
  editForm.style.display = "none";
  modal.style.display = "block";
  budgetform.style.display = "none";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const amountInput = document.getElementById("number");
const addForm = document.getElementById("addForm");
const budgetAmount = document.getElementById("budgetAmount");
const balanceAmount = document.getElementById("balanceAmount");

const editForm = document.getElementById("editForm");
const saveEdit = document.getElementById("saveEdit");
const editIncValue = document.getElementById("editIncValue");
const editIncNumber = document.getElementById("editIncNumber");

const incForm = document.getElementById("incForm");
const incomesAmount = document.getElementById("incomesAmount");
const incValue = document.getElementById("incValue");
const displayIncomes = document.getElementById("displayIncomes");
const incomeForm = document.getElementById("income-form");
const budgetform = document.getElementById("budgetform");

let incName = document.getElementById("incName");
let incNumber = document.getElementById("incNumber");
let id = 0;
let details = [];


function addIncomes(name, number) {
  if (!name.length || !number.length) {
    incName.style.border = "1px solid #b80c09";
    incName.placeholder = "input can not be empty";
    incName.style.color = "#b80c09";

    incNumber.style.border = "1px solid #b80c09";
    incNumber.placeholder = "input can not be empty";
    incNumber.style.color = "#b80c09";

  } else {
    const userInc = {
      id: id,
      name: name,
      number: parseInt(number),
    };
    details.push(userInc);
    displayInc(details);
    id++;
    incName.value = "";
    incNumber.value = "";
  }
}

function displayInc(details) {
  incValue.innerHTML = null;
  for (i = 0; i < details.length; i++) {
    incValue.innerHTML += `
    <div class="incValue" id="${details[i].id}">
      <div id="incTitleName" class="inc"><p>${details[i].name}</p></div>
      <div id="incValueAmount" class="inc"><p> <span>$ </span> ${details[i].number}</p></div>
      <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="editIncDetails(${details[i].id})"> <img src="image/edit.svg" width="15" alt=""  /></button> 
          <button id="${details[i].id}" onclick="delIncomeDetails(${details[i].id})"><img src="image/trash.svg" width="15" alt="" /></button>
        </p>
      </div>
    </div>
  `;
  }
  
  displayIncomes.style.display = "block";
}


function delIncomeDetails(id) {
  let index = details.findIndex((item) => item.id === id);
  details.splice(index, 1);
  displayInc(details);
}

function editIncDetails(id) {
  incomeForm.style.display = "none";
  budgetform.style.display = "none";
  editForm.style.display = "block";
  details.findIndex((item) => {
    if (item.id === id) {
      editIncName.value = item.name;
      editIncNumber.value = item.number;
      saveEdit.children[2].id = item.id;
      modal.style.display = "block";
    }
  });
}

function getIncValue(editIncName, editIncNumber, id) {
  edited = details.findIndex((obj) => obj.id == id);
  details[edited].name = editIncName;
  details[edited].number = parseInt(editIncNumber);
  displayInc(details);
}



saveEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  getIncValue(editIncName.value, editIncNumber.value, saveEdit.children[2].id);
});

incForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addIncomes(incName.value, incNumber.value);
});

