module.exports = {
	"/account": {
		data: {
			image: "https://picsum.photos/50/50",
			email: "mtm@signifly.com",
			email_verified_at: null,
			updated_at: 1568191509,
			created_at: 156819150,
			deleted_at: null,
			role: "admin",
			name: "Bret",
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
		frontpage: "/t/projects",
		title: "Travy",
		locale: "en",
		theme: {
			logo: "https://picsum.photos/200/50",
			color: "#00233d"
		},
		header: {
			notifications: false,
			link: {
				url: "http://google.dk",
				name: "Back to shop"
			},
			menu: [
				{
					name: "Projects",
					url: "/t/projects"
				},
				{
					name: "Media",
					items: [
						{
							name: "test",
							url: "/t/seof"
						},
						{
							name: "Projects",
							items: [
								{
									name: "Projects",
									url: "/t/projects1"
								},
								{
									name: "awdawd",
									url: "/t/projects2"
								},
								{
									name: "sdfsfd",
									url: "/t/projects3"
								}
							]
						}
					]
				},
				{
					name: "Test",
					url: "/t/test"
				}
			]
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
						attribute: "name",
						name: "Name",
						fieldType: {id: "input-text", props: {value: "name"}}
					},
					{
						attribute: "email",
						name: "E-mail",
						fieldType: {id: "input-text", props: {value: "email"}}
					},
					{
						attribute: "current_password",
						name: "Current Password",
						fieldType: {
							id: "input-password",
							props: {value: "current_password"}
						}
					},
					{
						attribute: "password",
						name: "New Password",
						fieldType: {id: "input-password", props: {value: "password"}}
					},
					{
						attribute: "password_confirmation",
						name: "Confirm New Password",
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
				name: "History",
				fields: [
					{
						attribute: "created_at",
						name: "Created At",
						fieldType: {id: "date", props: {timestamp: "created_at"}}
					},
					{
						attribute: "updated_at",
						name: "Last Modified",
						fieldType: {id: "date", props: {timestamp: "updated_at"}}
					}
				]
			}
		]
	},

	"/definitions/table/projects": {
		title: "stuff",
		sub: "stuff",
		modifiers: {
			data: {
				language_code: "dk"
			},
			fields: [
				{
					attribute: "language_code",
					name: "Language",
					width: 200,
					fieldType: {
						id: "input-select",
						props: {
							_clearable: false,
							value: "language_code",
							_entities: [
								{label: "Danmark", emoji: "denmark", value: "dk"},
								{label: "England", emoji: "uk", value: "uk"},
								{label: "Murica", emoji: "us", value: "us", disabled: true}
							]
						}
					}
				}
			]
		},
		tabs: [
			{
				id: "stuff1",
				name: "stuff1",
				type: "table",
				definitions: {
					expand: {
						type: "fields",
						fields: [
							{
								width: 50,
								name: "Name",
								attribute: "name",
								fieldType: {id: "text", props: {text: "name"}}
							},
							{
								width: 50,
								name: "Tags",
								attribute: "tags",
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
						]
					},
					batch: {
						selectedOptions: {
							label: "{name}",
							link: "/t/projects/{id}"
						},
						sequential: {
							url: "/t/projects/{id}"
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
							onClick: "/t/projects/{id}"
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
								name: "Name",
								attribute: "name",
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
										name: "Client",
										attribute: "client_id",
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
										attribute: "name",
										name: "Name",
										fieldType: {id: "input-text", props: {value: "name"}}
									},
									{
										attribute: "start_date",
										name: "Start Date",
										fieldType: {
											id: "input-date",
											props: {formatValue: "yyyy-MM-dd", date: "start_date"}
										}
									},
									{
										attribute: "tags",
										name: "Tags",
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
										attribute: "description",
										name: "Description",
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
					columns: [
						{
							width: 350,
							name: "Name",
							fieldType: {id: "text", props: {text: "name"}},
							onClick: "/t/projects/{id}"
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
										attribute: "client_id",
										name: "Client",
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
										attribute: "name",
										name: "Name",
										fieldType: {id: "input-text", props: {value: "name"}}
									},
									{
										attribute: "start_date",
										name: "Start Date",
										fieldType: {
											id: "input-date",
											props: {formatValue: "yyyy-MM-dd", date: "start_date"}
										}
									},
									{
										attribute: "tags",
										name: "Tags",
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
										attribute: "description",
										name: "Description",
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
				id: "fields",
				name: "Fields",
				type: "fields",
				definitions: {
					endpoint: {
						url: "/projects/{id}"
					},
					fields: [
						{
							name: "Name",
							attribute: "name",
							fieldType: {id: "text", props: {text: "name"}}
						},
						{
							name: "Text",
							attribute: "text",
							fieldType: {id: "input-text", props: {value: "text"}}
						}
					]
				}
			},
			{
				id: "stuff1",
				name: "stuff1",
				type: "table",
				definitions: {
					expand: {
						type: "fields",
						fields: [
							{
								width: 50,
								name: "Name",
								attribute: "name",
								fieldType: {id: "text", props: {text: "name"}}
							},
							{
								width: 50,
								name: "Tags",
								attribute: "tags",
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
								name: "Input",
								attribute: "input",
								fieldType: {
									id: "input-switch",
									props: {
										value: "switch"
									}
								}
							}
						]
					},
					batch: {
						selectedOptions: {
							label: "{name}",
							link: "/t/projects/{id}"
						},
						sequential: {
							url: "/t/projects/{id}"
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
							onClick: "/t/projects/{id}"
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
								name: "Name",
								attribute: "name",
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
										name: "Client",
										attribute: "client_id",
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
										name: "Name",
										attribute: "name",
										fieldType: {id: "input-text", props: {value: "name"}}
									},
									{
										name: "Start Date",
										attribute: "start_date",
										fieldType: {
											id: "input-date",
											props: {formatValue: "yyyy-MM-dd", date: "start_date"}
										}
									},
									{
										name: "Tags",
										attribute: "tags",
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
										name: "Description",
										attribute: "description",
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
					columns: [
						{
							width: 350,
							name: "Name",
							attribute: "name",
							fieldType: {id: "text", props: {text: "name"}},
							onClick: "/t/projects/{id}"
						},
						{
							name: "Tags",
							attribute: "tags",
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
							attribute: "input",
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
										name: "Client",
										attribute: "client_id",
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
										name: "Name",
										attribute: "name",
										fieldType: {id: "input-text", props: {value: "name"}}
									},
									{
										name: "Start Date",
										attribute: "start_date",
										fieldType: {
											id: "input-date",
											props: {formatValue: "yyyy-MM-dd", date: "start_date"}
										}
									},
									{
										name: "Tags",
										attribute: "tags",
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
										name: "Description",
										attribute: "description",
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
		sidebar: {
			name: "Name",
			sections: [
				{
					name: "History",
					fields: [
						{
							attribute: "created_at",
							name: "Created At",
							fieldType: {id: "date", props: {timestamp: "created_at"}}
						},
						{
							attribute: "creator.name",
							name: "Created By",
							fieldType: {id: "text", props: {text: "creator.name"}}
						},
						{
							attribute: "updated_at",
							name: "Last Modified",
							fieldType: {id: "date", props: {timestamp: "updated_at"}}
						},
						{
							attribute: "editor.name",
							name: "Last Modified By",
							fieldType: {id: "text", props: {text: "editor.name"}}
						}
					]
				},
				{
					name: "Test",
					fields: [
						{
							name: "Name",
							attribute: "name",
							fieldType: {id: "input-text", props: {value: "name"}}
						}
					]
				}
			]
		}
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
