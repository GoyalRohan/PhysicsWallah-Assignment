const Record = require("../models/recordModel");
const Joi = require("joi");

const addRecordSchema = Joi.object({
  name: Joi.string().required(),
  salary: Joi.number().required(),
  currency: Joi.string(),
  department: Joi.string().required(),
  sub_department: Joi.string().required(),
  on_contract: Joi.bool(),
});

const calculateSummaryStatistics = (salaries) => {
  if (salaries.length === 0) {
    return { mean: 0, min: 0, max: 0 };
  }
  const sum = salaries.reduce((acc, salary) => acc + salary, 0);
  const mean = sum / salaries.length;
  const min = Math.min(...salaries);
  const max = Math.max(...salaries);
  return { mean, min, max };
};

const addRecord = async (req, res) => {
  const { error } = addRecordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newRecord = req.body;
  try {
    const record = new Record(newRecord);
    await record.save();
    res.status(201).json({ message: "Record added successfully", record });
  } catch (err) {
    console.error("Error adding record:", err);
    res.status(500).json({ error: "Unable to add the record" });
  }
};

const deleteRecord = async (req, res) => {
  const { recordId } = req.query;
  try {
    const rec = await Record.findById(recordId);
    if (!rec)
      return res.status(500).json({ error: "Unable to find the record" });
    const record = await Record.findByIdAndDelete(recordId);
    console.log(record);
    res.status(200).json({ message: "Record deleted successfully", record });
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ error: "Unable to delete the record" });
  }
};

const getSummaryStats = async (req, res) => {
  try {
    const records = await Record.find({}, "salary");
    const salaries = records.map((record) => record.salary);
    const summary = calculateSummaryStatistics(salaries);
    res.status(200).json(summary);
  } catch (err) {
    console.error("Error fetching summary statistics:", err);
    res.status(500).json({ error: "Unable to fetch summary statistics" });
  }
};

const getSummaryStatsOnContract = async (req, res) => {
  try {
    const records = await Record.find({}, "salary on_contract");
    const onContractSalaries = records
      .filter((record) => record.on_contract === true)
      .map((record) => parseFloat(record.salary));
    console.log(onContractSalaries);
    const summary = calculateSummaryStatistics(onContractSalaries);
    res.status(200).json(summary);
  } catch (err) {
    console.error("Error fetching summary statistics:", err);
    res.status(500).json({ error: "Unable to fetch summary statistics" });
  }
};

const getSummaryStatsOnDepartment = async (req, res) => {
  try {
    const departmentSummary = {};
    const records = await Record.find({}, "salary department");
    records.forEach((record) => {
      const department = record.department;
      const salary = parseFloat(record.salary);
      if (!departmentSummary[department]) {
        departmentSummary[department] = [];
      }
      departmentSummary[department].push(salary);
    });
    for (const department in departmentSummary) {
      departmentSummary[department] = calculateSummaryStatistics(
        departmentSummary[department]
      );
    }
    res.status(200).json(departmentSummary);
  } catch (err) {
    console.error("Error fetching summary statistics:", err);
    res.status(500).json({ error: "Unable to fetch summary statistics" });
  }
};

const getSummaryStatsOnSubDepartment = async (req, res) => {
  const departmentSubDepartmentSummary = {};
  try {
    const records = await Record.find({}, "salary department sub_department");
    records.forEach((record) => {
      const department = record.department;
      const subDepartment = record.sub_department;
      const salary = parseFloat(record.salary);
      if (!departmentSubDepartmentSummary[department]) {
        departmentSubDepartmentSummary[department] = {};
      }
      if (!departmentSubDepartmentSummary[department][subDepartment]) {
        departmentSubDepartmentSummary[department][subDepartment] = [];
      }
      departmentSubDepartmentSummary[department][subDepartment].push(salary);
    });
    for (const department in departmentSubDepartmentSummary) {
      for (const subDepartment in departmentSubDepartmentSummary[department]) {
        departmentSubDepartmentSummary[department][subDepartment] =
          calculateSummaryStatistics(
            departmentSubDepartmentSummary[department][subDepartment]
          );
      }
    }
    res.status(200).json(departmentSubDepartmentSummary);
  } catch (err) {
    console.error("Error fetching summary statistics:", err);
    res.status(500).json({ error: "Unable to fetch summary statistics" });
  }
};

module.exports = {
  addRecord,
  deleteRecord,
  getSummaryStats,
  getSummaryStatsOnContract,
  getSummaryStatsOnDepartment,
  getSummaryStatsOnSubDepartment,
};
