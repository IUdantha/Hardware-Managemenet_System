const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Employee = require('../../models/employee/empModel')
const User = require('../../models/auth/userModel')

//get a single employee
//@desc get employee profile
//@route GET /api/employees/
// @access Private
const getProfile = asyncHandler(async (req,res) => {

    const employee = await Employee.findById(req.params.id)

    if(!employee){
        res.status(400)
        throw new Error('Employee not found')
    }

    res.json({employee:employee.toObject({ getters: true }) });
})

//Get all employees
//@desc get employee
//@route GET /api/employees
//@access Private
const getEmployee = asyncHandler(async (req,res) => {
    //can pass a object and find it by them. (for this we use all)
    const employees = await Employee.find({})    //We await becuase it is asynchronous

        //show user info
        res.json({
            employees: employees.map((user) => user.toObject({ getters: true })),
          });
})

//@desc set employee
//@route POST /api/employees
// @access Private
const setEmployee = asyncHandler(async (req,res) => {

    const { empid,name,nic,email,contact,address,gender,age,password} = req.body

    if(!empid || !name || !nic || !email || !contact || !address || !gender || !age || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const employeeExists = await Employee.findOne({email})

    if(employeeExists){
        res.status(400)
        throw new Error('Employee already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const employee = await Employee.create({
        
        empid: req.body.empid,
        name: req.body.name,
        nic: req.body.nic,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        gender: req.body.gender,
        age: req.body.age,
        password:hashedPassword,    
        type:"employee"
    })

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        type:"employee" 
    })

    res.status(200).json({employee,user})

})



//@desc update employee
//@route PUT /api/employees/:id
// @access Private
const updateEmployee = asyncHandler(async (req,res) => {

    //Get the driver we want to update
    const employees = await Employee.findById(req.params.id)

    if(!employees){
        res.status(400)
        throw new Error('Employee not found')
    }

    const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,  //create if it doesn't exist
        })
    res.status(200).json(updateEmployee)
})

//@desc delete employee
//@route DELETE /api/employees
// @access Private
const deleteEmployee = asyncHandler(async(req,res) => {

     //Get the goal we want to delete
     const employees = await Employee.findById(req.params.id)

     if(!employees){
         res.status(400)
         throw new Error('Employee not found')
     }
     
     //no need to assign it to a variable because we don't need to save it
     await Employee.findByIdAndRemove(req.params.id)
     await User.findOneAndDelete({email : employees.email})

    res.status(200).json({ id: req.params.id })   // for the frontend we'll need the id
    
})



module.exports = {
    getEmployee,
    setEmployee,
    updateEmployee,
    deleteEmployee,
    getProfile
}