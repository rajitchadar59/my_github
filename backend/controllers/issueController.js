const mongoose = require('mongoose');
const Repository = require('../models/repoModel');
const User = require("../models/userModel");
const Issue = require("../models/issueModel");


const createIssue = async (req, res) => {
  const { title, description, repository, owner } = req.body;
  if (!title || !description || !repository || !owner) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {

    const issue = new Issue({
      title,
      description,
      repository,
      owner
    });

    await issue.save();

    res.status(201).json({ issue, message: "issue created !" });

  } catch (err) {

    console.error("Error during issue creation ", err.message);
    res.status(500).json({ message: "Server error" });

  }



}

const updateIssueByID = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {

    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    const updatedIssue = await issue.save();

    res.json({ message: "issue updated successfully", updatedIssue });

  } catch (err) {

    console.error("Error during issue updation ", err.message);
    res.status(500).json({ message: "Server error" });

  }
}

const deleteIssueByID = async (req, res) => {
  const { id } = req.params;

  try {
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json({ message: "issue deleted" })

  } catch (err) {

    console.error("Error during deletion ", err.message);
    res.status(500).json({ message: "Server error" });

  }
}

const getAllIssues = async (req, res) => {
  const { id } = req.params;

  try {
    const issues = await Issue.find({ repository: id })
      .populate("owner", "username email");


    res.status(200).json(issues);

  } catch (err) {
    console.error("Error during issue fetching", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


const getIssueByID = async (req, res) => {
  const { id } = req.params;
  try {

    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.status(200).json(issue);

  } catch (err) {

    console.error("Error during issue featching", err.message);
    res.status(500).json({ message: "Server error" });

  }
}

const getIssuesCreatedByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const issues = await Issue.find({ owner: userId })
      .populate({
        path: "repository",
        populate: {
          path: "owner",
          select: "username _id"
        }
      })

    res.json({ success: true, issues });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



const toggleIssueStatus = async (req, res) => {
  try {
    const issueId = req.params.id;
    const userId = req.body.userId;

    const issue = await Issue.findById(issueId).populate("repository owner");
    if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });


    const repoOwnerId = issue.repository.owner.toString();
    const issueOwnerId = issue.owner._id.toString();
    if (userId !== issueOwnerId && userId !== repoOwnerId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    issue.status = issue.status === "open" ? "closed" : "open";
    await issue.save();

    res.status(200).json({ success: true, status: issue.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
  createIssue,
  updateIssueByID,
  deleteIssueByID,
  getAllIssues,
  getIssueByID,
  getIssuesCreatedByUser,
  toggleIssueStatus
}