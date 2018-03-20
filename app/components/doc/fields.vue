<template>
	<div class="fields">
		<div class="wrap">
			<div class="title">Fields</div>

			<Container>
				<Aside>
					<Menu class="menu">
						<MenuItem @click="link(key)" v-for="(field, key) in fields" :key="key" :index="key">{{key}}</MenuItem>
					</Menu>
				</Aside>

				<Container>
					<Main>
						<div class="items">
							<vItem v-for="(field, key) in fields" :key="key" :id="key" :props="field.props" v-bind="field.meta" />
						</div>
					</Main>
				</Container>
			</Container>
		</div>
	</div>
</template>

<script>
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
	methods: {
		link(key) {
			location.href = `#${key}`;
			console.log(key);
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
