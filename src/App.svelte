<script lang="ts">
	import jsons from './emoji.json'
	let generator_disable = false
	const LENGTH_OF_EMOJI_JSON = jsons["all_emoji"].length
	const genRandom = (min:number, max:number):number => {
		return Math.floor(Math.random() * (max - min + 1)+min)
	}
	let canvas: HTMLCanvasElement
	let x:number = 0
	let y:number = 0
	let COLOR_EGG_SHELL = "#800080"
	let COLOR_BACKGROUND = "#808080" // nice grey
	let COLOR_EGG_COLOR = "#F4A460" // sandy brown
	const sleep = ms => new Promise(r => setTimeout(r, ms));
	const drawing_egg_ring = () => {
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
	const egg_fill = () => {
		const ctx:CanvasRenderingContext2D = canvas.getContext('2d')
		ctx.beginPath()
		ctx.rect(0,0,500,520)
		ctx.fillStyle = COLOR_EGG_COLOR
		ctx.fill()
	}
	const generator = async () => {
		x = 0
		y = 0
		const ctx:CanvasRenderingContext2D = canvas.getContext('2d')
		egg_fill()
		// create special effect
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
			ctx.strokeText(strings, x, y+index*70)
		}
		ctx.restore()
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
		drawing_egg_ring()
	}
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
			<br>
			<span>Egg Color: </span>
			<input type="color" name="" id="" bind:value={COLOR_EGG_COLOR}>
			<br>
			<span>Egg Shell Color: </span>
			<input type="color" name="" id="" bind:value={COLOR_EGG_SHELL}>
			<br>
			<span>Background Color: </span>
			<input type="color" name="" id="" bind:value={COLOR_BACKGROUND}>
			<br>
			<button on:click={generator} >generate</button>
		</div>
	</div>
</main>

<style>
@media (max-width: 600px){
	.container {
		grid-template-columns: auto !important;
		grid-template-rows: auto auto;
	}
	.editorcontainer {
		margin: 2px !important;
	}
}
.container {
	display: grid;
	grid-template-columns: auto auto;
}
.editorcontainer {
	margin: 10px;
}
canvas{
	border: 3px solid red;
}
</style>