<template>
	<div class="fields">
		<div class="sidebar">
			<div class="wrap">
				<div class="title">Fields</div>

				<ul class="items">
					<li class="item" v-for="field in fieldsSorted" :class="{active: hash === `#${field.key}`}">
						<a :href="`#${field.key}`" @click.prevent="link(field.key)">{{field.key}}</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="content">
			<div class="wrap">
				<div class="items">
					<vItem v-for="field in fieldsSorted" :key="field.key" :id="field.key" :props="field.comp.props" v-bind="field.comp.meta" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {sortBy} from "lodash";
import * as fields from "@/components/fields";
import vItem from "./item.vue";

export default {
	components: {vItem},
	data() {
		return {
			fields
		}
	},
	computed: {
		hash: (t) => t.$route.hash,

		fieldsSorted() {
			const fields = Object.keys(this.fields).map(key => {
				return {key, comp: this.fields[key]};
			});

			return sortBy(fields, "key");
		}
	},
	methods: {
		link(key) {
			location.href = `#${key}`;
		}
	},
	mounted() {
		const hash = location.hash;
		location.hash = "";
		location.hash = hash;
	}
};
</script>

<style lang="scss" scoped>
$sidebar: 20em;

.fields {
	display: flex;
	justify-content: flex-end;

	.sidebar {
		position: fixed;
		overflow-y: auto;
		width: $sidebar;
		top: 3.5em;
		left: 0;
		bottom: 0;
		border-right: 1px solid $blue2;

		.wrap {
			padding: 2em 2em;

			.title {
				font-size: 1.25em;
				font-weight: 500;
				margin-bottom: 1.5em;
			}

			.items {
				font-size: 0.9em;
				list-style: none;
				padding: 0;

				.item {
					margin: 0.5em 0;

					a {
						color: $black1;
						text-decoration: none;
					}

					&:hover {
						a {
							color: $blue4;
						}
					}

					&.active {
						a {
							color: $blue5;
						}
					}
				}
			}
		}
	}

	.content {
		width: calc(100% - #{$sidebar});

		.wrap {
			max-width: 65em;
			margin: 0 auto;
			padding: 0 2em;

			.items {

			}
		}
	}
}
</style>
