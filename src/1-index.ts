const args : string[] = process.argv.slice(2);

let min : number = 1;
let max : number = 100;

if (args.length >= 2) {
    const parseddMin : number = parseInt(args[0], 10);
    const parseddMax : number = parseInt(args[1], 10);

    if (!isNaN(parseddMin) && !isNaN(parseddMax) && parseddMin < parseddMax) {
        min = parseddMin;
        max = parseddMax;
    } else {
        console.log(`Rango invalido. Usando valores por defecto (${min}-${max}).`);
    }
} else if(args.length === 0) {
    console.log(`Rangos no definidos, usando valores por defecto (${min}-${max}).`)
} else {
    console.log(`Rango invalido. Usando valores por defecto (${min}-${max}).`)
}

const randomNumber : number = Math.floor(Math.random() * (max - min + 1)) + min;

console.log(`Numero aleatorio generado entre ${min} y ${max}: ${randomNumber}`);