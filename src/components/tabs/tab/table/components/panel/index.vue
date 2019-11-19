<template>
	<div class="batch">
		<transition name="el-zoom-in-bottom">
			<panel v-if="selected.items.length > 0">
				<selected
					v-bind="{selected}"
					@unselect="unselect"
					v-if="batch.selectedOptions"
					:selectedOptions="batch.selectedOptions"
				/>

				<div class="items">
					<div class="item">
						<move v-bind="{sort}" />
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
			</panel>
		</transition>
	</div>
</template>

<script>
import panel from "@/components/panel";
import sequential from "./sequential";
import selected from "./selected";
import move from "./move";
import bulk from "./bulk";

export default {
	components: {panel, sequential, selected, bulk, move},
	props: {
		selected: {type: Object, required: true},
		batch: {type: Object, required: true},
		sort: {type: Object, required: true}
	},
	methods: {
		unselect() {
			this.$emit("unselect");
		},

		event(event) {
			this.unselect();
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
