import isNode from 'detect-node';

class Player {
    constructor(){
        if(isNode) { return; }
        this.url = 'http://localhost:3900/download?id=evil.mp3';
        this.sound = document.createElement('audio');
        this.sound.src = this.url;
        this.playing = false;
        this.setEvents();

    }
    setSource(url){
        this.url = url;
    }
    setEvents(){
        this.sound.addEventListener('timeupdate',() => {
            if(this.timeupdateCb) this.timeupdateCb();
        });
        this.sound.addEventListener('canplay',() => {
            if(this.oncanplayCb) this.oncanplayCb();
            console.log('canplay event')
            this.play();
        });
        this.sound.addEventListener('loadedmetadata',() => {
            console.log('loadmetadata')
            this.sound.currentTime = 0;
        });
    }

    play(){
        this.sound.play();
        this.playing = true;
    }

    pause(){
        this.sound.pause(0);
        this.playing = false;
    }

    toggle(){
        if ( !this.playing ) {
            this.play();
        }
        else {
            this.pause();
        }
    }
    setVolume(volume){
        this.sound.volume = volume;
    }
    seek(time){
       this.sound.currentTime = time;
       this.sound.play();
    }

}
const player = new Player();
export default player;