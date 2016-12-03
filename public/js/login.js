$(document).ready(function() {
    $('.modal').modal();
});


// I am semi proud of this code
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
