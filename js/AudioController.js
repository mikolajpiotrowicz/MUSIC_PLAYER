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
        this.colors = {};
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
        };
        this.nextBtn.onclick = () => {
            this.player.nextSong();
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
        this.setGradientBG();


    }
    play(){
        if(!this.player.isPlaying){
            this.player.play();
            this.playBtn.innerHTML = `<i class="fas fa-pause"></i>`
            this.setEvetns();
            this.runInterval = setInterval(()=>{
                this.timeControl.value = Number(this.timeControl.value) + 1;
                this.currentTime = this.timeControl.value;
                if(this.currentTime >= this.player.songDuration) {
                    this.player.nextSong();
                }
            }, 1000);
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
    setGradientBG(){
        const img = document.createElement('img');
        img.setAttribute('src', this.underCover.src)

        img.addEventListener('load', () => {
            const vibrant = new Vibrant(img);
            let swatches = vibrant.swatches()
            for (var swatch in swatches)
                if (swatches.hasOwnProperty(swatch) && swatches[swatch])
                    switch (swatch) {
                        case 'Vibrant': {
                            this.colors.vibrant = swatches[swatch].getHex();
                            break;
                        }
                        case 'Muted': {
                            this.colors.muted = swatches[swatch].getHex();
                            break;
                        }
                        case 'DarkVibrant': {
                            this.colors.darkVibrant = swatches[swatch].getHex();
                            break;
                        }
                        case 'DarkMuted': {
                            this.colors.darkMuted = swatches[swatch].getHex();
                            break;
                        }
                        case 'LightVibrant': {
                            this.colors.lightVibrant = swatches[swatch].getHex();
                            break;
                        }
                        default: {
                            break;
                        }
            }
            console.log(`-webkit-linear-gradient(left, ${this.colors.vibrant}, ${this.colors.darkVibrant}, ${this.colors.vibrant})`, this.colors);
            document.body.style.background = `-webkit-linear-gradient(left, ${this.colors.vibrant}, ${this.colors.darkVibrant}, ${this.colors.vibrant})`
        });


    }
}
