$(document).ready(function() {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

// $('#submitLogin').click(function(e) {
//     e.preventDefault();
//     $.post('http://localhost:3000/auth/login',
//         $('#loginForm').serialize(),
//         function(data, status, xhr) {
//             console.log(data, "data recieved");
//             console.log(status, "status recieved");
//             console.log(xhr, "xhr recieved");
//         })
// })
// //
// $('#submitSignup').click(function(e) {
//     e.preventDefault();
//     var jsonifiy = {};
//     $('#signupForm').serializeArray().map(function(item) {
//         if (jsonifiy[item.name]) {
//             if (typeof(jsonifiy[item.name]) === "string") {
//                 jsonifiy[item.name] = [jsonifiy[item.name]];
//             }
//             jsonifiy[item.name].push(item.value);
//         } else {
//             jsonifiy[item.name] = item.value;
//         }
//     });
//     console.log(jsonifiy);
//     $.post('./auth/signup',
//         jsonifiy,
//         function(data, status) {
//             console.log(data, "data recieved");
//             console.log(status, "status recieved");
//         })
//     console.log("I am here");
// });
