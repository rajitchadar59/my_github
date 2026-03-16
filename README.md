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

### 1. Custom Git Architecture (CLI Process) ⚙️
This project deeply understands the internals of Git, from local staging to committing code seamlessly.

| Workspace (Initial) | `node index.js init` | New File Tracked | `node index.js add` |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/65089546-96da-401a-adbc-3d3adf64c3e4" width="220" /> | <img src="https://github.com/user-attachments/assets/020d2974-974b-407d-9c86-07c2bc0c8f3e" width="220" /> | <img src="https://github.com/user-attachments/assets/43e4c752-f436-400d-81f5-e646b42d2cc2" width="220" /> | <img src="https://github.com/user-attachments/assets/752b39e8-fc2c-4673-bc2e-8cbf6c3ec626" width="220" /> |

<br>

| `node index.js commit` | Staging to Commits | Web UI Sync |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/15c9b594-fdb5-4f1c-8f7e-8e9cd95f9995" width="300" /> | <img src="https://github.com/user-attachments/assets/b600b547-f945-4739-93c2-c267f0616ac3" width="300" /> | <img src="https://github.com/user-attachments/assets/1e13d44f-dd58-40f1-aa66-253d4dbe4415" width="300" /> |

### 2. AWS S3 Push & Cloud Sync Integration ☁️
Securely pushing the committed version history to a cloud-based remote origin.

| AWS S3 Initialize | `node index.js push` | Pushed to S3 | S3 Commits Folder |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/fd7f393e-8444-428a-8def-23564d89798b" width="220" /> | <img src="https://github.com/user-attachments/assets/c2273226-83e7-4b56-a488-88de7a2cbfe3" width="220" /> | <img src="https://github.com/user-attachments/assets/1e4d164e-3187-498d-9c5e-9260258d6a09" width="220" /> | <img src="https://github.com/user-attachments/assets/473cb9fd-3c28-4cfb-80c9-f3255aa2c4e5" width="220" /> |

<br>

| AWS Commit Folder | S3 Objects Stored | AWS Object URL | Download History | Downloaded File |
| :---: | :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/4a97a521-4a73-452f-9f2e-95fd3d9e382c" width="180" /> | <img src="https://github.com/user-attachments/assets/288215fc-7aea-451a-b0c4-8f429ad62a67" width="180" /> | <img src="https://github.com/user-attachments/assets/e0e38c48-653d-41b4-844c-cadc1063c60d" width="180" /> | <img src="https://github.com/user-attachments/assets/789d5876-bbe6-40a2-8ae1-e9feb935e743" width="180" /> | <img src="https://github.com/user-attachments/assets/7acf3b6e-47bd-4380-92cb-9914eec61691" width="180" /> |

### 3. Web Interface: Authentication & Main Dashboard 🌐
Users can securely sign up, log in, and navigate through the platform using the intuitive dashboard.

| Landing Page | Sign In | Sign Up |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/371a69e0-5798-434c-87c3-6b58474b5681" width="300" /> | <img src="https://github.com/user-attachments/assets/48638099-eb2b-4fea-bc6a-3d734532380f" width="300" /> | <img src="https://github.com/user-attachments/assets/9a549ea9-18e8-4dd8-b1c4-e25bdbd9ed99" width="300" /> |

<br>

| Sidebar Navigation | Dashboard Layout |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/151f2d1f-bfb7-461c-85eb-da59e24e909f" width="300" /> | <img src="https://github.com/user-attachments/assets/94639569-be30-4cb7-beaf-508e49c5a9d6" width="300" /> |

### 4. Web Interface: Repository & Issue Tracking System 🛠️
Manage your code repositories and track project-related issues with ease.

| Repo Info | Create Repo | Issue Detail |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/1425e3b0-04ff-48f3-be31-b7333a590f7b" width="300" /> | <img src="https://github.com/user-attachments/assets/9ef29f55-4438-4f8b-b853-a414aeea0478" width="300" /> | <img src="https://github.com/user-attachments/assets/3ecec8f9-d924-40bc-9ac7-c4e57dd3639c" width="300" /> |

<br>

| Create Issue (Page 1) | Create Issue (Page 2) | Issue Form | My Issues |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/0178a578-655c-467d-af24-e4462017cc5c" width="220" /> | <img src="https://github.com/user-attachments/assets/bdc7afc9-ae09-44aa-9802-7c4d7cd49664" width="220" /> | <img src="https://github.com/user-attachments/assets/8abc56c6-7fa3-4498-bc4e-175df973dfba" width="220" /> | <img src="https://github.com/user-attachments/assets/c7f6d94e-86ac-41c9-8d85-1ee24a4c26a2" width="220" /> |

### 5. Web Interface: User Profiles & Social Features 👤
Explore user profiles, follow other developers, and view their contributions.

| Profile Overview | Owned Repos | Starred Repos |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/51747d18-30db-4081-9268-72afa6623d2d" width="300" /> | <img src="https://github.com/user-attachments/assets/79a7896d-34cb-4bc5-98f0-a00424c5d415" width="300" /> | <img src="https://github.com/user-attachments/assets/d9387bce-8901-415f-a08d-7ca805ee7342" width="300" /> |

<br>

| Other Profile (Page 1) | Other Profile (Page 2) | Update Profile | Following List |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/51e6288e-f736-41b8-8540-e85d6ee10d33" width="220" /> | <img src="https://github.com/user-attachments/assets/1fdaabdb-bd1a-4b31-93e4-a826b4c3a257" width="220" /> | <img src="https://github.com/user-attachments/assets/1b4c2b99-00c4-4a0e-a738-efd7a91660b5" width="220" /> | <img src="https://github.com/user-attachments/assets/969375c1-b653-420e-bf9b-66a51b74ccd1" width="220" /> |

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