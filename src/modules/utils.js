import {get, replace, transform, isObject} from "lodash";

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


export const rStringProps = ({data, val = ""}) => {
	// find all {KEY} in string and replace with data value
	return replace(val, /\{.*?\}/g, (key) => get(data, key.slice(1, -1), key));
};


export const rStringPropsDeep = ({data, obj}) => {
	if (!obj) return;

	const parse = (item) => transform(item, (res, val, key) => {
		if (isObject(val)) {
			res[key] = parse(val);
		} else {
			res[key] = rStringProps({data, val});
		}
	});

	return parse(obj);
};


export const meta = {
	items: "$meta/items"
};
