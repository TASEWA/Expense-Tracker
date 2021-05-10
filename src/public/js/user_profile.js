$(document).ready(function () {

    $.ajax(
        {
            type: 'GET',
            url: '/get_user_details',
            datatype: 'JSON',
            success: function (result) {
                $('#name').append(result[0].name);
                $('#username').append(result[0].username);
                $('#password').append(result[0].password);
                $('#email').append(result[0].email);
                console.log(result);
            }
        });
});