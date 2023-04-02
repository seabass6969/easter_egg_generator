<script>
    export let src
</script>

<button class="menuitem">
    <img class="menuimage" src={src} alt="">
    <span class="menutext">
        <slot></slot>
    </span>
    <span class="material-symbols-outlined menutick">check_box</span>
</button>
<style>
    .menuitem {
        display: grid;
        grid-template-columns: 30% 50% 20%;
        border-color: aqua;
        border-style: solid;
        margin-top: 3px;
        width: 100%;
    }
    .menuimage {
        width: 60px;
    }
    .menutext {
        font-size: 1.1rem;
        display: block;
        margin-top: auto;
        margin-bottom: auto;
    }
    .menutick{
        font-size: 2rem;
        display: block;
        margin-top: auto;
        margin-bottom: auto;
    }

</style>