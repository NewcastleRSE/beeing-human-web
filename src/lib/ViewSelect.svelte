<script>
    import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';

    import {view} from '../stores/viewChoice'

</script>

<RadioGroup>
    <RadioItem bind:group={$view} name='viewGroup' value={'literature'}>Literature</RadioItem>
    <RadioItem bind:group={$view} name='viewGroup' value={'science'}>Science</RadioItem>
    <RadioItem bind:group={$view} name='viewGroup' value={'music'}>Music</RadioItem>
    <RadioItem bind:group={$view} name='viewGroup' value={'interdisciplinarity'}>Interdisciplinarity</RadioItem>
</RadioGroup>
