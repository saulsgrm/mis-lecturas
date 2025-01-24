// script.js

// Configuración de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAlJr_dQktL4U4aqQNz7bCOd88TMsS1Uqo",
  authDomain: "mis-lecturas-9a27d.firebaseapp.com",
  databaseURL: "https://mis-lecturas-9a27d-default-rtdb.firebaseio.com",
  projectId: "mis-lecturas-9a27d",
  storageBucket: "mis-lecturas-9a27d.firebasestorage.app",
  messagingSenderId: "183734127614",
  appId: "1:183734127614:web:58e4c87263b1b42d7e0eaf",

};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencia a la base de datos
const reflectionsRef = ref(database, 'reflections');

// Elementos del DOM
const reflectionForm = document.getElementById('reflection-form');
const reflectionInput = document.getElementById('reflection-input');
const reflectionsList = document.getElementById('reflections-list');

// Enviar reflexión a Firebase
reflectionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newReflection = reflectionInput.value;
    if (newReflection.trim() !== "") {
        push(reflectionsRef, newReflection);
        reflectionInput.value = ""; // Limpia el campo de texto
    }
});

// Escuchar reflexiones desde Firebase
onValue(reflectionsRef, (snapshot) => {
    reflectionsList.innerHTML = ""; // Limpia la lista antes de renderizar
    snapshot.forEach((childSnapshot) => {
        const reflection = childSnapshot.val();
        const listItem = document.createElement('li');
        listItem.textContent = reflection;
        reflectionsList.appendChild(listItem);
    });
});
