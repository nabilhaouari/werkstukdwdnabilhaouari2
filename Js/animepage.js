import Firebase from "./firebase.js";
const animeDatabase = new Firebase();
// firebase.initializeApp({
//     apiKey: 'AIzaSyCVdpqkX6nfY8VE62t7q5vorGzq4KeVnqA',
//     projectId: ''
// });

// const database = firebase.firestore();
// const animeCollection = database.collection("AnimeList");
// const convertQuerySnapshotToRegularArray = (querySnapshot) => querySnapshot.docs.map((item) => ({
//     id: item.id,
//     ...item.data()
// }));


// async function renderAnime() {
//     animeCollection.onSnapshot((querySnapshot) => {
//         const anime = convertQuerySnapshotToRegularArray(querySnapshot);
//         console.log(anime);
//         getData(anime);
//     });
// }
// renderAnime();

let AnimeList = animeDatabase.renderAnime();
console.log(AnimeList);

async function getData(databaseArray) {
    databaseArray.forEach(async element => {
        let resultdata = await (await fetch(`${apipath}/anime/${element.id}`)).json();
        console.log(resultdata);
    });

}
























function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
let id = getUrlVars()["id"];
console.log();
const apipath = "https://api.jikan.moe/v3";
async function GetAnime(id) {


    let resultAnimePage = await (await fetch(`${apipath}/anime/${id}`)).json();
    let resultStaff = await (await fetch(`${apipath}/anime/${id}/characters_staff`)).json();
    console.log(resultAnimePage);
    console.log(resultStaff);
    let imgAnime = document.createElement("img");
    imgAnime.setAttribute("src", resultAnimePage.image_url);
    let titleAnime = document.createElement("h1");
    let titleAnimeText = document.createTextNode(resultAnimePage.title);
    let synopsisAnime = document.createElement("a");
    let synopsisAnimeText = document.createTextNode(resultAnimePage.synopsis);


    let ficheimage = document.getElementById("ficheimage");
    ficheimage.appendChild(imgAnime);
    let fichesynopsis = document.getElementById("fichesynopsis");
    fichesynopsis.appendChild(titleAnime);
    titleAnime.appendChild(titleAnimeText);
    fichesynopsis.appendChild(synopsisAnime);
    synopsisAnime.appendChild(synopsisAnimeText);


    let addButton = document.getElementById("addtolist");
    addButton.addEventListener("click", function () {
        myListArray = JSON.parse(localStorage.getItem("idAnime"));
        myListArray.push(id);
        console.log(id);
        localStorage.setItem("idAnime", JSON.stringify(myListArray));

    });
}
GetAnime(id);