const playButton = document.getElementById("play")
const prevButton = document.getElementById("prev")
const nextButton = document.getElementById("next")
const repeatButton = document.getElementById("repeat")
const shuffleButton = document.getElementById("shuffle")
const audio = document.getElementById("audio")

const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playListButton = document.getElementById('playlist')
const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')


// sıra 
let index

// döngü
let loop = true

// sarkı listesi 


const songsList =[
        

    {
        name: "we can't be friends ",
        link: "songs/A1.mp3" ,
        artist: "Ariana Grande",
        image: "songs/ariana.jpeg"
    },

    {
        name: " favorite ",
        link: "songs/I2.mp3" ,
        artist: "Isabel LaRosa",
        image: "songs/ısabel.jpg"
    },


    {
        name: "ceilings ",
        link: "songs/L3.mp3" ,
        artist: "Lizzy McAlpine",
        image: "songs/liz.jpeg"
    },


    {
        name: "Lunchbox Friends ",
        link: "songs/M4.mp3" ,
        artist: "Melanie Martinez",
        image: "songs/melanie.jpeg"
    },



    {
        name: "Vampire ",
        link: "songs/O5.mp3" ,
        artist: "Olivia Rodrigo",
        image: "songs/olivia.jpg"
    },


    {
        name: "Peasant's Throne ",
        link: "songs/lil6.mp3" ,
        artist: "Lilith Max",
        image: "songs/max.jpg"
    }


]


// sarkı atama 


const setSong = (arrayIndex) =>{

    let {name, link, artist, image} = songsList[arrayIndex]


    
    audio.src=link
    songName.innerHTML= name
    songArtist.innerText=artist
    songImage.src= image


    //süreyi sonra düzenle 
   audio.onloadeddata=()=>{
    
     maxDuration.innerText=timeFormatter(audio.duration)
     
   }


      playAudio()


      playListContainer.classList.add("hide")
}


//loop butonu

repeatButton.addEventListener("click",()=>{
    if(repeatButton.classList.contains("active")){
      repeatButton.classList.remove("active")
      audio.loop=false
    }else{
        repeatButton.classList.add("active")
        audio.loop=true
    }
})

// shuffle Butonu 
shuffleButton.addEventListener("click",()=>{
    if(shuffleButton.classList.contains("active")){
        shuffleButton.classList.remove("active")
      loop=false
    }else{
        shuffleButton.classList.add("active")
        loop=true
    }
})


//sarkıyı oynat
const playAudio = ()=>{

    audio.play()
    playButton.classList.add("hide")
    pauseButton.classList.remove("hide")

}

//sarkıyı durdur
const pauseAudio=() =>{
    audio.pause()

    playButton.classList.remove("hide")
    pauseButton.classList.add("hide")

}
// sonraki sarkı

const nextSong =() =>{
    if(loop){
        if(index==(songsList.length-1)){
            index=0
        }else{
            index=index+1
        }
        setSong(index)
    }else{
        const randIndex=Math.floor(Math.random()*songsList.length)
        setSong(randIndex)
    }
}
/// sarkı bittiginde
audio.onended =() =>{
    nextSong()
}
///zaman formatter

const timeFormatter= (timeInput)=>{
  let minute = Math.floor(timeInput/60)
  minute= minute <10 ? "0"+ minute : minute
  let second= Math.floor(timeInput % 60)
  second= second <10 ? "0"+ second :second
  return `${minute}.${second}`
}

//onceki sarkı

const previousSong = ()=>{
 pauseAudio()
    if(index>0){
        index=index-1
    }else{
        index=songsList.length-1
    }

    setSong(index)
}

//zaman tutucu 
progressBar.addEventListener("click",(event)=>{
    let coordStart=progressBar.getBoundingClientRect().left
    let coorEnd=event.clientX
    let progress= (coorEnd-coordStart)/progressBar.offsetWidth
    currentProgress.style.width=progress* 100 +"%"
    audio.currentTime= progress*audio.duration

    playAudio()

})


// playListSongs
const initPlayList=()=>{
    for (const i in songsList) {
        playListSongs.innerHTML+=`<li class="playlistSong" onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details " >
        <span id="playlist-song-name "> ${songsList[i].name}   
        </span>
        <span id="playlist-song-artist-album" >  ${songsList[i].artist} 
        </span>
        </div>
        </li>`
    
    }
}

playListButton.addEventListener("click",()=>{
    playListContainer.classList.remove("hide")
})
closeButton.addEventListener("click",()=>{
    playListContainer.classList.add("hide")
})

//zaman tutucu

setInterval(()=>{
    currentProgress.style.width=(audio.currentTime/audio.duration.toFixed(3))*100 +"%"
},1000);




//currentime

audio.addEventListener("timeupdate",()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//play butonu
playButton.addEventListener("click",playAudio)
//pause butonu
pauseButton.addEventListener("click",pauseAudio)


//sonraki buton
nextButton.addEventListener("click",nextSong)

//onceki buton

prevButton.addEventListener("click",previousSong)

window.onload=()=>{
    index=0
    setSong(index)
    pauseAudio()
   initPlayList()
}





