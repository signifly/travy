export default ({title}) => {
	if (title) {
		document.title = `${title} - Sikane`;
	} else {
		document.title = "Sikane";
	}
};
