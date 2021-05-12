$(document).ready(function () {

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
  displayInc();

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
      $.ajax({
        type: 'POST',
        url: '/post_income_details',
        contentType: 'application/json',
        data: JSON.stringify(userInc)
      });
      displayInc();
      id++;
      incName.value = "";
      incNumber.value = "";
    }
  }

  function displayInc() {
    incValue.innerHTML = null;
    $.ajax(
      {
        type: 'GET',
        url: '/get_income_details',
        datatype: 'JSON',
        success: function (result) {
          for (i = 0; i < result.length; i++) {
            incValue.innerHTML += `
    <div class="incValue" id="${result[i].income_id}">
      <div id="incTitleName" class="inc"><p>${result[i].item}</p></div>
      <div id="incValueAmount" class="inc"><p> <span>$ </span> ${result[i].amount}</p></div>
      <div id="edite_delete">
        <p id="buttons">
          <button id="edit-income"> <img src="../image/edit.svg" width="15" class="${result[i].income_id}" alt=""  /> </button> 
          <button id="delete-income"> <img src="../image/trash.svg" width="15" class="${result[i].income_id}" alt="" /></button>
        </p>
      </div>
    </div>
  `;
          }
          id = result.length + 1;
          details = result;

        }
      });
    totalincome();
    displayIncomes.style.display = "block";
  }

   function totalincome() {
    $.ajax(
      {
        type: 'GET',
        url: '/get_total_income',
        datatype: 'JSON',
        success: function (result) {
          console.log(result);
        }
      });
  }

  function delIncomeDetails(id) {
    userInc = { "id": id };

    $.ajax({
      type: 'POST',
      url: '/delete_income',
      contentType: 'application/json',
      data: JSON.stringify(userInc)
    });
    displayInc();
  }

  function editIncDetails(id) {
    incomeForm.style.display = "none";
    budgetform.style.display = "none";
    editForm.style.display = "block";
    saveEdit.children[2].id = id;
    modal.style.display = "block";
  }



  function getIncValue(editIncValue, editIncNumber, id) {
    var userInc = {
      id: id,
      name: editIncValue,
      number: editIncNumber,
    };

    $.ajax(
      {
        type: 'POST',
        url: '/update_income',
        contentType: 'application/json',
        data: JSON.stringify(userInc)
      });

    displayInc();
  }



  saveEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    getIncValue($("#editIncName").val(), $("#editIncNumber").val(), saveEdit.children[2].id);
  });

  incForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addIncomes(incName.value, incNumber.value);
  });


  $(document).on("click", "#edit-income", (e) => {
    e.preventDefault();

    var num = $(e.target).attr('class');
    editIncDetails(num);
  });

  $(document).on("click", "#delete-income", (e) => {
    e.preventDefault();

    var num = $(e.target).attr('class');
    delIncomeDetails(num);
  });

});
