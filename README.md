# Firebase Testing

En este repo exponemos 2 alternativas a la hora de testear nuestro código con firebase

1 - Usando un entorno de desarrollo: `npm test:stage`

2 - Usando un mock para firebase: `npm test:mock`

Puedes ejecutar ambos escenarios con `npm test`.

Dentro de la carpeta `test` encontraras los archivos para cada escenario, asi como un archivo `model.spec.js` con los tests propiamente dichos.

## Getting started

Para comenzar necesitas primero clonarte este repo e instalar las dependencias de node `npm i`.

La versión *mockeada* no requiere ningun otro paso, porque no tiene dependencias externas.

Para ejecutar la versión con el entorno de testing, es necesario proveer credenciales para firebase, tanto de ejecución como de administración. Hemos incluido una carpeta `config-sample` con archivos de ejemplo **NO FUNCIONALES**.

Sigue las instrucciones para [firebase admin](https://firebase.google.com/docs/admin/setup) y las tradicionales de firebase, para obtener los archivos `appConfig-test.json` y `serviceAccountKey.json` correspondientes, y colócalos dentro de la carpeta `config`. Ten en cuenta que las credenciales no se incluyen en este repo, porque es una mala practica.

Para más información chequea los comentarios dentro del código o recurre a la [comunidad](http://community.laboratoria.la/)
