<template>
	<div class="items">
		<div class="wrap">
			<template v-if="data.length">
				<item
					@itemRead="$emit('itemRead', $event)"
					v-for="item in items"
					:key="item.id"
					v-bind="item"
				/>
			</template>

			<div class="noitems" v-else>
				No notifications
			</div>
		</div>
	</div>
</template>

<script>
import item from "./item";

export default {
	components: {item},
	props: {
		meta: {type: Object, required: false},
		data: {type: Array, required: true}
	},
	computed: {
		items() {
			return this.data.filter(
				(val, i, arr) => arr.findIndex((x) => x.id === val.id) === i
			);
		}
	},
	methods: {
		scroll({target}) {
			if (target.scrollTop + 200 >= target.scrollHeight - target.offsetHeight) {
				if (this.meta.current_page < this.meta.last_page) {
					this.$emit("getItems", {page: this.meta.current_page + 1});
				}
			}
		}
	},
	mounted() {
		this.$el.addEventListener("scroll", this.scroll);
	},
	beforeDestroy() {
		this.$el.removeEventListener("scroll", this.scroll);
	}
};
</script>

<style lang="scss" scoped>
.items {
	overflow: auto;
	max-height: calc(100vh - 15em);

	.wrap {
		max-height: 600px;

		.noitems {
			display: flex;
			justify-content: center;
			margin: 2em 0;
			font-size: 1em;
			font-weight: 500;
		}
	}
}
</style>
