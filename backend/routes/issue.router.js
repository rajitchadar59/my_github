const express = require('express');
const issueController = require('../controllers/issueController');

const issueRouter = express.Router();


issueRouter.post("/issue/create",issueController.createIssue);
issueRouter.put("/issue/update/:id", issueController.updateIssueByID);
issueRouter.delete("/issue/delete/:id",issueController.deleteIssueByID);
issueRouter.get("/issue/all/:id",issueController.getAllIssues);
issueRouter.get("/issue/:id",issueController.getIssueByID);
issueRouter.get(
  "/issue/user/:userId",
  issueController.getIssuesCreatedByUser
);
issueRouter.put("/issue/toggle/:id", issueController.toggleIssueStatus);



module.exports = issueRouter;

