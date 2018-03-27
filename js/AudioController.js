class AudioController {
    constructor(Player){
        this.player = Player;
        this.runInterval = undefined;
        this.currentRotation = 0;
        this.isMuted  = false;
        this.colors = {};
        this.volume = 80;
        this.hideTimeout = undefined;
        this.currentTime = 0;
        this.setEvetns();
    }
    markDOM(){
        this.playBtn = document.querySelector('#play');
        this.previousBtn = document.querySelector('#previous');
        this.nextBtn = document.querySelector('#next');
        this.timeControl = document.querySelector('#timeControl');
        this.volumeBtn = document.querySelector('#vol-button');
        this.volumeControl = document.querySelector('#volumeControl');
        this.title = document.querySelector('#title');
        this.underCover = document.querySelector('.undercover');
        this.timeElapsedDOM = document.querySelector('.time--elapsed');
        this.timeLengthDOM = document.querySelector('.time--tracklength');
        this.progressBar = document.querySelector('.time__progress-bar--elapsed');
        this.timeControlWrapper = document.querySelector('.timeControlWrapper');
    }
    setEvetns(){
        this.markDOM();
        console.log(this.progressBar)
        this.playBtn.onclick = () => {
            this.play();
        };
        this.volumeControl.addEventListener('change', ()=>{
            this.setVolume(this.volumeControl.value);
            this.player.currentVolume = this.volumeControl.value;
        });
        this.volumeControl.addEventListener("mouseenter", () => {
            console.log('xD', this.hideTimeout);
            clearTimeout(this.hideTimeout);
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
        this.volumeBtn.onclick = () => {
            this.volumeOnClick();
        };
        this.timeControlWrapper.addEventListener('mouseenter', ()=> {
            this.timeControl.classList.add('timeControlHovered');
        });
        this.timeControlWrapper.addEventListener('mouseleave', ()=> {
            this.timeControl.classList.remove('timeControlHovered');
        });

    }
    setSongLength(len){
        this.timeLengthDOM.innerHTML = Utils.convertSecToDisplayTime(len);
    }
    setElapsedTime(time){
        this.timeElapsedDOM.innerHTML = Utils.convertSecToDisplayTime(time);
    }
    volumeOnClick(){
        if (this.isMuted) {this.unmute();}
        else {this.mute()};
    }
    rotateCarousel(e) {
        if (e === "next") {this.currentRotation -= 60;}
        if (e == "previous") {this.currentRotation += 60;}
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
            this.startUpdateInterval();
        }
        else {
            this.player.pause();
            this.playBtn.innerHTML = `<i class="fas fa-play"></i>`
            this.setEvetns();
            clearInterval(this.runInterval)
        }
    }
    startUpdateInterval(){
        this.runInterval = setInterval(()=>{
            this.timeControl.value = Number(this.timeControl.value) + 1;
            this.currentTime = this.timeControl.value;
            this.setElapsedTime(this.currentTime);
            let percentage = Number(this.timeControl.value) / this.player.songDuration;
            let width = percentage * 750 + 10;
            this.progressBar.style.width = `${width.toString()}px`;
            if(this.currentTime >= this.player.songDuration) {
                this.player.nextSong();
            }
        }, 1000);
    }
    setVolume(volume){
        this.volume = volume;
        this.player.sound.volume(volume/100)
    }
    mute(){
        this.isMuted = true;
        this.volumeBtn.innerHTML = '<div class="volumeWrapper"> <i id="vol-button" class="fas fa-volume-up"></i> <input class="volumeControl" id="volumeControl" value="0" type="range" /> </div>';
        this.setVolume(0);
        this.setEvetns();
    }
    unmute(){
        this.isMuted = false;
        this.volumeBtn.innerHTML = '<div class="volumeWrapper"> <i id="vol-button" class="fas fa-volume-off"></i> <input class="volumeControl" id="volumeControl" value="0" type="range" /> </div>';
        this.setVolume(this.volume);
        this.setEvetns();
    }
    setGradientBG(){
        const img = document.createElement('img');
        img.setAttribute('src', this.underCover.src)
        img.addEventListener('load', () => {
            const vibrant = new Vibrant(img);
            let swatches = vibrant.swatches()
            for (let swatch in swatches)
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
            this.progressBar.style.background = this.colors.vibrant;
            document.body.style.background = `-webkit-linear-gradient(left, ${this.colors.vibrant}, ${this.colors.darkVibrant}, ${this.colors.vibrant})`
        });


    }
}
