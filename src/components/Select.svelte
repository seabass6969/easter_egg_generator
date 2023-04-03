<script>
	import { menuCollapse } from "../libs/stores";


    let opened = false
    menuCollapse.subscribe(value => {
        opened = value
    })
    function opening(){
        if(opened == false){
            menuCollapse.set(true)
        }else if(opened == true){
            menuCollapse.set(false)
        }
    }
</script>
<button class="menubtn" on:click={opening}>
    <div class="menubar">
    <span class="fillstyle">Fill Style</span>
    {#if opened == false}
        <span class="material-symbols-outlined arrow"> arrow_drop_down </span>
    {:else}
        <span class="material-symbols-outlined arrow"> arrow_drop_up </span>
    {/if}
    </div>
</button>
{#if opened == true}
<div class="menu">
    <div></div>
    <slot name="option">
    </slot>
    <div></div>
</div>
{/if}
<style>
    .menu {
        display: grid;
        grid-template-columns: 5% 90% 5%;
    }
    .menubar {
        display: grid;
        grid-template-columns: 80% 20%;
    }
    .menubtn {
        width: 100%;
        border-style: solid;
        border-radius: none;
        border-color: aliceblue;
        margin: 1px;
        border-radius: 10px;
        animation: forwards 500ms hovermenuclose;
    }
    .menubtn:hover{
        animation: forwards 500ms hovermenuopen;
    }
    @keyframes hovermenuclose {
        0%{
            border-radius: 0px;
        }
        100%{
            border-radius: 10px;
        }
    }
    @keyframes hovermenuopen {
        0%{
            border-radius: 10px;
        }
        100%{
            border-radius: 0px;
        }
    }
    .fillstyle {
        font-size: large;
    }
    .arrow {
        font-size: 2rem;
        display: block;
        margin-top: auto;
        margin-bottom: auto;
    }

    @media (max-width: 810px){
        .menu {
            grid-template-columns: 1% 98% 1%;
        }
    }
</style>