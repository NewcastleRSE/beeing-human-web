<script>
    export let section;
    import SectionSelectDropdown from '$lib/SectionSelectDropdown.svelte';
    
    let popup = false;
    
    let toggleMenu = () => {
        popup = !popup
        if (popup) {
            document.addEventListener('click', handleClickOutside);
        } else if (!popup) {
            document.removeEventListener('click', handleClickOutside);
        }
    }

    let handleClickOutside = (event) => {
        console.log(event.target)
        if (event.target != document.getElementById('section-selector')) {
            toggleMenu();
        }
    };
</script>

<button class="flex group gap-2 md:gap-2 p-2 pl-0 md:min-w-80" on:click|stopPropagation={toggleMenu}>
    <svg class="w-10 md:w-14 self-start md:self-center stroke-secondary-500 group-hover:stroke-2  transition-all ease-in-out duration-300 motion-reduce:transition-none" viewBox="0 0 53 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.3545 20.7991L30.645 20.7991L34.7903 27.9444L30.646 35.088L22.3555 35.088L18.2103 27.9426L22.3545 20.7991Z" stroke="#264653"/>
        <path d="M36.5439 13.1497L44.8345 13.1497L48.9797 20.295L44.8355 27.4386L36.545 27.4386L32.3997 20.2932L36.5439 13.1497Z" stroke="#264653"/>
        <path d="M22.3545 4.91211L30.645 4.91211L34.7903 12.0575L30.646 19.201L22.3555 19.201L18.2103 12.0557L22.3545 4.91211Z" stroke="#264653"/>
        <path d="M8.16479 13.1497L16.4553 13.1497L20.6006 20.295L16.4563 27.4386L8.16584 27.4386L4.02058 20.2932L8.16479 13.1497Z" stroke="#264653"/>
    </svg>
    <div  id="section-selector" class="text-2xl self-center md:text-4xl text-secondary-500 font-thin group-hover:font-medium transition-all ease-in-out delay-50 duration-200 motion-reduce:transition-none">
        {#if !popup}
            {section}
        {:else if popup}
            <SectionSelectDropdown {section}/>
        {/if}
        </div>
</button>