var mysql = require("mysql");
var inquirer = require("inquirer");

// connection to MySQL server
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "Menu Options",
      choices: [
        "View Prodcuts for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Products"
      ]
    })
    .then(function(answer) {
      switch (answer.task) {
        case "View Prodcuts for Sale":
          console.log("view products for sale");
          break;

        case "View Low Inventory":
          console.log("view low Inventory");
          break;

        case "Add to Inventory":
          console.log("add to inventory");
          break;

        case "Add New Products":
          console.log("add new products");
          break;
      }
    });
};
