const modal = document.getElementById("myModal");
const btn = document.getElementById("addBtn");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  expName.value = "";
  expNumber.value = "";
  expenseForm.style.display = "block";
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
const editExpValue = document.getElementById("editExpValue");
const editExpNumber = document.getElementById("editExpNumber");

const expForm = document.getElementById("expForm");
const expensesAmount = document.getElementById("expensesAmount");
const expValue = document.getElementById("expValue");
const displayExpenses = document.getElementById("displayExpenses");
const expenseForm = document.getElementById("expense-form");
const budgetform = document.getElementById("budgetform");

let expName = document.getElementById("expName");
let expNumber = document.getElementById("expNumber");
let id = 0;
let details = [];


function addExpenses(name, number) {
  if (!name.length || !number.length) {
    expName.style.border = "1px solid #b80c09";
    expName.placeholder = "input can not be empty";
    expName.style.color = "#b80c09";

    expNumber.style.border = "1px solid #b80c09";
    expNumber.placeholder = "input can not be empty";
    expNumber.style.color = "#b80c09";

  } else {
    const userExp = {
      id: id,
      name: name,
      number: parseInt(number),
    };
    details.push(userExp);
    displayExp(details);
    id++;
    expName.value = "";
    expNumber.value = "";
  }
}

function displayExp(details) {
  expValue.innerHTML = null;
  for (i = 0; i < details.length; i++) {
    expValue.innerHTML += `
    <div class="expValue" id="${details[i].id}">
      <div id="expTitleName" class="exp"><p>${details[i].name}</p></div>
      <div id="expValueAmount" class="exp"><p> <span>$ </span> ${details[i].number}</p></div>
      <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> <img src="../image/edit.svg" width="15" alt=""  /></button> 
          <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><img src="../image/trash.svg" width="15" alt="" /></button>
        </p>
      </div>
    </div>
  `;
  }
  
  displayExpenses.style.display = "block";
}


function delExpenseDetails(id) {
  let index = details.findIndex((item) => item.id === id);
  details.splice(index, 1);
  displayExp(details);
}

function editExpDetails(id) {
  expenseForm.style.display = "none";
  budgetform.style.display = "none";
  editForm.style.display = "block";
  details.findIndex((item) => {
    if (item.id === id) {
      editExpName.value = item.name;
      editExpNumber.value = item.number;
      saveEdit.children[2].id = item.id;
      modal.style.display = "block";
    }
  });
}

function getExpValue(editExpName, editExpNumber, id) {
  edited = details.findIndex((obj) => obj.id == id);
  details[edited].name = editExpName;
  details[edited].number = parseInt(editExpNumber);
  displayExp(details);
}



saveEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  getExpValue(editExpName.value, editExpNumber.value, saveEdit.children[2].id);
});

expForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpenses(expName.value, expNumber.value);
});

