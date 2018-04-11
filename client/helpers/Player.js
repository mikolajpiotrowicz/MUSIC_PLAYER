import isNode from 'detect-node';
import Playlist from './Playlist';
class Player {
    constructor(){
        if(isNode) { return; }
        this.sound = document.createElement('audio');
        this.playing = false;
        this.setEvents();

    }
    setSrc(track){
        this.url = `http://localhost:3900/download?id=music/Albums/${track.albumName}/${track.trackName}`;
        this.sound.src = this.url;

        return track;
    }
    setEvents(){

        this.sound.addEventListener('timeupdate',() => {
            if(this.timeupdateCb) this.timeupdateCb();
        });
        this.sound.addEventListener('canplay',() => {
            if(this.oncanplayCb) this.oncanplayCb();
            this.play();
        });
        this.sound.addEventListener('loadedmetadata',() => {
            console.log('loadmetadata')
            this.sound.currentTime = 0;
        });
        this.sound.addEventListener('ended',() => {
            console.log("KYURWA");
            Playlist.next();
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