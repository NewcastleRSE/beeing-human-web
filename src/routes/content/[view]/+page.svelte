<script>
    export let data;
    console.log(data);
</script>

<h1>View page</h1>
<h1>{data.view.title}</h1>
<div>
    {@html data.view.content}
</div>