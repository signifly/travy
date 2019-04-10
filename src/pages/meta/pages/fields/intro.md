# Introduction

## props

Every field takes `propsValue` and `propsData` from `@/components/field.vue`, and every field have an example response (`meta.res`) documenting the field behavior.

A simple component could look like this:

``` js
meta: {
	res: {
		props: {
			value: "value_key"
		},
		data: {
			value_key: "some value"
		}
	}
},
props: {
	value: {type: [String, Number], required: false, doc: true},
	_value: {type: String, required: true}
}
```

props without `_` are mapped to the data object, while props with `_` will just give you the prop value. So in this case, `value` is `some value` and `_value` is `value_key`.

We need to know `_value` so we can update `some value` on the correct property (`value_key`) in our parent data object.

if `{doc: true}` that prop will be documented on the `/meta/fields` page.


## update

Here's how we'll update our text on change:

``` js
methods: {
	update(value) {
		this.$emit("event", {
			action: "update",
			data: {[this._value]: value}
		});
	}
}
```

The update method gets a new `value` and emits a new data object which contains the data we want to change.


## nodata

on views we need to know on some fields if they're filled out or not. If that's needed, we make a computed property called `nodata`.

``` js
data() {
	return {
		data: {
			value: this.value
		}
	}
},
computed: {
	nodata: (t) => !t.data.value
}
```

our parent `@/components/field.vue` will use this and pass it up to the view.
