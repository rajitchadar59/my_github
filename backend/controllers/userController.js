const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient, ReturnDocument } = require('mongodb');
const dotenv = require('dotenv');
const ObjectId = require('mongodb').ObjectId;
const Repository = require('../models/repoModel');
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

dotenv.config();
const uri = process.env.MONGO_URI;

let client;

async function connectClient() {

    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }

}



const getAllUsers = async (req, res) => {
    try {

        await connectClient();
        const db = client.db("mygithub");
        const userCollection = db.collection("users");

        const users = await userCollection.find({}).toArray();

        res.status(200).json(users);


    } catch (err) {

        console.error("Error during featching ", err.message);
        res.status(500).json({ message: "Server error" });
    }
}

const signup = async (req, res) => {

    const { username, password, email } = req.body;
    console.log(username);

    try {
        await connectClient();

        const db = client.db("mygithub");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists!" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            password: hashedPassword,
            email,
            repositories: [],
            followedUser: [],
            starRepos: []
        }

        const result = await userCollection.insertOne(newUser);

        const token = jwt.sign(
            { id: result.insertedId },
            process.env.JWT_SECRETE_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "Signup successful",
            token,
            username:result.username,
            userId:result.insertedId
        }
        );

    } catch (err) {

        console.error("Error during signup ", err.message);
        res.status(500).json({ message: "Server error" });
    }

};



const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

    try {

        await connectClient();
        const db = client.db("mygithub");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credential" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({ message: "Invalid credential" });

        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRETE_KEY,
            { expiresIn: "5h" }
        );



        res.status(201).json({

            message: "login successful",
            token,
            userId: user._id,
            username:user.username


        });




    } catch (err) {
        console.error("Error during login ", err.message);
        res.status(500).json({ message: "Server error" });
    }
}


const getUserProfile = async (req, res) => {
    const currentId = req.params.id;

    try {

        await connectClient();
        const db = client.db("mygithub");
        const userCollection = db.collection("users");
        const user = await userCollection.findOne({
            _id: new ObjectId(currentId)
        });

        if (!user) {
            return res.status(404).json({ message: "User not found " });
        }

        res.status(200).json({user, message: "profile feached" });

    } catch (err) {
        console.error("Error during fetching ", err.message);
        res.status(500).json({ message: "Server error" });
    }
}

const updateUserProfile = async (req, res) => {
    const currentId = req.params.id;
    const { email, password } = req.body;

    try {

        let updatedFields = { email };
        if (password) {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedFields.password = hashedPassword;

        }

        await connectClient();
        const db = client.db("mygithub");
        const userCollection = db.collection("users");

        const result = await userCollection.findOneAndUpdate({
            _id: new ObjectId(currentId),

        }, { $set: updatedFields }, { returnDocument: "after" });


        if (!result) {
            return res.status(404).json({ message: "User not found " });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: result
        });



    } catch (err) {
        console.error("Error during updating ", err.message);
        res.status(500).json({ message: "Server error" });
    }
}


const deleteUserProfile = async (req, res) => {

    const currentId = req.params.id;


    try {

        await connectClient();
        const db = client.db("mygithub");
        const userCollection = db.collection("users");

        const result = await userCollection.deleteOne({

            _id: new ObjectId(currentId),

        });

        if (result.deletedCount == 0) {
            return res.status(404).json({ message: "User not found " });
        }

        res.json({ message: "User Profile Deleted !" });



    } catch (err) {
        console.error("Error during deleting ", err.message);
        res.status(500).json({ message: "Server error" });
    }

}


const getUserProfileByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let repositories = [];
    if (req.userId && req.userId === user._id.toString()) {

      repositories = await Repository.find({ owner: user._id });
    } else {

      repositories = await Repository.find({ owner: user._id, visibility: true });
    }

    res.status(200).json({ user, repositories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const updateProfileDetails = async (req, res) => {
  try {
    
    const userId = req.userId; 
    const { name, bio, linkedin } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          bio,
          linkedin
        }
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




const followUnfollowUser = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const currentUserId = req.userId; 

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.followedUser.includes(targetUserId);

    if (isFollowing) {
      
      currentUser.followedUser.pull(targetUserId);
      
    } else {
      
      currentUser.followedUser.push(targetUserId);

    }

    await currentUser.save();

    res.status(200).json({
      success: true,
      following: !isFollowing
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



const getFollowingUsers = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .populate("followedUser", "username name email bio linkedin");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      following: user.followedUser
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const isFollowingUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = currentUser.followedUser.includes(targetUserId);

    res.status(200).json({ following }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




const getFollowStats = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const followingCount = user.followedUser.length;

    
    const followersCount = await User.countDocuments({
      followedUser: user._id
    });

    res.status(200).json({
      following: followingCount,
      followers: followersCount
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};








module.exports = {
    getAllUsers,
    login,
    signup,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    getUserProfileByUsername,
    updateProfileDetails,
    followUnfollowUser,
    getFollowingUsers,
    isFollowingUser,
    getFollowStats
}

