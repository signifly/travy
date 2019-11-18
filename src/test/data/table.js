export default {
	definitions: {
		columns: [
			{
				order: 1,
				sortable: true,
				sortBy: "name",
				name: "name",
				label: "Name",
				fieldType: {
					id: "text",
					props: {
						text: "name"
					}
				},
				onClick: "/i/projects/{id}"
			},
			{
				order: 2,
				sortable: false,
				sortBy: null,
				name: "tags",
				label: "Tags",
				fieldType: {
					id: "list-tooltip",
					props: {
						itemKey: "name",
						itemLink: "/i/tags/{id}",
						items: "tags"
					}
				}
			},
			{
				order: 3,
				sortable: false,
				sortBy: null,
				name: "actions",
				label: "Actions",
				fieldType: {
					id: "button-actions",
					props: {
						actions: [
							{
								title: "View",
								props: {
									title: "View",
									id: "show",
									endpoint: {
										url: "/i/projects/{id}",
										method: "get"
									}
								},
								hide: {
									key: "is_deleted",
									operator: "eq",
									value: true
								}
							},
							{
								title: "Delete",
								props: {
									title: "Delete",
									id: "popup",
									text: "Are you sure? Please confirm this action.",
									endpoint: {
										url: "http://localhost/admin/projects/{id}",
										method: "delete"
									}
								},
								hide: {
									key: "is_deleted",
									operator: "eq",
									value: true
								}
							},
							{
								title: "Restore",
								props: {
									title: "Restore",
									id: "popup",
									text: "Are you sure? Please confirm this action.",
									endpoint: {
										url: "http://localhost/admin/projects/{id}/restore",
										method: "post"
									}
								},
								hide: {
									key: "is_deleted",
									operator: "eq",
									value: false
								}
							}
						]
					}
				},
				width: 120
			}
		],
		endpoint: {
			url: "/data/table",
			params: {
				include: ["tags"]
			}
		},
		defaults: {
			sort: {
				prop: "name",
				order: "ascending"
			}
		},
		actions: [
			{
				title: "Add project",
				props: {
					title: "Add project",
					id: "modal",
					onSubmit: "/i/projects/{id}",
					fields: [
						{
							name: "name",
							label: "Name",
							fieldType: {
								id: "input-text",
								props: {
									value: "name"
								}
							}
						}
					],
					payload: {
						data: {}
					},
					endpoint: {
						url: "https://localhost/projects",
						method: "post"
					}
				},
				icon: "plus",
				status: "primary"
			}
		],
		search: {
			placeholder: "Search for Name"
		},
		batch: {
			selectedOptions: {
				label: "name",
				link: "/i/projects/{id}"
			},
			sequential: {
				url: "/i/projects/{id}"
			}
		},
		pagination: {}
	},
	data: {
		meta: {total: 1, per_page: 15},
		data: [
			{
				id: 1,
				tags: []
			}
		]
	}
};
