const artist = document.getElementById('artist')
const music = document.getElementById('music')
const search = document.getElementById('search')
const lyrics = document.getElementById('lyrics')

artist.addEventListener('input', () => {
    if(artist.value === ''){
        lyrics.innerHTML = ''
    }
})

music.addEventListener('input', () => {
    if(music.value === ''){
        lyrics.innerHTML = ''
    }
})

search.addEventListener('click', () => {
    getLyric(artist.value, music.value)
})

function searchMusic(artist, music) {
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${music}`);
}

async function getLyric(artist, music) {
    try {
        const musicResult = await searchMusic(artist, music);
        const data = await musicResult.json();

        lyrics.style.display = 'block'

        if(data.lyrics){
            const pre = `<pre>${data.lyrics}</pre>`
            lyrics.innerHTML = pre
        }
        else{
            lyrics.innerHTML = data.error
        }
    } catch (error) {
        console.log(error);
    }
}