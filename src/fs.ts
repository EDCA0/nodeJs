import {fs} from './2-native';

const fileName = 'example.txt';

/* CREAR */

fs.writeFileSync(fileName, 'Hola este es un archivo de ejemplo');
console.log('Archivo creado correctamente')

/* LEER */
const content = fs.readFileSync(fileName, 'utf8');
console.log('File content:', content);

/* ACTUALIZARq */
fs.appendFileSync(fileName, '\n Esta es una nueva linea. \n');
console.log('Archivo guardado correctamente');

/* Eliminar */

fs.unlinkSync(fileName);
console.log('Archivo elimiando correctamente');