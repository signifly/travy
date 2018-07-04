import store from "@/store";

export default ({title}) => {
	const siteTitle = store.getters["config/title"];
	document.title = title ? `${title} - ${siteTitle}` : siteTitle;
};
