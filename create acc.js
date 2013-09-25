var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,lastname TEXT, useremail TEXT,usercemail TEXT,password TEXT,cpassword TEXT,date INTEGER,gender TEXT)";

var selectAllStatement = "SELECT * FROM Contacts ";

var insertStatement = "INSERT INTO Contacts (username,lastname, useremail,usercemail, password,cpassword,date,gender) VALUES (?, ?, ?, ?, ?,?,?,?)";
var updateStatement = "UPDATE Contacts SET username = ?,lastname = ?, useremail = ?,usercemail = ?, password = ?,cpassword = ? date = ?,gender = ?, WHERE id = ?";
var deleteStatement = "DELETE FROM Contacts WHERE id=?";
var dropStatement = "DROP TABLE Contacts";
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database

var dataset = {};

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

        return false;

    }

}

function createTable()  // Function for Create Table in SQLite.

{

    db.transaction(function (tx) {
        tx.executeSql(createStatement, [],showRecords(), onError);
//        console.log(tx);

    });
    resetForm();
}
createTable();
function deleteRecord(id)
{
 var iddelete = id.toString();
    db.transaction(function(tx){
     tx.executeSql(deleteStatement,[],showRecords(),onError());
        alert('Deleted record sucessfully');
    });
}
function dropTable()
{
    alert("delete all data");
    db.transaction(function(tx){
     tx.executeSql(dropStatement,[],showRecords(),onError);
    });
    resetForm();
    initDatabase();
}
function resetForm()

{
    console.log("===");
 $("#username").val("");
 $("#lastname").val("");
 $("#useremail").val("");
 $("#address").val("");
 $("#caddress").val("");
 $("#phone").val("");
 $("#gender").val("");
 $("#id").val("");
}


function loadandreset()
{
    resetForm();
    showRecords();

}


function onError(error) // Function for Hendeling Error...

{

    alert(error.message);

}
function showRecords() // Function For Retrive data from Database Display records as list

{

    $("#results").html('');

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result)

        {

            dataset = result.rows;
//            console.log(result);

            for (var i = 0, item = null; i < dataset.length; i++)
            {

                item = dataset.item(i);

                var linkeditdelete = '<tr><td><li>' + item['username'] + ' , '+item['lastname'] + ' , ' + item['useremail'] + ' , '+ item['usercemail'] + ' , ' + item['password'] + ' , ' + item['cpassword'] + ' , ' + item['date'] + ' , ' + item['gender'] + ' , ' + '"/>' + '    ' +

                    '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li></td></tr>';

                $("#results").append(linkeditdelete);

            }
            createOption();

        });

    });

}


function loadRecord(id) // Function for display records which are retrived from database.

{
  console.log("=");
    $("#submitButton").attr("disabled", "disabled");
    $("#Updatebutton").removeAttr("disabled");


    var item = dataset.item(id);

//      console.log(item) ;
    $("#username").val((item['username']).toString());

    $("#lastname").val((item['lastname']).toString());

    $("#useremail").val((item['useremail']).toString());

    $("#usercemail").val((item['usercemail']).toString());

    $("#address").val((item['password']).toString());

    $("#caddress").val((item['cpassword']).toString());

    $("#phone").val((item['date']).toString());

    $("#gender").val((item['gender']).toString());




    $("#id").val((item['id']).toString());

    tx.executeSql(updateStatement, [item],onError);
//       console.log(tx);


}


function initialLode()
{
    $("body").fadeIn(2000);
    initDatabase();
    createTable();
//    $(document).on('change','#color',function(){
//       $("mycontact").css('background color',$(this).val());
//    }) ;

    $(document).on('change','#detail',function(){
        console.log("==========");
        for(var i = 0, item = null;i<dataset.length; i++){
            item = dataset.item(i) ;
            if(item.id==$(this).val()){
           alert('welcome' +item.username + "" + item.date + "");

        }
        }

});
    $(document).on('click', '#submitButton', function ()
    {
        console.log("========");
         alert("submit all data");
        var usernametemp = $('#username').val();

        var lastnametemp = $('#lastname').val();

        var useremailtemp = $('#useremail').val();

        var usercemailtemp = $('#usercemail').val();

        var userpasswordtemp = $('#address').val();

        var usercpasswordtemp = $('#caddress').val();

        var datetemp = $('#phone').val();

        var gender = $("#gender").val();
//        var useridsubmit = $("id").val();

//        console.log(datetemp);
//        console.log(usernametemp);
//        console.log(useremailtemp);
//        console.log(usercemailtemp);
//        console.log(userpasswordtemp);
//        console.log(usercpasswordtemp);
//        console.log(gender);
//        console.log(lastnametemp);
//        console.log(useridsubmit);


   db.transaction(function (tx){
            tx.executeSql(insertStatement, [usernametemp, lastnametemp, useremailtemp,usercemailtemp, userpasswordtemp,usercpasswordtemp, datetemp, gender],showRecords(),onError);
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

        console.log(datetemp);
        console.log(usernametemp);
        console.log(useremailtemp);
        console.log(usercemailtemp);
        console.log(userpasswordtemp);
        console.log(usercpasswordtemp);
        console.log(gender);
        console.log(lastnametemp);
//    $("#id").val((item['id']).toString());
        var useridupdate = $("#id").val();

        console.log(useridupdate);

        db.transaction(function (tx)
        {
            tx.executeSql(updateStatement, [usernametemp, lastnametemp, useremailtemp,usercemailtemp, userpasswordtemp,usercpasswordtemp, datetemp, gender,useridupdate],loadandreset(),onError);
//      console.log(tx);
        });
        return false;
    });
//    $("#btnUpdate").click(updateRecord);

    $("#btnReset").click(resetForm);

    $("#btnDrop").click(dropTable);
    return false;


}
function createOption() {

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var opt = new Option(item.id, item.id);
                //   $(opt).html(item.id);

                $("#detail").append(opt);

            }

        });

    });

}