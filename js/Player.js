class Player {
    constructor(){
        this.sound = undefined;
        this.ID3 = undefined;
        this.isPlaying = false;
        this.controller = new AudioController(this);
        this.controller.setEvetns(this);
        this.songNumber = 0;
        this.songDuration = undefined;
        this.currentVolume = undefined;
        this.songs = [
            '../music/aceventura.mp3',
            '../music/adhea.mp3',
            '../music/astrix.mp3',
            '../music/freetibet.mp3',
            '../music/infected.mp3',
            '../music/merkaba.mp3'
        ];
        this.currentVolume = this.controller.volumeControl.value;

        this.loadSong();
    }
    loadSong(){
        this.sound = new Howl({
            src: [this.songs[this.songNumber]]
        });
        this.setID3();
        this.sound.on('load', () => {
            console.log(Math.floor(this.sound._duration), this.sound._duration, this.sound)
            this.controller.timeControl.max = Math.floor(this.sound._duration);
            this.songDuration = Math.floor(this.sound._duration);
            this.controller.setSongLength(Math.floor(this.sound._duration));
            this.controller.play();
        });
        this.controller.setBackground();

       // this.displaySongID3();
    }
    setID3(name){
        id3(this.songs[this.songNumber], (err, tags) => {
            this.ID3 = tags.v1;
        });
    }
    displaySongID3(){
        this.controller.title.innerHTML = `${this.ID3.artist} - ${this.ID3.track}`;
    }
    play(){
        this.sound.seek(this.controller.timeControl.value)
        this.sound.play();
        this.isPlaying = true;
    }
    pause(){
        this.sound.stop();
        this.isPlaying = false;
    }

    nextSong(){
        if(this.songNumber < 5){
            this.songNumber++
        }
        if(this.songNumber >= 5){
            this.songNumber = 0;
        }
        this.pause();
        this.sound.unload();

        clearInterval(this.controller.runInterval);
        this.controller.timeControl.value = 0;
        this.loadSong(this.songs[this.songNumber]);
        this.controller.rotateCarousel('next');
    }
    previousSong(){
        if(this.songNumber === 0){
            this.songNumber = 5;
        } else {
            this.songNumber--;
        }
        this.controller.pause
        this.sound.unload();
        this.controller.timeControl.value = 0;
        clearInterval(this.controller.runInterval);
        this.loadSong(this.songs[this.songNumber]);
        this.controller.rotateCarousel('previous');
    }
}