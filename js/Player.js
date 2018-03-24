import {AudioController} from "./AudioController";

export class Player {
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