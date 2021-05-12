$(document).ready(function () {

    $.ajax(
        {
            type: 'GET',
            url: '/get_expense_tracker_details',
            datatype: 'JSON',
            success: function (result) {
                var bal = result[0].total_income - result[0].total_expense;
                $('#total_income').append(result[0].total_income);
                $('#curr_balance').append(bal);
                $('#total_expense').append(result[0].total_expense);

                var data = { "bal": bal };
                $.ajax(
                    {
                        type: 'POST',
                        url: '/update_balance',
                        contentType: 'application/json',
                        data: JSON.stringify(data)
                    });
            }
        });
});



