const Student = require('../models/student');

async function getAllStudents(req, res) {
  const students = await Student.find().exec();
  return res.json(students); 
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);
}

async function updateStudentById(req, res) {
  const { id } = req.params;
  const { name, course } = req.body;
  const student = await Student.findByIdAndUpdate(id, { name, course }, {new: true});
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);

}

async function deleteStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);
  if (!student) {
    return res.sendStatus(404);
  }
  return res.sendStatus(204);

}

async function createStudent(req, res) {
  const { id, name, course } = req.body;


  const student = new Student({ id, name, course });
  await student.save();
  return res.status(201).json(student);
}

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  createStudent
}