const filehandler = require('./helpers/filehandler');
const FILEPATH = './static/data.json';
const fs = require('fs');


let tasksdata = {
   tasks: [
        {
            id:1,
            title:"sample title",
            description :"sample description",
            completed : true,
            priority:"high"
        },
        {
            id:2,
            title:"sample title2",
            description :"sample description2",
            completed : false,
            priority:"Medium"
        },
    ]
};


function gettasks(callback){

    filehandler.readJsonFile(FILEPATH,(readError,jsonData)=>{
        if(readError){
            callback(readError,null);
            return;
        }
        
        callback(null,jsonData);
        

    });
}

function getTaskById(taskId,callback) {

    filehandler.readJsonFile(FILEPATH,(readError,jsonData)=>{
        if(readError){
            callback(readError,null);
            return;
        }
        const task = jsonData.tasks.find(task =>task.id === taskId);
        if(task){
            callback(null,task);
        }
        else{
            callback(null,null);
        }

    });
  }

function createTasks(task,callback){

    filehandler.readJsonFile(FILEPATH,(readError,jsonData)=>{
        if(readError){
            callback(readError,null);
            return;
        }
        jsonData.tasks.push(task);
        filehandler.writeJsonFile(FILEPATH,jsonData,(writeError,success)=>{
            if(writeError){
                callback(writeError,null);
                return;
            }
            callback(null,success);

        });

    });
    // tasksdata.tasks.push(task);
    // return true;
}

function poptaskbyid(taskid){
    let tasksindex = tasksdata.tasks.findIndex(task => task.id === taskid);
    if(tasksindex === -1){
        return false;
    }
    tasksdata = tasksdata.tasks.filter(task => task.id !== tasksindex);
    return true;

}


function isTaskExsists(taskId,callback){
    gettasks((readError,jsonData)=>{
        if(readError){
            callback(readError,null);
        }
        const task = jsonData.tasks.find(task =>task.id === taskId)
        if(task){
            callback(null,true);
        }
        callback(null,false);

    });
}



module.exports={gettasks,getTaskById,createTasks,poptaskbyid,isTaskExsists};
