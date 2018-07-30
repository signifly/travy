import {get} from "lodash";

export const date = (epoch) => {
	const d = new Date(epoch * 1000);

	const zero = (val) => ("0" + val).slice(-2);

	return {
		seconds: zero(d.getSeconds()),
		minutes: zero(d.getMinutes()),
		hours: zero(d.getHours()),
		day: zero(d.getDate()),
		month: zero(d.getMonth() + 1),
		year: d.getFullYear(),
		string: d.toLocaleDateString(),

		get sDate() {
			const t = this;
			return `${t.year}-${t.month}-${t.day}`;
		},

		get sTime() {
			const t = this;
			return `${t.hours}:${t.minutes}:${t.seconds}`;
		},

		get sDateTime() {
			const t = this;
			return `${t.sDate} ${t.sTime}`;
		}
	};
};


export const base64Encode = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
};


export const endpointUrl = ({url, data}) => {
	if (!url) return;

	if (!url.startsWith("http") && !url.startsWith("/")) url = `/${url}`;

	return url.split("/").map(item => {
		const start = item.indexOf("{");
		const end = item.indexOf("}");

		if (start === -1 && end === -1) return item;
		const key = item.substring(start + 1, end);
		return get(data, key);
	}).join("/");
};