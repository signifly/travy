<template>
	<div class="fields">
		<div class="wrap">
			<div class="title">Fields</div>
			<Container>
				<Aside>
					<Menu class="menu">
						<MenuItem v-for="field in fieldsSorted" :key="field.key" :index="field.key" @click="link(field.key)">{{field.key}}</MenuItem>
					</Menu>
				</Aside>

				<Container>
					<Main>
						<div class="items">
							<vItem v-for="field in fieldsSorted" :key="field.key" :id="field.key" :props="field.comp.props" v-bind="field.comp.meta" />
						</div>
					</Main>
				</Container>
			</Container>
		</div>
	</div>
</template>

<script>
import {sortBy} from "lodash";
import {Container, Main, Aside, Menu, MenuItem} from "element-ui";
import * as fields from "@/components/fields";
import vItem from "./item.vue";

export default {
	components: {Container, Main, Aside, Menu, MenuItem, vItem},
	data() {
		return {
			fields
		}
	},
	computed: {
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
	}
};
</script>

<style lang="scss" scoped>
.fields {
	.wrap {
		padding: 2em 0;
		max-height: 100%;

		.title {
			font-size: 1.5em;
			margin-bottom: 2em;
			margin-left: 0.7em;
		}

		.menu {
			/deep/ {
				.el-menu-item {
					height: 2em;
					line-height: 2em;
				}
			}
		}

		.items {
			max-height: calc(100vh - 12em);
			overflow: auto;
		}
	}
}
</style>
