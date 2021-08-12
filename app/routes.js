const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router

const employeedata = require('./employeedata.js')

router.get('/employee_by_department', async (req, res) => { 
    res.render('employee_by_department', { employees: await employeedata.getEmployeesByDepartment() } );
    testTable = employeedata.getEmployeesByDepartment() 
    console.log(testTable); 
});