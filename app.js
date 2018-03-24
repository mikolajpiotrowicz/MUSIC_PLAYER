class MyPlayer {
    constructor(){
        this.sound = undefined;
        this.ID3 = undefined;
        this.isPlaying = false;
        this.controller = new AudioController(this);
        this.controller.setEvetns(this);

    }
    loadSong(name){
        this.sound = new Howl({
            src: [name]
        });
        console.log(this.sound)
        this.setID3(name);
        this.displaySongID3();
    }
    setID3(name){
        id3(name, (err, tags) => {
            this.ID3 = tags.v1
        });
    }
    displaySongID3(){

    }
    play(){
        console.log(this.controller)
        this.sound.seek(this.controller.timeControl.value)
        this.sound.play();
        this.isPlaying = true;
    }
    pause(){
        this.sound.stop();
        this.isPlaying = false;
    }
    next(){

    }
    previous(){

    }
}
class AudioController {
    constructor(Player){
        console.log("KONSTRUCT")
        this.player = Player;
        this.pauseBtn = undefined;
        this.playBtn = document.querySelector('#play');
        this.previousBtn = document.querySelector('#previous');
        this.nextBtn = document.querySelector('#next');
        this.timeControl = document.querySelector('#timeControl');
        this.volumeControl = document.querySelector('#volumeControl');
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
            console.log('next')
            this.rotateCarousel('previous');
        };
        this.nextBtn.onclick = () => {
            console.log('previous')
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

    play(){
        console.log(this.player.isPlaying)
        if(!this.player.isPlaying){
            this.player.play();
            this.playBtn.innerHTML = `<i class="fas fa-pause"></i>`
            this.setEvetns();
            this.runInterval = setInterval(()=>{console.log(this.timeControl.value);this.timeControl.value = Number(this.timeControl.value) + 1;}, 1000)
        }
        else {
            this.player.pause();
            this.playBtn.innerHTML = `<i class="fas fa-play"></i>`
            this.setEvetns();
            clearInterval(this.runInterval)
        }
    }
    setVolume(volume){
        console.log(volume);
        this.player.sound.volume(volume/100)
    }
}
const Player = new MyPlayer();
Player.loadSong('evil.mp3');

