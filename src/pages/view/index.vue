<template>
	<div class="view" v-if="table">
		<vBreadcrumb :items="breadcrumb"/>
		<page v-bind="[definitions, {options, data}]" :key="viewKey"/>
	</div>
</template>

<script>
import vBreadcrumb from "@/components/breadcrumb.vue";
import page from "./page.vue";

export default {
	components: {vBreadcrumb, page},
	data() {
		return {
			definitions: null,
			options: null,
			data: null
		}
	},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		table: (t) => t.$store.getters["config/tables"][t.tableId],

		viewId: (t) => t.$route.params.viewId,
		viewKey: (t) => t.$route.query.sequential ? null : `${t.tableId}-${t.viewId}`, // don't rerender view on sequential batch

		requests: (t) => ({
			data: `${t.tableId}/${t.viewId}`,
			definitions: `definitions/view/${t.tableId}`
		}),

		breadcrumb: (t) => [
			{title: t.table.title, to: `/t/${t.tableId}`},
			{title: t.viewId, to: t.$route.path}
		]
	},
	methods: {
		async getDefinitions() {
			const params = {
				// modifiers: this.modifierParams({definitions: true})
			};

			// const temp = "https://travy.glitch.me/view/defs";

			const {data} = await this.$axios.get(this.requests.definitions, {params});
			this.definitions = data;
		},

		async getData() {
			const params = {
				// modifiers: this.modifierParams()
			};

			try {
				const {data: {data, options}} = await this.$axios.get(this.requests.data, {params, customErr: true});
				this.options = options;
				this.data = data;

			} catch(err) {
				if (err.status === 404) {
					this.$router.replace({name: "error", params: {status: 404}});
				} else {
					throw err;
				}
			}
		}
	},
	async created() {
		if (this.table) {
			await this.getDefinitions();
			await this.getData();
		} else {
			this.$router.replace({name: "error"});
		}
	}
};
</script>
