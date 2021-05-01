import Employee from "../models/Employee";
import Position from "../models/Positions";

// Create new employee
export const createNewEmployee = async (req, res) => {
  const foundEmployee = await Employee.findOne({ nid: req.body.nid });

  if (foundEmployee)
    return res.json({
      success: false,
      message: "This employee alreary exists",
      info: foundEmployee,
    });

  const { fullname, nid, age, position } = req.body;

  const newEmployee = new Employee({
    fullname,
    nid,
    age,
  });

  const positionFound = await Position.find(
    { name: { $in: position } },
    { _id: 1 }
  );

  newEmployee.position = positionFound.map((pos) => pos._id);

  if (req.body.service_years) {
    newEmployee.service_years = req.body.service_years;
  }

  const savedEmployee = await newEmployee.save();

  return res.json({
    success: true,
    message: "New employee created",
    information: savedEmployee,
  });
};

// Get All Employees
export const getAllEmployees = async (req, res) => {
  const foundEmployees = await Employee.find().populate("position");
  return res.json(foundEmployees);
};

// Get Single Employee
export const getSingleEmployeeByNid = async (req, res) => {
  const foundEmployee = await Employee.findOne({
    nid: req.params.nid,
  }).populate("position");
  res.json(foundEmployee);
};

// Get employeee by especific ages in an array
export const getEmployeesByEspecificAges = async (req, res) => {
  const foundEmployees = await Employee.find({ age: { $in: req.body.ages } });
  res.json(foundEmployees);
};

// Get employees between two ages. The ages are located in the params
export const getEmployeeByRangeAge = async (req, res) => {
  const foundEmployees = await Employee.find({
    age: { $gte: req.params.min, $lte: req.params.max },
  });
  res.json(foundEmployees);
};

// Getting employee using the position schema id
export const getEmployeesByPosition = async (req, res) => {
  const positionId = await Position.findOne(
    { name: req.body.position },
    { _id: 1 }
  );

  const foundEmployees = await Employee.find(
    { position: positionId._id },
    { _id: 0 }
  ).populate("position");

  res.json(foundEmployees);
};

// Update employee using nid
export const updateEmployee = async (req, res) => {
  const foundEmployee = await Employee.findOne({ nid: req.body.nid });

  if (!foundEmployee)
    return res.json({
      sucess: false,
      message: "This nid does not belong to any employee",
    });

  const updatedEmployee = await Employee.updateOne(
    { nid: req.body.nid },
    req.body
  );

  res.json({
    success: true,
    message: "Employee updated",
    info: updatedEmployee,
  });
};
