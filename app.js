const colors = require('colors');
const { argv } = require('./config/yargs');
const { create, getToDoList, update, remove } = require('./to-do/to-do');

let comando = argv._[0];

switch (comando) {

    case 'crear':
        create(argv.description).then((rs) => {
                console.log(`SUCCESS: ${rs}`);
            }, err => {
                console.log(`ERROR: ${err}`);
            })
            .catch(e => {
                console.log(`CATCH: ${e}`);
            });
        break;
    case 'listar':
        console.log('Listar tareas');
        let toDoList = getToDoList();
        for (let task of toDoList) {
            console.log("===========Por Hacer=============".green);
            console.log(task.description);
            console.log('Estado', task.complete);
            console.log("=================================".green);
        }
        break;
    case 'actualizar':
        console.log('Actualizar tarea'.blue);
        let rs = update(argv.description, argv.complete);
        console.log(rs);
        break;
    case 'borrar':
        console.log('Borrar tarea'.green);
        let res = remove(argv.description);
        console.log(res);
        break;
    default:
        console.log('El comando no es reconocido.');

}