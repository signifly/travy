<template>
	<div class="modifiers">
		<div class="item" v-for="(item, index) in itemsMap">
			<div class="title">{{item.title}}</div>
			<vSelect v-bind="item" _value="value" @fieldA="fieldA({index}, $event)" />
		</div>
		</div>
	</div>
</template>

<script>
import {mapValues, keyBy, get} from "lodash";
import {vSelect} from "@/components/fields";

export default {
	components: {vSelect},
	props: {
		modifiers: {type: Array, required: true}
	},
	data() {
		return {
			items: this.modifiers
		}
	},
	computed: {
		query: (t) => t.$route.query,

		itemsMap: (t) => t.items.map(x => ({...x,
			value: get(t.query, `modifiers.${x.key}`) || x.value,
			list: x.options,
			_options: {
				label: "label",
				value: "value"
			}
		}))
	},
	methods: {
		fieldA({index}, {data}) {
			this.$set(this.items[index], "value", data.value);
			this.update();
		},
		update() {
			const modifiers = mapValues(keyBy(this.items, "key"), (x) => x.value);
			this.$router.replace({query: {...this.query, modifiers}});
			this.$emit("getData", {type: "modifiers"});
		}
	}
};
</script>

<style lang="scss" scoped>
.modifiers {
	display: flex;

	.item {
		display: flex;
		align-items: center;
		margin-left: 2em;

		.title {
			margin-right: 1em;
			font-size: em(14);
		}
	}
}
</style>
