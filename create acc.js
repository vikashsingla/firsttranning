var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,lastname TEXT, useremail TEXT,usercemail TEXT,password TEXT,cpassword TEXT,date INTEGER,gender TEXT)";

//var selectAllStatement = "SELECT * FROM Contacts";

var insertStatement = "INSERT INTO Contacts (username,lastname, useremail,usercemail, password,cpassword,date,gender) VALUES (?, ?, ?, ?, ?,?,?,?)";
var updateStatement = "UPDATE Contacts SET username = ?,lastname = ?, useremail = ?,usercemail = ?, password = ?,cpassword = ? date = ?,gender = ?,WHERE ID = ?";
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database

//var dataset;

//var DataType;

function initDatabase()  // Function Call When Page is ready.

{

    try {

        if (!window.openDatabase)  // Check browser is supported SQLite or not.

        {

            alert('Databases are not supported in this browser.');

        }

        else {

            createTable();  // If supported then call Function for create table in SQLite

        }

    }

    catch (e) {

        if (e == 2) {

            // Version number mismatch.

            console.log("Invalid database version.");

        } else {

            console.log("Unknown error " + e + ".");

        }

        return;

    }

}

function createTable()  // Function for Create Table in SQLite.

{

    db.transaction(function (tx) {
        tx.executeSql(createStatement, [], onError);
//        console.log(tx);

    });

}
createTable();


function onError(error) // Function for Hendeling Error...

{

    alert(error.message);

}


$(document).on('click', '#submitButton', function () {


    var usernametemp = $('#username').val();

    var lastnametemp = $('#lastname').val();

    var useremailtemp = $('#useremail').val();

    var usercemailtemp = $('#usercemail').val();

    var userpasswordtemp = $('#address').val();

    var usercpasswordtemp = $('#caddress').val();

    var datetemp = $('#phone').val();

    var gender = $("#gender").val();

    console.log(datetemp);
    console.log(usernametemp);
    console.log(useremailtemp);
    console.log(usercemailtemp);
    console.log(userpasswordtemp);
    console.log(usercpasswordtemp);
    console.log(gender);
    console.log(lastnametemp);

//    var hobbies = [];
//    $('input[name=hobbies]:checked').each(function () {
//        hobbies.push($(this).val());
//    });
//    var imagetemp = $('#image').attr('target');
    db.transaction(function (tx) {
        tx.executeSql(insertStatement, [usernametemp, lastnametemp, useremailtemp,usercemailtemp, userpasswordtemp,usercpasswordtemp, datetemp, gender], onError);
//       console.log(tx);
    });
    return false;
});
$(document).on('click','#updatebutton',function()
{
    var usernametemp = $('#username').val();

    var lastnametemp = $('#lastname').val();

    var useremailtemp = $('#useremail').val();

    var usercemailtemp = $('#usercemail').val();

    var userpasswordtemp = $('#address').val();

    var usercpasswordtemp = $('#caddress').val();

    var datetemp = $('#phone').val();

    var gender = $("#gender").val();
    $("#id").val((item['id']).toString());
    var useridupdate = $("#id").val();
    db.transaction(function (tx) {
        tx.executeSql(updateStatement, [usernametemp, lastnametemp, useremailtemp,usercemailtemp, userpasswordtemp,usercpasswordtemp, datetemp, gender], onError);
//       console.log(tx);
    });
    return false;
});
