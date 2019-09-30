<template>
	<div class="item">
		<div class="wrap">
			<h1 class="title" :id="id" :href="`#${id}`">{{ id }}</h1>

			<div class="props">
				<Table :data="propsTable" row-key="rowKey" size="small" stripe>
					<TableColumn prop="name" label="Name" />
					<TableColumn prop="typePretty" label="Type" />
					<TableColumn prop="required" label="Required" />
					<TableColumn prop="mapPretty" label="Map" />
					<TableColumn prop="default" label="Default" />
					<TableColumn label="Note" v-slot="{row}">
						<div class="note" v-html="row.note" />
					</TableColumn>
				</Table>
			</div>

			<div class="field-wrap">
				<field
					ref="field"
					:alt="{data, loading: false}"
					:name="id"
					:fieldType="fieldType"
					@event="event"
				/>
			</div>

			<div class="info">
				<div class="block props">
					<div class="title">Props</div>
					<pre>
						<code>{{propsDisplay}}</code>
					</pre>
				</div>

				<div class="block data" v-if="dataDisplay">
					<div class="title">Data</div>
					<pre>
						<code>{{dataDisplay}}</code>
					</pre>
				</div>

				<div class="block event" v-if="eventData">
					<div class="title">Event</div>
					<pre>
						<code>{{eventData}}</code>
					</pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {Table, TableColumn} from "element-ui";
import field from "@/components/field";

export default {
	components: {field, Table, TableColumn},
	props: {
		spec: {type: [String, Object], required: true},
		props: {type: Object, required: true},
		res: {type: Object, required: true},
		id: {type: String, required: true}
	},
	data() {
		return {
			propsDisplay: this.res.props,
			dataDisplay: this.res.data,
			data: this.res.data,
			eventData: null
		};
	},
	computed: {
		fieldType: (t) => ({id: t.id, props: t.res.props}),

		propsTable() {
			const spec = this.spec;
			let rowKey = 1;

			const mapProps = ({props = {}, map = true}) => {
				return Object.entries(props).map(([key, prop]) => ({
					...prop,
					get type() {
						return [prop.type]
							.flatMap((x) => x)
							.filter((x) => x)
							.map((x) => x.name);
					},
					get typePretty() {
						return this.type.join(" | ");
					},
					get default() {
						const def = () =>
							typeof prop.default === "function"
								? prop.default()
								: prop.default;

						return JSON.stringify(def());
					},
					get map() {
						if (key.startsWith("_")) {
							return false;
						} else {
							return map;
						}
					},
					get mapPretty() {
						return this.map.toString();
					},
					get children() {
						return mapProps({props: prop.children, map: this.map});
					},
					name: key,
					required: (!!prop.required).toString(),
					rowKey: rowKey++
				}));
			};

			return mapProps({props: spec === "props" ? this.props : spec});
		}
	},
	methods: {
		async event({actions, done}) {
			if (actions.update) {
				const {data} = actions.update;
				this.data = {...this.data, ...data};
				this.eventData = data;
			}

			if (done) await done();
		},

		check() {
			if (!this.res) {
				console.warn(this.name);
			}
		}
	},
	created() {
		this.check();
	}
};
</script>

<style lang="scss" scoped>
.item {
	border-bottom: 1px solid $blue2;
	padding: 5em 0;

	&:last-child {
		border-bottom: 0;
	}

	.wrap {
		h1.title {
			border-bottom: 0;
			padding-bottom: 0;
		}

		> .props {
			border: 1px solid $blue2;
			border-radius: 4px;
			overflow: hidden;
			border-bottom: 0;
			margin: 1em 0;

			::v-deep .el-table .cell {
				word-break: normal;
				color: $black1;
			}

			.note {
				line-height: 1.25em;
			}
		}

		.field-wrap {
			position: relative;
			margin: 2em 0;
			padding: 0.1em 1em;
			border-left: 3px solid $blue2;
		}

		.info {
			margin: 1em 0;
			display: flex;

			.block {
				font-size: 0.8em;
				margin-right: 2em;

				.title {
					margin-bottom: 0.5em;
					font-size: 1.2em;
					font-weight: 500;
				}

				pre {
					display: inline-flex;
					background-color: rgba(black, 0.05);
					margin: 0;
					border-radius: 2px;
					padding: 1em 1.5em;
					padding-right: 2em;
				}

				&.event {
					pre {
						max-width: 25em;
						overflow: auto;
					}
				}
			}
		}
	}
}
</style>
