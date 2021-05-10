$(document).ready(function () {

    $.ajax(
        {
            type: 'GET',
            url: '/get_user_details',
            datatype: 'JSON',
            success: function (result) {
                $('#profile-name').val(result[0].name);
                $('#username').val(result[0].username);
                $('#password').val(result[0].password);
                $('#email').val(result[0].email);
                console.log(result);
            }
        });

    $(".submit-button").click(function () {

        var data = {};

        data.name = $('#profile-name').val();
        data.username = $('#username').val();
        data.password = $('#password').val();
        data.email = $('#email').val();

        $.ajax(
            {
                type: 'POST',
                url: '/post_user_details',
                contentType: 'application/json',
                data: JSON.stringify(data)
            }).done(function (data) {
                console.log(data);
            });
    });
});