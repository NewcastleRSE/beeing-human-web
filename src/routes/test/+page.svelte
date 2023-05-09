<script>
    import {view} from '../../stores/viewChoice';
    import { compile } from 'mdsvex';

    let modulePath = '../../content/' + $view + '/intro.md';
    console.log(modulePath);

    let introText = (async() => {
        await compile(`some *markup*`, mdsvexOptions)});

    // import(modulePath).then(obj => Intro);

    // import Intro from '../../content/interdisciplinarity/intro.md';
</script>

<h1>{$view}</h1>
<!-- <Intro/> -->
<p>{introText}</p>