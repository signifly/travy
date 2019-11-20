<template>
	<div class="batch">
		<transition name="el-zoom-in-bottom">
			<vPanel v-if="selected.items.length > 0">
				<selected
					v-bind="{selected}"
					v-if="batch.selectedOptions"
					:selectedOptions="batch.selectedOptions"
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
						<sequential
							v-if="batch.sequential"
							v-bind="[batch.sequential, {selected}]"
						/>
					</div>

					<div class="item">
						<bulk
							@event="event"
							v-if="batch.bulk"
							v-bind="[batch.bulk, {selected}]"
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
.batch {
	position: relative;

	.items {
		display: flex;

		.item {
			margin-left: 0.5em;
		}
	}
}
</style>
