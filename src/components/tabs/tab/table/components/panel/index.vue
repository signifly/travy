<template>
	<div class="panel">
		<transition name="el-zoom-in-bottom">
			<vPanel v-if="selected.items.length > 0">
				<selected
					:selectedOptions="batch.selectedOptions"
					v-if="batch.selectedOptions"
					v-bind="{selected}"
				/>

				<div class="items">
					<div class="item">
						<move
							v-bind="{endpoint, selected, meta, sort}"
							@event="event"
							v-if="meta"
						/>
					</div>
					<div class="item">
						<bulk
							v-bind="[batch.bulk, {selected}]"
							v-if="batch.bulk"
							@event="event"
						/>
					</div>
					<div class="item">
						<sequential
							v-bind="[batch.sequential, {selected}]"
							v-if="batch.sequential"
						/>
					</div>
				</div>
			</vPanel>
		</transition>
	</div>
</template>

<script>
import vPanel from "@/components/panel";
import sequential from "./sequential";
import selected from "./selected";
import move from "./move";
import bulk from "./bulk";

export default {
	components: {vPanel, sequential, selected, bulk, move},
	props: {
		endpoint: {type: Object, required: true},
		selected: {type: Object, required: true},
		batch: {type: Object, required: true},
		meta: {type: Object, required: false},
		sort: {type: Object, required: false}
	},
	methods: {
		event(event) {
			this.$emit("event", event);
		}
	}
};
</script>

<style lang="scss" scoped>
.panel {
	position: relative;

	.items {
		display: flex;

		.item {
			margin-left: 0.5em;
		}
	}
}
</style>
