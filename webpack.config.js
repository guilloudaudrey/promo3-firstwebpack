/*
Webpack est un utilitaire node qui va permettre de gérer 
le build de nos projets et de faire du javascript modulaire
côté client (en utilisant des import ou des require)
Pour fonctionner, il va avoir besoin d'un fichier de 
configuration appelé par défaut webpack.config.js qui
contiendra obligatoirement 2 informations :
- entry : le ou les points d'entré que webpack va devoir
scanner pour build le projet (généralement un ou plusieurs
fichier js)
- output: le ou les fichiers qui vont être générés par 
webpack
*/
module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map'
};