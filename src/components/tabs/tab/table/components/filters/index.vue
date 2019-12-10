<template>
	<div class="filters">
		<search
			v-bind="[search, {loading, active, fields, state}]"
			@event="event"
			v-if="search"
		/>
		<Popover
			transition="trans-fadeDown"
			placement="bottom-end"
			popper-class="pop"
			v-model="active"
			:width="width"
			v-if="fields"
			ref="pop"
		>
			<div class="pop">
				<div class="fields">
					<field
						v-for="field in fields"
						:key="field.attribute"
						v-bind="{field}"
						:data="filters"
						@event="event"
					/>
				</div>

				<div class="reset">
					<Button
						plain
						size="mini"
						type="info"
						icon="el-icon-refresh"
						@click="reset"
					>
						{{ $translate({en: "Reset", da: "Nulstil"}) }}
					</Button>
				</div>
			</div>

			<Button slot="reference" size="medium">
				Filter
				<i class="el-icon-right el-icon-caret-bottom" />
			</Button>
		</Popover>
	</div>
</template>

<script>
import {Button, Popover} from "element-ui";
import field from "@/components/field";
import {debounce} from "lodash";
import search from "./search";

export default {
	components: {search, Button, Popover, field},
	props: {
		data: {type: Object, default: () => ({})},
		loading: {type: Boolean, required: true},
		default: {type: String, required: false},
		search: {type: Object, required: false},
		fields: {type: Array, required: false},
		state: {type: Object, required: true},
		width: {type: Number, default: 300}
	},
	data() {
		return {
			active: false
		};
	},
	computed: {
		query: (t) => t.state.query,
		filters: (t) => t.query.filters
	},
	methods: {
		reload: debounce(function() {
			this.$emit("getData");
		}, 1000),

		async event({actions}) {
			const {update} = actions;

			if (update) {
				this.state.set({page: undefined, filters: update.data});
				this.$emit("update:loading", true);
				this.reload();
			}
		},

		async reset() {
			this.state.resetFilters();
			this.$emit("getData");
			this.active = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.filters {
	display: flex;
}

.pop {
	margin-top: -1.5em;
	padding: 1em 0.5em;

	.reset {
		margin-top: 1.5em;
	}
}
</style>
