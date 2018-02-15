<template>
	<div class="doc">
		<div class="fields">
			<div class="title">Fields</div>
			<propDoc v-for="comp in components" :component="comp" :key="comp.name" />
		</div>
	</div>
</template>

<script>
import {mapValues} from "lodash";
import * as fields from "@/components/fields";
import propDoc from "propdoc";

export default {
	components: {propDoc},
	computed: {
		components() {
			return mapValues(fields, (field, key) => ({...field,
				name: key,
				introduction: "an amazing checkbox",
				description: "spogrlg"
			}));
		}
	}
}
</script>

<style lang="scss">
@import "~propdoc/style";

.doc {
	.fields {
		.propdoc {
			zoom: 80%;
			margin-bottom: 3em;
			border-bottom: 2px solid $blue4;

			.title {

			}

			.use {
				margin: 0;
			}

			.props {
				border: 1px solid $blue2;
				border-radius: 4px;

				.proprow {
					padding: 1em;
				}
				.propcol {
					font-size: 1.1em;
					word-break: break-all;

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
	}
}
</style>

<style lang="scss" scoped>
.doc {
	padding-top: 5em;
	max-width: 50em;
	margin: 0 auto;

	.fields {
		border: 1px solid $blue2;
		border-radius: 4px;
		padding: 1em;

		> .title {
			font-size: 2em;
			margin-bottom: 1em;
		}
	}
}
</style>
