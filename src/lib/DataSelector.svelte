<script>
    import {RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
    let radioValue = 0;
</script>

<form class="flex flex-row w-full bg-primary-400 justify-between content-center px-12 py-10">
    <select name="data-source" id="data-source-select" class="select text-3xl bg-transparent border-none rounded-lg pr-16 max-w-fit font-pfdisplay hover:font-bold hover:cursor-pointer transition-all ease-in-out duration-200 motion-reduce:transition-none">
        <option value="source 1">data source 1</option>
        <option value="source 2">data source 2</option>
        <option value="source 3">data source 3</option>
    </select>
    <RadioGroup class="h-fit self-center text-white" background="bg-secondary-500" active="bg-secondary-100 text-black" hover="hover:bg-secondary-400 transition-all ease-in-out duration-300 motion-reduce:transition-none">
        <RadioItem bind:group={radioValue} name="btn1" value={0}>Option 1</RadioItem>
        <RadioItem bind:group={radioValue} name="btn2" value={1}>Option 2</RadioItem>
        <RadioItem bind:group={radioValue} name="btn3" value={2}>Option 3</RadioItem>
    </RadioGroup>
</form>