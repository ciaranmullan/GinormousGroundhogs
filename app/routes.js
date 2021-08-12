const express = require('express')
const router = express.Router()
const employeedata = require('./employeedata.js')

// Add your routes here - above the module.exports line
router.get('/fn_report', async (req, res) => { 
    res.render('fn_report', { employees: await employeedata.getFinancialReport() } );
});

router.get('/employee_by_department', async (req, res) => {

    res.render('employee_by_department', { employees: await employeedata.getEmployeesByDepartment() });
    
    testTable = employeedata.getEmployeesByDepartment()
    
    console.log(testTable);
    
    });
router.get('/list_employees', async (req,res) =>{
    res.render('list_employees', {employees: await employeedata.getAllEmployees()});
}); 


router.get('/createemployee', (req, res) => {
    res.render('create_employee')
});


router.get('/employee_check_answers', (req, res) => {
    console.log("check answers")
    res.render('employee_check_answers')
});

router.get('/createsalesemp', (req, res) => {
    res.render('create_sales_employee')
});

router.get('/sales_emp_check_answers', (req, res) => {
    res.render('sales_emp_check_answers')
});
router.get('/highest_sales', async (req, res) => {
    res.render('highest_sales', {employees: await employeedata.getSalesHighestTotal()});
});

router.get('/:team', (req, res) => {
    if (req.params.team == 'hr') {
        res.render('hr_options')
    } else if (req.params.team == 'finance') {
        res.render('fn_options')

    } else if (req.params.team == 'sales') {
        res.render('s_options')

    } else if (req.params.team == 'talent') {
        res.render('tm_options')

    }

});



module.exports = router