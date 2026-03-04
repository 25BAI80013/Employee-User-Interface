// employeeManager.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let employees = [];

function showMenu() {
    console.log("\n===== Employee Management System =====");
    console.log("1. Add Employee");
    console.log("2. Search Employee by ID");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. View All Employees");
    console.log("6. Exit");

    rl.question("Choose an option: ", handleMenu);
}

function handleMenu(choice) {
    switch (choice) {
        case '1':
            addEmployee();
            break;

        case '2':
            searchEmployee();
            break;

        case '3':
            updateEmployee();
            break;

        case '4':
            deleteEmployee();
            break;

        case '5':
            viewAllEmployees();
            break;

        case '6':
            console.log("Exiting program...");
            rl.close();
            break;

        default:
            console.log("Invalid choice. Try again.");
            showMenu();
    }
}

function addEmployee() {
    rl.question("Enter Employee ID: ", (id) => {
        rl.question("Enter Employee Name: ", (name) => {
            rl.question("Enter Employee Position: ", (position) => {
                employees.push({ id, name, position });
                console.log("Employee added successfully!");
                showMenu();
            });
        });
    });
}

function searchEmployee() {
    rl.question("Enter Employee ID to search: ", (id) => {
        const employee = employees.find(emp => emp.id === id);

        if (employee) {
            console.table([employee]);
        } else {
            console.log("Employee not found.");
        }

        showMenu();
    });
}

function updateEmployee() {
    rl.question("Enter Employee ID to update: ", (id) => {
        const employee = employees.find(emp => emp.id === id);

        if (employee) {
            rl.question("Enter new Name: ", (name) => {
                rl.question("Enter new Position: ", (position) => {
                    employee.name = name;
                    employee.position = position;
                    console.log("Employee updated successfully!");
                    showMenu();
                });
            });
        } else {
            console.log("Employee not found.");
            showMenu();
        }
    });
}

function deleteEmployee() {
    rl.question("Enter Employee ID to delete: ", (id) => {
        const index = employees.findIndex(emp => emp.id === id);

        if (index !== -1) {
            employees.splice(index, 1);
            console.log("Employee deleted successfully!");
        } else {
            console.log("Employee not found.");
        }

        showMenu();
    });
}

function viewAllEmployees() {
    if (employees.length === 0) {
        console.log("No employees found.");
    } else {
        console.log("\n===== Employee List =====");
        console.table(employees);
    }

    showMenu();
}
showMenu();
