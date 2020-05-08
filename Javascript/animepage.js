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
    myListArray = [];

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
        localStorage.setItem("idAnime", id);
        let ident = localStorage.getItem("idAnime");
        console.log(ident);
    });
}
GetAnime(id);