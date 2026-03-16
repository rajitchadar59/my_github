# 🐙 MyGit & GitHub Clone

> A fully functional, custom-built Version Control System (CLI) and a GitHub-like web platform built from scratch to understand the deep internals of Git and Cloud-based code storage.

<div align="center">
  <img src="https://github.com/user-attachments/assets/94639569-be30-4cb7-beaf-508e49c5a9d6" alt="GitHub Clone Dashboard Preview" width="100%" />
</div>

<br/>

[![Tech Stack](https://img.shields.io/badge/Tech-MERN_Stack-blue)](#)
[![Cloud Storage](https://img.shields.io/badge/Storage-AWS_S3-orange)](#)
[![Version Control](https://img.shields.io/badge/CLI-Node.js-green)](#)

## 📖 About The Project

This project is divided into two major components:
1. **Custom Git (CLI):** A command-line tool built with Node.js that mimics core Git functionalities. It handles file staging, creates unique commit IDs, maintains version history locally, and pushes code securely to an **AWS S3 Bucket**.
2. **GitHub Clone (Web App):** A full-stack MERN application that serves as the visual interface for the repositories, allowing users to manage code, track issues, and interact socially (follow/unfollow) just like the real GitHub.

---

## ✨ Key Features

### 💻 1. The Custom Git System (CLI)
Real version control that actually works under the hood:
- **`init`**: Initializes a new local repository (creates hidden `.mygit` folder).
- **`add`**: Stages files for commit.
- **`commit`**: Generates unique cryptographic commit IDs and saves the version history.
- **`push`**: Securely uploads the committed files and version history to Cloud Storage.

### 🌐 2. The GitHub Web App (MERN)
- **Authentication:** Secure Signup/Login using JWT Tokens.
- **Repository Management:** Create, view, and manage remote repositories.
- **Social Features:** User profiles and the ability to Follow/Unfollow other developers.
- **Issue Tracking:** Create and manage issues for specific repositories.
- **Responsive UI:** A clean, GitHub-style user interface built with React.

---

## 📸 Complete Visual Walkthrough

*(Click on the sections below to expand and view the detailed screenshots of the project)*

<details>
<summary><b>1. Authentication & Main Dashboard 🌐</b></summary>
<br>
<p>Landing Page Without Login</p>
<img src="https://github.com/user-attachments/assets/371a69e0-5798-434c-87c3-6b58474b5681" width="80%">

<p>Sign In Page</p>
<img src="https://github.com/user-attachments/assets/48638099-eb2b-4fea-bc6a-3d734532380f" width="80%">

<p>Sign Up Page</p>
<img src="https://github.com/user-attachments/assets/9a549ea9-18e8-4dd8-b1c4-e25bdbd9ed99" width="80%">

<p>Sidebar & Navigation Layout</p>
<img src="https://github.com/user-attachments/assets/151f2d1f-bfb7-461c-85eb-da59e24e909f" width="80%">
</details>

<details>
<summary><b>2. Repository & Issue Tracking System 🛠️</b></summary>
<br>
<p>Repository Info Page</p>
<img src="https://github.com/user-attachments/assets/1425e3b0-04ff-48f3-be31-b7333a590f7b" width="80%">

<p>Create New Repository</p>
<img src="https://github.com/user-attachments/assets/9ef29f55-4438-4f8b-b853-a414aeea0478" width="80%">

<p>Issue Tracker (Edit, Delete, Reopen Permissions)</p>
<img src="https://github.com/user-attachments/assets/b811ef42-090f-4490-b60e-666125588ee6" width="80%">

<p>Issue Detail View</p>
<img src="https://github.com/user-attachments/assets/3ecec8f9-d924-40bc-9ac7-c4e57dd3639c" width="80%">

<p>Create Issue Layout</p>
<img src="https://github.com/user-attachments/assets/0178a578-655c-467d-af24-e4462017cc5c" width="80%">

<p>Search Repos to Create Issue</p>
<img src="https://github.com/user-attachments/assets/bdc7afc9-ae09-44aa-9802-7c4d7cd49664" width="80%">

<p>Create Issue Form Details</p>
<img src="https://github.com/user-attachments/assets/8abc56c6-7fa3-4498-bc4e-175df973dfba" width="80%">

<p>My Issues Dashboard</p>
<img src="https://github.com/user-attachments/assets/c7f6d94e-86ac-41c9-8d85-1ee24a4c26a2" width="80%">
</details>

<details>
<summary><b>3. User Profiles & Social Features 👤</b></summary>
<br>
<p>My Profile - Overview</p>
<img src="https://github.com/user-attachments/assets/51747d18-30db-4081-9268-72afa6623d2d" width="80%">

<p>My Profile - Owned Repositories</p>
<img src="https://github.com/user-attachments/assets/79a7896d-34cb-4bc5-98f0-a00424c5d415" width="80%">

<p>My Profile - Starred Repositories</p>
<img src="https://github.com/user-attachments/assets/d9387bce-8901-415f-a08d-7ca805ee7342" width="80%">

<p>Other User Profile - Overview</p>
<img src="https://github.com/user-attachments/assets/51e6288e-f736-41b8-8540-e85d6ee10d33" width="80%">

<p>Other User Profile - Repositories</p>
<img src="https://github.com/user-attachments/assets/1fdaabdb-bd1a-4b31-93e4-a826b4c3a257" width="80%">

<p>Following / Followers List</p>
<img src="https://github.com/user-attachments/assets/969375c1-b653-420e-bf9b-66a51b74ccd1" width="80%">

<p>Update Profile Details</p>
<img src="https://github.com/user-attachments/assets/1b4c2b99-00c4-4a0e-a738-efd7a91660b5" width="80%">
</details>

<details>
<summary><b>4. Internal Custom Git Architecture (CLI Process) ⚙️</b></summary>
<br>
<p>VS Code Workspace (Before CLI Execution)</p>
<img src="https://github.com/user-attachments/assets/65089546-96da-401a-adbc-3d3adf64c3e4" width="80%">

<p>Executing <code>node index.js init</code> (Creates hidden .mygit folder)</p>
<img src="https://github.com/user-attachments/assets/020d2974-974b-407d-9c86-07c2bc0c8f3e" width="80%">

<p>Creating a new file to track</p>
<img src="https://github.com/user-attachments/assets/43e4c752-f436-400d-81f5-e646b42d2cc2" width="80%">

<p>Executing <code>node index.js add hello.txt</code> (Moves file to staging area)</p>
<img src="https://github.com/user-attachments/assets/752b39e8-fc2c-4673-bc2e-8cbf6c3ec626" width="80%">

<p>Executing <code>node index.js commit "add new file"</code></p>
<img src="https://github.com/user-attachments/assets/15c9b594-fdb5-4f1c-8f7e-8e9cd95f9995" width="80%">

<p>File moves from Staging to Commits folder dynamically</p>
<img src="https://github.com/user-attachments/assets/b600b547-f945-4739-93c2-c267f0616ac3" width="80%">

<p>Web UI Reflecting the New Commit</p>
<img src="https://github.com/user-attachments/assets/1e13d44f-dd58-40f1-aa66-253d4dbe4415" width="80%">
</details>

<details>
<summary><b>5. AWS S3 Push & Cloud Sync Integration ☁️</b></summary>
<br>
<p>AWS S3 Bucket Initialized for Project</p>
<img src="https://github.com/user-attachments/assets/fd7f393e-8444-428a-8def-23564d89798b" width="80%">

<p>Executing <code>node index.js push</code></p>
<img src="https://github.com/user-attachments/assets/c2273226-83e7-4b56-a488-88de7a2cbfe3" width="80%">

<p>Data Pushed to S3 Bucket Successfully</p>
<img src="https://github.com/user-attachments/assets/1e4d164e-3187-498d-9c5e-9260258d6a09" width="80%">

<p>Commits Folder synchronized inside S3</p>
<img src="https://github.com/user-attachments/assets/473cb9fd-3c28-4cfb-80c9-f3255aa2c4e5" width="80%">

<p>Unique Commit ID Folder Generated in Cloud</p>
<img src="https://github.com/user-attachments/assets/4a97a521-4a73-452f-9f2e-95fd3d9e382c" width="80%">

<p>Commit objects (hello.txt & commit.json) stored in S3</p>
<img src="https://github.com/user-attachments/assets/288215fc-7aea-451a-b0c4-8f429ad62a67" width="80%">

<p>AWS File Object URL Page for Download</p>
<img src="https://github.com/user-attachments/assets/e0e38c48-653d-41b4-844c-cadc1063c60d" width="80%">

<p>File Verified in Download History</p>
<img src="https://github.com/user-attachments/assets/789d5876-bbe6-40a2-8ae1-e9feb935e743" width="80%">

<p>Successfully Opened Downloaded File From S3</p>
<img src="https://github.com/user-attachments/assets/7acf3b6e-47bd-4380-92cb-9914eec61691" width="80%">
</details>

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud Storage:** AWS S3 (Simple Storage Service)
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **CLI Tooling:** Node.js File System (`fs`), Crypto

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the backend directory:

| Variable Name | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for the backend server | `5000` |
| `MONGO_URI` | Your MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT authentication | `your_super_secret_key` |
| `AWS_ACCESS_KEY_ID` | Your AWS IAM Access Key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | Your AWS IAM Secret Key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | Your AWS S3 Bucket Region | `ap-south-1` |
| `AWS_BUCKET_NAME` | Name of your S3 Bucket | `mygit-storage-bucket` |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/rajitchadar59/my_github.git](https://github.com/rajitchadar59/my_github.git)
cd my_github