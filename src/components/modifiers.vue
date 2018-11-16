<template>
	<div class="modifiers" :class="{loading}">
		<div class="item" v-for="(item, index) in itemsMap" :key="item.key">
			<div class="title">{{item.title}}</div>
			<vSelect v-bind="item" _value="value" :_clearable="false" @fieldA="fieldA({index}, $event)" />
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
			items: this.modifiers,
			loading: false
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
			this.loading = true;
			const modifiers = mapValues(keyBy(this.items, "key"), (x) => x.value);
			this.$router.replace({query: {...this.query, modifiers}});
			this.$emit("refreshAll", {
				done: () => this.loading = false
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.modifiers {
	display: flex;
	transition: cubic(opacity, 0.3s);

	&.loading {
		opacity: 0.2;
	}

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
