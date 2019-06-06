const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(function () {
    //CREATING TABLE CLASSROOM creation
    db.run("CREATE TABLE Classroom(building varchar, room_number NUMBER, capacity NUMBER)");
    //value insertion in classroom  
    db.run("INSERT INTO Classroom VALUES('Packard' , 101 , 500)");
    db.run("INSERT INTO Classroom VALUES('Painter' , 514 , 10)");
    db.run("INSERT INTO Classroom VALUES('Taylor' , 3128 , 70)");
    db.run("INSERT INTO Classroom VALUES('Watson' , 100 , 30)");
    db.run("INSERT INTO Classroom VALUES('Watson' , 120 , 50)");
    
    // CREATING TABLE DEPARTMENT
    db.run("CREATE TABLE Department (dept_name varchar , building varchar, budget varchar)")
    db.run("INSERT INTO Department VALUES('Biology' , 'Watson', 90000)");
    db.run("INSERT INTO Department VALUES('Comp. Sci.' , 'Taylor', 100000)");
    db.run("INSERT INTO Department VALUES('Elec. Eng.' , 'Taylor', 85000)");
    db.run("INSERT INTO Department VALUES('Finance' , 'Painter', 120000)");
    db.run("INSERT INTO Department VALUES('History' , 'Painter', 50000)");
    db.run("INSERT INTO Department VALUES('Music' , 'Packard', 80000)");
    db.run("INSERT INTO Department VALUES('Physics' , 'Watson', 70000)");

    
    //QUERY 2 room number and building name for those rooms whose capacity is greater than 50
    db.each("SELECT building,room_number FROM Classroom where capacity>50", function (err, row) {
        console.log('Building : ' + row.building + '  Room No. : ' + row.room_number);
    });

    // JUST FOR NEXT LINE COZ CAPACITY CAN NOT BE MINUS
    db.each("SELECT room_number FROM Department where capacity < 0", function (err, row) {
        console.log('');
    });

    // QUERY 3 names of those departments whose budgets are greater than $85,000
    db.each("SELECT dept_name FROM Department where budget > 85000", function (err, row) {
        console.log('Department : ' + row.dept_name);
    });

    // JUST FOR NEXT LINE COZ CAPACITY CAN NOT BE MINUS
    db.each("SELECT room_number FROM Department where capacity < 0", function (err, row) {
        console.log('');
    });
  //QUERY 4 For each department, print the total capacity available.
    let dept_list = {} //defining an empty list
    db.each("SELECT DISTINCT Dept_name, Capacity FROM Department NATURAL JOIN Classroom" , function(err,row){

        if(dept_list[row.dept_name] === undefined) // checking if the dept_nme exixt in the list
            dept_list[row.dept_name]=0; // defininig the list item if its not available

            dept_list[row.dept_name] += row.capacity; // counting the capacity 

    },function(err,count){ 
        let distinct = Object.keys(dept_list);

        for( let i=0; i != distinct.length; ++i){
            console.log(distinct[i] + ":"+dept_list[distinct[i]]); //printing the capacity
        }
    });
   /* db.each("SELECT room_number FROM Department where capacity < 0", function (err, row) {
        console.log('');
    });
    
    db.each("SELECT DISTINCT Department.dept_name,classroom.capacity From classroom INNER JOIN Department USING(building) GROUP BY dept_name", function (err, row) {
        console.log(row.dept_name + " : " + row.capacity)
    });*/
    //db.each("SELECT dept_name.Department , capacity.classroom FROM classroom INNER JOIN Department where building.classroom = building.departmwnt",function(err,row){

    //  console.log(row.dept_name,row.capacity);
    //});
    //db.each("SELECT ")
});