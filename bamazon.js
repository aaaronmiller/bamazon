var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  main();
});

function main() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Which department would you like to shop in?",
      choices: [
        "Electronic goods",
        "Bio-engineered animals",
        "Exit store"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Electronic goods":
        electronics();
        break;

      case "Bio-engineered animals":
        bioAnimals();
        break;

      case "Exit store":
        exit();
        break;
      }
    });
}

function electronics() {
var query = "SELECT * FROM electronics";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        console.log(    
          "\nItem ID: " + res[i].id + " || Qty: " + res[i].qty + " || Description: " + res[i].description + " || Cost: $" + res[i].cost 
          );
        }
        console.log("\n\n\n");
        inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "Which item would you like to purchase?"
        })
        .then(function(answer) {
            console.log(answer);
        var chosenItem = [];
        for (var j = 0; j < res.length; j++) {
          if (res[j].id === parseInt(answer.id)) {
            chosenItem = res[j];
          }
        }
        if (chosenItem.qty > 0) {
            
            var query = "UPDATE electronics SET ? WHERE ?";
                connection.query(query, [
                    {
                      qty: chosenItem.qty -1
                    },
                    {
                      id: chosenItem.id
                    }
                ],
            
                function(error) {
                    if (error) throw err;
                    console.log("nice purchase!!");
                    main();
                }

              );
        }
        else {
            console.log("Sorry we don't have any of those left in stock")
            main();
        }
        }); 
    });
}

function bioAnimals() {
var query = "SELECT * FROM bioAnimals";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        console.log(    
          "\nItem ID: " + res[i].id + " || Qty: " + res[i].qty + " || Description: " + res[i].description + " || Cost: $" + res[i].cost 
          );
        }
        console.log("\n\n\n");
        inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "Which item would you like to purchase?"
        })
        .then(function(answer) {
            console.log(answer);
        var chosenItem = [];
        for (var j = 0; j < res.length; j++) {
          if (res[j].id === parseInt(answer.id)) {
            chosenItem = res[j];
          }
        }
        if (chosenItem.qty > 0) {
            
            var query = "UPDATE bioAnimals SET ? WHERE ?";
                connection.query(query, [
                    {
                      qty: chosenItem.qty -1
                    },
                    {
                      id: chosenItem.id
                    }
                ],
            
                function(error) {
                    if (error) throw err;
                    console.log("nice purchase!!");
                    main();
                }

              );
        }
        else {
            console.log("Sorry we don't have any of those left in stock")
            main();
        }
        }); 
    });
}


function exit() {
    console.log("\nThanks for shopping with us!")
    connection.end;
    process.exit(1);
}