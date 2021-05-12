$(document).ready(function () {

    $.ajax(
        {
            type: 'POST',
            url: '/post_credentials',
            datatype: 'JSON',
            success: function (result) {
                
                console.log(result);
            }
        });
});
