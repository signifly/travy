<template>
	<div class="doc">
		<div class="fields">
			<div class="title">Fields</div>

			<div class="component" v-for="comp in components">
				<div class="propdoc-item">
					<propDoc :component="comp" :key="comp.name" />
				</div>

				<div class="preview">
					<div class="title">Preview</div>
					<component :is="comp" v-bind="comp.propsD" @fieldA="event(comp.name, $event)" />
				</div>

				<div class="code" v-if="events[comp.name]">
					<div class="title">Event</div>
					<pre><code>{{events[comp.name]}}</code></pre>
				</div>

				<div class="code">
					<div class="title">Code</div>
					<pre><code>{{comp.code}}</code></pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapValues, pickBy, startsWith} from "lodash";
import * as fields from "@/components/fields";
import propDoc from "propdoc";

export default {
	components: {propDoc},
	data() {
		return {
			events: {}
		}
	},
	computed: {
		components() {
			return mapValues(fields, (field, key) => ({...field,
				name: key,
				code: JSON.stringify(this.removeX(field.propsD) || {}, null, 2),
				props: this.removeX(field.props)
			}));
		}
	},
	methods: {
		event(name, {data}) {
			this.$set(this.events, name, data);
		},

		removeX: (obj) => pickBy(obj, (val, key) => {
			return !startsWith(key, "x");
		})
	}
}
</script>

<style lang="scss" scoped>
.doc {
	padding-top: 3em;
	max-width: 60em;
	margin: 0 auto;

	.fields {
		border: 1px solid $blue2;
		padding: 2em;

		> .title {
			font-size: 1.5em;
			font-weight: 600;
			margin-bottom: 2em;
		}

		.component {
			margin-bottom: 2em;
			border-bottom: 2px solid $blue4;

			.propdoc-item {

			}

			.preview {
				margin: 2em 0;

				.title {
					margin-bottom: 1em;
					font-weight: 600;
				}
			}

			.code {
				font-size: 0.7em;
				margin: 2em 0;

				.title {
					font-size: 1.2em;
					font-weight: 600;
				}

				pre {
					display: inline-flex;
					background-color: $blue2;
					border-radius: 2px;
					padding: 1em 1.5em;
					padding-right: 2em;

					code {
						padding: 0;
						color: $black1;
						background-color: transparent;
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
@import "~propdoc/style";

.propdoc {
	margin-bottom: 0;
	zoom: 80%;

	.use {
		margin: 0;
	}

	.props {
		border: 1px solid $blue2;
		border-radius: 4px;
		margin: 2em 0;

		.proprow {
			padding: 1em;

			&.labels {
				.propcol {
					font-weight: 600;

					&.name {
						&.required {
							span {
								display: none;
							}
						}
					}
				}
			}
		}
		.propcol {
			font-size: 1.1em;
			max-width: 100%;
			overflow: hidden;

			&.default {
				word-break: break-word;
			}

			&.required {
				span {
					border-bottom: 0;
					&:after {
						content: "*"
					}
				}
			}
		}
	}
}
</style>
