$('.image').mouseover(function () {
    $(this).css("transform","scale(1.2)");
});
$('.image').mouseout(function () {
    $(this).css("transform","scale(1)");
});
var click1=false;
$('.poke1').click(function () {

    $(this).attr("src",'Images/Bulbasaur2.png');
    if(click1===true){

        $(this).attr("src",'Images/Bulbasaur3.png');
    }
    click1=true;
});


var click2=false;
$('.poke2').click(function () {

    $(this).attr("src",'Images/charmender2.png');
    if(click2===true){

        $(this).attr("src",'Images/charmender3.png');
    }
    click2=true;
});


var click3=false;
$('.poke3').click(function () {

    $(this).attr("src",'Images/squirtle2.png');
    if(click3===true){

        $(this).attr("src",'Images/squirtle3.jpg');
    }
    click3=true;
});