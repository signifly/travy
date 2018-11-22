<template>
	<transition name="view-page">
		<div class="view-page">
			<Row class="top" :gutter="20">
				<Col class="left" :span="16">
					<vHeader v-bind="{data, header}"/>
				</Col>
				<Col class="right" :span="8">
					<modifiers v-if="modifiers" v-bind="modifiers" @refresh="refresh"/>
					<actions v-if="actions" v-bind="{actions, data}" @submit="getData"/>
				</Col>
			</Row>

			<Row class="mid" :gutter="20">
				<Col class="left" :span="16">
					<tabs ref="tabs" v-bind="{tabs, data, options}" @edit="edit = $event"/>
				</Col>
				<Col class="right" :span="8">
					<vSidebar v-if="sidebar" v-bind="{sidebar, data}"/>
				</Col>
			</Row>

			<Row class="bottom" :gutter="20">
				<Col class="left" :span="24">
					<activity v-if="activity" v-bind="{data, endpoint}"/>
				</Col>
			</Row>

			<panels v-bind="{loading: saving, data, edit}" @save="save"/>
		</div>
	</transition>
</template>

<script>
import {Row, Col} from "element-ui";

import tabs from "./components/tabs";
import panels from "./components/panels";
import vHeader from "./components/header";
import sidebar from "./components/sidebar";
import actions from "./components/actions";
import activity from "./components/activity";
import modifiers from "@/components/modifiers";

export default {
	components: {Col, Row, tabs, panels, vHeader, sidebar, actions, activity, modifiers},
	props: {
		tabs: {type: Array, required: false},
		data: {type: Object, required: false},
		header: {type: Object, required: false},
		actions: {type: Array, required: false},
		sidebar: {type: Array, required: false},
		activity: {type: Object, required: false},
		options: {type: Object, required: false},
		endpoint: {type: Object, required: false},
		modifiers: {type: Array, required: false}
	},
	data() {
		return {
			edit: false,
			saving: false
		}
	},
	computed: {
		query: (t) => t.$route.query
	},
	methods: {
		refresh() {
			console.log("ref");
			this.$emit("refresh");
		},

		async save() {
			this.saving = true;
			await this.$refs.tabs.save();
			this.saving = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.view-page {
	&-enter-active, &-leave-active {
		transition: cubic(opacity, 0.3s);
		transition-delay: 0.1s;
	}

	&-enter, &-leave-to {
		opacity: 0;
	}
}
</style>
