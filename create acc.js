



var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,lastname TEXT, useremail TEXT,address TEXT,phone INTEGER,gender TEXT)";

//var selectAllStatement = "SELECT * FROM Contacts";

var insertStatement = "INSERT INTO Contacts (username,lastname, useremail, address, phone,gender) VALUES (?, ?, ?, ?, ?, ?)";

//var dropStatement = "DROP TABLE Contacts";
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database

var dataset;
//
//var DataType;
//db.transaction(function(tx) {
//    console.log("in here");
//    tx.executeSql(dropStatement, [], onError);
//});
function initDatabase()  // Function Call When Page is ready.

{

    try {

        if (!window.openDatabase)  // Check browser is supported SQLite or not.

        {

            alert('Databases are not supported in this browser.');

        }

        else
        {

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
     //   console.log(result);

});

}

function onError(tx, error) // Function for Hendeling Error...

{

    alert(error.message);

}


$(document).on('click', '#submitButton', function ()
{

    var usernametemp = $('input:text[id=username]').val();

    var lastnametemp = $('input:text[id=lastname]').val();

    var useremailtemp = $('input:text[id=useremail]').val();

    var useraddresstemp = $('input:text[id=address]').val();

    var phonetemp = $('input:text[id=phone]').val();


    var gender = $( "#gender" ).val();
    console.log(phonetemp);
    console.log(usernametemp);
    console.log(useremailtemp);
    console.log(useraddresstemp);
    console.log(gender);
    console.log(lastnametemp);

//    var hobbies = [];
//    $('input[name=hobbies]:checked').each(function () {
//        hobbies.push($(this).val());
//    });
//    var imagetemp = $('#image').attr('target');
    db.transaction(function (tx)
    {
        tx.executeSql(insertStatement, [usernametemp,lastnametemp, useremailtemp, useraddresstemp, phonetemp, gender], onError);
       // console.log(tx);
    });
    return false;
});


