# MERN Full-Stack Blog App Documentation
<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

[screen-capture (5).webm](https://github.com/Dev-Roshika/mern-fullstack-blog-app/assets/81811433/9abbae87-fb1f-440d-bda8-43e21cf28898)


**Table of Contents**


   * [Overview](#overview)
   * [Hosted Link](#hostedLink)
   * [Features](#features)
   * [Technologies Used](#technologies-used)
   * [Usage](#usage)
   * [Installation](#installation)

<!-- TOC end -->
<!-- TOC --><a name="overview"></a>
## Overview

This project is a full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, and login, and users can **create**, **view**, **edit**, and **delete** articles. Authentication is implemented using JWT tokens, and rich text editing is enabled using React Quill.

<!-- TOC --><a name="hostedLink"></a>
## Hosted Link
<a href="https://mern-fullstack-blog-app-frontend.vercel.app/" target="_blank">https://mern-fullstack-blog-app-frontend.vercel.app/</a>

<!-- TOC --><a name="features"></a>
## Features

1. User Authentication
   -  Users can register and login securely using JWT authentication.
   -  User credentials are stored in the local storage after successful login.

2. Article Management
   -  Registered users can create new articles.
   -  Only the owner of an article can edit or delete it.

3. Rich Text Editing
   -  Articles are created and edited using React Quill, enabling rich text formatting.

<!-- TOC --><a name="technologies-used"></a>
## Technologies Used
- Frontend
  - React.js
- Backend
  - Node.js
  - Express.js
- Database
  - MongoDB

<!-- TOC --><a name="usage"></a>
## Usage
1. Register/Login:

   - Navigate to the registration page and fill in the required details to create an account.
   - Use the registered credentials to log in.
     
2. Create Article:

   - After logging in, navigate to the "Write" page.
   - Fill in the article details and save it.
     
3. Edit/Delete Article:

   - Navigate to the article you want to `edit` or `delete`.
   - If you are the owner of the article, you'll see options to `edit` or `delete` it. 

<!-- TOC --><a name="installation"></a>
## Installation

Here are clear instructions on how to set up and run your MERN full-stack blog application locally:

1. Clone the Project:

```
git clone --single-branch -b "develop" "https://github.com/Dev-Roshika/mern-fullstack-blog-app.git" .
```

2. Navigate to the Project Directory:

```
cd mern-fullstack-blog-app
```

3. Install Dependencies for Client:
   - Open a terminal and navigate to the client folder:
  
     ```
     cd client
     ```
   - Install dependencies:
  
     ```
     npm install
     ```

4. Start Client Development Server:
   - After installing dependencies, start the development server for the client:

     ```
     npm start
     ```

5. Install Dependencies for Server:
   - Open a new terminal and navigate to the server folder:
  
     ```
     cd server
     ```
   - Install dependencies:
  
     ```
     npm install
     ```

6. Start Server:
   - After installing server dependencies, start the server:
     
     ```
     npm start
     ```

Now, your MERN full-stack blog application should be up and running. You can access it in your web browser at the specified localhost address  (usually http://localhost:3000 for the client)

