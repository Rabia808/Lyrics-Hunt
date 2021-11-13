"use strict";

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const btnCross = document.querySelector(".cross-icon");
const btnSearch = document.querySelector("#btn-search");

const apiURL = "https://api.lyrics.ovh";

// //show function------------------------->
// function showModal(modal) {
//   if (modal == null) return;
//   modal.classList.add("active");
// }

// //hide modal--------------------->
// function hideModal(modal) {
//   if (modal == null) return;
//   modal.classList.remove("active");
// }

// adding event listener in form

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = search.value.trim();

  // checking seaxch is empty or Not

  if (!searchValue) {
    alert("Enter Song or Artist name");
  } else {
    searchSong(searchValue);
    result.classList.add("active");
  }
});

btnSearch.addEventListener("click", (e) => {
  console.log("hell");
  const targetElement = e.target;
  let searchValue = search.value.trim();

  // checking seaxch is empty or Not

  if (targetElement.tagName === "OBJECT" && !searchValue) {
    alert("Enter Song or Artist name");
  } else {
    searchSong(searchValue);
    result.classList.add("active");
  }
});

// Search song---------------------------------->

async function searchSong(searchValue) {
  const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
  const data = await searchResult.json();

  showData(data);
  // console.log(data);
}

//updating DOM-------------------------------------->

function showData(data) {
  result.innerHTML = `
  <ul class="song-list">
    ${data.data
      .map(
        (song) => ` <div class="cross-icon"><i class="fas fa-times"></i></div>
                             <li>
                              <div>
                                <strong>
                                ${song.artist.name}
                                </strong> - ${song.title}
                                </div>
                                <button data-artist = "${song.artist.name}" data-songtitle = "${song.title}">
                                Get Lyrics
    
                              </button>
                              </li>`
      )
      .join(" ")}

    </ul>
  `;
}

//Event listener in get Lyrics button---------------------------------------------->
result.addEventListener("click", (e) => {
  const clickedElement = e.target;
  // console.log(clickedElement);

  // checking clickedElement is button or not
  if (clickedElement.tagName === "BUTTON") {
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

//get Lyrics---------------------------------->

async function getLyrics(artist, songTitle) {
  // console.log("clicked");
  // $.get(
  //   "https://api.lyrics.ovh/v1/" + artist + "/" + songTitle,
  //   function (data) {
  //     result.innerHTML = data.lyics.replace(new RegExp("\n", "g"), "<br>");
  //   }
  // );

  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  // console.log(data);

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = ` <div class="cross-icon"><i class="fas fa-times"></i></div>
                      <h2>
                      <strong>
                      ${artist}
                      </strong> -${songTitle}
                      </h2>
                      <p> ${lyrics} </p>
  `;
}

// hide modal cross icon and escape button-------------------------------->

result.addEventListener("click", (e) => {
  const targetEl = e.target;

  if (targetEl.tagName === "I") {
    result.classList.remove("active");
    search.value = "";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && result.classList.contains("active")) {
    //console.log(e.key);
    result.classList.remove("active");
    search.value = "";
  }
});
