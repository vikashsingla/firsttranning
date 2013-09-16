/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/11/13
 * Time: 6:41 PM
 * To change this template use File | Settings | File Templates.
 */
var canvas=document.getElementById("mycanvas");
var context=canvas.getContext("2d");
font = 35;
padding = 35;
x = canvas.width / 25;
Hx = canvas.width / 10;
space = 20;
r = canvas.width / 2 - padding;
Hr = r + space;
function createcircle()
{
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2,Math.PI * 2, true);

    context.strokeStyle="lime";
    context.stroke();
}
function createnos()
{
    var nos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    angle = 0;
    nowidth = 0;
    nos.forEach(function (numeral)
    {
        angle = Math.PI / 6 * (numeral - 3);
        nowidth = context.measureText(numeral).width;
        context.fillText(numeral,canvas.width / 2 + Math.cos(angle) * (Hr) -nowidth / 2,canvas.height / 2 + Math.sin(angle) * (Hr) + font / 3);
        context.fillText("Menusis" ,200,200);

    });

}
function createcenter()
{
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 15, 0, Math.PI * 2, true);
    context.fillStyle="lime";
    context.fill();
}
function createhand(loc, isHour)
{
    var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2, handRadius = isHour ? r - x - Hx : r - x;
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius, canvas.height / 2 + Math.sin(angle) * handRadius);
    context.lineWidth="5";
    context.strokeStyle="deeppink";



    context.stroke();
}
function createhands()
{
    var date = new Date;
    hour = date.getHours();
    hour = hour > 12 ? hour - 12 : hour;
    createhand(hour * 5 + (date.getMinutes() / 60) * 5, true, 0.5);
    createhand(date.getMinutes(), false, 0.5);
    createhand(date.getSeconds(), false, 0.2);

}
function createclock()
{

    context.clearRect(0, 0, canvas.width, canvas.height);
//    context.clearRect( canvas.width, canvas.height,0,0);
//    context.clearRect( canvas.width,30, canvas.height,60);
    createcircle();
    createcenter();
    createhands();
    createnos();
}

context.font = font + 'px Arial';
loop = setInterval(createclock, 1000);


