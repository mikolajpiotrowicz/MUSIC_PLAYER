import requestJSON from "./requestJSON";
import Player from './Player';
class Playlist {
    constructor(){
        this.url = '/getdirectory/playlist';
        this.recived = undefined;
        this.currentSong = undefined;
        this.fetch();
        this.drawSong();
        this.setTitleCb = undefined;
        this.rotateCarousel = undefined;
    }

    async fetch(){
        this.recived = await requestJSON({pathname: '/getdirectory/playlist'});
        this.drawSong(this.recived);
    }

    drawSong(albums){
        if(!albums) return;
        albums = albums.albums;
        const albumNumber = Math.floor(Math.random() * albums.length);
        const albumTracks = albums[albumNumber].tracks;
        const trackNumber = Math.floor(Math.random() * albumTracks.length);
        this.currentSong = {
            albumNumber,
            trackNumber,
            trackName: albums[albumNumber].tracks[trackNumber],
            albumName: albums[albumNumber].albumName
        }
        this.setTitleCb(Player.setSrc(this.currentSong));

    }

    next() {
        if (!this.currentSong) return;
        console.log(this.currentSong, 'before');
        const trackCount = this.recived.albums[this.currentSong.albumNumber].tracks.length - 1;
        let trackNumber = trackCount > this.currentSong.trackNumber ?  ++this.currentSong.trackNumber : 0;
        this.currentSong = {
            albumNumber: this.currentSong.albumNumber,
            trackNumber,
            trackName:  this.recived.albums[this.currentSong.albumNumber].tracks[trackNumber],
            albumName: this.recived.albums[this.currentSong.albumNumber].albumName
        };
        console.log(this.currentSong, 'after');
        this.setTitleCb(Player.setSrc(this.currentSong));
        this.rotateCarousel('next');
    }

    previous(){
        if (!this.currentSong) return;
        console.log(this.currentSong, 'before');
        const trackCount = this.recived.albums[this.currentSong.albumNumber].tracks.length - 1;
        let trackNumber =  0 < this.currentSong.trackNumber ?  --this.currentSong.trackNumber : trackCount - 1;
        this.currentSong = {
            albumNumber: this.currentSong.albumNumber,
            trackNumber,
            trackName:  this.recived.albums[this.currentSong.albumNumber].tracks[trackNumber],
            albumName: this.recived.albums[this.currentSong.albumNumber].albumName
        };
        console.log(this.currentSong, 'after');
        this.setTitleCb(Player.setSrc(this.currentSong));
        this.rotateCarousel('previous');
    }
}

const playlist = new Playlist();
export default playlist;