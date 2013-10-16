/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 10/14/13
 * Time: 3:00 PM
 * To change this template use File | Settings | File Templates.
 */
function Controller($scope){
    $scope.Name='UserDatabase';
    $scope.version='1.0';
    $scope.displayName='Database';
    $scope.maxSizeInBytes=20000;
    $scope.db=openDatabase($scope.Name,$scope.version,$scope.displayName,$scope.maxSizeInBytes);

     $scope.createtable = function(){
//           console.log("i am n create");
           $scope.createsql="CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,lastname TEXT, useremail TEXT,usercemail TEXT,password TEXT,cpassword TEXT,date INTEGER,gender TEXT,image,hobbies TEXT)";
           $scope.db.transaction(function(tx){
//               console.log('in create statement');
               tx.executeSql($scope.createsql,[]);
//               console.log();
           });
       };
    $scope.insertRecords=function(){
//        console.log("i m here");
        $scope.createtable();
        $scope.bday=document.getElementById('bday').value;
        $scope.insertsql="INSERT INTO Contacts (username,lastname,useremail,usercemail,password,cpassword,date,gender,hobbies,image) VALUES(?,?,?,?,?,?,?,?,?,?)";
//        if ($scope.user.$valid) {
        $scope.db.transaction(function(tx){
                 tx.executeSql($scope.insertsql, [$scope.username,$scope.lastname, $scope.useremail,$scope.usercemail,$scope.password,$scope.cpassword,$scope.date,$scope.gender,$scope.hobbies, document.getElementById('uploadImg').src],
                     $scope.showRecord(),window.location.reload());
//                 console.log('in here222');
//
             });
//        }
    };
    $scope.dropTable=function(){
      $scope.dropsql="DROP TABLE Contacts";
        $scope.db.transaction(function(tx){
            tx.executeSql($scope.dropsql,[],window.location.reload());
        });
    };
    $scope.showRecord=function(){
         $scope.selectAllStatement="SELECT * FROM Contacts";
        $scope.db.transaction(function(tx){
            console.log("i am in sr");
            tx.executeSql($scope.selectAllStatement,[],$scope.showRecords());
        });
    };
//        $scope.showRecord();
           $scope.showRecords=function(result){
//               console.log('i m in show');
            $scope.dataset = result.rows;
            $scope.master=[dataset];
               for ( var i = 0;i < dataset.length; i++)
               {
                   $scope.master.push(dataset.item(i));
                   console.log('i m in show');
               }
           };

    $scope.deleteContact = function(id) {
        $scope.deleteStatement = "DELETE FROM Contacts where id=" + id;
        $scope.db.transaction(function(tx) {
            tx.executeSql($scope.deleteStatement, [],window.location.reload());
        });
        console.log("delete executed");
    };
    $scope.editContact = function(id) {
        for ( var i in $scope.master) {
            if ($scope.master[i].id == id) {
                console.log("log in here");
                $scope.id = id;
                $scope.username = $scope.master[i].username;
                $scope.lastname = $scope.master[i].lastname;
                $scope.useremail = $scope.master[i].useremail;
                $scope.usercemail = $scope.master[i].usercemail;
                $scope.Password = $scope.master[i].Password;
                $scope.CPassword = $scope.master[i].CPassword;
                $scope.date = $scope.master[i].date;
                $scope.gender = $scope.master[i].gender;
                $scope.hobbies = $scope.master[i].hobbies;
                $scope.imageSrc = $scope.master[i].image;


            }
        }
    };
    $scope.updateContact = function() {
        console.log("in here");
        $scope.updateStatement = "UPDATE Contacts SET username = ?, lastname = ?, useremail = ?,usercemail = ?, password = ?, cpassword = ?, date = ?,gender = ?,hobbies = ?,image = ? WHERE id = ?";
        $scope.db.transaction(function(transaction) {
            transaction.executeSql($scope.updateStatement,
                [ $scope.username,$scope.lastname, $scope.useremail,$scope.usercemail,$scope.password,$scope.cpassword,$scope.date,$scope.gender,$scope.hobbies,document.getElementById('uploadImg').src,$scope.id], window.location.reload());
        });
    };

}