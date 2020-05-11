const apipath = "https://api.jikan.moe/v3";
//fetch avec le id que jai enregistrer via un lien, et recup les donne de ce array
// let resultAnime = await (await fetch(`${apipath}/search/anime?q=${searchElement.value}`)).json();

firebase.initializeApp({
    apiKey: 'AIzaSyCVdpqkX6nfY8VE62t7q5vorGzq4KeVnqA',
    projectId: 'shionanime-4b2e6'
});
const database = firebase.firestore();
const animeCollection = database.collection("AnimeList");

const convertQuerySnapshotToRegularArray = (querySnapshot) => querySnapshot.docs.map((item) => ({
    idDB: item.id,
    ...item.data()
}));



async function renderAnime() {
    animeCollection.onSnapshot((querySnapshot) => {
        const anime = convertQuerySnapshotToRegularArray(querySnapshot);

        console.log(anime);
        getData(anime);
    });
}
renderAnime();


function deleteData(dbid) {
    animeCollection.doc(dbid).delete().then(function () {

        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}




async function getData(databaseArray) {
    databaseArray.forEach(async element => {
        let resultdata = await (await fetch(`${apipath}/anime/${element.id}`)).json();
        console.log(resultdata);

        let divAnimeBox = document.createElement("div");
        divAnimeBox.className = "animebox";
        divAnimeBox.id = "animebox";
        divAnimeBox.dataset.dbid = element.idDB;
        if (element.seen) {
            divAnimeBox.dataset.seen = "true";
        }


        divAnimeBox.addEventListener('click', function (e) {
            console.log(this.dataset.dbid);
            searchlist.innerHTML = "";
            deleteData(this.dataset.dbid);
        });
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        let overlaytext = document.createElement("div");
        overlaytext.id = "overlaytext";

        let imgAnime = document.createElement("img");
        imgAnime.className = "imageanime";
        imgAnime.setAttribute("src", resultdata.image_url);
        let divNameAnime = document.createElement("div");
        divNameAnime.className = "nameanime";
        let NameAnime = document.createElement("a");
        let NameAnimeText = document.createTextNode(resultdata.title);
        overlaytext.innerHTML = " Delete ";
        divNameAnime.dataset.dbid = element.idDB;
        if (element.seen) {
            divNameAnime.dataset.seen = "true";
        }

        searchlist.appendChild(divAnimeBox);
        divAnimeBox.appendChild(overlay);
        overlay.appendChild(overlaytext);
        divAnimeBox.appendChild(imgAnime);
        divAnimeBox.appendChild(divNameAnime);
        divNameAnime.appendChild(NameAnime);
        NameAnime.appendChild(NameAnimeText);

    });

}