<script>
</script>

<div class="cell-container">
    <div class="hexagon flex justify-center items-center bg-black opacity-50">
        <p class="size-fit">TEXT</p>
    </div>
</div>

<style>
    .hexagon {
        position: absolute;
        top: 4px; /*equals the size of the border*/
        left: 4px; /*equals the size of the border*/
        width: 138px; /*original dimensions*/
        height: 122px; /*original dimensions*/
        clip-path: url('hexagon-cell.svg#hexagon-cell');
        -webkit-clip-path: url('hexagon-cell.svg#hexagon-cell');
        background: url("https://picsum.photos/200");
    }

    .cell-container{
        position: relative;
        background: theme('colors.primary.600');
        width: 146px; /*equals original dimensions plus 2*border size*/
        height: 130px; /*equals original dimensions plus 2*border size*/
        clip-path: url('hexagon-cell.svg#hexagon-cell');
    }
</style>
