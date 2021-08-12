const mysql = require('mysql'); 
const dbconfig = require('./dbconfig.json'); 
const util = require ('util');
const db = wrapDB(dbconfig);


 function wrapDB (dbconfig) { 
    const pool = mysql.createPool(dbconfig) 
    return { 
        query(sql, args) { 
            console.log("in query in wrapper") 
            return util.promisify( pool.query ) 
            .call(pool, sql, args) 
        }, 
        release () { 
            return util.promisify( pool.releaseConnection ) 
            .call( pool ) 
        } 
    } 
}

exports.getEmployeesByDepartment = async () => { 
    return await db.query( 
        "SELECT empID, empName, department" 
        + " FROM employees GROUP BY department, empID LIMIT 5" ) 
 }

 exports.insertEmployee = async (data, department) => {
     return await db.query(
         `insert into employees (empName, address, nationalInsurance, sortCode, accountnumber, salary, department) values ("${data["full-name"]}", "${data["address"]}", "${data["nin"]}", "${data["sortcode"]}", "${data["accno"]}", ${data["salary"]}, "${department}")`
     )
 }

 exports.insertSalesEmployee = async (data) => {
     await this.insertEmployee(data, "sales")

     //get the empID of the employee that was just inserted into the employees table
     empID = await db.query(`SELECT empID FROM employees WHERE nationalInsurance="${data["nin"]}" LIMIT 1`)
     console.log("***EMPID***: " + JSON.stringify(empID))
     console.log("***EMPID***: " + empID[0]["empID"])
    //insert necessary info into salesEmployees
    console.log("***DATA***\n" + data)
    await db.query(`INSERT INTO salesEmployees (empID, commissionRate, totalsales) VALUES (${empID[0]["empID"]}, ${data["commission"]}, ${data["sales"]})`)
 }

 exports.getEmployees = () => { 
     return this.employees(); 
}

exports.getAllEmployees = async () => {
    return await db.query(
        "SELECT * FROM employees"
    )
}

exports.getSalesHighestTotal = async () => {
    return await db.query(
        "SELECT * FROM employees join salesEmployees using (empID) ORDER BY totalSales DESC"
    )
}
