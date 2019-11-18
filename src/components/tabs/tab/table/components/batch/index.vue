<template>
	<div class="batch">
		<transition name="el-zoom-in-bottom">
			<panel v-if="selected.items.length > 0">
				<selected
					@unselect="unselect"
					v-if="selectedOptions"
					v-bind="{selected, selectedOptions}"
				/>

				<div class="actions">
					<div class="item">
						<sequential v-if="sequential" v-bind="[sequential, {selected}]" />
					</div>

					<div class="item">
						<bulk v-if="bulk" v-bind="[bulk, {selected}]" @event="event" />
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
import bulk from "./bulk";

export default {
	components: {panel, sequential, selected, bulk},
	props: {
		selectedOptions: {type: Object, required: false},
		sequential: {type: Object, required: false},
		selected: {type: Object, required: true},
		bulk: {type: Object, required: false}
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

	.actions {
		display: flex;
		.item {
			margin-left: 0.5em;
		}
	}
}
</style>
