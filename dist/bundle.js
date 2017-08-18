/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ajax__);
//on importe la fonction doAjax spécifiquement du fichierajax.js en utilisant les accolades
//pour indiquer les variables qu'on veut importer


//autre solution avec le require
//const doAjax = require('./ajax.js').doAjax;


document.querySelector('#requete')
    .addEventListener('click', function() {
        Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["doAjax"])({
            url: 'fichier.txt',
            callback: function(reponse) {
                document.querySelector('#para')
                    .innerHTML = reponse;
            }
        });
    });

document.querySelector('#requete2')
    .addEventListener('click', function() {

        Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["doAjax"])({
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

    module.exports.doAjax = doAjax;


    function doAjax(options) {
        //On définit les paramètres par défaut de notre requete
        let defaults = {
            url: '',
            method: 'GET',
            async: true,
            args: '',
            callback: function() {},
            callbackError: function() {}
        };
        //On assigne les arguments de options à defaults
        assignArgs(options, defaults);

        //On crée une nouvelle instance d'objet AJAX
        let ajax = new XMLHttpRequest();
        //AJAX étant une service asynchrone, il va falloir
        //lui dire via des évènements comment se comporter
        //au moment où il aura terminé sa requête et que 
        //sa réponse sera disponible
        ajax.onreadystatechange = function() {
            /*Le readystatechange sera appelé un certain
            nombre de fois selon où en est notre requête
            (codes dispo sur mozilla). Le seul code qui
            va nous intéresser nous sera celui indiquant que
            la requête est terminé et la réponse disponible : 4
            */
            if (ajax.readyState === 4) {
                //On ne voudra manipuler la réponse seulement si
                //la requête s'est couronnée de succès
                if (ajax.status === 200 || ajax.status === 304) {
                    //La réponse de la requête se trouve alors dans
                    //l'objet ajax dans sa propriété response.
                    defaults.callback(ajax.response);
                } else {
                    defaults.callbackError();
                }
            }
        };
        //On ouvre le requête en lui fournissant le type de
        //requête HTTP, l'url à requêter et si c'est synchrone ou non
        ajax.open(defaults.method, defaults.url, defaults.async);
        //On envoie la requête
        ajax.send(defaults.args);
    }
    /**
     * Fonction qui itère sur les propriétés d'un objet source,
     * vérifie si l'objet target possède une propriété correspondate
     * et si oui, assigne comme valeur de cette propriété target
     * la valeur de la propriété source.
     * @param {*} source 
     * @param {*} target 
     */
    function assignArgs(source, target) {
        for (let clef in source) {
            if (target.hasOwnProperty(clef)) {
                target[clef] = source[clef];
            }
        }


    }

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTI3ZDExYmJiZjEzYjAxZDI1MWYiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9leGVtcGxlLWFqYXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hamF4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUNBO0FBQ2lCOztBQUVqQjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7QUNsRUQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxFQUFFO0FBQ2pCLGVBQWUsRUFBRTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsSyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMjdkMTFiYmJmMTNiMDFkMjUxZiIsIi8vb24gaW1wb3J0ZSBsYSBmb25jdGlvbiBkb0FqYXggc3DDqWNpZmlxdWVtZW50IGR1IGZpY2hpZXJhamF4LmpzIGVuIHV0aWxpc2FudCBsZXMgYWNjb2xhZGVzXG4vL3BvdXIgaW5kaXF1ZXIgbGVzIHZhcmlhYmxlcyBxdSdvbiB2ZXV0IGltcG9ydGVyXG5pbXBvcnQgeyBkb0FqYXggfSBmcm9tICcuL2FqYXgnXG5cbi8vYXV0cmUgc29sdXRpb24gYXZlYyBsZSByZXF1aXJlXG4vL2NvbnN0IGRvQWpheCA9IHJlcXVpcmUoJy4vYWpheC5qcycpLmRvQWpheDtcblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVxdWV0ZScpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvQWpheCh7XG4gICAgICAgICAgICB1cmw6ICdmaWNoaWVyLnR4dCcsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ocmVwb25zZSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhJylcbiAgICAgICAgICAgICAgICAgICAgLmlubmVySFRNTCA9IHJlcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVxdWV0ZTInKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGRvQWpheCh7XG4gICAgICAgICAgICB1cmw6ICdSRUFETUUubWQnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKHJlcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IHJlcG9uc2U7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmEyJylcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xubGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXF1ZXRlRXZpbCcpO1xuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdHRVQnLCAnZXZpbC5qcycpO1xuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgZXZhbCh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndW5leHBlY3RlZCBzdGF0dXMgY29kZTonLCB0aGlzLnN0YXR1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci5zZW5kKG51bGwpO1xufSk7XG5cbmJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjeW8tYnV0dG9uXCIpO1xuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbignUE9TVCcsICd5by5waHAnKTtcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHhoci5yZWFkeVN0YXRlKTtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzOiBcIiArIHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwidW5leHBlY3RlZCBzdGF0dXMgY29kZTpcIiArIHhoci5zdGF0dXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuICAgIHhoci5zZW5kKCd0ZXh0PXRvdG8nKTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2NyaXB0cy9leGVtcGxlLWFqYXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiICAgIG1vZHVsZS5leHBvcnRzLmRvQWpheCA9IGRvQWpheDtcblxuXG4gICAgZnVuY3Rpb24gZG9BamF4KG9wdGlvbnMpIHtcbiAgICAgICAgLy9PbiBkw6lmaW5pdCBsZXMgcGFyYW3DqHRyZXMgcGFyIGTDqWZhdXQgZGUgbm90cmUgcmVxdWV0ZVxuICAgICAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgYXJnczogJycsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgICAgIGNhbGxiYWNrRXJyb3I6IGZ1bmN0aW9uKCkge31cbiAgICAgICAgfTtcbiAgICAgICAgLy9PbiBhc3NpZ25lIGxlcyBhcmd1bWVudHMgZGUgb3B0aW9ucyDDoCBkZWZhdWx0c1xuICAgICAgICBhc3NpZ25BcmdzKG9wdGlvbnMsIGRlZmF1bHRzKTtcblxuICAgICAgICAvL09uIGNyw6llIHVuZSBub3V2ZWxsZSBpbnN0YW5jZSBkJ29iamV0IEFKQVhcbiAgICAgICAgbGV0IGFqYXggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgLy9BSkFYIMOpdGFudCB1bmUgc2VydmljZSBhc3luY2hyb25lLCBpbCB2YSBmYWxsb2lyXG4gICAgICAgIC8vbHVpIGRpcmUgdmlhIGRlcyDDqXbDqG5lbWVudHMgY29tbWVudCBzZSBjb21wb3J0ZXJcbiAgICAgICAgLy9hdSBtb21lbnQgb8O5IGlsIGF1cmEgdGVybWluw6kgc2EgcmVxdcOqdGUgZXQgcXVlIFxuICAgICAgICAvL3NhIHLDqXBvbnNlIHNlcmEgZGlzcG9uaWJsZVxuICAgICAgICBhamF4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLypMZSByZWFkeXN0YXRlY2hhbmdlIHNlcmEgYXBwZWzDqSB1biBjZXJ0YWluXG4gICAgICAgICAgICBub21icmUgZGUgZm9pcyBzZWxvbiBvw7kgZW4gZXN0IG5vdHJlIHJlcXXDqnRlXG4gICAgICAgICAgICAoY29kZXMgZGlzcG8gc3VyIG1vemlsbGEpLiBMZSBzZXVsIGNvZGUgcXVpXG4gICAgICAgICAgICB2YSBub3VzIGludMOpcmVzc2VyIG5vdXMgc2VyYSBjZWx1aSBpbmRpcXVhbnQgcXVlXG4gICAgICAgICAgICBsYSByZXF1w6p0ZSBlc3QgdGVybWluw6kgZXQgbGEgcsOpcG9uc2UgZGlzcG9uaWJsZSA6IDRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoYWpheC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgLy9PbiBuZSB2b3VkcmEgbWFuaXB1bGVyIGxhIHLDqXBvbnNlIHNldWxlbWVudCBzaVxuICAgICAgICAgICAgICAgIC8vbGEgcmVxdcOqdGUgcydlc3QgY291cm9ubsOpZSBkZSBzdWNjw6hzXG4gICAgICAgICAgICAgICAgaWYgKGFqYXguc3RhdHVzID09PSAyMDAgfHwgYWpheC5zdGF0dXMgPT09IDMwNCkge1xuICAgICAgICAgICAgICAgICAgICAvL0xhIHLDqXBvbnNlIGRlIGxhIHJlcXXDqnRlIHNlIHRyb3V2ZSBhbG9ycyBkYW5zXG4gICAgICAgICAgICAgICAgICAgIC8vbCdvYmpldCBhamF4IGRhbnMgc2EgcHJvcHJpw6l0w6kgcmVzcG9uc2UuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRzLmNhbGxiYWNrKGFqYXgucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRzLmNhbGxiYWNrRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vT24gb3V2cmUgbGUgcmVxdcOqdGUgZW4gbHVpIGZvdXJuaXNzYW50IGxlIHR5cGUgZGVcbiAgICAgICAgLy9yZXF1w6p0ZSBIVFRQLCBsJ3VybCDDoCByZXF1w6p0ZXIgZXQgc2kgYydlc3Qgc3luY2hyb25lIG91IG5vblxuICAgICAgICBhamF4Lm9wZW4oZGVmYXVsdHMubWV0aG9kLCBkZWZhdWx0cy51cmwsIGRlZmF1bHRzLmFzeW5jKTtcbiAgICAgICAgLy9PbiBlbnZvaWUgbGEgcmVxdcOqdGVcbiAgICAgICAgYWpheC5zZW5kKGRlZmF1bHRzLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb25jdGlvbiBxdWkgaXTDqHJlIHN1ciBsZXMgcHJvcHJpw6l0w6lzIGQndW4gb2JqZXQgc291cmNlLFxuICAgICAqIHbDqXJpZmllIHNpIGwnb2JqZXQgdGFyZ2V0IHBvc3PDqGRlIHVuZSBwcm9wcmnDqXTDqSBjb3JyZXNwb25kYXRlXG4gICAgICogZXQgc2kgb3VpLCBhc3NpZ25lIGNvbW1lIHZhbGV1ciBkZSBjZXR0ZSBwcm9wcmnDqXTDqSB0YXJnZXRcbiAgICAgKiBsYSB2YWxldXIgZGUgbGEgcHJvcHJpw6l0w6kgc291cmNlLlxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlIFxuICAgICAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFzc2lnbkFyZ3Moc291cmNlLCB0YXJnZXQpIHtcbiAgICAgICAgZm9yIChsZXQgY2xlZiBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkoY2xlZikpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbY2xlZl0gPSBzb3VyY2VbY2xlZl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2NyaXB0cy9hamF4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=