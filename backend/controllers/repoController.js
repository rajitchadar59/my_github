const mongoose = require('mongoose');
const Repository = require('../models/repoModel');
const User = require("../models/userModel");
const Issue = require("../models/issueModel");


const createRepository = async (req, res) => {
    const { owner, name , description, visibility } = req.body;

    try {

        if (!name) {
            return res.status(400).json({ message: "Repository name is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ message: "invalid userID" });
        }

        const newRepo = new Repository({
            name,
            description,
            visibility,
            owner,

        })

        const result = await newRepo.save();
        res.status(201).json({
            message: "repository created",
            repositoryID: result._id
        })

    } catch (err) {

        console.error("Error during repository creation ", err.message);
        res.status(500).json({ message: "Server error" });

    }
}

const getAllRepositories = async (req, res) => {
    try {

        const repositories = await Repository.find({visibility:true})
            .populate("owner")
            .populate("issues");

        res.json(repositories);


    } catch (err) {

        console.error("Error during fetching repository ", err.message);
        res.status(500).json({ message: "Server error" });

    }
}

const fetchRepositoryByID = async (req, res) => {
    const repoID = req.params.id;

    try {

        const repository = await Repository.findById(repoID)
            .populate("owner")
            .populate("issues");

        res.json(repository);

    } catch (err) {

        console.error("Error during fetching repository ", err.message);
        res.status(500).json({ message: "Server error" });

    }
}

const fetchRepositoryByName = async (req, res) => {
    const repoName = req.params.name;

    try {

        const repository = await Repository.findOne({ name: repoName })
            .populate("owner")
            .populate("issues");

        if (!repository) {
            return res.status(404).json({ message: "Repository not found" });
        }

        res.json(repository);

    } catch (err) {

        console.error("Error during fetching repository ", err.message);
        res.status(500).json({ message: "Server error" });

    }
}

const fetchRepositoryForCurrentUser = async (req, res) => {
    const userId = req.params.userID;

    try {

        const repositories = await Repository.find({ owner: userId });

        if (!repositories || repositories.length == 0) {
            return res.status(404).json({ error: "User repository not found" });
        }

        res.json({ message: "Repository Found", repositories })

    } catch (err) {

        console.error("Error during fetching user repositories ", err.message);
        res.status(500).json({ message: "Server error" });

    }

}

const updateRepositoryByID = async (req, res) => {
    const { id } = req.params;
    const { content, description } = req.body;

    try {

        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({ error: "Repository not found" });
        }

        repository.content.push(content);
        repository.description = description;

        const updatedRepository = await repository.save();

        res.json({
            message: "Repository updated successfully",
            repository: updatedRepository
        })


    } catch (err) {

        console.error("Error during updating repository ", err.message);
        res.status(500).json({ message: "Server error" });

    }
}

const toggleVisibilityByID = async (req, res) => {
    const { id } = req.params;
    

    try {

        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({ error: "Repository not found" });
        }

        repository.visibility= !repository.visibility;

        const updatedRepository = await repository.save();

        res.json({
            message: "Repository visibility toggled successfully",
            repository: updatedRepository
        })


    } catch (err) {

        console.error("Error during toggling  visibility ", err.message);
        res.status(500).json({ message: "Server error" });

    }
}

const deleteRepositoryByID = async (req, res) => {
    const {id} = req.params;
    
    try{

        const repository = await Repository.findByIdAndDelete(id);
         if (!repository) {
            return res.status(404).json({ error: "Repository not found" });
        }

        res.json({message:"repository deleted successfully"});

    }catch (err) {

        console.error("Error during deleting repository ", err.message);
        res.status(500).json({ message: "Server error" });

    }
   
}


const starRepo = async (req, res) => {
    try {
        const { userId, repoId, star} = req.body;

        if (!userId || !repoId) {
            return res.status(400).json({ message: "Missing data" });
        }

        let user;

        if (star === true) {         
            user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { starRepos: repoId } },
                { new: true }
            );
        } else {
           
            user = await User.findByIdAndUpdate(
                userId,
                { $pull: { starRepos: repoId } },
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            starred: star,
            starRepos: user.starRepos
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};






const getStarredReposByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let repos;

    if (req.userId && req.userId === user._id.toString()) {
      
      repos = await Repository.find({
        _id: { $in: user.starRepos }
      }).populate('owner');

    } else {
    
      repos = await Repository.find({
        _id: { $in: user.starRepos },
        visibility: true
      }).populate('owner');
    }

    res.status(200).json({
      success: true,
      repos
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {

    createRepository,
    getAllRepositories,
    fetchRepositoryByID,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryByID,
    toggleVisibilityByID,
    deleteRepositoryByID,
    starRepo,
    getStarredReposByUsername

}