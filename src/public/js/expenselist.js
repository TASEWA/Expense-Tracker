$(document).ready(function () {
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
  let details = {};

  displayExp();

  function addExpenses(name, number) {
    if (!name.length || !number.length) {
      expName.style.border = "1px solid #b80c09";
      expName.placeholder = "input can not be empty";
      expName.style.color = "#b80c09";

      expNumber.style.border = "1px solid #b80c09";
      expNumber.placeholder = "input can not be empty";
      expNumber.style.color = "#b80c09";

    } else {
      const data = {
        id: id,
        name: name,
        number: parseInt(number),
        date: null
      };

      $.ajax({
        type: 'POST',
        url: '/post_expense_details',
        contentType: 'application/json',
        data: JSON.stringify(data)
      });

      displayExp();
      id++;
      expName.value = "";
      expNumber.value = "";
    }
  }

  function displayExp() {
    expValue.innerHTML = null;

    $.ajax(
      {
        type: 'GET',
        url: '/list',
        datatype: 'JSON',
        success: function (result) {
          for (i = 0; i < result.length; i++) {
            expValue.innerHTML += `
              <div class="expValue" id="${result[i].expense_id}">
              <div id="expTitleName" class="exp"><p>${result[i].item}</p></div>
              <div id="expValueAmount" class="exp"><p> <span>$ </span> ${result[i].amount}</p></div>
              <div id="edite_delete">
              <p id="buttons">
              <button id="edit-button"><img src="../image/edit.svg" width="15" class="${result[i].expense_id}" alt=""  /></button>
              <button id="delete-button"><img src="../image/trash.svg" width="15" class="${result[i].expense_id}" alt="" /></button>
              </p>
              </div>
              </div>
              `;
          }

          id = result.length + 1;
          details = result;
        }
      });

    displayExpenses.style.display = "block";
    totalExpense();
  }

  function totalExpense() {
    $.ajax(
      {
        type: 'GET',
        url: '/get_total_expense',
        datatype: 'JSON',
        success: function (result) {
          console.log(result);
        }
      });
  }

  function delExpenseDetails(id) {

    data = { "id": id };

    $.ajax({
      type: 'POST',
      url: '/delete_expense',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });

    displayExp();
  }

  function editExpDetails(id) {
    expenseForm.style.display = "none";
    budgetform.style.display = "none";
    editForm.style.display = "block";

    saveEdit.children[2].id = id;
    modal.style.display = "block";
  }

  function getExpValue(editExpName, editExpNumber, id) {
    var data = {
      id: id,
      name: editExpName,
      number: editExpNumber,
    };

    console.log(JSON.stringify(data));

    $.ajax(
      {
        type: 'POST',
        url: '/update_expense_details',
        contentType: 'application/json',
        data: JSON.stringify(data)
      });

    displayExp();
  }

  saveEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    getExpValue($("#editExpName").val(), $("#editExpNumber").val(), saveEdit.children[2].id);
  });

  expForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addExpenses(expName.value, expNumber.value);
  });

  $(document).on("click", "#edit-button", (e) => {
    e.preventDefault();

    var num = $(e.target).attr('class');
    editExpDetails(num);
  });

  $(document).on("click", "#delete-button", (e) => {
    e.preventDefault();

    var num = $(e.target).attr('class');
    delExpenseDetails(num);
  });
});

