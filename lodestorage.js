/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/18/13
 * Time: 12:02 PM
 * To change this template use File | Settings | File Templates.
 */
var createStatement="CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,userfirstname TEXT,userlastname TEXT,useremail TEXT,userpassword TEXT,date INTEGER,gender TEXT)";
var selectAllStatement = "SELECT * FROM Contacts";
var insertStatement = "INSERT INTO Contacts (userfirstname,userlastname, useremail, userpassword, date,gender) VALUES (?, ?, ?, ?, ?, ?)";
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database
var dataset;

//var DataType;

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
    tx.executeSql(createStatement, [], showRecords, onError);
});

}
function loadRecord(i) // Function for display records which are retrived from database.

{

    var item = dataset.item(i);

    $("#username").val((item['userfirstname']).toString());
    $("#userlast").val((item['userlastname']).toString());

    $("#useremail").val((item['useremail']).toString());

    $("#password").val((item['userpassword']).toString());

    $("#date").val((item['date']).toString());

    //  var image = item.image;
    //$("#image").val(image);

    $("#id").val((item['id']).toString());

}
function lode()
{
    showRecords();
}
function onError(tx, error) // Function for Hendeling Error...

{

    alert(error.message);

}
function showRecords() // Function For Retrive data from Database Display records as list

{

    $("#results").html('');

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<tr><td><li>' + item['userfirstname'] +item['userlastname']+ ' , ' + item['useremail'] + ' , ' + item['userpassword'] + ' , ' + item['date'] + ' , ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +'></li></td></tr>';

//                    '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a>

                $("#results").append(linkeditdelete);

            }
            createOption();

        });

    });

}
/*
function handleFileSelect(evt) {
    console.log('inside event');
    //   alert("hello");
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
//            alert(f);
//        // Only process image files.
//        if (!f.type.match('image.*')) {
//            continue;
//        }


        var reader = new FileReader();

        reader.onload = function (evt) {
            $('#preview').attr('src', evt.target.result);
        }
        // Closure to capture the file information.
        reader.onload = (function (f) {
            return function (e) {
                // Render thumbnail.

//                var span = document.createElement('span');
//                span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                    '" title="', escape(theFile.name), '"/>'].join('');
//                document.getElementById('list').insertBefore(span, null);

//                var imagetemp = e.target.result;
//                $('#image').attr('target', imagetemp);
                //   db.transaction(function (tx) { tx.executeSql(insertStatement, [imagetemp],onError); });

                // function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..

                //{

                // var imagetemp = $('input:file[id=image]').val();


                //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

                //}


            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
} */
//$('#image').change(function (event) {
//
//    handleFileSelect(event);
//
//    $('#preview').attr('src',$('#image').attr('target'));
});
function initialLoad() {


    $("body").fadeIn(2000); // Fede In Effect when Page Load..

    initDatabase();
//    $('#image').change(function (event) {
//
//        handleFileSelect(event);
//
//        $('#preview').src=$('#image').attr('target');
//    });

    $(document).on('change', '#color', function () {
        // fires only after clicking OK
        $('#mycontact').css('background-color', $(this).val());
    });

    $(document).on('change', '#detail', function () {


//                var dataset = result.rows;
//                var it=dataset.item($(this).val());
//                console.log(it);
//                alert("welcome"+it.username+" "+it.phone+" ");
        console.log(dataset);
        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);
            if (item.id == $(this).val()) {
                alert("welcome  :" + item.username + " " + item.phone + " ");
                // console.log(item);
            }

        }
    });
$(document).on('click', '#submitButton', function () {
    alert("in here");
    var userfirstnametemp = $('input:text[id=username]').val();
    var userlastnametemp = $('input:text[id=userlast]').val();

    var useremailtemp = $('input:text[id=useremail]').val();

    var userpasswordtemp = $('input:text[id=password]').val();

    var datetemp = $('input:text[id=date]').val();

    var gender = $('input[name=gender]:checked').val();
    var hobbies = [];
    $('input[name=hobbies]:checked').each(function () {
        hobbies.push($(this).val());
    });
//    var imagetemp = $('#image').attr('target');
    db.transaction(function (tx)
    {
        tx.executeSql(insertStatement, [userforstnametemp,userlasttemp,useremailtemp, userpasswordtemp, datetemp, gender], load, onError);
    });
    return false;
});
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