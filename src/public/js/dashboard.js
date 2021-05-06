$(document).ready(function () {

    $.ajax(
        {
            type: 'GET',
            url: '/get_expense_tracker_details',
            datatype: 'JSON',
            success: function (result) {
                $('#total_income').append(result[0].total_income);
                $('#curr_balance').append(result[0].total_balance);
                $('#total_expense').append(result[0].total_expense);
                console.log(result);
            }
        });
});



