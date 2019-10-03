module.exports = {
	"/account": {
		data: {
			email: "mtm@signifly.com",
			email_verified_at: null,
			updated_at: 1568191509,
			created_at: 1568191509,
			deleted_at: null,
			role: "admin",
			name: "mtm",
			id: 1
		}
	},

	"/login": {
		access_token: "token",
		token_type: "Bearer",
		expires_in: 604800
	},

	"/logout": {
		message: "Successfully logged out."
	},

	"/definitions/config": {
		menu: [
			{
				title: "Projects",
				link: "/t/projects"
			},
			{
				title: "Media",
				link: "/t/media",
				items: [
					{
						title: "Projects",
						link: "/t/projects"
					}
				]
			}
		],
		tables: {
			projects: {
				title: "Projects"
			}
		},
		settings: {
			title: "Travy",
			frontpage: "/t/projects",
			locale: "en",
			notifications: false
		}
	},

	"/definitions/view/account": {
		tabs: [
			{
				id: "details",
				type: "fields",
				endpoint: {url: "http://localhost:3001/v1/admin/account"},
				title: {text: "Details", url: null},
				fields: [
					{
						name: "name",
						label: "Name",
						fieldType: {id: "input-text", props: {value: "name"}}
					},
					{
						name: "email",
						label: "E-mail",
						fieldType: {id: "input-text", props: {value: "email"}}
					},
					{
						name: "current_password",
						label: "Current Password",
						fieldType: {
							id: "input-password",
							props: {value: "current_password"}
						}
					},
					{
						name: "password",
						label: "New Password",
						fieldType: {id: "input-password", props: {value: "password"}}
					},
					{
						name: "password_confirmation",
						label: "Confirm New Password",
						fieldType: {
							id: "input-password",
							props: {value: "password_confirmation"}
						}
					}
				]
			},
			{
				id: "actions",
				type: "table",
				endpoint: {
					url: "http://localhost:3001/v1/admin/definitions/table/action-logs",
					params: {type: "account"}
				},
				title: {text: "Actions", url: null},
				fields: []
			},
			{
				id: "notifications",
				type: "table",
				endpoint: {
					url: "http://localhost:3001/v1/admin/definitions/table/notifications"
				},
				title: {text: "Notifications", url: null},
				fields: []
			}
		],
		header: {props: {title: "name", image: null, tag: "id"}},
		endpoint: {url: "http://localhost:3001/v1/admin/account/{id}"},
		activity: {},
		actions: [
			{
				title: "Delete",
				props: {
					title: "Delete",
					id: "popup",
					text: "Are you sure? Please confirm this action.",
					onSubmit: "/t/account",
					endpoint: {
						url: "http://localhost:3001/v1/admin/account/{id}",
						method: "delete"
					}
				},
				icon: "delete",
				status: "danger"
			}
		],
		sidebar: [
			{
				id: "history",
				title: "History",
				fields: [
					{
						name: "created_at",
						label: "Created At",
						fieldType: {id: "date", props: {timestamp: "created_at"}}
					},
					{
						name: "updated_at",
						label: "Last Modified",
						fieldType: {id: "date", props: {timestamp: "updated_at"}}
					}
				]
			}
		]
	},

	"/definitions/table/projects": {
		title: "stuff",
		sub: "stuff",
		tabs: [
			{
				id: "stuff1",
				name: "stuff1",
				type: "table",
				definitions: {
					batch: {
						selectedOptions: {
							label: "{name}",
							link: "/t/products/{id}"
						},
						sequential: {
							url: "/t/products/{id}"
						}
					},
					endpoint: {
						url: "http://localhost:3001/v1/admin/projects",
						params: {include: ["tags"]}
					},
					pagination: {},
					sort: {
						default: "name",
						items: [
							{label: "Name", value: "name"},
							{label: "Input", value: "input"}
						]
					},
					columns: [
						{
							width: 350,
							name: "Name",
							fieldType: {id: "text", props: {text: "name"}},
							onClick: "/t/projects/{id}",
							sortBy: "name"
						},
						{
							name: "Tags",
							fieldType: {
								id: "list-tooltip",
								props: {
									items: {
										_link: "/t/tags/{id}",
										"@scope": "tags",
										label: "key"
									}
								}
							}
						},
						{
							name: "input",
							fieldType: {
								id: "input-switch",
								props: {
									value: "switch"
								}
							}
						}
					],
					filters: {
						data: {
							name: "test"
						},
						search: {
							placeholder: "Search..."
						},
						fields: [
							{
								name: "name",
								label: "Name",
								fieldType: {id: "input-text", props: {value: "name"}}
							}
						]
					},
					actions: [
						{
							title: "Add project",
							props: {
								title: "Add project",
								id: "modal",
								onSubmit: "/t/projects/{id}",
								fields: [
									{
										name: "client_id",
										label: "Client",
										fieldType: {
											id: "input-select-search",
											props: {
												value: "client_id",
												options: {
													key: "data",
													itemKey: "data",
													value: "id",
													label: "name",
													endpoint: {
														url: "http://localhost:3001/v1/admin/clients",
														params: {sort: "name"}
													}
												}
											}
										}
									},
									{
										name: "name",
										label: "Name",
										fieldType: {id: "input-text", props: {value: "name"}}
									},
									{
										name: "start_date",
										label: "Start Date",
										fieldType: {
											id: "input-date",
											props: {formatValue: "yyyy-MM-dd", date: "start_date"}
										}
									},
									{
										name: "tags",
										label: "Tags",
										fieldType: {
											id: "input-select-multi-search",
											props: {
												values: "tags",
												options: {
													key: "data",
													itemKey: "data",
													value: "id",
													label: "name",
													endpoint: {
														url: "http://localhost:3001/v1/admin/tags"
													}
												}
											}
										}
									},
									{
										name: "description",
										label: "Description",
										fieldType: {
											id: "input-editor-markdown",
											props: {content: "description"}
										}
									}
								],
								payload: {
									data: {
										client_id: "",
										name: "",
										start_date: "",
										tags: [],
										description: ""
									}
								},
								endpoint: {
									url: "http://localhost:3001/v1/admin/projects",
									method: "post"
								}
							},
							icon: "plus",
							status: "primary"
						}
					]
				}
			},
			{
				id: "stuff2",
				name: "stuff 2",
				type: "table",
				definitions: {
					endpoint: {
						url: "http://localhost:3001/v1/admin/projects",
						params: {include: ["tags"]}
					},
					pagination: {},
					expand: {
						type: "fields",
						fields: [{}]
					},
					columns: [
						{
							width: 350,
							name: "Name",
							fieldType: {id: "text", props: {text: "name"}},
							onClick: "/t/projects/{id}",
							sortBy: "name"
						},
						{
							name: "Tags",
							fieldType: {
								id: "list-tooltip",
								props: {
									items: {
										_link: "/t/tags/{id}",
										"@scope": "tags",
										label: "key"
									}
								}
							}
						},
						{
							name: "input",
							fieldType: {
								id: "input-switch",
								props: {
									value: "switch"
								}
							}
						}
					],
					actions: [
						{
							title: "Add project",
							props: {
								title: "Add project",
								id: "modal",
								onSubmit: "/t/projects/{id}",
								fields: [
									{
										name: "client_id",
										label: "Client",
										fieldType: {
											id: "input-select-search",
											props: {
												value: "client_id",
												options: {
													key: "data",
													itemKey: "data",
													value: "id",
													label: "name",
													endpoint: {
														url: "http://localhost:3001/v1/admin/clients",
														params: {sort: "name"}
													}
												}
											}
										}
									},
									{
										name: "name",
										label: "Name",
										fieldType: {id: "input-text", props: {value: "name"}}
									},
									{
										name: "start_date",
										label: "Start Date",
										fieldType: {
											id: "input-date",
											props: {formatValue: "yyyy-MM-dd", date: "start_date"}
										}
									},
									{
										name: "tags",
										label: "Tags",
										fieldType: {
											id: "input-select-multi-search",
											props: {
												values: "tags",
												options: {
													key: "data",
													itemKey: "data",
													value: "id",
													label: "name",
													endpoint: {
														url: "http://localhost:3001/v1/admin/tags"
													}
												}
											}
										}
									},
									{
										name: "description",
										label: "Description",
										fieldType: {
											id: "input-editor-markdown",
											props: {content: "description"}
										}
									}
								],
								payload: {
									data: {
										client_id: "",
										name: "",
										start_date: "",
										tags: [],
										description: ""
									}
								},
								endpoint: {
									url: "http://localhost:3001/v1/admin/projects",
									method: "post"
								}
							},
							icon: "plus",
							status: "primary"
						}
					]
				}
			}
		]
	},

	"/projects": {
		data: [
			{
				id: 1,
				client_id: 8,
				name: "Clemens Cassin",
				start_date: null,
				status: "open",
				description: null,
				created_at: 1568191509,
				updated_at: 1568191509,
				deleted_at: null,
				created_by: null,
				updated_by: null,
				tags_count: 0,
				tags: [{key: "item1", id: 1}, {key: "item2", id: 2}],
				is_deleted: false
			},
			{
				id: 5,
				client_id: 10,
				name: "Miss Sienna Lebsack",
				start_date: null,
				status: "open",
				description: null,
				created_at: 1568191509,
				updated_at: 1568191509,
				deleted_at: null,
				created_by: null,
				updated_by: null,
				tags_count: 0,
				tags: [],
				is_deleted: false
			},
			{
				id: 4,
				client_id: 9,
				name: "Mr. Israel Marks DVM",
				start_date: null,
				status: "open",
				description: null,
				created_at: 1568191509,
				updated_at: 1568191509,
				deleted_at: null,
				created_by: null,
				updated_by: null,
				tags_count: 0,
				tags: [],
				is_deleted: false
			}
		],
		links: {
			first: "http://localhost:3001/v1/admin/projects?page=1",
			last: "http://localhost:3001/v1/admin/projects?page=1",
			prev: null,
			next: null
		},
		meta: {
			current_page: 1,
			from: 1,
			last_page: 1,
			path: "http://localhost:3001/v1/admin/projects",
			per_page: 15,
			to: 6,
			total: 6
		}
	},

	"/definitions/view/projects": {
		tabs: [
			{
				id: "details",
				type: "fields",
				endpoint: {url: "http://localhost:3001/v1/admin/projects/{id}"},
				title: {text: "Details", url: null},
				fields: [
					{
						name: "name",
						label: "Name",
						fieldType: {id: "input-text", props: {value: "name"}}
					},
					{
						name: "start_date",
						label: "Start Date",
						fieldType: {
							id: "input-date",
							props: {formatValue: "yyyy-MM-dd", date: "start_date"}
						}
					},
					{
						name: "tags",
						label: "Tags",
						fieldType: {
							id: "input-select-multi-search",
							props: {
								values: "tags",
								options: {
									key: "data",
									itemKey: "data",
									value: "id",
									label: "name",
									endpoint: {url: "http://localhost:3001/v1/admin/tags"}
								}
							}
						}
					},
					{
						name: "description",
						label: "Description",
						fieldType: {
							id: "input-editor-markdown",
							props: {content: "description"}
						}
					}
				]
			},
			{
				id: "issues",
				type: "table",
				endpoint: {
					url: "http://localhost:3001/v1/admin/definitions/table/issues"
				},
				title: {text: "Issues", url: null},
				fields: []
			},
			{
				id: "notes",
				type: "table",
				endpoint: {
					url: "http://localhost:3001/v1/admin/definitions/table/project-notes"
				},
				title: {text: "Notes", url: null},
				fields: []
			},
			{
				id: "actions",
				type: "table",
				endpoint: {
					url: "http://localhost:3001/v1/admin/definitions/table/action-logs",
					params: {type: "entity", actionable: []}
				},
				title: {text: "Actions", url: null},
				fields: []
			}
		],
		header: {props: {title: "name", image: null, tag: "id"}},
		endpoint: {url: "http://localhost:3001/v1/admin/projects/{id}"},
		activity: {},
		actions: [
			{
				title: "Delete",
				props: {
					title: "Delete",
					id: "popup",
					text: "Are you sure? Please confirm this action.",
					onSubmit: "/t/projects",
					endpoint: {
						url: "http://localhost:3001/v1/admin/projects/{id}",
						method: "delete"
					}
				},
				icon: "delete",
				status: "danger"
			}
		],
		sidebar: [
			{
				id: "history",
				title: "History",
				fields: [
					{
						name: "created_at",
						label: "Created At",
						fieldType: {id: "date", props: {timestamp: "created_at"}}
					},
					{
						name: "creator.name",
						label: "Created By",
						fieldType: {id: "text", props: {text: "creator.name"}}
					},
					{
						name: "updated_at",
						label: "Last Modified",
						fieldType: {id: "date", props: {timestamp: "updated_at"}}
					},
					{
						name: "editor.name",
						label: "Last Modified By",
						fieldType: {id: "text", props: {text: "editor.name"}}
					}
				]
			},
			{
				id: "test",
				title: "Test",
				fields: [
					{
						name: "name",
						label: "Name",
						fieldType: {id: "input-text", props: {value: "name"}}
					}
				]
			}
		]
	},

	"/projects/:id": {
		data: {
			id: 1,
			client_id: 8,
			name: "Clemens Cassin",
			start_date: null,
			status: "open",
			description: null,
			created_at: 1568191509,
			updated_at: 1568191509,
			deleted_at: null,
			created_by: null,
			updated_by: null,
			creator: null,
			editor: null,
			tags: [],
			is_deleted: false
		}
	},

	"/projects/:id/activity": {
		data: [
			{
				id: 22,
				log_name: "default",
				description: "created",
				subject_id: 3,
				subject_type: "App\\Models\\Project",
				causer_id: null,
				causer_type: null,
				properties: {
					attributes: {
						client_id: 8,
						name: "Clemens Cassin",
						start_date: null,
						status: "open",
						description: null
					}
				},
				created_at: 1568191509,
				updated_at: 1568191509,
				humanized_subject: "project",
				revertable: false,
				causer: null
			}
		],
		links: {
			first: "http://localhost:3001/v1/admin/projects/3/activity?page=1",
			last: "http://localhost:3001/v1/admin/projects/3/activity?page=1",
			prev: null,
			next: null
		},
		meta: {
			current_page: 1,
			from: 1,
			last_page: 1,
			path: "http://localhost:3001/v1/admin/projects/3/activity",
			per_page: 15,
			to: 1,
			total: 1
		}
	},

	"/account/:id/activity": {
		data: [
			{
				id: 22,
				log_name: "default",
				description: "created",
				subject_id: 3,
				subject_type: "App\\Models\\Project",
				causer_id: null,
				causer_type: null,
				properties: {
					attributes: {
						client_id: 8,
						name: "Clemens Cassin",
						start_date: null,
						status: "open",
						description: null
					}
				},
				created_at: 1568191509,
				updated_at: 1568191509,
				humanized_subject: "project",
				revertable: false,
				causer: null
			}
		],
		links: {
			first: "http://localhost:3001/v1/admin/projects/3/activity?page=1",
			last: "http://localhost:3001/v1/admin/projects/3/activity?page=1",
			prev: null,
			next: null
		},
		meta: {
			current_page: 1,
			from: 1,
			last_page: 1,
			path: "http://localhost:3001/v1/admin/projects/3/activity",
			per_page: 15,
			to: 1,
			total: 1
		}
	}
};
