<script>
    let user = {loggedIn: false};
    
    function toggle() {
        user.loggedIn = !user.loggedIn;
    }
</script>

{#if user.loggedIn}
    <button on:click={toggle}>Log Out</button>
{:else}
    <button on:click={toggle}>
        Log In
    </button>
{/if}