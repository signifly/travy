export default {
	definitions: {
		sections: [
			{
				id: "issues",
				type: "table",
				endpoint: {
					url: "/definitions/table",
					params: {
						type: "entity",
						actionable: "App\\Models\\Project"
					}
				},
				title: "Issues",
				fields: []
			},
			{
				id: "details",
				type: "fields",
				endpoint: {
					url: "/data/fields"
				},
				title: "Details",
				fields: [
					{
						name: "client_id",
						label: "Client",
						fieldType: {
							id: "text",
							props: {
								text: "client_id"
							}
						}
					},
					{
						name: "date",
						label: "Date",
						fieldType: {
							id: "text",
							props: {
								text: "start_date"
							}
						}
					}
				]
			}
		]
	}
};
