import {
	mapValues,
	mergeWith,
	replace,
	unset,
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

export const translate = (locales) => {
	const {default: store} = require("@/store");
	const config = store.getters["config/data"];
	return locales[config.locale] || locales.en;
};

export const operator = ({key, value, operator, data}) => {
	const op = {eq, gt, gte, lt, lte}[operator];
	return op(get(data, key), value);
};

export const mergeData = (srcData, newData) => {
	// merge objects deep, but ignore arrays
	return mergeWith({}, srcData, newData, (oldValue, newValue, key, obj) => {
		if (Array.isArray(newValue)) {
			return newValue;
		}

		// overwrite if value is undefined
		if (newValue === undefined) {
			unset(obj, key);
		}
	});
};

export const rStringProps = ({data, val}) => {
	const reg = (str) => {
		// find all {KEY} in string and replace with data value
		return replace(str, /\{.*?\}/g, (key) => get(data, key.slice(1, -1), key));
	};

	if (Array.isArray(val)) {
		return val.map((val) => rStringProps({data, val}));
	}

	if (val instanceof Object) {
		return mapValues(val, (val) => rStringProps({data, val}));
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
