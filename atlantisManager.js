const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "marine",
    database: "atlantis_StockDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    Atl_ManagerMenu();
});

function Atl_ManagerMenu() {
    connection.query('SELECT * FROM atl_Stock', function (err, res) {
        if (err) throw err;
        // pIDp = product Id for purchase
        // pQp= product quanity for purchase
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'list',
                    choices: ['View Products for Sale', 'View Low Inventory', 'Increase Q.O.H', 'Add New Product', 'Delete Product'],
                    message: 'Welcome Manager, What would you like to do?'
                },
            ])
            .then(function (Response) {
                if (Response.choice === 'View Products for Sale') {
                    readProducts();
                    return Atl_ManagerMenu();
                }
                if (Response.choice === 'View Low Inventory') {
                    lowInventory();
                    return Atl_ManagerMenu();
                }
                if (Response.choice === 'Increase Q.O.H') {
                    addQOH();
                }
                if (Response.choice === 'Add New Product') {
                    addProducts();
                }
                if (Response.choice === 'Delete Product') {
                    deleteProduct();
                }

            });
    })
};

function readProducts() {
    console.log("Selecting all products...");
    connection.query('SELECT id, product_name, department_name, retail, qoh FROM atl_Stock', function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].id + " || " + res[i].product_name + " || Price: " + res[i].retail + ' || Quanity In-Stock: ' + res[i].qoh);
        }
    });
}

function addProducts() {
    inquirer
        .prompt([
            {
                name: 'item',
                type: 'input',
                message: 'What is the name of the Product?'
            },
            {
                name: 'department',
                type: 'input',
                message: 'What department would you like to place your product in?'
            },
            {
                name: 'retail',
                type: 'input',
                message: 'Whats the retail value of the product?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'cost',
                type: 'input',
                message: 'Whats the cost of the product?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'qoh',
                type: 'input',
                message: 'Whats the Q.O.H?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'INSERT INTO atl_Stock SET ?',
                {
                    product_name: answer.item,
                    department_name: answer.category,
                    retail: answer.retail,
                    cost: answer.cost,
                    qoh: answer.qoh
                },
                function (err) {
                    if (err) throw err;
                    console.log('Your product was created successfully!');
                    // re-prompt the user for if they want to bid or post
                    Atl_ManagerMenu();
                }
            );
        });
}
function deleteProduct() {
    connection.query('SELECT * FROM atl_Stock', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'list',
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }

                        return choiceArray;
                    },
                    message: 'Choose what product to delete:'
                }
            ]).then(function (Response) {
                console.log('Processing purchase...')
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === Response.choice) {
                        chosenItem = res[i];
                    }
                }
                connection.query(
                    "DELETE FROM atl_Stock WHERE ?",
                    {
                        product_name: chosenItem.product_name
                    },
                    function (err, res) {
                        console.log(res.affectedRows + " products deleted!\n");
                        // Call readProducts AFTER the DELETE completes
                        readProducts();
                    }
                );
            })
    });
}

function addQOH() {
    connection.query('SELECT * FROM atl_Stock', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'list',
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }

                        return choiceArray;
                    },
                    message: 'Choose what product to change Q.O.H:'
                },
                {
                    name: 'currentqoh',
                    type: 'input',
                    message: 'Whats the new Q.O.H of the product?'
                }
            ]).then(function (Response) {
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === Response.choice) {
                        chosenItem = res[i];
                    }
                }
                chosenItem.qoh = Response.currentqoh + chosenItem.qoh
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
                    function (err, res) {
                        readProducts();
                    }
                );
                
            })
    });
}



