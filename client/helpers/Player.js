import isNode from 'detect-node';

export default class Player {
    constructor(url){
        if(isNode) { return; }
        this.ac = new ( window.AudioContext || webkitAudioContext )();
        this.url = url;
        this.fetch();
    }

    fetch() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.url, true);
        console.log('fetching ');
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            console.log('loaded');
            console.log(xhr.response)
            this.decode(xhr.response);
        }.bind(this);
        xhr.send();
    }
    decode(arrayBuffer){
        console.log(arrayBuffer)
        this.ac.decodeAudioData(arrayBuffer, function( audioBuffer ) {
            console.log(audioBuffer)
            this.buffer = audioBuffer;
            this.play();
        }.bind(this));
    }
    connect(){

        if ( this.playing ) {
            this.pause();
        }
        this.source = this.ac.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.ac.destination);
    }
    play(){
        this.connect();
        this.position = typeof position === 'number' ? position : this.position || 0;
        this.startTime = this.ac.currentTime - ( this.position || 0 );
        this.source.start(this.ac.currentTime, this.position);
        this.playing = true;
    }
    pause(){

        if ( this.source ) {
            this.source.stop(0);
            this.source = null;
            this.position = this.ac.currentTime - this.startTime;
            this.playing = false;
        }
    }
    toggle(){
        if ( !this.playing ) {
            this.play();
        }
        else {
            this.pause();
        }
    }
    seek(time){
        if ( this.playing ) {
            this.play(time);
        }
        else {
            this.position = time;
        }
    }

}



