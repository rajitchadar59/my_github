# 🐙 Custom Git CLI & GitHub Clone

> A fully functional, custom-built Version Control System (CLI) and a GitHub-like web platform built from scratch to understand the deep internals of Git and Cloud-based code storage.

![GitHub Clone Preview](./path-to-your-main-ui-image.png) 
*(Replace the above link with your main project screenshot)*

[![Tech Stack](https://img.shields.io/badge/Tech-MERN_Stack-blue)](#)
[![Cloud Storage](https://img.shields.io/badge/Storage-AWS_S3-orange)](#)
[![Version Control](https://img.shields.io/badge/CLI-Node.js-green)](#)

## 📖 About The Project

This project is divided into two major components:
1. **Custom Git (CLI):** A command-line tool built with Node.js that mimics core Git functionalities. It handles file staging, creates unique commit IDs, maintains version history locally, and pushes code securely to an AWS S3 Bucket.
2. **GitHub Clone (Web App):** A full-stack MERN application that serves as the visual interface for the repositories, allowing users to manage code, track issues, and interact socially (follow/unfollow) just like the real GitHub.

---

## ✨ Key Features

### 💻 1. The Custom Git System (CLI)
Real version control that actually works under the hood:
- **`init`**: Initializes a new local repository.
- **`add`**: Stages files for commit.
- **`commit`**: Generates unique cryptographic commit IDs and saves the version history.
- **`push`**: Securely uploads the committed files and version history to **AWS S3 Cloud Storage**.

### 🌐 2. The GitHub Web App (MERN)
- **Authentication:** Secure Signup/Login using JWT Tokens.
- **Repository Management:** Create, view, and manage remote repositories.
- **Social Features:** User profiles and the ability to Follow/Unfollow other developers.
- **Issue Tracking:** Create and manage issues for specific repositories.
- **Responsive UI:** A clean, GitHub-style user interface built with React.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS / Vanilla CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud Storage:** AWS S3 (Simple Storage Service)
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **CLI Tooling:** Node.js file system (`fs`) and environment variables.

---

## 🧠 How It Works (Architecture & Process)

### Building `mygit` (The CLI Process)
*Here is a visual breakdown of how the internal staging, committing, and pushing to S3 works:*

![MyGit Architecture](./path-to-your-mygit-process-image.png)
*(Upload an image/diagram explaining your CLI process here)*

1. When a user runs `node index.js add`, the system reads the file content and stages it in a hidden `.mygit` directory.
2. `node index.js commit` hashes the content, creates a unique snapshot of the current state, and logs the message.
3. `node index.js push` connects to the AWS S3 bucket and uploads the committed snapshots, acting as our remote origin.

### The Web Interface
*A look at the user dashboard and repository views:*

![Dashboard View](./path-to-your-dashboard-image.png)
*(Upload an image of your User Dashboard here)*

![Repository View](./path-to-your-repo-view-image.png)
*(Upload an image of your Repository Details/Issues page here)*

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
- Node.js installed on your machine.
- MongoDB running locally or a MongoDB Atlas URI.
- An AWS Account with an active S3 Bucket and IAM access keys.

### 1. Clone the repository
```bash
git clone [https://github.com/rajitchadar59/my_github.git](https://github.com/rajitchadar59/my_github.git)
cd my_github