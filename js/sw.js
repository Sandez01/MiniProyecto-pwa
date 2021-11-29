importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

if (workbox) {
    console.log("Ajua! WorkBox está cargado :) ");
    workbox.precaching.precacheAndRoute([]);
    
    /*Cachéde imagenes en la carpeta, por ejemplo "Otros", editamos a otras
    carpetas que se obtuvieron y configuramos en el arhivo sw-config.js*/
    workbox.routing.registerRoute(
        /(.*)others(.*)\.(?:png|gif|jpg)/,
        new  workbox.strategies.CacheFirst({
            cacheName: "images",
            plugins:[
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeseconds: 30 * 24 * 60 * 60, 
                })
            ]
        })
    );
    /*Hacemos que el contenido en JS y CSS sean rápidos devolviendo los 
    #assets" de la cache, mientras se asegura de que se actualizan en 
    segndo plano para su próximo uso. */
workbox.routing.registerRoute(
    //Cache de JS, CSS y SCC
    /.*\.(?:css|js|scss|)/,
    new workbox.strategies.StaleWhileRevalidate({
        //Usamos el nombre de un caché personalizado.
        cacheName:"assets",


    })
);

//Caché fuentes de google
workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
        ],
    })
);

//agregar analises offline
workbox.googleAnalytics.initialize();

/*Instalar nuevo service worker y hacer que actualice y controle la pagina web lo antes posibles */
workbox.core.skiWaiting();
workbox.core.ClientsClaim();
}else{
    console.log("Error! Workobx no esta funcionando :( ");
}
