const apipath = "https://api.jikan.moe/v3";
let idAnime = localStorage.getItem("id");
console.log(idAnime);
//fetch avec le id que jai enregistrer via un lien, et recup les donne de ce array
// let resultAnime = await (await fetch(`${apipath}/search/anime?q=${searchElement.value}`)).json();