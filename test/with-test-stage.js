const firebase = require('firebase');
const firebaseAdmin = require('firebase-admin');

// las configuraciones estan fuera de nuestro codigo
// es mala practica y un potencial problema de seguridad
// nos aseguramos de no subir estos json a github,
// configurando correctamente nuestro archivo `.gitignore`
// hemos incluido una carpeta `config-sample` para que
// te des una idea de la estructura que tienen estos archivos
const appConfig = require('../config/appConfig-test.json');
const adminConfig = require('../config/serviceAccountKey.json');

global.firebase = firebase;

// Initialize Firebase y FirebaseAdmin
const app = firebase.initializeApp(appConfig);
// Necesitamos permisos de administracion para limpiar los usuarios
// chequea como configurarlo en https://firebase.google.com/docs/admin/setup
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(adminConfig),
  databaseURL: appConfig.databaseURL,
});

const modelTest = require('./model.spec');

describe('Modelo de la lista de tareas', () => {
  // Antes de comenzar a ejecutar los tests
  // limpiamos la base de datos y usuarios
  before((done) => {
    // si no hacemos esto la coleccion de `tasks`
    // va a ir creciendo con cada ejecución de los tests
    firebase.database().ref().remove();

    // Necesitamos permisos de administracion para limpiar los usuarios
    firebaseAdmin.auth().listUsers()
      .then((usersSnap) => {
        const promises = [];
        usersSnap.users.forEach((user) => {
          promises.push(firebaseAdmin.auth().deleteUser(user.uid));
        });
        // debemos esperar a que todoslos usuarios esten eliminados para poder continuar
        Promise.all(promises).then(() => {
          admin.delete();
          done();
        });
      })
      .catch(error => console.error(error.message));
  });

  modelTest();

  // cleanup al terminar, para cerrar las conexiones que puedan haber quedado abiertas
  after(() => {
    app.delete();
  });
});
