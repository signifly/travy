<template>
	<div class="item" :id="id">
		<div class="wrap">
			<a class="title" :href="`#${id}`">{{id}}</a>

			<div class="props">
				<table class="table">
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Required</th>
						<th>Map</th>
						<th>Default</th>
						<th>Note</th>
						<th>Validator</th>
					</tr>

					<tr v-for="(prop, name) in propsTable">
						<td>{{name}}</td>
						<td>{{prop.type}}</td>
						<td>{{prop.required}}</td>
						<td>{{prop.map}}</td>
						<td>{{prop.default}}</td>
						<td v-html="prop.note"></td>
						<td>{{prop.validator}}</td>
					</tr>
				</table>
			</div>

			<div class="nodata">
				<div class="wrap">
					<Tag type="danger" v-if="nodata">nodata</Tag>
				</div>
			</div>

			<div class="field">
				<vField
					ref="field"
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
import {mapValues, mapKeys, pickBy, get} from "lodash";
import vField from "@/components/field.vue";
import {Tag} from "element-ui";

export default {
	components: {Tag, vField},
	props: {
		id: {type: String, required: true},
		props: {type: Object, required: true},
		res: {type: Object, required: true}
	},
	data() {
		return {
			propsDisplay: this.res.props,
			dataDisplay: this.res.data,
			event: null,
			mounted: false
		}
	},
	computed: {
		nodata: (t) => t.mounted ? get(t.$refs, "field.nodata", false) : false,
		fieldType: (t) => ({id: t.id, props: t.res.props}),

		propsTable() {
			let props = pickBy(this.props, (x) => x.doc); // find props where {doc: true}

			props = mapValues(props, (prop, key) => ({...prop,
				type: get(prop.type, "name") || prop.type.map(x => x.name).join("|"),
				default: typeof prop.default === "function" ? prop.default() : prop.default,
				map: key.charAt(0) !== "_"
			}));

			// remove underscore if first character from prop name/key
			return mapKeys(props, (val, key) => key.charAt(0) === "_" ? key.substr(1) : key);
		}
	},
	methods: {
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
	mounted() {
		this.mounted = true;
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
		padding: 5em 0;

		> .title {
			display: block;
			font-size: 1.5em;
			font-weight: 500;
			margin-bottom: 1em;
			color: $black1;
			text-decoration: none;

			&:hover {
				color: $blue5;
			}
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

		.nodata {
			position: relative;
			display: flex;
			align-items: center;

			.wrap {
				position: absolute;
				height: 1px;
				right: 0;
			}
		}

		> .field {
			position: relative;
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

				&.event {
					pre {
						max-width: 18em;
						overflow: auto;
					}
				}
			}
		}
	}
}
</style>
