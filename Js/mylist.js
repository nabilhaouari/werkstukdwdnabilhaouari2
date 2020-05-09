firebase.initializeApp({
    apiKey: 'JOUW API KEY HIER',
    projectId: 'JOUW PROJECT ID HIER'
  });
const apipath = "https://api.jikan.moe/v3";
let idAnime = localStorage.getItem("idAnime");
console.log(idAnime);
async function MyList() {
    let resultMyList = await (await fetch(`${apipath}/anime/${idAnime}`)).json();
    console.log(resultMyList);
    let LSid = localStorage.getItem("idAnime");
    console.log(JSON.parse(LSid));



    //fetch avec le id que jai enregistrer via un lien, et recup les donne de ce array
    // let resultAnime = await (await fetch(`${apipath}/search/anime?q=${searchElement.value}`)).json();
}
MyList();