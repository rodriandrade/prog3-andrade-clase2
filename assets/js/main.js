const alumnos = [

    { nombre: 'Rodrigo Andrade', edad: 23 },  
    { nombre: 'Nayla Arroyo Lizzio', edad: 32 },   
    { nombre: 'Marianela De Martino', edad: 20 },   
    { nombre: 'Axel Julian Dumas Cutuli', edad: 19 },    
    { nombre: 'Martina Franco', edad: 22 },    
    { nombre: 'Agustina Garcia Vega', edad: 24 },   
    { nombre: 'María Agustina Mattioli Pacheco', edad: 19 },   
    { nombre: 'Franco Picco', edad: 33 },  
    { nombre: 'Alva Ramírez', edad: 27 },   
    { nombre: 'Diego Salischiker', edad: 29 },
    
]

// 1. Obtener un array de strings con solo nombres de cada alumno usando .map()

const names = alumnos.map( ({nombre}) => nombre);
console.log('1) Los nombres de los alumnos son', names);

// 2. Obtener un array con aquellos alumnos mayores a 25 años usando .filter()

const olderThanTwentyFive = alumnos.filter( ({edad}) => edad > 25);
console.log('2) Los alumnos mayores de 25 son', olderThanTwentyFive);

// 3. Obtener un entero con la edad total de todos los alumnos usando .reduce()

const age = alumnos.map( ( {edad} ) => edad);
const ageTotal = age.reduce( (a,b) => a + b);

console.log('3) El total de la suma de las edades de los alumnos es', ageTotal);

// 4. Obtener en una constante la edad de "Franco Picco" usando .find()

const studentsAge = alumnos.find( ({nombre, edad}) => nombre === "Franco Picco" & edad === 33);
const {edad: francosAge} = studentsAge;

console.log('4) La edad de Franco Picco es', francosAge);

// 5. Obtener en una constante primer alumno del array de alumnos usando destructuring y posteriormente en otra constante su nombre también.

const [firstStudent,...students] = alumnos;
const { nombre : firstStudentName } = firstStudent;

console.log('5) El nombre del primer alumno es', firstStudentName)

// 6. Obtener un array con aquellos alumnos que empiezan con la letra "M", usando .filter()

const students_m = alumnos.filter( ({nombre}) => nombre[0] === "M");
const students_m_names = students_m.map( ({nombre}) => nombre);

console.log('6) Los alumnos que empiezan con letra M son', students_m_names);

// 7. Obtener un array agregando una propiedad/key/atributo más a cada elemento usando .map()

const materias = ['Diseño Aplicado', 'Programación', 'Sonido', '3D', 'Comunicación & Cultura Digital', 'Marketing', 'Investigación UX']

const new_key = alumnos.map( (alumno) => {
    alumno.materiaFavorita = materias[ Math.floor(Math.random() * 7) ];
    return alumno;
})

console.log('7) Los alumnos ahora tienen materia favorita', new_key);

// 8. Obtener a partir de la constante en 3, el promedio de edad del curso dividiendo la misma por el total de alumnos

const promedio = Math.round(ageTotal / alumnos.length);
console.log('8) El promedio de edades de los alumnos del curso es', promedio);

// 9. Buscar una API que más te guste en https://github.com/toddmotto/public-apis pero que debajo de la columna Auth especifique "No"

// La API que elegi es ----> https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search
// Devuelve letras de canciones.

// 10. Implementar una función getDataWithPromises que utilice la API de Promises usando .then()

function getDataWithPromises(){
    let link = fetch('https://api.lyrics.ovh/v1/Coldplay/Midnight')
    .then(response => response.json())
    .then(lyrics => {
        console.log(lyrics)
    })
}

getDataWithPromises();


// 11. Implementar una función getDataWithAsync que utilice async / await junto con la API fetch para buscar los datos de la API elegida

async function getDataWithAsyncOne() {
    const response = await fetch('https://api.lyrics.ovh/v1/Coldplay/Midnight')
    const lyrics = await response.json();
    return lyrics;
}

const showLyricsFirstVersion = async () => {
    const lyrics = await getDataWithAsyncOne();
    console.log('11) La letra de la canción es:', lyrics);
}

showLyricsFirstVersion();


// 12. Hiciste manejo de errores? En caso que no lo hayas hecho utiliza .catch() en la función getDataWithPromises o try / catch en la función getDataWithAsync

async function getDataWithAsyncTwo() {

    const response = await fetch('https://api.lyrics.ovh/v1/Coldplay/Midnight')
    const lyrics = await response.json();
    return lyrics;

}

const showLyricsSecondVersion = async () => {

    try{
        const lyrics = await getDataWithAsyncTwo();
        console.log('12) La letra de la canción es:', lyrics);

    } catch (error){
        console.log('12) Error al obtener los lyrics', error);
    }

}

showLyricsSecondVersion();

// 13. Si te animás un poco más mostra los datos que trajiste en el elemento div con id "content". En caso que sea un array podés iterar usando .forEach() o .map(). Para ello debes investigar y usar alguna de las siguientes APIs del DOM: querySelector(), innerHTML, textContent

let artistInput = document.getElementById("artistValue");
let titleInput = document.getElementById("titleValue");

async function getDataWithAsync() {

    document.getElementById("songTitle").style.marginTop = "2em";
    document.getElementById("songTitle").innerHTML = "";
    document.getElementById("content").innerHTML = "";
    document.getElementById("loadingState").classList.remove("hidden");
    document.getElementById("infoText").classList.add("hidden");

    let artistValue = artistInput.value;
    let titleValue = titleInput.value;
    artistValue = artistValue.replace("&", "And");
    titleValue = titleValue.replace("&", "And");

    const response = await fetch('https://api.lyrics.ovh/v1/'+artistValue.replace(new RegExp("\\s", "g"), "%20")+'/'+titleValue.replace(new RegExp("\\s", "g"), "%20")+''); // Reemplazar los espacios en blanco de la URL con %20 (caracter que se refiere al espacio vacio)para poder escribir más de una palabra en cada campo.
    const lyrics = await response.json();
    return lyrics;

}

const validate = () => { // Función para habilitar el boton solo si ambos campos están llenos.

    let artistValue = artistInput.value;
    let titleValue = titleInput.value;

    if(artistValue && titleValue !== ""){
        document.getElementById("button").classList.remove("disabled");
    } else{
        document.getElementById("button").classList.add("disabled");
    }

}

const showLyrics = async () => {

    try{

        let artistValue = artistInput.value;
        let titleValue = titleInput.value;

        const lyricsContent = await getDataWithAsync();
        const {lyrics} = lyricsContent;

        document.getElementById("songTitle").innerHTML = artistValue.toUpperCase() + " " + "-" + " " + titleValue;
        document.getElementById("content").innerHTML = lyrics.replace(new RegExp("\n", "g"), "<br>"); // Cada vez que se encuentra "\n" se reemplaza por "<br>".
        document.getElementById("loadingState").classList.add("hidden");

    } catch (error){

        document.getElementById("songTitle").innerHTML = ":(";
        document.getElementById("content").innerHTML = "No se encontró la letra de la canción especificada. Intente de nuevo.";
        document.getElementById("loadingState").classList.add("hidden");
        document.getElementById("songTitle").style.marginTop = "31%";
        console.log('13) Error al obtener los lyrics', error);

    }

}



