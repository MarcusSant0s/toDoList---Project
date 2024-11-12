
Sure! Here's a README.md for your project. This will help others understand what your project is about, how to set it up, and how to run it.

Tarefas App
A simple full-stack web application to manage tasks. It uses a React frontend that communicates with an Express.js backend, and stores data in a MySQL database.

The application allows users to add new tasks, view a list of existing tasks, and manage task statuses.

Features
Add a new task with a description and a status.
View a list of all tasks stored in a MySQL database.
Manage task statuses (Pendente, Em Andamento, Feito).
Frontend built with React and Material-UI.
Backend powered by Express.js with a MySQL database.
Technologies Used
Frontend:
React.js
Material-UI
Axios (for HTTP requests)
Backend:
Express.js
MySQL (Database)
Getting Started
To run this project locally, you'll need to set up both the frontend (React app) and the backend (Express app with MySQL database). Follow the steps below to get started.

Prerequisites
Make sure you have the following installed:

Node.js and npm (Node Package Manager)

Download Node.js
MySQL (for the database)

Download MySQL
Git (to clone the project)

Download Git
1. Clone the Repository
Clone the repository to your local machine:

bash
Copiar código
git clone https://github.com/yourusername/tarefas-app.git
cd tarefas-app
2. Set Up the Backend
Go to the backend folder:
bash
Copiar código
cd backend
Install the necessary dependencies:
bash
Copiar código
npm install
Configure MySQL:
Create a MySQL database named tarefas.
Run the SQL script to create the tarefas table. Example:
sql
Copiar código
CREATE DATABASE tarefas;
USE tarefas;

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  descricao TEXT,
  status ENUM('Pendente', 'Em Andamento', 'Feito') DEFAULT 'Pendente'
);
Update the MySQL connection details in server.js:
javascript
Copiar código
const db = mysql.createConnection({
  host: 'localhost',  // MySQL host
  user: 'marcus',     // Your MySQL username
  password: '12345',  // Your MySQL password
  database: 'tarefas' // Your database name
});
Run the Express server:
bash
Copiar código
npm start
This will start the backend server on http://localhost:5500.

3. Set Up the Frontend
Go to the frontend folder:
bash
Copiar código
cd ../frontend
Install the necessary dependencies:
bash
Copiar código
npm install
Start the React app:
bash
Copiar código
npm start
This will start the React development server on http://localhost:3000.

4. Test the Application
Go to http://localhost:3000 in your browser to access the frontend.
You should be able to:
Add tasks with a name, description, and status.
View the list of tasks retrieved from the backend.
Update the status of tasks.
5. API Endpoints
GET / - Fetch all tasks
Fetches all tasks stored in the database.

URL: http://localhost:5500/
Method: GET
Response:
json
Copiar código
[
  {
    "id": 1,
    "nome": "Levar cachorro para passear",
    "descricao": "Passear com o cachorro no parque",
    "status": "Pendente"
  },
  ...
]
POST /INSERT - Add a new task
Adds a new task to the database.

URL: http://localhost:5500/INSERT
Method: POST
Request Body:
json
Copiar código
{
  "nome": "Tarefa de Exemplo",
  "descricao": "Descrição da tarefa",
  "status": "Pendente"
}
Response:
json
Copiar código
{
  "message": "Tarefa salva com sucesso"
}
Project Structure
bash
Copiar código
tarefas-app/
│
├── backend/                    # Backend (Express.js)
│   ├── server.js               # Main backend server file
│   ├── db.js                   # MySQL database configuration
│   └── package.json            # Backend dependencies
│
└── frontend/                   # Frontend (React.js)
    ├── src/                    
    │   ├── App.js              # Main React component
    │   ├── App.css             # Styles for the frontend
    │   └── index.js            # React entry point
    ├── package.json            # Frontend dependencies
Contributing
Feel free to fork this project and submit pull requests if you want to contribute improvements or bug fixes.

Fork this repository.
Create a new branch (git checkout -b my-new-feature).
Make your changes and commit (git commit -am 'Add new feature').
Push to the branch (git push origin my-new-feature).
Submit a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

