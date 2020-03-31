import {
	mergeWith,
	replace,
	unset,
	omit,
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

export const mapPaths = (data) => {
	// {"key1.key2": 1} ===> {key1: {key2: 1}}
	return Object.entries(data).reduce(
		(obj, [key, val]) => set(obj, key, val),
		{}
	);
};

export const transProps = ({data, val}) => {
	if (Array.isArray(val)) {
		return val.map((val) => transProps({data, val}));
	}

	if (val instanceof Object) {
		const scope = val["@scope"];

		if (scope) {
			const items = get(data, scope, []);
			return items.map((x) =>
				transProps({
					data: {...x, $parent: data},
					val: omit(val, "@scope")
				})
			);
		}

		return Object.fromEntries(
			Object.entries(val).map(([key, val]) => {
				return [key, transProps({val, data})];
			})
		);
	}

	if (typeof val === "string") {
		// value is "{key}"
		const map = !!val.match(/^{[^{]+}$/g);

		if (map) {
			const [, key] = /\{(.*?)\}/g.exec(val);
			return transProps({data, val: get(data, key)});
		} else {
			return replace(val, /\{.*?\}/g, (key) =>
				transProps({data, val: get(data, key.slice(1, -1), key)})
			);
		}
	}

	return val;
};

export const operator = ({data, ...val}) => {
	const {key, value, operator} = transProps({data, val});
	const _in = (src, value) => src.includes(value);
	const neq = (src, value) => src !== value;

	const op = {eq, gt, gte, lt, lte, neq, in: _in}[operator];
	return op(key, value);
};
