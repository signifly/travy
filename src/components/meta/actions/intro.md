# Introduction

Actions exist on:
- Tables
- Views
- vActions field
- vButtonAction field


## Properties for all actions

```
{
	props: {},
	hide: {
		key: "data_key",
		operator: "eq",
		value: 1
	}
}

```

- **Props**<br>
	props for the action
- **hide**<br>
	- hides action if true: maps key to data and runs lodash operator with mapped key and value.
	- operators: eq, gt, gte, lt, lte
