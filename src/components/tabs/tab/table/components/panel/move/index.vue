<template>
	<transition name="el-fade-in">
		<div class="move" v-if="sort && sort.move">
			<Popover
				placement="top"
				width="300"
				ref="popover"
				transition="trans-fadeUp"
			>
				<popover
					v-bind="{endpoint, selected, meta}"
					@event="$emit('event', $event)"
					@close="close"
				/>

				<Button size="medium" slot="reference">
					<div class="button">
						{{ $translate({en: "Move", da: "Flyt"}) }}
						<div class="icon" v-html="require('@/assets/icons/move.svg')" />
					</div>
				</Button>
			</Popover>
		</div>
	</transition>
</template>

<script>
import {Popover, Button} from "element-ui";
import popover from "./popover";

export default {
	components: {popover, Popover, Button},
	props: {
		endpoint: {type: Object, required: true},
		selected: {type: Object, required: true},
		sort: {type: Object, required: false},
		meta: {type: Object, required: true}
	},
	methods: {
		close() {
			this.$refs.popover.showPopper = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.move {
	display: flex;
	align-items: center;

	.button {
		display: flex;
		align-items: center;

		.icon {
			display: flex;
			position: relative;
			margin-left: 0.5em;
			margin-right: -0.2em;
			width: 1.1em;

			::v-deep svg {
				position: absolute;
				padding-top: 1px;
				margin: auto;
				width: 100%;
				bottom: 0;
				top: 0;
			}
		}
	}
}
</style>
