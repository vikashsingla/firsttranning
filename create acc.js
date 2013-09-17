/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/17/13
 * Time: 12:59 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    if (typeof(localStorage) === 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        //load the items
        getItems();
    }
});

var getItems = function()
{

    var timeLog, logLength, i;
    i = 0;
    logLength = localStorage.length-1; //how many items are in the database starting with zero
    timeLog = '';

    //now we are going to loop through each item in the database
    for (i = 0; i <= logLength; i++)
    {
        var itemKey, value, values, firstname, lastname, email, password, date, gender;
        //lets setup some variables for the key and values
        itemKey = localStorage.key(i);

        value = localStorage.getItem(itemKey);
        values = JSON.parse(value);
        firstname = values.fname;
        lastname = values.lname;
        email = values.email;
        password =values.password;
        password =values.password;
        date    =values.bday;
        gender=values.gender;

//           console.log(values);
        //now that we have the item, lets add it to the table
        timeLog += '<tr id="'+itemKey+'" class="tableRow"><td>'+firstname+'</td><td>'+lastname+'</td><td>'+email+'</td><td>'+password+'</td><td>'+date+'</td><td>'+gender+'<a class="delete" title="Delete Entry" href="#"><img src="file:///home/manusis/Button-Delete-icon.png" width="24" height="24"></a></td></tr>';
    }

    $("#theLog").append(timeLog); //update the table with the list items

    $(".tableRow").mouseenter(function() {
        $(this).children().children(".delete").show();
    });
    $(".tableRow").mouseleave(function() {
        $(this).children().children(".delete").hide();
    });

    $("#reset_list").click(function()
    {
        //alert("clicked");
        localStorage.clear();
        getItems();
    });

    $(".delete").click(function()
    {
        var itemId = $(this).parent().parent().attr('id');
        //alert(itemId);
        localStorage.removeItem(itemId);
        getItems();
    });
}