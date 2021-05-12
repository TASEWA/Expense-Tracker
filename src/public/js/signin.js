$(document).ready(function () {

   $(".submit-button").click(function ()
{           var data = {};

        data.name = $('#name').val();
        data.username = $('#username').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        console.log(data);
                

        $.ajax(
            {
                type: 'POST',
                url: '/post_account_user_details',
                contentType: 'application/json',
                data: JSON.stringify(data)
            }).done(function (data) 
            {
                console.log(data);
                
            }
            
        
     
        );
        });
        });
