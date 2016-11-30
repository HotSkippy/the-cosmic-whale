$(document).ready(function() {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    $('#submitLogin').click(function(e) {
        e.preventDefault();
        $.post('http://localhost:3000/auth/login',
            $('#loginForm').serialize(),
            function(data, status, xhr) {
                console.log(data, "data recieved");
                console.log(status, "status recieved");
                console.log(xhr, "xhr recieved");
            })
    })

    $('#submitSignup').click(function(e) {
        e.preventDefault();
        $.post('http://localhost:3000/auth/signup',
            $('#signupForm').serialize(),
            function(data, status, xhr) {
                console.log(data, "data recieved");
                console.log(status, "status recieved");
                console.log(xhr, "xhr recieved");
            })
    })

});
