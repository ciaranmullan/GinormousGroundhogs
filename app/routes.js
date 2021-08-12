const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
router.get('/createemployee', (req, res) => {
    res.render('create_employee')
})


router.get('/employeeanswers', (req, res) => {
    res.render('employee_check_answers')
})


router.get('/:team', (req, res) => {
    if(req.params.team == 'hr'){
        res.render('hr_options')
    } else if(req.params.team == 'finance'){
        res.render('fn_options')

    } else if(req.params.team == 'sales'){
        res.render('s_options')
        
    } else if(req.params.team == 'talent'){
        res.render('tm_options')
        
    }
   
});


module.exports = router
