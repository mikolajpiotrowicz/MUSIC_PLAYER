export class Utils {
    static convertSecToDisplayTime(sec){
        let mins = Math.floor(sec / 60);
        let secs = Math.floor(sec % 60);
        (secs < 10) ? secs =  '0' + secs : null;
        return `${mins}:${secs}`
    }
}

