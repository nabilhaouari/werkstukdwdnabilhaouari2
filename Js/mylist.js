const apipath = "https://api.jikan.moe/v3";
let idAnime = localStorage.getItem("id");
console.log(idAnime);
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

function addData(animeId) {
    animeCollection.add({
        id: animeId,
        seen: false
    })
    console.log(animeId);
}

function deleteData(dbid) {
    animeCollection.doc(dbid).delete().then(function () {
        window.location.reload();
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}
async function getData(databaseArray) {
    databaseArray.forEach(async element => {
        let resultdata = await (await fetch(`${apipath}/anime/${element.id}`)).json();
        console.log(resultdata);

        // divAnimeBox.onclick = function AnimeSearch() {
        //     console.log(element.id);
        //     window.location = "../Html/anime.html?id=" + element.id;
        // };

        let divAnimeBox = document.createElement("div");
        divAnimeBox.className = "animebox";
        divAnimeBox.id = "animebox";
        divAnimeBox.dataset.dbid = element.idDB;

        divAnimeBox.onclick = deleteData(element.idDB);


        let imgAnime = document.createElement("img");
        imgAnime.className = "imageanime";
        imgAnime.setAttribute("src", resultdata.image_url);
        let divNameAnime = document.createElement("div");
        divNameAnime.className = "nameanime";
        let NameAnime = document.createElement("a");
        let NameAnimeText = document.createTextNode(resultdata.title)

        searchlist.appendChild(divAnimeBox);
        divAnimeBox.appendChild(imgAnime);
        divAnimeBox.appendChild(divNameAnime);
        divNameAnime.appendChild(NameAnime);
        NameAnime.appendChild(NameAnimeText);

    });

}