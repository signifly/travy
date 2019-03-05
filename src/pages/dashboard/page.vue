<template>
	<div class="dashboard">
		<sections v-bind="{sections}"/>
	</div>
</template>

<script>
import sections from "./sections";

export default {
	components: {sections},
	props: {
		defsEndpoint: {type: Object, required: true},
		title: {type: String, required: false}
	},
	data() {
		return {
			definitions: null
		}
	},
	computed: {
		query: (t) => t.$route.query,
		sections: (t) => t.definitions.sections
	},
	methods: {
		async getDefinitions() {
			// const params = {...this.defsEndpoint.params, modifiers: this.query.modifiers};
			//
			// const {data} = await this.$axios.get(this.defsEndpoint.url, {params});
			// this.definitions = data;

			this.definitions = {
				sections: [
					{
						id: 'details',
						type: 'fields',
						endpoint: {
							url: 'https://api.travy.signifly.io/v1/admin/projects/{id}'
						},
						title: 'Details',
						fields: [
							{
								name: 'client_id',
								label: 'Client',
								fieldType: {
									id: 'input-select-search',
									props: {
										value: 'client_id',
										options: {
											key: 'data',
											itemKey: 'data',
											value: 'id',
											label: 'name',
											endpoint: {
												url: 'https://api.travy.signifly.io/v1/admin/clients',
												params: {
													sort: 'name'
												}
											}
										}
									}
								}
							},
							{
								name: 'name',
								label: 'Name',
								fieldType: {
									id: 'input-text',
									props: {
										value: 'name'
									}
								},
								onClick: null
							},
							{
								name: 'start_date',
								label: 'Start Date',
								fieldType: {
									id: 'input-date',
									props: {
										formatValue: 'yyyy-MM-dd',
										date: 'start_date'
									}
								}
							},
							{
								name: 'tags',
								label: 'Tags',
								fieldType: {
									id: 'input-select-multi-search',
									props: {
										values: 'tags',
										options: {
											key: 'data',
											itemKey: 'data',
											value: 'id',
											label: 'name'
										}
									}
								}
							},
							{
								name: 'description',
								label: 'Description',
								fieldType: {
									id: 'input-editor-markdown',
									props: {
										content: 'description'
									}
								}
							}
						]
					},
					{
						id: 'issues',
						type: 'table',
						endpoint: {
							url: 'https://api.travy.signifly.io/v1/admin/definitions/table/issues'
						},
						title: 'Issues',
						fields: []
					},
					{
						id: 'notes',
						type: 'table',
						endpoint: {
							url: 'https://api.travy.signifly.io/v1/admin/definitions/table/project-notes'
						},
						title: 'Notes',
						fields: []
					},
					{
						id: 'actions',
						type: 'table',
						endpoint: {
							url: 'https://api.travy.signifly.io/v1/admin/definitions/table/action-logs',
							params: {
								type: 'entity',
								actionable: 'App\\Models\\Project'
							}
						},
						title: 'Actions',
						fields: []
					}
				]
			}
		},
	},
	created() {
		this.getDefinitions();
	}
};
</script>

<style lang="scss" scoped>
.dashboard {

}
</style>
