<template>
	<div class="batch">
		<transition name="el-zoom-in-bottom">
			<panel v-if="selectedItems.length > 0">
				<selected v-bind="{selectedItems, selectedOptions}" @unselect="unselect"/>

				<div class="actions">
					<div class="item">
						<sequential v-if="sequential" v-bind="[sequential, {selectedItems, ids}]"/>
					</div>

					<div class="item">
						<bulk v-if="bulk" v-bind="[bulk, {ids}]" @fieldA="fieldA"/>
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
		selectedItems: {type: Array, required: true},
		sequential: {type: Object, required: false},
		bulk: {type: Object, required: false},
	},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		ids: (t) => t.selectedItems.map(x => x.id)
	},
	methods: {
		unselect() {
			this.$emit("unselect");
		},

		fieldA(obj) {
			this.unselect();
			this.$emit("fieldA", obj);
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
