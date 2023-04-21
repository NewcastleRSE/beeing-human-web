<script>
    let x = 11;
</script>

{#if x > 10}
    <p>{x} is greater than 10</p>
{:else}
    {#if 5 > x}
        <p>{x} is less than 5</p>
    {:else}
        <p>{x} is betweeen 5 and 10</p>
    {/if}
{/if}