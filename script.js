import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
    // ... tu configuración de Firebase
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencias a la base de datos
const reflectionsRef = ref(database, 'reflections');
const librosRef = ref(database, 'libros'); // Referencia a la colección/nodo de libros

// Elementos del DOM
const reflectionForm = document.getElementById('reflection-form');
const reflectionInput = document.getElementById('reflection-input');
const reflectionsList = document.getElementById('reflections-list');
const bookSection = document.getElementById('book-section'); // Elemento donde se mostrarán los libros

// Manejo de reflexiones (igual que antes)
reflectionForm.addEventListener('submit', (e) => { /* ... */ });
onValue(reflectionsRef, (snapshot) => { /* ... */ });

// Cargar libros desde Firebase
onValue(librosRef, (snapshot) => {
    bookSection.innerHTML = ""; // Limpia la sección de libros antes de renderizar
    snapshot.forEach((childSnapshot) => {
        const libro = childSnapshot.val();

        // Crea el elemento HTML para el libro
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <img src="${libro.portada || 'placeholder.jpg'}" alt="${libro.titulo}">
            <h3>${libro.titulo}</h3>
            <p>${libro.autor}</p>
            <p>${libro.sinopsis || ''}</p>
            <a href="${libro.enlace || '#'}">Leer más</a>
        `;
        bookSection.appendChild(bookElement);
    });
});
