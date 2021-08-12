const express = require('express')
const router = express.Router()
const employeedata = require('./employeedata.js')

// Add your routes here - above the module.exports line
router.get("/submitemployee", async (req, res) => {
    console.log("body: " + JSON.stringify(req.session))
    res.render('employee_submit', { result: await employeedata.insertEmployee(req.session.data, "technical") })
});

router.get("/submitsalesemp", async (req, res) => {
    console.log("body: " + JSON.stringify(req.session.data))
    res.render('sales_emp_submit', { result: await employeedata.insertSalesEmployee(req.session.data) })
});


router.get('/employee_by_department', async (req, res) => {
    res.render('employee_by_department', { employees: await employeedata.getEmployeesByDepartment() });
    testTable = employeedata.getEmployeesByDepartment()
    console.log(testTable);
});

router.get('/createemployee', (req, res) => {
    res.render('create_employee')
});


router.get('/employeeanswers', (req, res) => {
    console.log("check answers")
    res.render('employee_check_answers')
});

router.get('/createsalesemp', (req, res) => {
    res.render('create_sales_employee')
});

router.get('/sales_emp_check_answers', (req, res) => {
    res.render('sales_emp_check_answers')
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



