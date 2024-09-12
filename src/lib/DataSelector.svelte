<script>
    import { RadioGroup, RadioItem, SlideToggle } from "@skeletonlabs/skeleton";
    let radioValue = 0;
    let slideValue = false;
</script>

<form
    class="flex flex-row w-full bg-primary-400 justify-between content-center px-12 py-10"
>
    <select
        name="data-source"
        id="data-source-select"
        class="select text-3xl bg-transparent border-none rounded-lg pr-16 max-w-fit font-pfdisplay hover:font-bold hover:cursor-pointer transition-all ease-in-out duration-200 motion-reduce:transition-none"
    >
        <option value="source 1">data source 1</option>
        <option value="source 2">data source 2</option>
        <option value="source 3">data source 3</option>
    </select>

    <div class="flex gap-10 content-center gap-32">
        <div class="flex flex-col gap-2 font-light text-sm">
            <label for="radio-group" class="font-light text-sm pl-4"
                >Label</label
            >
            <RadioGroup
                class="h-fit self-center text-white"
                background="bg-secondary-500"
                active="bg-secondary-100 text-black"
                hover="hover:bg-secondary-400 transition-all ease-in-out duration-300 motion-reduce:transition-none"
                name="radio-group"
            >
                <RadioItem bind:group={radioValue} name="btn1" value={0}
                    >Option 1</RadioItem
                >
                <RadioItem bind:group={radioValue} name="btn2" value={1}
                    >Option 2</RadioItem
                >
                <RadioItem bind:group={radioValue} name="btn3" value={2}
                    >Option 3</RadioItem
                >
            </RadioGroup>
        </div>

        <div class="flex flex-col gap-2 font-light text-sm min-w-32 justify-center">
            <label for="slide" class="font-light text-sm pl-2">Label</label>
            <SlideToggle name="slide" bind:checked={slideValue} size="lg" background="bg-secondary-500" active="bg-secondary-100"
                >{!slideValue ? "off" : "on"}</SlideToggle
            >
        </div>
    </div>
</form>
