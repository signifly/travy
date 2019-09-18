import {
	mapValues,
	mergeWith,
	replace,
	get,
	set,
	lte,
	gte,
	lt,
	gt,
	eq
} from "lodash";

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
		reader.onerror = (error) => reject(error);
	});
};

export const download = ({url, name}) => {
	const link = document.createElement("a");
	link.download = true;
	link.href = url;

	if (name) {
		link.setAttribute("download", name);
	}

	document.body.appendChild(link);
	link.click();
	link.remove();
};

export const translate = (locales) => {
	const {default: store} = require("@/store");
	const locale = store.getters["config/locale"];
	return locales[locale] || locales.en;
};

export const operator = ({key, value, operator, data}) => {
	operator = {eq, gt, gte, lt, lte}[operator];
	key = get(data, key);
	return operator(key, value);
};

export const mergeData = (srcData, newData) => {
	// merge objects deep, but ignore arrays
	return mergeWith({}, srcData, newData, (oldValue, newValue) => {
		if (Array.isArray(newValue)) {
			return newValue;
		}
	});
};

export const rStringProps = ({data, val}) => {
	const reg = (str) => {
		// find all {KEY} in string and replace with data value
		return replace(str, /\{.*?\}/g, (key) => get(data, key.slice(1, -1), key));
	};

	if (val instanceof Object) {
		return mapValues(val, (val) => {
			return rStringProps({data, val});
		});
	}

	if (typeof val === "string") {
		return reg(val);
	}

	return val;
};

export const mapProps = ({props, data}) => {
	return mapValues(props, (val, key) => {
		if (Array.isArray(val)) {
			return val.map((props) => {
				if (key.startsWith("_")) {
					return rStringProps({data, val: props});
				} else {
					return mapProps({props, data});
				}
			});
		}

		if (val instanceof Object) {
			const scope = val["@scope"];

			if (scope) {
				const items = get(data, scope, []);

				return items.map((item) =>
					mapProps({
						props: val,
						data: {...item, $root: data}
					})
				);
			}

			if (!key.startsWith("_")) {
				return mapProps({props: val, data});
			}
		}

		if (key.startsWith("_")) {
			return rStringProps({data, val});
		}

		if (key.startsWith("@")) {
			return val;
		}

		if (val === "$root") {
			return data;
		}

		return get(data, val);
	});
};

export const mapPaths = (data) => {
	// {"key1.key2": 1} ===> {key1: {key2: 1}}
	return Object.entries(data).reduce(
		(obj, [key, val]) => set(obj, key, val),
		{}
	);
};
