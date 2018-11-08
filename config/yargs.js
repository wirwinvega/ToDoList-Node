const description = { demand: true, alias: 'd', desc: 'Descripción de la tarea por hacer' };
const complete = { alias: 'c', default: true, desc: 'Marca como completado o pendiente la tarea.'};

const argv = require('yargs')
    .command('listar', 'Listar los elementos', { 
        completeFilter: { 
            alias: 'f', 
            desc: 'Filtra las tareas mediante su estatus.' 
        } 
    })
    .command(['crear', 'borrar'], 'Crear ó borrar un elemento por hacer', {
        description
    })
    .command('actualizar', 'Actualiza el estado de un elemento', {
        description,
        complete
    })
    .help()
    .argv;

module.exports = {
    argv
}