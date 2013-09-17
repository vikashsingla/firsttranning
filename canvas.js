/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/11/13
 * Time: 6:13 PM
 * To change this template use File | Settings | File Templates.
 */
//function message()
//{
//    try
//
//    {
//
//        adddlert("Welcome guest!");
//    }
//    catch(err)
//    {
//
//        txt="There was an error on this form";
//        alert(txt);
//
//        txt="fill all the blanks";
//        alert(txt);
//
//    }
//}

//$("#save").click(function (e)
//{
//    alert("Name Has Been Saved");
//    e.preventDefault();
//    var data = $("#form").serializeArray();
//    var id = Math.floor(Math.random() * 10000001);
//
//    var item = {};
//    item.first = ["First:", $("#first").val()];
//    item.last = ["Last:", $("#last").val()];
//
//    $.each(data, function (i, obj)
//    {
//        localStorage.setItem(id, JSON.stringify(item));
//
//    });
//
//});
//
////Fill with data from localstorage to edit
//function editItem()
//{
//    var value = localStorage.getItem(this.key);
//    var item = JSON.parse(value);
//
//    $("#form").show(function ()
//    {
//        $("#userDiv").hide(function ()
//        {
//        });
//    });
//
//    $("#first").val(item.first[1]);
//    $("#last").val(item.last[1]);
//}
//
//
//
//
//
//
//function deleteItem()
//{
//    var ask = confirm("Are you sure you want to delete this contact?");
//    if (ask)
//    {
//        localStorage.removeItem(this.key);
//        alert("Contact was deleted!!");
//        window.location.reload();
//    }
//    else
//    {
//        alert("Contact was NOT deleted.");
//    }
//
//}
//
//$("#clear").click(function (e)
//{  alert("clear field")
//    e.preventDefault();
//    if(localStorage.length === 0)
//    {
//        alert("There Is No Info To Clear")
//    }
//    else
//    {
//        localStorage.clear();
//        alert("All Names Have Been Deleted!");
//        window.location.reload();
//        return false;
//    }
//});



$(document).ready(function()
{
    if (!window.localStorage)
    {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else
    {
        $("#return_form").submit(function()
        {
            setAllItems();
        });
    }
});

var setAllItems = function()
{

    var newDate, itemId, formSave;

    newDate = new Date();
    itemId = newDate.getTime();
    formSave =
    {
        fname											: $("input[name='first']").val(),
        lname 											: $("input[name='last']").val(),
        email 											: $("input[name='email']").val(),
//        email 											: $("input[name='cemail']").val(),
       password											: $("input[name='password']").val(),
//       password									      : $("select[name='cpassword']").val(),
       date								                : $("input[name='date']").val(),
       gender							                : $("select[name='gender']").val(),
       checkbox							                : $("input[name='check']").attr('checked')

    };

    // turn data into JSON string
    localStorage.setItem( itemId, JSON.stringify(formSave));
};