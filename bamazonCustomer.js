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
  currentInventory();
});

// prints current items for sale to list.
function currentInventory(){
  console.log("Here is a list of the current items we are selling...\n");
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: $" + res[i].price);
    };
    console.log("\n")
    userStart()
  });

};

// Asks user what item they want to buy and how many
function userStart(){
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the Product ID you would like to purchase?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many do you want to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {

      // Connects to server and finds items necessary
      var query = "SELECT item_id,product_name, stock_quantity, price FROM products WHERE ?";
      connection.query(query, { item_id: answer.item }, function(err, res) {
        if (err) throw err;

          // console.log(res[0]);
          // If there isnt enough stock_quantity
          if(res[0].stock_quantity < answer.quantity){
          console.log("Insufficient quantity brah! \n" + "We ony have " + res[0].stock_quantity + " of these!");
          userStart();
          }
          // When in stock, update server and check out customer
          else {
            var newQuantity = res[0].stock_quantity - answer.quantity;
            console.log("Updated Quantity")
            console.log(newQuantity);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQuantity
                },
                {
                  item_id: answer.item
                }
              ],
              function(error) {
                if (error) throw err;
                // What prints to console for checkout
                console.log("Succesfully added to cart! \n");
                var customerTotal = answer.quantity * res[0].price;
                console.log("Your cart total is $" + customerTotal);
                console.log("Whenever you're ready, throw $" + customerTotal + " in my pocket ;)")

                // constinue??
                inquirer
                  .prompt({
                    name: "cont",
                    type: "confirm",
                    message: "Want to Continue shopping?"
                  })
                  .then(function(answer) {

                      if(answer.cont){
                        currentInventory();
                      } else {
                        console.log("Okay then come back soon!")
                        connection.end();
                      }
                  });
              }
            );
          };
       // run next function here if any
      });
    });
};
