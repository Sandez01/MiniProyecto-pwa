if ('serviceWorker' in navigator){
    window.addEventListener('Load', () =>{
        navigator.serviceWorker.register('../sw.js').then(() => {
            console.log('Soy el service Worker registrado y funcionando.')
        })
    })
}
