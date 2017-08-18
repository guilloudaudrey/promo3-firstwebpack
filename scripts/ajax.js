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