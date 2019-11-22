module.exports = {
	"/account": {
		data: {
			image: "https://picsum.photos/id/11/50/50",
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
		frontpage: "/i/projects",
		title: "Travy",
		locale: "en",
		theme: {
			cover: "https://picsum.photos/id/135/2560/1920",
			logo: "https://picsum.photos/id/135/200/50",
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
					url: "/i/projects"
				},
				{
					name: "Dash",
					url: "/d/dash"
				},
				{
					name: "Media",
					items: [
						{
							name: "test",
							url: "/i/seof"
						},
						{
							name: "Projects",
							items: [
								{
									name: "Projects",
									url: "/i/projects1"
								},
								{
									name: "awdawd",
									url: "/i/projects2"
								},
								{
									name: "sdfsfd",
									url: "/i/projects3"
								}
							]
						}
					]
				},
				{
					name: "Test",
					url: "/i/test"
				},
				{
					name: "404",
					url: "/i/nopage"
				}
			]
		}
	},

	"/definitions/index/projects": {
		pageTitle: "index title",
		hero: {
			title: "Herro {name}",
			subtitle: "Subtitle"
		},
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
											_link: "/i/tags/{id}",
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
										value: "test.switch"
									}
								}
							}
						]
					},
					batch: {
						selectedOptions: {
							label: "{name}",
							link: "/i/projects/{id}"
						},
						sequential: {
							url: "/i/projects/{id}"
						}
					},
					endpoint: {
						url: "http://localhost:3001/v1/admin/projects",
						params: {include: ["tags"]}
					},
					pagination: {},
					sort: {
						items: [
							{label: "Name", value: "name"},
							{label: "Input", value: "input"},
							{label: "Position", value: "pos", manual: true}
						]
					},
					columns: [
						{
							width: 350,
							name: "Name",
							fieldType: {id: "text", props: {text: "name"}},
							onClick: "/i/projects/{id}"
						},
						{
							name: "Tags",
							fieldType: {
								id: "list-tooltip",
								props: {
									items: {
										_link: "/i/tags/{id}",
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
									value: "test.switch"
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
							name: "Add project",
							status: "primary",
							icon: "eleme",
							actionType: {
								id: "modal",
								props: {
									id: "modal",
									name: "Add project",
									fields: [
										{
											name: "Country",
											attribute: "country",
											fieldType: {
												id: "input-select",
												props: {
													value: "country",
													_entities: [
														{
															label: "Denmark",
															emoji: "denmark",
															value: "dk"
														},
														{
															label: "England",
															emoji: "uk",
															value: "uk"
														},
														{
															label: "Murica",
															emoji: "us",
															value: "us",
															disabled: true
														}
													]
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
								}
							}
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
							onClick: "/i/projects/{id}"
						},
						{
							name: "Tags",
							fieldType: {
								id: "list-tooltip",
								props: {
									items: {
										_link: "/i/tags/{id}",
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
		pageTitle: "Project {name}",
		hero: {
			title: "Hello {name}",
			subtitle: "Subtitle"
		},
		modifiers: {
			data: {
				language_code: "dk"
			},
			fields: [
				{
					attribute: "language_code1",
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
				},
				{
					attribute: "language_code2",
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
											_link: "/i/tags/{id}",
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
							link: "/i/projects/{id}"
						},
						sequential: {
							url: "/i/projects/{id}"
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
							{label: "Input", value: "input"},
							{label: "Position", value: "position", manual: true}
						]
					},
					columns: [
						{
							width: 350,
							name: "Name",
							fieldType: {id: "text", props: {text: "name"}},
							onClick: "/i/projects/{id}"
						},
						{
							name: "Tags",
							fieldType: {
								id: "list-tooltip",
								props: {
									items: {
										_link: "/i/tags/{id}",
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
							name: "Add project",
							status: "primary",
							icon: "eleme",
							actionType: {
								id: "modal",
								props: {
									id: "modal",
									name: "Add project",
									fields: [
										{
											name: "Country",
											attribute: "country",
											fieldType: {
												id: "input-select",
												props: {
													value: "country",
													_entities: [
														{
															label: "Denmark",
															emoji: "denmark",
															value: "dk"
														},
														{
															label: "England",
															emoji: "uk",
															value: "uk"
														},
														{
															label: "Murica",
															emoji: "us",
															value: "us",
															disabled: true
														}
													]
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
								}
							}
						}
					]
				}
			}
		],
		endpoint: {url: "http://localhost:3001/v1/admin/projects/{id}"},
		activity: {},
		actions: [
			{
				status: "danger",
				icon: "delete",
				name: "Delete",
				actionType: {
					onSubmit: {
						url: "/i/projects"
					},
					id: "popup",
					props: {
						title: "Delete",
						text: "Are you sure? Please confirm this action.",
						endpoint: {
							url: "http://localhost:3001/v1/admin/projects/{id}",
							method: "delete"
						},
						payload: {
							type: "a type",
							data: {
								test: "test"
							}
						}
					}
				}
			},
			{
				status: "danger",
				icon: "delete",
				name: "Delete2",
				actionType: {
					onSubmit: {
						url: "/i/projects"
					},
					id: "popup",
					props: {
						title: "Delete",
						text: "Are you sure? Please confirm this action.",
						endpoint: {
							url: "http://localhost:3001/v1/admin/projects/{id}",
							method: "delete"
						},
						payload: {
							type: "a type",
							data: {
								test: "test"
							}
						}
					}
				}
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

	"/definitions/dashboard/dash": {
		pageTitle: "dashboard",
		hero: {
			title: "Hello {name}",
			subtitle: "Subtitle"
		},
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
		sections: [
			{
				width: 50,
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
													_link: "/i/tags/{id}",
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
												value: "test.switch"
											}
										}
									}
								]
							},
							batch: {
								selectedOptions: {
									label: "{name}",
									link: "/i/projects/{id}"
								},
								sequential: {
									url: "/i/projects/{id}"
								}
							},
							endpoint: {
								url: "http://localhost:3001/v1/admin/projects",
								params: {include: ["tags"]}
							},
							sort: {
								items: [
									{label: "Name", value: "name"},
									{label: "Input", value: "input"},
									{label: "Position", value: "pos", manual: true}
								]
							},
							columns: [
								{
									width: 350,
									name: "Name",
									fieldType: {id: "text", props: {text: "name"}},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "list-tooltip",
										props: {
											items: {
												_link: "/i/tags/{id}",
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
											value: "test.switch"
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
									name: "Add project",
									status: "primary",
									icon: "eleme",
									actionType: {
										id: "modal",
										props: {
											id: "modal",
											name: "Add project",
											fields: [
												{
													name: "Country",
													attribute: "country",
													fieldType: {
														id: "input-select",
														props: {
															value: "country",
															_entities: [
																{
																	label: "Denmark",
																	emoji: "denmark",
																	value: "dk"
																},
																{
																	label: "England",
																	emoji: "uk",
																	value: "uk"
																},
																{
																	label: "Murica",
																	emoji: "us",
																	value: "us",
																	disabled: true
																}
															]
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
														props: {
															formatValue: "yyyy-MM-dd",
															date: "start_date"
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
										}
									}
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
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "list-tooltip",
										props: {
											items: {
												_link: "/i/tags/{id}",
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
						}
					}
				]
			},
			{
				width: 50,
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
													_link: "/i/tags/{id}",
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
												value: "test.switch"
											}
										}
									}
								]
							},
							batch: {
								selectedOptions: {
									label: "{name}",
									link: "/i/projects/{id}"
								},
								sequential: {
									url: "/i/projects/{id}"
								}
							},
							endpoint: {
								url: "http://localhost:3001/v1/admin/projects",
								params: {include: ["tags"]}
							},
							sort: {
								items: [
									{label: "Name", value: "name"},
									{label: "Input", value: "input"},
									{label: "Position", value: "pos", manual: true}
								]
							},
							columns: [
								{
									width: 350,
									name: "Name",
									fieldType: {id: "text", props: {text: "name"}},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "list-tooltip",
										props: {
											items: {
												_link: "/i/tags/{id}",
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
											value: "test.switch"
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
									name: "Add project",
									status: "primary",
									icon: "eleme",
									actionType: {
										id: "modal",
										props: {
											id: "modal",
											name: "Add project",
											fields: [
												{
													name: "Country",
													attribute: "country",
													fieldType: {
														id: "input-select",
														props: {
															value: "country",
															_entities: [
																{
																	label: "Denmark",
																	emoji: "denmark",
																	value: "dk"
																},
																{
																	label: "England",
																	emoji: "uk",
																	value: "uk"
																},
																{
																	label: "Murica",
																	emoji: "us",
																	value: "us",
																	disabled: true
																}
															]
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
														props: {
															formatValue: "yyyy-MM-dd",
															date: "start_date"
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
										}
									}
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
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "list-tooltip",
										props: {
											items: {
												_link: "/i/tags/{id}",
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
						}
					}
				]
			},
			{
				width: 50,
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
													_link: "/i/tags/{id}",
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
												value: "test.switch"
											}
										}
									}
								]
							},
							batch: {
								selectedOptions: {
									label: "{name}",
									link: "/i/projects/{id}"
								},
								sequential: {
									url: "/i/projects/{id}"
								}
							},
							endpoint: {
								url: "http://localhost:3001/v1/admin/projects",
								params: {include: ["tags"]}
							},
							sort: {
								items: [
									{label: "Name", value: "name"},
									{label: "Input", value: "input"},
									{label: "Position", value: "pos", manual: true}
								]
							},
							columns: [
								{
									width: 350,
									name: "Name",
									fieldType: {id: "text", props: {text: "name"}},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "list-tooltip",
										props: {
											items: {
												_link: "/i/tags/{id}",
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
											value: "test.switch"
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
									name: "Add project",
									status: "primary",
									icon: "eleme",
									actionType: {
										id: "modal",
										props: {
											id: "modal",
											name: "Add project",
											fields: [
												{
													name: "Country",
													attribute: "country",
													fieldType: {
														id: "input-select",
														props: {
															value: "country",
															_entities: [
																{
																	label: "Denmark",
																	emoji: "denmark",
																	value: "dk"
																},
																{
																	label: "England",
																	emoji: "uk",
																	value: "uk"
																},
																{
																	label: "Murica",
																	emoji: "us",
																	value: "us",
																	disabled: true
																}
															]
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
														props: {
															formatValue: "yyyy-MM-dd",
															date: "start_date"
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
										}
									}
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
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "list-tooltip",
										props: {
											items: {
												_link: "/i/tags/{id}",
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
						}
					}
				]
			}
		]
	}
};
