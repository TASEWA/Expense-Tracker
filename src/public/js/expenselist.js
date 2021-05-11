$(document).ready(function () {
    $.ajax(
        {
            type: 'GET',
            url: '/list',
            datatype: 'JSON',
            success: function (result) {
                $('#expItem').append(result[0].item);
                $('#expValue').append(result[0].amount);
                console.log(result);
            }
        });
});



