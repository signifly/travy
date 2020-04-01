<template>
	<div class="traffic-switch">
		<div
			@mouseleave="hover = false"
			@mouseover="hover = true"
			:style="{fontSize: size}"
			class="color"
		>
			<dot v-bind="[item, {size}]" />

			<transition name="selector">
				<div class="selector" v-if="hover">
					<a
						v-for="item in items"
						@click="update(item)"
						:key="item.value"
						class="circle"
					>
						<dot v-bind="[item, {size}]" />
					</a>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import dot from "./dot";

export default {
	components: {dot},
	meta: {
		spec: {
			value: {type: [String, Number, Boolean], required: true},
			size: {type: String, default: "32px"},
			items: {
				type: Array,
				required: true,
				children: {
					color: {type: [String, Number, Boolean], required: true},
					icon: {type: String, required: false}
				}
			}
		},
		res: {
			props: {
				value: "{value}",
				items: [
					{value: 1, color: "lightgreen", icon: "check"},
					{value: 2, color: "lightblue", icon: "eleme"},
					{value: 3, color: "red", icon: "close"},
					{value: 4, color: "pink"}
				]
			},
			data: {
				value: 1
			}
		}
	},
	props: {
		items: {type: Array, required: true},
		size: {type: String, default: "32px"},
		value: {type: [String, Number, Boolean], required: true}
	},
	data: () => ({
		hover: false
	}),
	computed: {
		item: (t) => t.items.find((x) => x.value === t.value)
	},
	methods: {
		update({value}) {
			this.hover = false;

			this.$emit("event", {
				actions: {
					update: {data: {value}}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.traffic-switch {
	.color {
		display: inline-block;
		position: relative;

		.selector {
			$p: 0.19em;

			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
			background-color: $black1;
			background-color: #1f2d3d;
			border-radius: 2em;
			position: absolute;
			display: flex;
			padding: $p;
			right: -$p;
			top: -$p;

			&-enter-active,
			&-leave-active {
				transition: cubic(opacity, 0.05s);
			}

			&-enter,
			&-leave-to {
				opacity: 0;
			}

			.circle {
				margin: 0 4px;

				&:first-child {
					margin-left: 0;
				}
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
}
</style>
