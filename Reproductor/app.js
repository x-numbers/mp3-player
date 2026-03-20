const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const icon = document.getElementById("icon");
const progress = document.getElementById("progress");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const coverImg = document.querySelector(".cover img");
const background = document.querySelector(".background");

const songs = [
    {
        title: "Vanilla Rose",
        artist: "Rixard",
        src: "../song/vanilla_rose.mp3",
        cover: "../img/vanilla.png"
    },
    {
        title: "El Rho (draft)",
        artist: "Rixard",
        src: "../song/El Rho (draft).mp3",
        cover: "../img/rho.jpeg"
    },
    {
        title: "Rex Reverb (short beat)",
        artist: "Rixard",
        src: "../song/Rex Reverb (short beat).mp3",
        cover: "../img/rex.jpeg"
    },
    {
        title: "The Trembling of Time (draft)",
        artist: "Rixard",
        src: "../song/The Trembling of Time (draft).mp3",
        cover: "../img/trembling.jpeg"
    }
];

let index = 0;

function loadSong(i) {
    title.textContent = songs[i].title;
    artist.textContent = songs[i].artist;

    audio.src = songs[i].src;

    coverImg.src = songs[i].cover;
    background.style.backgroundImage = `url(${songs[i].cover})`;

    progress.value = 0;
}

playBtn.addEventListener("click", async () => {
    if (audio.paused) {
        await audio.play();
        icon.classList.replace("bi-play-fill", "bi-pause-fill");
    } else {
        audio.pause();
        icon.classList.replace("bi-pause-fill", "bi-play-fill");
    }
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    icon.classList.replace("bi-play-fill", "bi-pause-fill");
});

nextBtn.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    icon.classList.replace("bi-play-fill", "bi-pause-fill");
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value * audio.duration) / 100;
    }
});

audio.addEventListener("ended", () => {
    nextBtn.click();
});

loadSong(index);

