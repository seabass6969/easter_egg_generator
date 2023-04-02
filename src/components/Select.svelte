<script>
    let opened = false
    function opening(){
        if(opened == false){
            opened = true
        }else if(opened == true){
            opened = false
        }
    }
</script>
    <button class="menubtn" on:click={opening}>
        <div class="menubar">
        <span>Fill Style</span>
        {#if opened == false}
            <span class="material-symbols-outlined"> arrow_drop_down </span>
        {:else}
            <span class="material-symbols-outlined"> arrow_drop_up </span>
        {/if}
        </div>
    </button>
{#if opened == true}
<div class="menu">
    <slot name="option">
    </slot>
</div>
{/if}
<style>
    .menu {
        display: grid;
        grid-template-columns: auto;
    }
    .menubar {
        display: grid;
        grid-template-columns: 90% 10%;
    }
    .menubtn {
        width: 100%;
        border-style: solid;
        border-radius: none;
        border-color: aliceblue;
        margin: 1px;
    }
</style>