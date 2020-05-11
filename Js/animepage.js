function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
let id = getUrlVars()["id"];

const apipath = "https://api.jikan.moe/v3";

firebase.initializeApp({
    apiKey: 'AIzaSyCVdpqkX6nfY8VE62t7q5vorGzq4KeVnqA',
    projectId: 'shionanime-4b2e6'
});
const database = firebase.firestore();
const animeCollection = database.collection("AnimeList");
let anime;
const convertQuerySnapshotToRegularArray = (querySnapshot) => querySnapshot.docs.map((item) => ({
    idDB: item.id,
    ...item.data()
}));


async function renderAnime() {
    animeCollection.onSnapshot((querySnapshot) => {
        anime = convertQuerySnapshotToRegularArray(querySnapshot);
        GetAnime(id, anime);
        // getData(anime);
    });

}
renderAnime();

function addData(animeId, databaseArray) {
    let found = databaseArray.find(element => element.id == animeId);
    console.log("found!");
    console.log(found);
    if (found == undefined) {
        animeCollection.add({
            id: animeId,
            seen: false
        })
        console.log(animeId);
       
    } else {
        alert("This anime has already been added baka =^_^=")

    }
}

function updateData(dbid) {

    animeCollection.doc(dbid).update({
        seen: true
    })
}

// async function getData(databaseArray) {
//     databaseArray.forEach(async element => {
//         let resultdata = await (await fetch(`${apipath}/anime/${element.id}`)).json();

//     });
//     let addButton = document.getElementById("addtolist");
//     addButton.dataset.dbid = databaseAr
// }







async function GetAnime(id, databaseArray) {


    let resultAnimePage = await (await fetch(`${apipath}/anime/${id}`)).json();
    let resultStaff = await (await fetch(`${apipath}/anime/${id}/characters_staff`)).json();
    // console.log(resultStaff);
    let imgAnime = document.createElement("img");
    imgAnime.setAttribute("src", resultAnimePage.image_url);
    let titleAnime = document.createElement("h1");
    let titleAnimeText = document.createTextNode(resultAnimePage.title);
    let synopsisAnime = document.createElement("a");
    let synopsisAnimeText = document.createTextNode(resultAnimePage.synopsis);


    let ficheimage = document.getElementById("ficheimage");
    ficheimage.innerHTML = "";
    ficheimage.appendChild(imgAnime);
    let fichesynopsis = document.getElementById("fichesynopsis");
    fichesynopsis.innerHTML = "";
    fichesynopsis.appendChild(titleAnime);
    titleAnime.appendChild(titleAnimeText);
    fichesynopsis.appendChild(synopsisAnime);
    synopsisAnime.appendChild(synopsisAnimeText);


    let addButton = document.getElementById("addtolist");
    addButton.addEventListener("click", function () {
        addData(id, databaseArray);
        console.log("test");

    });
    let seen = document.getElementById("alreadyseen");

    seen.addEventListener("click", function () {
        let trouver = databaseArray.find(element => element.id == id);
        console.log(databaseArray);
        console.log(trouver);
        updateData(trouver.idDB);

    });
    // let seen = document.getElementById("alreadyseen");
    // seen.addEventListener("click", function () {
    //     updateData(seen);

    // });
}