export default () => {
	const canvas = document.createElement("canvas");
	canvas.height = 64;
	canvas.width = 64;

	const ctx = canvas.getContext("2d");
	ctx.font = "60px serif"; // size
	ctx.fillText("💠", 0, 58); // align y

	const favicon = document.createElement("link");
	favicon.setAttribute("type", "image/png");
	favicon.setAttribute("rel", "icon");
	favicon.setAttribute("href", canvas.toDataURL());

	document.querySelector("head").appendChild(favicon);
};
