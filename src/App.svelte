<script lang="ts">
	import { onMount } from 'svelte';
	import Options from './components/Options.svelte';
	import Checkbox from './components/Checkbox.svelte';
	import Select from './components/Select.svelte';
	import jsons from './emoji.json'
	import { selection } from './libs/stores';
	//@ts-ignore
	import { fill_style } from './libs/styles.d.ts';
	let egg_fill_style:fill_style = fill_style.color_fill
	selection.subscribe(value => {
		egg_fill_style = value
	})
	const LENGTH_OF_EMOJI_JSON = jsons["all_emoji"].length
	const genRandom = (min:number, max:number):number => {
		return Math.floor(Math.random() * (max - min + 1)+min)
	}
	interface rectProp {ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string}
	const create_rectangle = (rect: rectProp) => {
		rect.ctx.beginPath()
		rect.ctx.rect(rect.x,rect.y,rect.w,rect.h)
		rect.ctx.fillStyle = rect.color
		rect.ctx.fill()
	}
	let canvas: HTMLCanvasElement
	let x:number = 0
	let y:number = 0
	let COLOR_EGG_SHELL = "#800080"
	let COLOR_BACKGROUND = "#808080" // nice grey
	let COLOR_EGG_COLOR = "#F4A460" // sandy brown
	let WITH_EMOJI = true
	let resultEmoji = []
	const sleep = ms => new Promise(r => setTimeout(r, ms));
	const drawEggRing = () => {
		const ctx:CanvasRenderingContext2D = canvas.getContext('2d')
		ctx.save()
		ctx.strokeStyle = COLOR_EGG_SHELL
		ctx.scale(3.25, 4);
		ctx.beginPath();
		ctx.arc(78, 65, 500 / 8.5, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath();
		ctx.restore()
	}
	const drawEggFilling = () => {
		const ctx:CanvasRenderingContext2D = canvas.getContext('2d')
		if (egg_fill_style == fill_style.color_fill) {
			ctx.beginPath()
			ctx.rect(0,0,500,520)
			ctx.fillStyle = COLOR_EGG_COLOR
			ctx.fill()
		} else if (egg_fill_style == fill_style.england_flag){
			create_rectangle({ctx: ctx, x: 0, y: 0, w: 500, h: 520, color: "white" })
			create_rectangle({ctx: ctx, x: 0, y: 200, w: 500, h: 50, color: "#cf081f" })
			create_rectangle({ctx: ctx, x: 230, y: 0, w: 50, h: 500, color: "#cf081f" })
		} else if (egg_fill_style == fill_style.scottish_flag){
			ctx.save()
			ctx.translate(230,-70)
			ctx.rotate((Math.PI / 180) * 45)
			create_rectangle({ctx: ctx, x: 0, y: 0, w: 500, h: 520, color: "#005eb9" })
			create_rectangle({ctx: ctx, x: 0, y: 200, w: 500, h: 50, color: "white" })
			create_rectangle({ctx: ctx, x: 230, y: 0, w: 50, h: 500, color: "white" })
			ctx.restore()
		}
	}
	const drawText = (ctx: CanvasRenderingContext2D) => {
		resultEmoji = []
		ctx.save()
		ctx.translate(500/4,0)
		ctx.rotate((Math.PI / 180) * 30)
		for (let index = 0; index < 30; index++) {
			ctx.font = "48px serif"
			let strings = ""
			for (let index = 0; index < 10; index++) {
				let emoji_gened:string
				try {
					emoji_gened = jsons["all_emoji"][genRandom(0,LENGTH_OF_EMOJI_JSON)]["emoji"]
				} catch (error) {
					emoji_gened = "😅"
				}
				strings = strings + "   " + emoji_gened
			}
			resultEmoji.push(strings)
			ctx.strokeText(strings, x, y+index*70)
		}
		ctx.restore()
	}
	const generator = async () => {
		x = 0
		y = 0
		const ctx:CanvasRenderingContext2D = canvas.getContext('2d')
		drawEggFilling()
		// create special effect
		if(WITH_EMOJI == true){
			drawText(ctx)
		}
		// filling background color
		for (let index = 0; index < 8.5; index = index + 0.01) {
			ctx.save()
			ctx.strokeStyle = COLOR_BACKGROUND
			ctx.scale(3.25, 4);
			ctx.beginPath();
			ctx.arc(78, 65, 500 / index, 0, Math.PI*2, false);
			ctx.stroke();
			ctx.closePath();
			ctx.restore()
		}
		drawEggRing()
	}
	const save = () => {
		let img = canvas.toDataURL()
		const link = document.createElement('a')
		link.href = img
		link.download = "image.png"
		link.click()
	}
	onMount(()=> {
		generator()
	})
</script>

<main>
	<div class="container">
		<div class="canvascontainer">
			<canvas 
				bind:this={canvas}
				width="500"
				height="520">
			</canvas>
		</div>
		<div class="editorcontainer">
			<Select>
				<div slot="option">
					<Options src="/pattern/Color_fill.png" value={fill_style.color_fill}>Color Fill</Options>
					<Options src="/pattern/England_flag.png" value={fill_style.england_flag}>England Flag</Options>
					<Options src="/pattern/Scottish_flag.png" value={fill_style.scottish_flag}>Scottish Flag</Options>
				</div>
			</Select> 
			<br>
			<!-- <span>Fill Style: </span>
			<select name="" id="" bind:value={egg_fill_style}>
				<option value={fill_style.color_fill} selected>Color fill</option>
				<option value={fill_style.england_flag}>England Flag</option>
				<option value={fill_style.scottish_flag}>Scottish Flag</option>
			</select>
			<br> -->
			<div class="colorchange">
				{#if egg_fill_style==fill_style.color_fill}
				<span class="label">Egg Color: </span>
				<div class="gap"></div>
				<input type="color" name="" id="" bind:value={COLOR_EGG_COLOR}>
				{/if}
				<span class="label">Egg Shell Color: </span>
				<div class="gap"></div>
				<input type="color" name="" id="" bind:value={COLOR_EGG_SHELL}>

				<span class="label">Background Color: </span>
				<div class="gap"></div>
				<input type="color" name="" id="" bind:value={COLOR_BACKGROUND}>

				<span class="label">With Emoji: </span>
				<div class="gap"></div>
				<Checkbox bind:checked={WITH_EMOJI}/>
			</div>
			<button on:click={save} class="save">
			<span class="material-symbols-outlined menutick">save</span>
				save
			</button>
			<br>
			<button on:click={generator} class="generate">generate</button>
		</div>
	</div>
</main>

<style>
.container {
	display: grid;
	grid-template-columns: auto auto;
}
.editorcontainer {
	margin: 10px;
	width: 100%;
}
.colorchange {
	display: grid;
	grid-template-columns: 70% 5% 25%;
}
canvas{
	border: 3px solid coral;
	width: calc(50vw *0.85);
	height: calc(52vw *0.85);
}
.save{
	border-color: cornflowerblue;
	background-color: coral;
	color: black;
	border-style: solid;
	margin-top: 3px;
	padding: 2px;
	width: 70%;
	font-size: x-large;
	border-radius: 10px;
	animation: forwards 500ms generateclose;
	align-items: center;
	justify-content: center;
}
	.save:hover{
		animation: forwards 500ms generateopen;
    }
.generate {
	border-color: coral;
	background-color: cornflowerblue;
	color: black;
	border-style: solid;
	margin-top: 3px;
	padding: 2px;
	width: 70%;
	font-size: x-large;
	border-radius: 10px;
	animation: forwards 500ms generateclose;
}
	.generate:hover{
		animation: forwards 500ms generateopen;
    }
    @keyframes generateopen{
        0%{
            border-radius: 10px;
        }
        100%{
            border-radius: 0px;
        }
    }
    @keyframes generateclose{
        0%{
            border-radius: 0px;
        }
        100%{
            border-radius: 10px;
        }
    }
.label {
	display: block;
	margin-top: auto;
	font-size: 1.2rem;
}
@media (max-width: 810px){
	.container {
		grid-template-columns: auto !important;
		grid-template-rows: auto auto;
		justify-items: center;
		align-items: center;
	}
	.editorcontainer {
		margin: 2px !important;
		width: 90%;
	}
	canvas {
		width: calc(50vw *1.2) !important;
		height: calc(52vw *1.2) !important;
	}
	.colorchange {
		grid-template-columns: 80% 0% 20%;
	}
	.save{
		font-size: large;
	}
	.generate{
		font-size: large;
	}
	.label{
		font-size: 1rem;
	}
}
</style>
