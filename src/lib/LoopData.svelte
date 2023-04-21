<script>
    let cats = [
        { id: "J---aiyznGQ", name: "Keyboard Cat" },
        { id: "z_AbfPXTKms", name: "Maru" },
        { id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
    ];
</script>

<h1>Famous cats of youtube</h1>
<ul>
    {#each cats as cat, i}
        <li>
            <a
                target="_blank"
                href="https://www.youtube.com/watch?v={cat.id}"
                rel="noreferrer"
            >
                {i+1}: {cat.name}
            </a>
        </li>
    {/each}
</ul>
