<!--
    @component
    This is a simple implementation of a midiplayer, to try playback from the MEI encoded music notation. See [the npm page](https://www.npmjs.com/package/midi-player-js) for more.
    
-->

<script>
    import MidiPlayer from 'midi-player-js';

    export let midiFile = undefined;

    var Player = new MidiPlayer.Player(function(event) {
        console.log(event);
    });

    Player.loadArrayBuffer(midiFile);
    Player.play();
</script>