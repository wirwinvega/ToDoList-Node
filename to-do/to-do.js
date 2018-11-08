const fs = require('fs');

let toDoList = [];

const saveDB = (description) => {

    return new Promise((resolve, reject) => {

        let data = JSON.stringify(toDoList);

        fs.writeFile('db/data.json', data, (err) => {
            if (err)
                reject(err);
            else
                resolve(`Tarea ${description} creada correctamente.`);
        });

    });
}

const loadDB = () => {
    try {
        toDoList = require('../db/data.json');
    } catch (error) {
        toDoList = [];
    }
}

const getToDoList = () => {
    loadDB();
    return toDoList;
}

const create = (description) => {

    loadDB();

    let toDo = {
        description,
        complete: false
    };

    toDoList.push(toDo);

    return saveDB(description);

}

const update = (description, complete) => {
    loadDB();

    let index = toDoList.findIndex(task => task.description === description);
    if(index >= 0) {
        toDoList[index].complete = complete;
        saveDB();
        return toDoList[index];
    }else {
        return `La tarea ${description} que solicitaste no fue encontrada.`;
    }    
}

const remove = (description) => {
    loadDB();

    /*
    let index = toDoList.findIndex(task => task.description === description);
    if(index >= 0){
        toDoList.splice(index, 1);
        saveDB();
        return `La tarea ${description} que solicitaste fue elminada correctamente.`;
    }else {
        return `La tarea ${description} que solicitaste no fue encontrada.`;
    }
    */
    let auxToDoList = toDoList.filter(task => task.description !== description);

    if(auxToDoList.length === toDoList.length) {
        return `La tarea ${description} que solicitaste no fue encontrada.`;        
    }else {
        toDoList = auxToDoList;
        saveDB();
        return `La tarea ${description} que solicitaste fue elminada correctamente.`;
    }
}

module.exports = {
    create,
    getToDoList,
    update,
    remove
}