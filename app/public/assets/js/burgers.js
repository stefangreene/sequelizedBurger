
//.................let the Page load..........................
$(document).ready (function(){
//........set buttion click event.............................
$(".time-to-grub").on("click", function(event){
    var id = $(this).data("id");
    var eatStat = $(this).data("eatstat");

    var burgerStatus = {
       eaten: eatStat 
    };

//.................Send the PUT request.......................
    $.ajax("/api/hamburgers/" + id, {
        type: "PUT",
        data: burgerStatus
    }).then(function(){
        console.log("Dem Burgers are: " + eatStat);
        //....Reload the page to get the updated list....
        location.reload();
    });//...................................function ajax PUT.
});//.............................function on click cafeteria.


$(".new-burger").on("submit", function(event){

event.preventDefault();

var newBurger = {
    name: $("#named-burger").val().trim(),
    eaten: $("[name=eaten]:checked").val().trim()
};
//......Send the POST request..................................
$.ajax("/api/hamburgers", {
    type: "POST",
    data: newBurger
}).then(function()  {
    console.log("New Burger cooking");
    //...........Reload the page to get the updated list........
    location.reload();
    }
  );//........................................function ajax POST.
});//...............................function on click new-burger.


$(".clear-burger").on("click", function(event){
    var id = $(this).data("id");
    //console.log("button was clicked" + id);
    //.....Send the DELETE request.................
    $.ajax("/api/hamburgers/" + id, {
        type: "DELETE"
    }).then(function() {
        console.log("you Eighty-Sixed the " + id + " burger.");
        //......Reload the page to get the updated list..........
        location.reload();
    }
  );
});//.......................................function clear-burger.


});
//..............................................function on ready.