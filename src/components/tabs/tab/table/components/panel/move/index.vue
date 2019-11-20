<template>
	<transition name="el-fade-in">
		<div class="move" v-if="sort && sort.move">
			<Popover placement="top" width="300" ref="popover">
				<popover
					v-bind="{endpoint, selected, meta}"
					@event="$emit('event', $event)"
					@close="close"
				/>

				<Button size="medium" slot="reference">
					{{ $translate({en: "Move", da: "Flyt"}) }}
					<i class="el-icon-d-caret el-icon-right" />
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
}
</style>
