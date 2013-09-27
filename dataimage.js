/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/26/13
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */
createStatement="CREATE TABLE image(id INTEGER PRIMARY KEY AUTOINCREMENT,image)";
var insertStatement = "INSERT INTO image(image) VALUE(?)";
var selectAllStatement = "SELECT * FROM image";
var db = openDatabase("image", "1.0", "image", 2000000);

function initDatabase()
{
    try
    {
        if(!window.openDatabase)
        {
            alert("not suported");
        }
        else{
            createTable();
        }
    }
    catch(e){
        if(e==2){
            console.log("invalid data base");

        }
        else{
            console.log("unknow error" + e + ".");
        }
        return false;
    }
}
function createTable()
{
    console.log("==");
    db.transaction(function(tx){
        tx.executeSql(createStatement,[],showRecords(),onError);
    });
}
function onError(error)
{
    alert(error.message);
}
function handleFileSelect(evt){
    console.log('=====');
    $('#preview').show();
 var files =evt.target.files;
    for(i=0;evt=files[i];i++) {
        var reader = new FileReader();
        reader.onload = function(evt){
//            $('#preview').attr('src',evt.target.result);

                return function (e) {
                    var imagetemp = e.target.result;
                    $('#image').attr('target', imagetemp);
                };
            };

            reader.readAsDataURL(evt);
        }
    }



$('#image').change(function (event) {

    handleFileSelect(event);

    $('#preview').attr('src',$('#image').attr('target'));


});

function initialLoad() {

     console.log("////");
    $("body").fadeIn(2000);

    initDatabase();
    $('#image').change(function (event) {

        handleFileSelect(event);

        $('#preview').src=$('#image').attr('target');


    });
}
$(document).on('click','#display',function(){
var path = $('input[name=files]').val();
   var imagetemp=$('image').attr('target');

    db.transaction(function(tx){
      tx.executeSql(insertStatement,[path,imagetemp],showRecords(),resetimage(),onError);
    });
    return false;

});
function showRecords() // Function For Retrive data from Database Display records as list

{
   console.log("show image");
    $("#results").html('');

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0; i < dataset.length; i++) {

                item = dataset.item(i);
                var linkeditdelete ='<tr><td><li>'  + '<img class="thumb" src="' + item['image'] + '"/>' + '</li></td></tr>';
                $('result').append(linkeditdelete);
            }
        });
    });
}
function resetimage()
{
    $('#image').val("");
}
