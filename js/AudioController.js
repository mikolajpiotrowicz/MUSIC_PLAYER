class AudioController {
    constructor(Player){
        this.player = Player;
        this.pauseBtn = undefined;
        this.playBtn = document.querySelector('#play');
        this.previousBtn = document.querySelector('#previous');
        this.nextBtn = document.querySelector('#next');
        this.timeControl = document.querySelector('#timeControl');
        this.volumeControl = document.querySelector('#volumeControl');
        this.title = document.querySelector('#title');
        this.underCover = document.querySelector('.undercover')
        this.runInterval = undefined;
        this.currentRotation = 0;
    }
    setEvetns(){
        this.playBtn.onclick = () => {
            this.play();
        };
        this.volumeControl.addEventListener('change', ()=>{
            this.setVolume(this.volumeControl.value)
        });
        this.previousBtn.onclick = () => {
            this.player.previousSong();
            this.rotateCarousel('previous');
        };
        this.nextBtn.onclick = () => {
            this.player.nextSong();
            this.rotateCarousel('next');
        };
        this.timeControl.addEventListener('change', ()=> {
            this.player.sound.seek(this.timeControl.value)
        });

    }
    rotateCarousel(e) {
        if (e === "next") {
            this.currentRotation -= 60;
        }
        if (e == "previous") {
            this.currentRotation += 60;
        }
        const carousel = document.querySelector('.carousel');
        carousel.style.webkitTransform = "rotateY(" + this.currentRotation + "deg)";
        carousel.style.transform = "rotateY(" + this.currentRotation + "deg)";
    }
    setBackground(){
        let musicPath = this.player.sound._src;
        musicPath = musicPath.replace('music', 'images/covers');
        musicPath = musicPath.replace('mp3', 'jpg');
        console.log(musicPath);
        this.underCover.src = musicPath;

    }
    play(){
        if(!this.player.isPlaying){
            this.player.play();
            this.playBtn.innerHTML = `<i class="fas fa-pause"></i>`
            this.setEvetns();
            this.runInterval = setInterval(()=>{this.timeControl.value = Number(this.timeControl.value) + 1;}, 1000)
        }
        else {
            this.player.pause();
            this.playBtn.innerHTML = `<i class="fas fa-play"></i>`
            this.setEvetns();
            clearInterval(this.runInterval)
        }
    }
    setVolume(volume){
        this.player.sound.volume(volume/100)
    }
}
