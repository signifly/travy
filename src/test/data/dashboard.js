export default {
	definitions: {
		sections: [
			{
				id: "issues",
				type: "table",
				title: {text: "Issues"},
				endpoint: {
					url: "/definitions/table",
					params: {
						type: "entity",
						actionable: "App\\Models\\Project"
					}
				},
				fields: []
			},
			{
				id: "details",
				type: "fields",
				title: {text: "Details"},
				endpoint: {
					url: "/data/fields"
				},
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
