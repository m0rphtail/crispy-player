// helper functions here, named exports

/*!
 * Automatically expand a textarea as the user types
 * @param  {Node} field The textarea
 */
const autoExpand = (field: HTMLElement): void => {

	field.style.height = 'inherit';
	let computed = window.getComputedStyle(field);

	let height =
		parseFloat(computed.paddingTop) +
		field.scrollHeight +
		parseFloat(computed.paddingBottom);

	field.style.height = height + 'px';
}

/*!
 * generate random 6 digit hex color
 * @returns  {string} color hex value
 */
const getRandomColor = (): string => Math.floor(Math.random()*16777215).toString(16)


export {
    autoExpand,
    getRandomColor
}