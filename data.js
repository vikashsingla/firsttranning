/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 10/10/13
 * Time: 5:03 PM
 * To change this template use File | Settings | File Templates.
 */
var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,lastname TEXT, useremail TEXT,usercemail TEXT,password TEXT,cpassword TEXT,date INTEGER,gender TEXT,hobbies TEXT,image BLOB)";

var selectAllStatement = "SELECT * FROM Contacts";

var insertStatement = "INSERT INTO Contacts (username,lastname, useremail,usercemail, password,cpassword,date,gender,hobbies,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

var updateStatement = "UPDATE Contacts SET username = ?, lastname = ?, useremail = ?,usercemail = ?, password = ?, cpassword = ?, date = ?,gender = ?,hobbies = ?,image = ? WHERE id = ?";

var deleteStatement = "DELETE FROM Contacts WHERE id=?";

var dropStatement = "DROP TABLE Contacts";

var db = openDatabase("AddressBook", "1.0", "Address Book", 2000);  // Open SQLite Database

var dataset ;

//var DataType;

function initDatabase(){

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

        return e;

    }

}

function createTable(){

    db.transaction(function (tx) {
        tx.executeSql(createStatement, [],showRecords(), onError());
//        console.log(tx);

    });
    resetForm();
}
//createTable();
function deleteRecord(id)
{
    console.log("dr");
    var iddelete = id.toString();
    db.transaction(function(tx){
        tx.executeSql(deleteStatement,[iddelete],showRecords(),onError());
        alert('Deleted record sucessfully');
        resetForm();

    });
}
function dropTable(){
    alert("delete all data");
    db.transaction(function(tx){
        tx.executeSql(dropStatement,[],showRecords(),onError());
    });
    resetForm();
    initDatabase();
}
function resetForm(){
    $("#username").val("");
    $("#lastname").val("");
    $("#useremail").val("");
    $("#usercemail").val("");
    $("#address").val("");
    $("#caddress").val("");
    $("#phone").val("");
    $("#gender").val("");
//    $('input[type=checkbox]').attr('checked', false);
    $("#id").val("");
    $("#image").val("");
//    Console.log("#image");

}


function loadandreset(){
    showRecords();
    resetForm();

}


function onError(){

//    alert("I am in error");

}
function showRecords(){
    $("#results").html('');
    db.transaction(function (tx) {
        tx.executeSql(selectAllStatement, [], function (tx, result){

            console.log(result);
            dataset = result.rows;

//            console.log(result.rows);

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);
                console.log(item);
                var linkeditdelete = '<tr><td><li>' + item['username'] + ' , '+item['lastname'] + ' , ' + item['useremail'] + ' , '+ item['usercemail'] + ' , ' + item['password'] + ' , ' + item['cpassword'] + ' , ' + item['date'] + ' , ' + item['gender'] + ' , ' + '<img class="thumb" src="' + item['image'] + '"/>' + ' , ' + item['hobbies']  + '  ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
                    '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li></td></tr>';
//                console.log(linkeditdelete);
                $("#results").append(linkeditdelete);

            }

        });
        createOption();
    });

}
function handleFileSelect(evt) {
    console.log('inside event');

//    $('#preview').show();
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {


        var reader = new FileReader();
        reader.onload = function (evt) {
            $('#preview').attr('src', evt.target.result);
        };
        reader.onload = (function (f) {
            return function (e) {


                var imagetemp = e.target.result;
                $('#image').attr('target', imagetemp);

//                $('#preview').attr('src', imagetemp);
            };
        })(f);
        reader.readAsDataURL(f);
    }
}
$('#image').change(function (event) {

    handleFileSelect(event);

    $('#preview').attr('src',$('#image').attr('target'));
});


function loadRecord(id){
//  console.log("========");
    $('#preview').show();
    $("#submitButton").attr("disabled", "disabled");
//    $("#updatebutton").removeAttr("disabled");


    var item = dataset.item(id);

    $("#username").val(item['username']);

    $("#lastname").val(item['lastname']);

    $("#useremail").val(item['useremail']);

    $("#usercemail").val(item['usercemail']);

    $("#address").val(item['password']);

    $("#caddress").val(item['cpassword']);

    $("#phone").val(item['date']);

    $("#gender").val(item['gender']);
//    $('input[type=checkbox]').attr('checked', false);

//    $('#preview').attr('src', item['image']);
//
//    $('#image').attr('target',item['image']);

    $("#id").val(item['id']).toString();

}


function initialLode(){
//    $('#preview').hide();
    $("body").fadeIn(2000);
    initDatabase();
    $('#image').change(function (event) {

        handleFileSelect(event);
        $('#preview').src=$('#image').attr('target');
    });
    $(document).on('change','#select',function(){
//        console.log("se");
        for(var i = 0;i<dataset.length; i++){
            item = dataset.item(i) ;
            if(item.id==$(this).val()){
                alert('welcome' +item.username + "" + item.date + "");

            }
        }


    });
    $(document).on('click', '#submitButton', function (){
//        console.log("sb");
//        alert("submit all data");
        var usernametemp = $('#username').val();

        var lastnametemp = $('#lastname').val();

        var useremailtemp = $('#useremail').val();

        var usercemailtemp = $('#usercemail').val();

        var userpasswordtemp = $('#address').val();

        var usercpasswordtemp = $('#caddress').val();

        var datetemp = $('#phone').val();

        var gender = $("#gender").val();
        var hobbies = [];
        $('input[name=hobbies]:checked').each(function(){
            hobbies.push($(this).val());
        });
        var imagetemp = $("#image").attr('target');
//        console.log(imagetemp);
//        console.log(hobbies);

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
            tx.executeSql(insertStatement, [usernametemp, lastnametemp, useremailtemp,usercemailtemp, userpasswordtemp,usercpasswordtemp, datetemp,gender,hobbies,imagetemp],showRecords(),onError());
//       console.log(loadandreset());
        });

//        return false;
    });
    $(document).on('click','#updatebutton',function(){
        console.log("I am in update form");
//        if(valid()==1)
//        {
        $('image').change(function(event){
            handleFileSelect(event);
        });
//        }
        var usernametemp = $('#username').val();

        var lastnametemp = $('#lastname').val();

        var useremailtemp = $('#useremail').val();

        var usercemailtemp = $('#usercemail').val();

        var userpasswordtemp = $('#address').val();

        var usercpasswordtemp = $('#caddress').val();

        var datetemp = $('#phone').val();

        var gender = $("#gender").val();

        var imageupdate = $('#image').attr('target');
        var hobbies = [];
        $('input[name=hobbies]:checked').each(function(){
            hobbies.push($(this).val());
        });
//         console.log(hobbies);
//        console.log(datetemp);
//        console.log(usernametemp);
//        console.log(useremailtemp);
//        console.log(usercemailtemp);
//        console.log(userpasswordtemp);
//        console.log(usercpasswordtemp);
//        console.log(gender);
//        console.log(lastnametemp);
//        console.log(imageupdate);
//        console.log(path);
//    $("#id").val((item['id']).toString());
        var useridupdate = $("#id").val();
//        console.log(useridupdate);
        db.transaction(function (tx){
            tx.executeSql(updateStatement, [usernametemp, lastnametemp, useremailtemp,usercemailtemp, userpasswordtemp,usercpasswordtemp, datetemp, gender,imageupdate,hobbies,useridupdate],loadandreset(),onError());
        });
        $('#preview').hide();
        $("#submitButton").removeAttr("disabled");
    });

    $("#btnReset").click(resetForm);

    $("#btnDrop").click(dropTable);
//    return false;
}
function createOption() {

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var opt = new Option(item.id, item.id);
                //   $(opt).html(item.id);

                $("#select").append(opt);

            }

        });

    });

}
