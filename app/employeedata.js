const mysql = require('mysql'); 
const dbconfig = require('./dbconfig.json'); 
const util = require ('util');
const exp = require('constants');
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
        + " FROM employees GROUP BY department, empID" ) 
 }

 exports.getEmployees = () => { 
     return this.employees(); 
    }

exports.getFinancialReport = async () => {
    return await db.query(
        "SELECT empID, empName, department, salary FROM employees"
    )
}
