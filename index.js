const artist = document.getElementById('artist')
const music = document.getElementById('music')
const search = document.getElementById('search')
const lyrics = document.getElementById('lyrics')
const loadSpinner = document.getElementById('spinner')

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
    if(artist.value !== '' && music.value !== ''){
        getLyric(artist.value, music.value);
    }
    else{
        alert('Fill all fields!')
    }
})

function searchMusic(artist, music) {
    loadSpinner.style.display = 'block'
    lyrics.style.display = 'none'
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${music}`);
}

async function getLyric(artist, music) {
    try {
        const musicResult = await searchMusic(artist, music);
        const data = await musicResult.json();

        lyrics.style.display = 'block'

        if(data.lyrics){
            loadSpinner.style.display = 'none'
            const pre = `<pre>${data.lyrics}</pre>`
            lyrics.innerHTML = pre
        }
        else{
            loadSpinner.style.display = 'none'
            lyrics.innerHTML = data.error
        }
    } catch (error) {
        console.log(error);
    }
}