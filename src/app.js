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
app.get("/taskmanager/v1/tasks", async (req, res) => {
  try {
    const tasksres = await tasks.getTasks();
    return res.status(200).json(tasksres);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

//GET /tasks/:id: Retrieve a single task by its ID
app.get("/taskmanager/v1/tasks/:taskId", async (req, res) => {
  try {
    const taskfilter = await tasks.getTaskByID(parseInt(req.params.taskId));
    return res.status(200).json(taskfilter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// //POST /tasks: Create a new task
app.post("/taskmanager/v1/tasks", async (req, res) => {
  try {
    const newtask = req.body;
    await tasks.createTask(newtask);
    return res
      .status(201)
      .json({ message: "task created successfully", task: newtask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// //PUT /tasks/:id: Update an existing task by its ID
app.put("/taskmanager/v1/tasks/:taskID", async (req, res) => {
  try {
    const taskbody = req.body;
    await tasks.updateTask(parseInt(req.params.taskID), taskbody);
    const updatedtask = await tasks.getTaskByID(parseInt(req.params.taskID));
    return res
      .status(201)
      .json({
        message: `task with id ${req.params.taskID} is updated`,
        task: updatedtask,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.delete("/taskmanager/v1/tasks/:taskId", async (req, res) => {
  try {
    await tasks.deleteTask(parseInt(req.params.taskId));
    res
      .status(200)
      .json({
        message: `task with ID ${req.params.taskId} is deleted Successfully`
      });
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});

app.all("*", (req, res) => {
  return res.status(404).json({
    status: 404,
    message: `requested endpoint ${req.url} does not exsist`
  });
});

// //////// optional parts/////////

// //GET /tasks handling path queries like sortby, orderby, filterby, filter,

// //Implement an endpoint to retrieve tasks based on priority level: GET /tasks/priority/:level.
// //app.get("/taskmanager/v1/tasks/priority/:level", (req, res) => {});

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
