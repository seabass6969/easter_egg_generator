<script lang="ts">
	import { menuCollapse, selection } from "../libs/stores";
    //@ts-ignore
	import type { fill_style } from "../libs/styles.d.ts";
    let checked:boolean = false
    let selections:string
    $: {
        if(selections == value){
            checked = true
        }else{
            checked = false
        }
    }
    export let src
    export let value: fill_style
    selection.subscribe(value => {
        selections = value
    })
    function menuclicked(){
        selection.set(value)
        menuCollapse.set(false)
    }
</script>

<button class="menuitem" on:click={menuclicked}>
    <img class="menuimage" src={src} alt="">
    <span class="menutext">
        <slot></slot>
    </span>
    {#if checked == true}
    <span class="material-symbols-outlined menutick">check_box</span>
    {:else}
    <span class="material-symbols-outlined menutick"> check_box_outline_blank </span>
    {/if}
</button>
<style>
    .menuitem {
        display: grid;
        grid-template-columns: 30% 50% 20%;
        border-color: aqua;
        border-style: solid;
        margin-top: 3px;
        width: 100%;
        border-radius: 10px;
        animation: forwards 500ms hovermenuitemopen;
    }
    .menuitem:hover {
        animation: forwards 500ms hovermenuitemclose;
    }
    @keyframes hovermenuitemclose {
        0%{
            border-radius: 10px;
        }
        100%{
            border-radius: 0px;
        }
    }
    @keyframes hovermenuitemopen {
        0%{
            border-radius: 0px;
        }
        100%{
            border-radius: 10px;
        }
    }
    .menuimage {
        width: 60px;
        border-radius: 10px;
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
    @media (max-width: 810px){
        .menuimage {
            width: 40px;
        }
        .menuitem {
            grid-template-columns: 30% 50% 20% !important;
        }
    }
</style>