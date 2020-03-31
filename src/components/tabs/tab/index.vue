<template>
	<div class="tab">
		<component
			v-bind="{definitions, parentData: data}"
			@edit="$emit('edit', $event)"
			:is="comp"
			ref="tab"
			:key="id"
		/>
	</div>
</template>

<script>
import Fields from "./fields";
import Table from "./table";

export default {
	components: {Fields, Table},
	props: {
		definitions: {type: Object, required: true},
		data: {type: Object, required: false},
		type: {type: String, required: true},
		id: {type: String, required: true}
	},
	computed: {
		comp() {
			return this.type.charAt(0).toUpperCase() + this.type.slice(1);
		}
	},
	methods: {
		async save() {
			return await (this.$refs.tab.save && this.$refs.tab.save());
		}
	}
};
</script>
