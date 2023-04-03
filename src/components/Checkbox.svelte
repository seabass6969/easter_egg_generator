<script lang="ts">
    export let checked:boolean
    function checking(){
        if(checked == true){
            checked = false
        }else if(checked == false){
            checked = true
        }
    }
</script>
<button class="checkbox" on:click={checking}>
    {#if checked == true}
    <span class="material-symbols-outlined menutick">check_box</span>
    {:else}
    <span class="material-symbols-outlined menutick"> check_box_outline_blank </span>
    {/if}
</button>

<style>
    .checkbox {
        border-style: solid;
        border-width: 0px;
        background-color: transparent;
    }
</style>