const express = require("express");
const filehandler = require("./helpers/filehandler");
const tasks = require("./tasks");
const helpers = require("./helpers/validators");
const app = express();
const port = 3000;
const FILEPATH = "./static/data.json";

//app.use(errorHandler);

app.use(express.json());

app.get("/taskmanager/v1/", (req, res) => {
  return res.status(200).send("Hello World");
});

//GET /tasks: Retrieve all tasks.
app.get("/taskmanager/v1/tasks", (req, res) => {
  tasks.gettasks( (readError, jsonData) => {
    if (readError) {
      console.error("Error reading JSON file:", readError.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(jsonData);
  });
});

//GET /tasks/:id: Retrieve a single task by its ID
app.get("/taskmanager/v1/tasks/:taskId", (req, res) => {
  tasks.getTaskById(parseInt(req.params.taskId), (readError, jsonData) => {
    if (readError) {
      console.error("Error reading JSON file:", readError.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if(jsonData){
      return res.status(200).json(jsonData);
    }
    return res.status(404).json({message:`task not found with id ${parseInt(req.params.taskId)}`});
  });
});

//POST /tasks: Create a new task
app.post("/taskmanager/v1/tasks", (req, res) => {
  const { id, title, description, completed, priority } = req.body;

  // Validate that 'id' and 'priority' are provided
  if (!id || !description || !priority || !title) {
    return res.status(400).json({ error: "Please provide required fields" });
  }

  // Check if the task with the specified ID already exists

  tasks.isTaskExsists(parseInt(id),(exsistError,found)=>{
    if(exsistError){
      console.error("Error reading JSON file:", exsistError.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(found);
    if(found=== true){
      return res.status(400).json({ error: "Task with the same id already exists" });
    }
    if(found === false){
      const newTask = { id, title, description, completed, priority };
      tasks.createTasks(newTask,(ioError,success)=>{
        if(ioError){
          console.error("Error IO JSON file:", readError.message);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if(success){
          return res.status(201).json({
            message:"!!!!successfully created!!!!",
            task: newTask
          });
        }
    
      });
    }


  });

  

  // Create the new task
  //const newTask = { id, title, description, completed, priority };

  // Add the new task to the tasks array
  // tasks.createTasks(newTask,(ioError,success)=>{
  //   if(ioError){
  //     console.error("Error IO JSON file:", readError.message);
  //     return res.status(500).json({ error: "Internal Server Error" });
  //   }
  //   if(success){
  //     return res.status(201).json({
  //       message:"!!!!successfully created!!!!",
  //       task: newTask
  //     });
  //   }

  // });

  // Respond with the newly created task
});

//PUT /tasks/:id: Update an existing task by its ID
app.put("/taskmanager/v1/tasks/:taskID", (req, res) => {
  let taskid = parseInt(req.params.taskID);
  const tasktoudpate = tasks.getTaskById(taskid);
  if (!tasktoudpate) {
    return res.status(404).json({
      message: `task is not found with id ${taskid}`,
    });
  }
  const { title, description, priority, completed } = req.body;
  if (priority !== undefined) {
    tasktoudpate.priority = priority;
  }
  if (title !== undefined) {
    tasktoudpate.title = title;
  }

  if (description !== undefined) {
    tasktoudpate.description = description;
  }

  if (completed !== undefined) {
    // Validate that completed is a boolean value

    if (!helpers.isValidBoolean(completed)) {
      return res
        .status(400)
        .json({ error: "Completed must be a boolean value" });
    }
    tasktoudpate.completed = completed;
  }
  return res.status(201).json({
    message: `task with id ${tasktoudpate.id} is updated`,
    task: tasktoudpate,
  });
});

app.delete("/taskmanager/v1/tasks/:taskId", (req, res) => {
  const taskID = parseInt(req.params.taskId);
  let tasksdata = tasks.getTaskById(parseInt(req.params.taskId));
});

app.all("*", (req, res) => {
  return res.status(404).json({
    status: 404,
    message: `requested endpoint ${req.url} does not exsist`,
  });
});

//////// optional parts/////////

//GET /tasks handling path queries like sortby, orderby, filterby, filter,

//Implement an endpoint to retrieve tasks based on priority level: GET /tasks/priority/:level.
//app.get("/taskmanager/v1/tasks/priority/:level", (req, res) => {});

//listener
app.listen(port, (err) => {
  if (err) {
    console.log("Some issue encountered");
  } else {
    console.log("app is running on port 3000");
  }
});

/*

Use an in-memory data store (e.g., an array) to store the tasks.

Implement proper error handling for invalid requests.

Add input validation for task creation and updates. Validate that the title and description are not empty, and that the completion status is a boolean value.

Test the API using Postman or Curl to ensure it works as expected.

*/
