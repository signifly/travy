<template>
	<div class="filters">
		<search
			v-if="search"
			v-bind="[search, {loading, active, fields}]"
			@event="event"
		>
			<Popover
				popper-class="pop"
				v-model="active"
				ref="pop"
				placement="bottom-end"
				width="300"
				transition="trans-fadeDown"
			>
				<div class="pop">
					<div class="fields">
						<field
							v-for="field in fields"
							:key="field.name"
							v-bind="field"
							:alt="{data: filters}"
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

				<Button slot="reference" icon="el-icon-tickets">
					Filter
				</Button>
			</Popover>
		</search>
	</div>
</template>

<script>
import {mapPaths, mergeData} from "@/modules/utils";
import {Button, Popover} from "element-ui";
import {pickBy, debounce} from "lodash";
import field from "@/components/field";
import state from "../../state";
import search from "./search";

export default {
	components: {search, Button, Popover, field},
	props: {
		data: {type: Object, default: () => ({})},
		loading: {type: Boolean, required: true},
		default: {type: String, required: false},
		search: {type: Object, required: false},
		fields: {type: Array, required: false}
	},
	data() {
		return {
			state,
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
				let data = mapPaths(update.data);

				data = mergeData(this.filters, data);

				// remove empty properties
				data = pickBy(data);

				// remove filters query if empty
				data = Object.entries(data).length === 0 ? undefined : data;

				this.state.mergeQuery({
					type: "replace",
					query: {page: undefined, filters: data}
				});

				this.$emit("update:loading", true);
				this.reload();
			}
		},

		async reset() {
			this.state.mergeQuery({
				type: "replace",
				query: {filters: this.data}
			});

			this.active = false;
			this.$emit("getData");
		}
	}
};
</script>

<style lang="scss" scoped>
.pop {
	margin-top: -1.5em;
	padding: 0.75em;

	.reset {
		margin-top: 1.5em;
	}
}
</style>
