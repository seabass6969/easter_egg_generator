import { writable } from "svelte/store";
//@ts-ignore
import { fill_style } from "./styles.d.ts";

export const selection = writable(fill_style.color_fill)
export const menuCollapse = writable(true)