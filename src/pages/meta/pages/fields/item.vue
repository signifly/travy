<template>
	<div class="item">
		<div class="wrap">
			<h1 class="title" :id="id" :href="`#${id}`">{{ id }}</h1>

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

					<tr v-for="(prop, name) in propsTable" :key="name">
						<td>{{ name }}</td>
						<td>{{ prop.type }}</td>
						<td>{{ prop.required || false }}</td>
						<td>{{ prop.map }}</td>
						<td>{{ prop.default }}</td>
						<td v-html="prop.note"></td>
						<td>{{ prop.validator }}</td>
					</tr>
				</table>
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

				<div class="block data">
					<div class="title">Data</div>
					<pre>
						<code>{{dataDisplay}}</code>
					</pre>
				</div>

				<div class="block event" v-if="ev">
					<div class="title">Event</div>
					<pre>
						<code>{{ev}}</code>
					</pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapValues, mapKeys, pickBy, get} from "lodash";
import field from "@/components/field";

export default {
	components: {field},
	props: {
		id: {type: String, required: true},
		props: {type: Object, required: true},
		res: {type: Object, required: true}
	},
	data() {
		return {
			propsDisplay: this.res.props,
			dataDisplay: this.res.data,
			data: this.res.data,
			ev: null
		};
	},
	computed: {
		fieldType: (t) => ({id: t.id, props: t.res.props}),

		propsTable() {
			let props = pickBy(this.props, (x) => x.doc); // find props where {doc: true}

			props = mapValues(props, (prop, key) => ({
				...prop,
				type:
					get(prop.type, "name") ||
					(prop.type || []).map((x) => x.name).join("|"),
				default:
					typeof prop.default === "function" ? prop.default() : prop.default,
				map: key.charAt(0) !== "_"
			}));

			// remove underscore if first character from prop name/key
			return mapKeys(props, (val, key) =>
				key.charAt(0) === "_" ? key.substr(1) : key
			);
		}
	},
	methods: {
		async event({actions, done}) {
			const {data} = actions.update;
			this.data = {...this.data, ...data};
			this.ev = data;
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
			margin: 1em 0;
			border: 1px solid $blue2;
			border-radius: 4px;

			.table {
				width: 100%;
				border-collapse: collapse;
				font-size: em(13);

				tr {
					&:nth-child(even) {
						td {
							background-color: $white2;
						}
					}

					th,
					td {
						text-align: left;
						padding: 0.8em;
					}

					th {
						font-weight: 500;
						border-bottom: 1px solid $blue2;
					}

					td {
						::v-deep {
							a {
								color: $blue5;
								text-decoration: none;
							}
						}
					}
				}
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
