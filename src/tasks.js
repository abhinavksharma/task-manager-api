const filehandler = require("./helpers/filehandler");
const FILEPATH = "./static/data.json";
const fs = require("fs");


// async await
async function getTasks() {
  try {
    const tasks = await filehandler.readJsonFile(FILEPATH);
    return tasks;
  } catch (error) {
    throw new Error(`error getting this task: ${error.message}`);
  }
}

async function getTaskByID(taskID) {
  try {
    const tasks = await filehandler.readJsonFile(FILEPATH);
    const task = tasks.tasks.find((task) => task.id === taskID);

    if (!task) {
      throw new Error(`Task with ID ${taskID} does not exsist`);
    }
    return task;
  } catch (error) {
    throw new Error(`error getting this task: ${error.message}`);
  }
}

async function createTask(task) {
  try {
    if (!task.id) {
      throw new Error(`task id can not be empty`);
    }
    const tasks = await getTasks();
    const existingtask = tasks.tasks.find((t) => t.id === task.id);
    if (existingtask) {
      throw new Error(`task id ${task.id} already in use cannot be recreated`);
    }
    if (!task.description) {
      throw new Error(`task description can not be empty`);
    }
    if (!task.priority) {
      throw new Error(`task priority can not be empty`);
    }
    if (!task.title) {
      throw new Error(`task title can not be empty`);
    }
    if (!task.completed) {
      task.completed = false;
    }
    tasks.tasks.push(task);
    const fileupdate = await filehandler.writeJsonFile(FILEPATH, tasks);
  } catch (error) {
    throw new Error(`message : ${error.message}`);
  }
}

async function updateTask(taskID, taskbody) {
  try {
    if (!taskID) {
      throw new Error(`task id can not be empty`);
    }

    const tasks = await getTasks();
    const existingtaskindex = tasks.tasks.findIndex((t) => t.id === taskID);
    console.log(existingtaskindex);
    if (existingtaskindex === -1) {
      throw new Error(`task with id ${taskID} is not present in the file`);
    }
    if (taskbody.description) {
      tasks.tasks[existingtaskindex].description = taskbody.description;
    }
    if (taskbody.priority) {
      tasks.tasks[existingtaskindex].priority = taskbody.priority;
    }
    if (taskbody.title) {
      tasks.tasks[existingtaskindex].title = taskbody.title;
    }
    if (taskbody.completed) {
      if (typeof (taskbody.completed != Boolean)) {
        throw new Error(`task completed can only be true/false`);
      }
      tasks.tasks[existingtaskindex].title = taskbody.title;
    }
    await filehandler.writeJsonFile(FILEPATH, tasks);
  } catch (error) {
    throw new Error(`Internal server error: ${error.message}`);
  }
}

async function deleteTask(taskID) {
  try {
    if (!taskID) {
        throw new Error(`task id can not be empty`);
      }
      const tasks = await getTasks();
      const existingtaskindex = tasks.tasks.findIndex((t) => t.id === taskID);
      if (existingtaskindex === -1) {
        throw new Error(`task with id ${taskID} is not present in the file`);
      }
      const tasksafdeleted = tasks.tasks.splice(existingtaskindex,1)[0];

      await filehandler.writeJsonFile(FILEPATH,tasks);

  } catch (error) {
    throw new Error(`Internal Server Error : ${error.message}`);
  }
}
///////////////////////////////////


module.exports = {
  getTasks,
  getTaskByID,
  createTask,
  updateTask,
  deleteTask
};
