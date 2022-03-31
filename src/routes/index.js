const express = require('express');
const studentRoute = require('./students');
// const teacherRoute = require('./teachers');
const courseRoute = require('./courses');
const userRoute = require('./users');


const router = express.Router();

router.use('/students', studentRoute);
// router.use('/teachers', teacherRoute);
router.use('/courses', courseRoute);
router.use('/users', userRoute);

module.exports = router;