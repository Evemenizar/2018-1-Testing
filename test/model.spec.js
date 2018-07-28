const assert = require('chai').assert;

global.window = global;

require('../src/model');

module.exports = () => {
  describe('La lista, me debería permitir agregar tareas', () => {
    it('Debería agregar una tarea', (done) => {
      addTask('Comprar pan')
        .then(() => getTaskList())
        .then((taskList) => {
          const comprarPan = Object.entries(taskList.val())
            .find(task => task[1].title === 'Comprar pan');
          assert.exists(comprarPan[1]); // verifica que exista algo en particular
          assert.equal(comprarPan[1].title, 'Comprar pan');
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe('La lista, me debería permitir colocarle un progreso a una tarea', () => {
    it('Debería permitirle colocarle progreso a una tarea', (done) => { // parametros de la función
      taskProgress('Comprar pan', 'se ha comprado').then(
        (task) => {
          assert.exists(task);
          assert.equal(task.title, 'Comprar pan');
          assert.equal(task.state, 'se ha comprado');
          done();
        },
      ).catch(
        (error) => {
          done(error);
        },
      );
    });
  });

  describe('La lista, me debería permitir editar una tarea', () => {

  });

  describe('La lista, me debería permitir borrar una tarea', () => {

  });
};
