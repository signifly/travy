<template>
	<transition name="filter">
		<div class="filter" v-if="loaded">
			<div class="items">
				<a class="item" :class="{active: selected === 'all'}" @click="selected = 'all'">
					<div class="name">All</div>
				</a>

				<a class="item" v-for="item in types" :class="{active: selected === item.id}" @click="selected = item.id">
					<div class="name">{{item.name}}</div>
				</a>
			</div>
		</div>
	</transition>
</template>

<script>
import {sortBy} from "lodash";

export default {
	props: {
		items: {type: Array, required: true},
		loaded: {type: Boolean, required: true},
		type: {type: [String, Number], required: true}
	},
	computed: {
		selected: {
			get() {
				return this.type;
			},
			set(type) {
				this.$emit("update:type", type);
			}
		},
		types() {
			const types = this.items.reduce((obj, {type}) => ({...obj, [type.id]: type}), {});
			return sortBy(Object.values(types), "id");
		}
	}
};
</script>

<style lang="scss" scoped>
.filter {
	position: absolute;
	right: 1.5em;
	top: 6em;
	background-color: $white1;
	font-size: 0.8em;
	box-shadow: 0 4px 6px 0 rgba(94,109,130,0.2);

	.items {
		.item {
			display: flex;
			align-items: center;
			padding: 1em;
			transition: cubic(background-color, 0.1s);

			&.active {
				background: $blue2;
			}
		}
	}

	$t: 0.2s;

	&-enter-active, &-leave-active {
		transition: cubic(opacity, $t), cubic(transform, $t);
		transition-delay: 1s;
	}
	&-enter, &-leave-to {
		opacity: 0;
		transform: translateX(10px) scale(0.98);
	}
}
</style>
