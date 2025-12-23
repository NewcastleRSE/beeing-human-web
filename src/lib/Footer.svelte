<script>
    let version = __APP_VERSION__;
    let buildDate = new Date(__BUILD_DATE__);

    let dateString = $derived.by(() => {
        return `${buildDate.getFullYear()}.${(buildDate.getMonth() + 1).toString()
            .padStart(2, "0")}.${buildDate.getDate().toString().padStart(2, "0")}`
    });
</script>

<footer class="w-full  mt-12 mb-6 py-6 text-center md:text-sm text-xs text-secondary-300">
    <p>Beeing Human, v. {version}</p>
    <p>{dateString}</p>
</footer>