const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "marine",
  database: "atlantis_StockDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
  Atl_Purchase();
});

function Atl_Purchase() {
    connection.query('SELECT * FROM atl_Stock', function(err, res) {
        if (err) throw err;
    // pIDp = product Id for purchase
    // pQp= product quanity for purchase
    inquirer
    .prompt([
        {
            name: 'choice',
            type: 'list',
            choices: function() {              
              var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].product_name);
                }

                return choiceArray;
            },
            message: 'Choose what product to purchase:'
          },
        {
            type: 'input',
            message: '\nQuanity of Items:',
            name: 'pQp'
        }
    ])
    .then(function (Response) {
      console.log('Processing purchase...')
      var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === Response.choice) {
            chosenItem = res[i];
          }
        }
      if (chosenItem.qoh > parseInt(Response.pQp)) {
        chosenItem.qoh = chosenItem.qoh - Response.pQp;
        connection.query(
          'UPDATE atl_Stock SET ? WHERE ?',
          [
            {
              qoh: chosenItem.qoh
            },
            {
              id: chosenItem.id
            }
          ],
          function(error) {
            if (error) throw error;
            let total = chosenItem.retail * Response.pQp
            console.log(`Purchase Success! Your total was $${total}`);
          }
        );
      } else {
        console.log('Your bid was too low. Try again...');
      }
    });
});
};

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query('SELECT id, product_name, department_name, retail, qoh FROM atl_Stock', function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
        console.log("\nID: " + res[i].id + " || " + res[i].product_name + " || Price: " + res[i].retail + ' || Quanity In-Stock: ' + res[i].qoh);
      }
      
    });
  }
  
