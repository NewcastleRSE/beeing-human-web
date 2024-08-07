<script>
</script>

<div class="cell-container">
    <div class="hexagon flex justify-center items-center bg-black">
        <p class="size-fit text-white">TEXT</p>
    </div>
</div>

<style>
    .hexagon {
        position: absolute;
        top: 4px; /*equals the size of the border*/
        left: 4px; /*equals the size of the border*/
        width: 138px; /*original dimensions*/
        height: 122px; /*original dimensions*/
        -webkit-clip-path: url('assets/hexagon-cell.svg#hexagon-cell');
        clip-path: url('assets/hexagon-cell.svg#hexagon-cell');
        background: linear-gradient(rgba(14,27,31,0.4), rgba(14,27,31,0.4)),
        url("https://picsum.photos/200");
        -webkit-transition: all 3s ease;
        -moz-transition: all 3s ease;
        -o-transition: all 3s ease;
        transition: all 3s ease;
    }

    .hexagon:hover {
        background: linear-gradient(rgba(14,27,31,0.9), rgba(14,27,31,0.9)), url("https://picsum.photos/200");

    }

    .cell-container {
        position: relative;
        background: theme('colors.primary.600');
        width: 146px; /*equals original dimensions plus 2*border size*/
        height: 130px; /*equals original dimensions plus 2*border size*/
        clip-path: url('assets/hexagon-cell.svg#hexagon-cell');
    }
</style>
