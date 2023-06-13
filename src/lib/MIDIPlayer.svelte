<!--
    @component
    This is a simple implementation of a midiplayer, to try playback from the MEI encoded music notation. See [the npm page](https://www.npmjs.com/package/midi-player-js) for more.

    Currently it is capable of decoding the string into MIDIjs, but it needs another library to play it. [See this example](https://github.com/grimmdude/MidiPlayerJS/blob/master/demo/js/app.js) for a case using (soundfont-player)[https://github.com/danigb/soundfont-player] -- this has, however, been deprecated, and they recommend using [smplr](https://github.com/danigb/smplr) which is a lot more powerful than `MIDIPlayerSimple` but that will take some considerable dev time to get working.

    props:
        `midiFile`: a midi file encoded as a base64 string exported from Verovio, excluding the header `data:audio/midi;base64,`
    usage:
        `<MIDIPlayer midiFile = {midiString}/>`
    
-->

<script>
    import MidiPlayer from 'midi-player-js';

    export let midiFile = undefined;

    var Player = new MidiPlayer.Player(function(event) {
        console.log(event);
    });

    let buffer = base64ToBuffer(midiFile);

    Player.loadArrayBuffer(buffer);
    Player.play();


    function base64ToBuffer (string) {
        var binary = atob(string);
        var buffer = new ArrayBuffer(binary.length);
        var bytes = new Uint8Array(buffer);
        for (var i = 0; i < buffer.byteLength; i++) {
            bytes[i] = binary.charCodeAt(i) & 0xFF;
        }
        return buffer;
    }
</script>