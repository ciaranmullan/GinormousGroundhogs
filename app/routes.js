const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
router.get('/createemployee', (req, res) => {
    res.render('create_employee')
})

router.get('/employeeanswers', (req, res) => {
    res.render('employee_check_answers')
})
module.exports = router
