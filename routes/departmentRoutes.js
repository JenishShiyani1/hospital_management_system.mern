const express = require('express');
const { addDepartment , listDepartment , listDepartmentByID , updateDepartmentByID , deleteDepartmentByID , countDepartment , departmentWiseDoctor } = require('../controllers/departmentController');

const departmentRouter = express.Router();

departmentRouter.post('/add-department' , addDepartment);

departmentRouter.get('/department-list' , listDepartment);

departmentRouter.get('/department-list/:id' , listDepartmentByID);

departmentRouter.patch('/edit-department/:id' , updateDepartmentByID);

departmentRouter.delete('/delete-department' , deleteDepartmentByID);

departmentRouter.get('/count-department' , countDepartment);

departmentRouter.get('/department-doctor/:dept' , departmentWiseDoctor);

module.exports = departmentRouter;