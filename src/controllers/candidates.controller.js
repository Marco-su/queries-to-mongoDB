import Candidate from "../models/Candidate";
import Employee from "../models/Employee";
import Position from "..//models/Positions";

// Create a new candidate
export const createNewCandidate = async (req, res) => {
  const foundCandidate = await Candidate.findOne({ nid: req.body.nid });

  if (foundCandidate) {
    return res.json({
      success: false,
      message: "This candidate is in the database",
    });
  }

  const { fullname, nid, age, position } = req.body;

  const positionId = await Position.findOne({ name: position }, { _id: 1 });

  console.log(positionId);

  const newCandidate = new Candidate({
    fullname,
    nid,
    age,
    position: positionId._id,
  });

  const savedCandidate = await newCandidate.save();

  res.json(savedCandidate);
};

// Get all candidates
export const getAllCandidates = async (req, res) => {
  const foundCandidates = await Candidate.find();
  res.json(foundCandidates);
};

// Remove all candidates under the age of 18
export const deleteLessThan18YearsOld = async (req, res) => {
  const deletedCandidates = await Candidate.deleteMany({ age: { $lt: 18 } });
  res.json({
    success: true,
    message: "Candidates removed",
    info: deletedCandidates,
  });
};

// Hire candidate. Add to employee list and remove from candidates list.
export const hireCandidate = async (req, res) => {
  const foundEmployee = await Employee.findOne({ nid: req.body.nid });

  if (foundEmployee) {
    return res.json({
      success: false,
      message: "This candidate is already hired",
    });
  }

  const foundCandidate = await Candidate.findOne({ nid: req.body.nid });

  if (!foundCandidate) {
    return res.json({
      success: false,
      message: "This candidate is not in database",
    });
  }

  const { fullname, nid, age, position } = foundCandidate;

  const newEmployee = new Employee({ fullname, nid, age, position });

  const savedEmployee = await newEmployee.save();

  const deletedCandidate = await Candidate.deleteOne({ nid });

  res.json({
    success: true,
    message: "New employee hired",
    delete_candidate_status: deletedCandidate,
    new_employee_info: savedEmployee,
  });
};
