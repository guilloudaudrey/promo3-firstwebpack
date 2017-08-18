//on importe la fonction doAjax spécifiquement du fichierajax.js en utilisant les accolades
//pour indiquer les variables qu'on veut importer
import { doAjax } from './ajax';

//autre solution avec le require
//const doAjax = require('./ajax.js').doAjax;


document.querySelector('#requete')
    .addEventListener('click', function() {
        doAjax({
            url: 'fichier.txt',
            callback: function(reponse) {
                document.querySelector('#para')
                    .innerHTML = reponse;
            }
        });
    });

document.querySelector('#requete2')
    .addEventListener('click', function() {

        doAjax({
            url: 'README.md',
            callback: function(reponse) {
                let div = document.createElement('div');
                div.innerHTML = reponse;
                document.querySelector('#para2')
                    .appendChild(div);
            }
        });
    });
let button = document.querySelector('#requeteEvil');
button.addEventListener('click', function() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'evil.js');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                eval(xhr.responseText);
            } else {
                console.error('unexpected status code:', this.status);
            }
        }
    };
    xhr.send(null);
});

button = document.querySelector("#yo-button");
button.addEventListener("click", function(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'yo.php');
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("success: " + xhr.responseText);
            } else {
                console.error("unexpected status code:" + xhr.status);
                console.error(xhr.responseText);
            }
        }
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('text=toto');
});