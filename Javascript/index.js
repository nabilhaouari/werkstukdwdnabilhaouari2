import Anime from "./Anime.js";
const apipath = "https://api.jikan.moe/v3";
let searchElement = document.getElementById("searchbar");

searchElement.addEventListener("keyup", SearchAnime);
let animeArray = [];

async function SearchAnime() {
    animeArray = [];
    console.log(searchElement.value);
    let resultAnime = await (await fetch(`${apipath}/search/anime?q=${searchElement.value}`)).json();
    resultAnime.results.forEach(elementAnime => {
        let anime = new Anime(elementAnime.mal_id, elementAnime.title, elementAnime.image_url, elementAnime.synopsis, elementAnime.airing);
        animeArray.push(anime);

    });
    let searchlist = document.getElementById("searchlist");
    searchlist.innerHTML = "";
    searchresult.innerHTML = "";
    animeArray.forEach(element => {

        //create elements
        let divAnimeBox = document.createElement("div");
        divAnimeBox.className = "animebox";
        divAnimeBox.id = "animebox";
        divAnimeBox.onclick = function AnimeSearch() {
            console.log(element.id);
            window.location = "../Html/anime.html?id=" + element.id;
        };
        let searchresult = document.getElementById("searchresult");
        searchresult.innerHTML = `Results for: ${searchElement.value}`
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        let overlaytext = document.createElement("div");
        overlaytext.id = "overlaytext";
        let imgAnime = document.createElement("img");
        imgAnime.className = "imageanime";
        imgAnime.setAttribute("src", element.image);
        let divNameAnime = document.createElement("div");
        divNameAnime.className = "nameanime";
        let NameAnime = document.createElement("a");
        let NameAnimeText = document.createTextNode(element.title)
        overlaytext.innerHTML = " More... ";
        //append element

        searchlist.appendChild(divAnimeBox);
        divAnimeBox.appendChild(overlay);
        overlay.appendChild(overlaytext);
        divAnimeBox.appendChild(imgAnime);
        divAnimeBox.appendChild(divNameAnime);
        divNameAnime.appendChild(NameAnime);
        NameAnime.appendChild(NameAnimeText);

    });
}




// function AnimeSearch(id) {
//     console.log("click");
//     console.log(id);
//     // window.location.replace("www.youtube.com");
// };