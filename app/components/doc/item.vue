<template>
	<div class="item">
		<div class="wrap">
			<div class="title" :id="id">{{id}}</div>

			<div class="props">
				<table class="table">
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Required</th>
						<th>Map</th>
						<th>Default</th>
						<th>note</th>
						<th>Validator</th>
					</tr>

					<tr v-for="(prop, name) in propsTable">
						<td>{{name}}</td>
						<td>{{prop.type}}</td>
						<td>{{prop.required}}</td>
						<td>{{prop.map}}</td>
						<td>{{prop.default}}</td>
						<td>{{prop.note}}</td>
						<td>{{prop.validator}}</td>
					</tr>
				</table>
			</div>

			<div class="field" v-if="id !== 'vTable'">
				<vField
					:name="id"
					:fieldType="fieldType"
					:data="res.data"
					@fieldA="fieldA"
				/>
			</div>

			<div class="info">

				<div class="block props">
					<div class="title">Props</div>
					<pre>
						<code>{{propsDisplay}}</code>
					</pre>
				</div>

				<div class="block data">
					<div class="title">Data</div>
					<pre>
						<code>{{dataDisplay}}</code>
					</pre>
				</div>

				<div class="block event" v-if="event">
					<div class="title">Event</div>
					<pre>
						<code>{{event}}</code>
					</pre>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import {mapValues, pickBy, get, has, startsWith} from "lodash";
import vField from "@/components/field.vue";

export default {
	components: {vField},
	props: {
		id: {type: String, required: true},
		field: {type: Object, required: true},
		props: {type: Object, required: true},
		res: {type: Object, required: true, default: () => ({})}
	},
	data() {
		return {
			event: null
		}
	},
	computed: {
		field_: (t) => mapValues(t.field, (val, key) => ({...val})),
		fieldType: (t) => ({id: t.id, props: t.res.props}),
		dataDisplay: (t) => t.removeLodash(t.res.data),
		propsDisplay: (t) => t.removeLodash(t.res.props),

		propsTable() {
			const props = this.removeLodash(this.props);
			const res = this.res;

			return mapValues(props, (prop, key) => ({...prop,
				type: get(prop.type, "name") || prop.type.map(x => x.name).join("|"),
				default: typeof prop.default === "function" ? prop.default() : prop.default,
				get map() {
					const dataKey = res.props[key];
					return !!res.data[dataKey];
				}
			}));
		}
	},
	methods: {
		removeLodash(obj) {
			return pickBy(obj, (val, key) => !startsWith(key, "_"))
		},

		async fieldA({data, done}) {
			this.event = data;
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

	&:last-child {
		border-bottom: 0;
	}

	.wrap {
		margin: 5em 0;

		> .title {
			font-size: 1.5em;
			font-weight: 500;
			margin-bottom: 1em;
		}

		> .props {
			margin: 1em 0;
			border: 1px solid $blue2;
			border-radius: 4px;

			.table {
				width: 100%;
				border-collapse: collapse;
				font-size: em(14);

				tr {
					&:nth-child(even) {
						td {
							background-color: $white2;
						}
					}
					th, td {
						text-align: left;
						padding: 0.8em;
					}

					th {
						font-weight: 500;
						border-bottom: 1px solid $blue2;
					}
				}
			}
		}

		> .field {
			margin: 2em 0;
			padding: 1em;
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
			}
		}
	}
}
</style>
