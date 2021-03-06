module.exports = {
	"/definitions/view/account": {
		pageTitle: "Account",
		hero: {
			title: "Hello {name}",
			subtitle: "Subtitle"
		},
		tabs: [
			{
				name: "Fields",
				type: "fields",
				definitions: {
					endpoint: {
						url: "/projects/{id}"
					},
					fields: [
						{
							name: "Name",
							fieldType: {
								id: "text",
								props: {
									text: "{name}"
								}
							}
						},
						{
							name: "Text",
							fieldType: {
								id: "input-text",
								props: {
									value: "{text}"
								}
							}
						}
					]
				}
			}
		],
		sidebar: {
			name: "Name",
			groups: [
				{
					name: "History",
					fields: [
						{
							name: "Created At",
							fieldType: {
								id: "date",
								props: {
									timestamp: "{created_at}"
								}
							}
						}
					]
				}
			]
		}
	},

	"/account": {
		data: {
			image_url: "https://picsum.photos/id/11/50/50",
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
			color: "slateblue"
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
					url: "/test"
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
					name: "Language",
					fieldType: {
						id: "input-select",
						props: {
							clearable: false,
							value: "{language_code}",
							entities: [
								{
									label: "Danmark",
									value: "dk"
								},
								{
									label: "England",
									value: "uk"
								},
								{
									label: "Murica",
									value: "us",
									disabled: true
								}
							]
						}
					}
				}
			]
		},
		tabs: [
			{
				name: "stuff1",
				type: "table",
				definitions: {
					expand: {
						type: "fields",
						fields: [
							{
								width: 50,
								name: "Name",
								fieldType: {
									id: "text",
									props: {
										text: "{name}"
									}
								}
							},
							{
								width: 50,
								name: "Tags",
								fieldType: {
									id: "item-list-tooltip",
									props: {
										items: {
											link: "/i/tags/{id}",
											"@scope": "tags",
											label: "{key}"
										}
									}
								}
							},
							{
								name: "input",
								fieldType: {
									id: "input-toggle",
									props: {
										value: "{test.switch}"
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
						},
						bulk: {
							action: {
								name: "Bulk",
								icon: "eleme",
								actionType: {
									id: "dropdown",
									props: {
										actions: [
											{
												name: "Modal",
												actionType: {
													id: "modal",
													props: {
														name: "Modal title",
														endpoint: {
															method: "post",
															url: "/projects"
														},
														fields: [
															{
																name: "a field",
																fieldType: {
																	id: "input-text",
																	props: {
																		value: "{input}"
																	}
																}
															},
															{
																name: "a field",
																fieldType: {
																	id: "input-text",
																	props: {
																		value: "{input2}"
																	}
																}
															},
															{
																name: "upload",
																fieldType: {
																	id: "input-files",
																	props: {
																		value: "{files}",
																		url: "/signedurls"
																	}
																}
															}
														],
														payload: {
															data: {
																input: "32",
																input2: "34"
															}
														}
													}
												}
											},
											{
												name: "Link",
												actionType: {
													id: "link",
													props: {
														url: "/"
													}
												}
											}
										]
									}
								}
							}
						}
					},
					endpoint: {
						url: "/projects",
						params: {
							include: ["tags"]
						}
					},
					pagination: {},
					sort: {
						default: "name",
						items: [
							{
								label: "Name (A-Z)",
								value: "name"
							},
							{
								label: "Name (Z-A)",
								value: "-name"
							},
							{
								label: "Position",
								value: "pos",
								manual: true
							}
						]
					},
					columns: [
						{
							name: "Fields",
							fieldType: {
								id: "fields",
								props: {
									fields: [
										{
											name: "Name1",
											fieldType: {
												id: "text",
												props: {
													text: "{name}"
												}
											}
										},
										{
											name: "Name2",
											fieldType: {
												id: "text",
												props: {
													text: "sub: {name}",
													textStyle: {
														fontSize: "12px",
														color: "grey"
													}
												}
											}
										}
									]
								}
							}
						},
						{
							name: "Name",
							onClick: "/i/projects/{id}",
							tooltip: [
								{
									show: {key: "{id}", value: 1, operator: "eq"},
									text: "value is 1"
								}
							],
							fieldType: {
								id: "text",
								props: {
									text: "{name}"
								}
							}
						},
						{
							name: "Tags",
							fieldType: {
								id: "item-list-tooltip",
								props: {
									items: {
										link: "/i/tags/{id}",
										"@scope": "tags",
										label: "{key}"
									}
								}
							}
						},
						{
							name: "input",
							fieldType: {
								id: "input-toggle",
								props: {
									value: "{test.switch}"
								}
							}
						},
						{
							name: "Actions",
							fieldType: {
								id: "button-action",
								props: {
									action: {
										name: "Actions",
										status: "primary",
										icon: "arrow-down",
										actionType: {
											id: "dropdown",
											props: {
												actions: [
													{
														name: "Modal",
														actionType: {
															id: "modal",
															props: {
																name: "Modal title post",
																endpoint: {
																	method: "post",
																	url: "/projects/{id}"
																},
																fields: [
																	{
																		name: "a field",
																		fieldType: {
																			id: "input-text",
																			props: {
																				value: "{input}"
																			}
																		}
																	},
																	{
																		name: "a field",
																		fieldType: {
																			id: "input-text",
																			props: {
																				value: "{input2}"
																			}
																		}
																	}
																],
																payload: {
																	data: {
																		input: "32",
																		input2: "34"
																	}
																}
															}
														}
													},
													{
														name: "View",
														status: "primary",
														icon: null,
														actionType: {
															id: "link",
															props: {
																url: "/i/projects/{id}"
															}
														}
													},
													{
														name: "Delete",
														status: "primary",
														icon: null,
														actionType: {
															id: "confirm",
															props: {
																title: "Delete",
																text:
																	"Are you sure? Please confirm this action.",
																endpoint: {
																	url: "/projects/{id}",
																	method: "delete"
																},
																payload: {}
															}
														}
													}
												]
											}
										},
										size: "mini"
									}
								}
							},
							width: 30
						},
						{
							name: "dot",
							fieldType: {
								id: "fields",
								props: {
									fields: [
										{
											name: "dot",
											show: [{key: "{id}", value: 1, operator: "eq"}],
											fieldType: {
												id: "dot",
												props: {
													color: "MediumSeaGreen",
													icon: "check"
												}
											}
										},
										{
											name: "dot",
											show: [{key: "{id}", value: 2, operator: "eq"}],
											fieldType: {
												id: "dot",
												props: {
													color: "SlateBlue",
													icon: "reading"
												}
											}
										},
										{
											name: "dot",
											show: [{key: "{id}", value: 3, operator: "eq"}],
											fieldType: {
												id: "dot",
												props: {
													color: "red",
													icon: "close"
												}
											}
										}
									]
								}
							}
						}
					],
					filters: {
						data: {
							testing: "stay",
							name: "test"
						},
						search: {
							placeholder: "Search..."
						},
						fields: [
							{
								name: "Name",
								fieldType: {
									id: "input-text",
									props: {
										value: "{name}"
									}
								}
							}
						]
					},
					actions: [
						{
							name: "Drop",
							status: "primary",
							icon: "eleme",
							actionType: {
								id: "dropdown",
								props: {
									actions: [
										{
											name: "Modal",
											actionType: {
												id: "modal",
												props: {
													name: "Modal title",
													endpoint: {
														method: "post",
														url: "/projects"
													},
													disableSubmit: [
														{key: "{input2}", operator: "eq", value: ""}
													],
													fields: [
														{
															name: "a field",
															fieldType: {
																id: "input-text",
																props: {
																	value: "{input}"
																}
															}
														},
														{
															name: "a field",
															fieldType: {
																id: "input-text",
																props: {
																	value: "{input2}"
																}
															}
														},
														{
															name: "upload",
															fieldType: {
																id: "input-files",
																props: {
																	value: "{files}",
																	url: "/signedurls",
																	multiple: true
																}
															}
														}
													],
													payload: {
														data: {
															input: "32",
															input2: "34"
														}
													}
												}
											}
										},
										{
											name: "Link",
											actionType: {
												id: "link",
												props: {
													url: "/"
												}
											}
										}
									]
								}
							}
						},
						{
							name: "Add project",
							status: "primary",
							icon: "eleme",
							actionType: {
								id: "dropdown",
								props: {
									actions: [
										{
											name: "Modal",
											actionType: {
												id: "modal",
												props: {
													id: "modal",
													name: "Add project",
													fields: [
														{
															name: "Country",
															fieldType: {
																id: "input-select",
																props: {
																	value: "{country}",
																	entities: [
																		{
																			label: "Denmark",
																			value: "dk"
																		},
																		{
																			label: "England",
																			value: "uk"
																		},
																		{
																			label: "Murica",
																			value: "us",
																			disabled: true
																		}
																	]
																}
															}
														},
														{
															name: "Name",
															fieldType: {
																id: "input-text",
																props: {
																	value: "{name}"
																}
															}
														},
														{
															name: "Start Date",
															fieldType: {
																id: "input-date",
																props: {
																	formatValue: "yyyy-MM-dd",
																	date: "{start_date}"
																}
															}
														},
														{
															name: "Description",
															fieldType: {
																id: "input-editor-markdown",
																props: {
																	content: "{description}"
																}
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
														url: "/projects",
														method: "post"
													}
												}
											}
										}
									]
								}
							}
						}
					]
				}
			},
			{
				name: "stuff 2",
				type: "table",
				definitions: {
					row: {
						background: [
							{
								color: "azure",
								show: {key: "{have_background}", operator: "eq", value: true}
							},
							{
								color: "PapayaWhip",
								show: {key: "{have_background}", operator: "eq", value: false}
							}
						]
					},
					endpoint: {
						url: "/projects",
						params: {
							include: ["tags"]
						}
					},
					pagination: {},
					expand: {
						type: "fields",
						fields: [
							{
								width: 100,
								name: "Name",
								fieldType: {
									id: "text",
									props: {
										text: "{name}"
									}
								}
							}
						]
					},
					columns: [
						{
							width: 20,
							name: "Name",
							fieldType: {
								id: "text",
								props: {
									text: "{name}"
								}
							},
							onClick: "/i/projects/{id}"
						},
						{
							name: "input",
							fieldType: {
								id: "input-toggle",
								props: {
									value: "{switch}"
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
				tags: [
					{
						key: "item1",
						id: 1
					},
					{
						key: "item2",
						id: 2
					}
				],
				is_deleted: false
			},
			{
				id: 2,
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
				is_deleted: false,
				have_background: false
			},
			{
				id: 3,
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
				is_deleted: false,
				have_background: true
			}
		],
		links: {
			first: "/projects?page=1",
			last: "/projects?page=1",
			prev: null,
			next: null
		},
		meta: {
			current_page: 1,
			from: 1,
			last_page: 1,
			path: "/projects",
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
					name: "Language",
					fieldType: {
						id: "input-select",
						props: {
							clearable: false,
							value: "{language_code}",
							entities: [
								{
									label: "Danmark",
									value: "dk"
								},
								{
									label: "England",
									value: "uk"
								},
								{
									label: "Murica",
									value: "us",
									disabled: true
								}
							]
						}
					}
				},
				{
					name: "Language",
					fieldType: {
						id: "input-select",
						props: {
							clearable: false,
							value: "{language_code}",
							entities: [
								{
									label: "Danmark",
									value: "dk"
								},
								{
									label: "England",
									value: "uk"
								},
								{
									label: "Murica",
									value: "us",
									disabled: true
								}
							]
						}
					}
				}
			]
		},
		tabs: [
			{
				name: "Fields",
				type: "fields",
				definitions: {
					endpoint: {
						url: "/projects/{id}"
					},
					fields: [
						{
							name: "Name",
							fieldType: {
								id: "text",
								props: {
									text: "{name}"
								}
							}
						},
						{
							name: "Text",
							fieldType: {
								id: "input-text",
								props: {
									value: "{text}"
								}
							}
						}
					]
				}
			},
			{
				name: "stuff1",
				type: "table",
				definitions: {
					link: "/i/projects",
					expand: {
						type: "fields",
						fields: [
							{
								width: 20,
								name: "Name",
								fieldType: {
									id: "text",
									props: {
										text: "{name}"
									}
								}
							},
							{
								width: 20,
								name: "Tags",
								fieldType: {
									id: "item-list-tooltip",
									props: {
										items: {
											link: "/i/tags/{id}",
											"@scope": "tags",
											label: "{key}"
										}
									}
								}
							},
							{
								name: "Input",
								fieldType: {
									id: "input-toggle",
									props: {
										value: "{switch}"
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
						url: "/projects",
						params: {
							include: ["tags"]
						}
					},
					pagination: {},
					sort: {
						default: "name",
						items: [
							{
								label: "Name (A-Z)",
								value: "name"
							},
							{
								label: "Name (Z-A)",
								value: "-name"
							},
							{
								label: "Position",
								value: "pos",
								manual: true
							}
						]
					},
					columns: [
						{
							name: "Name",
							width: 30,
							fieldType: {
								id: "text",
								props: {
									text: "{name}"
								}
							},
							onClick: "/i/projects/{id}"
						},
						{
							name: "Tags",
							fieldType: {
								id: "item-list-tooltip",
								props: {
									items: {
										link: "/i/tags/{id}",
										"@scope": "tags",
										label: "{key}"
									}
								}
							}
						},
						{
							name: "input",
							fieldType: {
								id: "input-toggle",
								props: {
									value: "{switch}"
								}
							}
						},
						{
							name: "Hidden",
							width: 10,
							fieldType: {
								id: "text",
								props: {
									text: "hidden"
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
								fieldType: {
									id: "input-text",
									props: {
										value: "{name}"
									}
								}
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
											fieldType: {
												id: "input-select",
												props: {
													value: "{country}",
													entities: [
														{
															label: "Denmark",
															value: "dk"
														},
														{
															label: "England",
															value: "uk"
														},
														{
															label: "Murica",
															value: "us",
															disabled: true
														}
													]
												}
											}
										},
										{
											name: "Name",
											fieldType: {
												id: "input-text",
												props: {
													value: "{name}"
												}
											}
										},
										{
											name: "Start Date",
											fieldType: {
												id: "input-date",
												props: {
													formatValue: "yyyy-MM-dd",
													date: "{start_date}"
												}
											}
										},
										{
											name: "Description",
											fieldType: {
												id: "input-editor-markdown",
												props: {
													content: "{description}"
												}
											}
										}
									],
									payload: {
										data: {
											client_id: "",
											name: "{name}",
											start_date: "",
											tags: [],
											description: ""
										}
									},
									endpoint: {
										url: "/projects",
										method: "post"
									}
								}
							}
						}
					]
				}
			}
		],
		activity: {
			expand: {
				type: "fields",
				fields: [
					{
						width: 20,
						name: "Name",
						fieldType: {
							id: "text",
							props: {
								text: "{name}"
							}
						}
					},
					{
						width: 20,
						name: "Tags",
						fieldType: {
							id: "item-list-tooltip",
							props: {
								items: {
									link: "/i/tags/{id}",
									"@scope": "tags",
									label: "{key}"
								}
							}
						}
					},
					{
						name: "input",
						fieldType: {
							id: "input-toggle",
							props: {
								value: "{test.switch}"
							}
						}
					}
				]
			},
			endpoint: {
				url: "/projects",
				params: {
					include: ["tags"]
				}
			},
			pagination: {},
			columns: [
				{
					width: 30,
					name: "Name",
					fieldType: {
						id: "text",
						props: {
							text: "{name}"
						}
					},
					onClick: "/i/projects/{id}"
				},
				{
					name: "Tags",
					fieldType: {
						id: "item-list-tooltip",
						props: {
							items: {
								link: "/i/tags/{id}",
								"@scope": "tags",
								label: "{key}"
							}
						}
					}
				},
				{
					name: "input",
					fieldType: {
						id: "input-toggle",
						props: {
							value: "{test.switch}"
						}
					}
				},
				{
					name: "Actions",
					fieldType: {
						id: "button-action",
						props: {
							action: {
								name: "Actions",
								status: "primary",
								icon: "arrow-down",
								actionType: {
									id: "dropdown",
									props: {
										actions: [
											{
												name: "View",
												status: "primary",
												icon: null,
												actionType: {
													id: "link",
													props: {
														url: "/i/projects/{id}"
													}
												}
											},
											{
												name: "Delete",
												status: "primary",
												icon: null,
												actionType: {
													id: "confirm",
													props: {
														title: "Delete",
														text: "Are you sure? Please confirm this action.",
														endpoint: {
															url: "/projects/{id}",
															method: "delete"
														},
														payload: {}
													}
												}
											}
										]
									}
								},
								size: "mini"
							}
						}
					},
					width: 20
				}
			]
		},
		actions: [
			{
				name: "Modal",
				actionType: {
					id: "modal",
					props: {
						name: "Modal title post",
						endpoint: {
							method: "post",
							url: "/projects/{id}"
						},
						fields: [
							{
								name: "a field",
								fieldType: {
									id: "input-text",
									props: {
										value: "{input}"
									}
								}
							},
							{
								name: "a field",
								fieldType: {
									id: "input-text",
									props: {
										value: "{input2}"
									}
								}
							}
						],
						payload: {
							data: {
								input: "32",
								input2: "34"
							}
						}
					}
				}
			},
			{
				name: "Drop2",
				status: "primary",
				icon: "eleme",
				actionType: {
					id: "dropdown",
					props: {
						actions: [
							{
								name: "Modal",
								actionType: {
									id: "modal",
									props: {
										name: "Modal title",
										endpoint: {
											method: "post",
											url: "/example/{id}"
										},
										fields: [
											{
												name: "a field",
												fieldType: {
													id: "input-text",
													props: {
														value: "{input}"
													}
												}
											},
											{
												name: "a field",
												fieldType: {
													id: "input-text",
													props: {
														value: "{input2}"
													}
												}
											}
										],
										payload: {
											data: {
												input: "32",
												input2: "34"
											}
										}
									}
								}
							},
							{
								name: "Link",
								actionType: {
									show: [
										{
											key: "{is_deleted}",
											operator: "neq",
											value: false
										}
									],
									id: "link",
									props: {
										url: "/"
									}
								}
							}
						]
					}
				}
			},
			{
				status: "danger",
				icon: "delete",
				name: "Delete",
				actionType: {
					onSubmit: {
						url: "/i/projects"
					},
					id: "confirm",
					props: {
						text: "Are you sure? Please confirm this action.",
						endpoint: {
							url: "/projects/{id}",
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
					id: "confirm",
					props: {
						text: "Are you sure? Please confirm this action.",
						endpoint: {
							url: "/projects/{id}",
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
			groups: [
				{
					name: "History",
					fields: [
						{
							name: "Created At",
							fieldType: {
								id: "date",
								props: {
									timestamp: "{created_at}"
								}
							}
						},
						{
							name: "Created By",
							fieldType: {
								id: "text",
								props: {
									text: "{creator.name}"
								}
							}
						},
						{
							name: "Last Modified",
							fieldType: {
								id: "date",
								props: {
									timestamp: "{updated_at}"
								}
							}
						},
						{
							name: "Last Modified By",
							fieldType: {
								id: "text",
								props: {
									text: "{editor.name}"
								}
							}
						}
					]
				},
				{
					name: "Test",
					fields: [
						{
							name: "Name",
							fieldType: {
								id: "input-text",
								props: {
									value: "{name}"
								}
							}
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
			created_at: 1568191509,
			updated_at: 1568191509,
			is_deleted: false,
			deleted_at: null,
			created_by: null,
			updated_by: null,
			creator: null,
			editor: null,
			tags: []
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
					client_id: 8,
					name: "Clemens Cassin",
					start_date: null,
					status: "open",
					description: null
				},
				created_at: 1568191509,
				updated_at: 1568191509,
				humanized_subject: "project",
				revertable: false,
				causer: null
			},
			{
				id: 23,
				log_name: "default",
				description: "created",
				subject_id: 4,
				subject_type: "App\\Models\\Project",
				causer_id: null,
				causer_type: null,
				properties: {
					client_id: 8,
					name: "Clemens Cassin",
					start_date: null,
					status: "open",
					description: null
				},
				created_at: 1568191509,
				updated_at: 1568191509,
				humanized_subject: "project",
				revertable: false,
				causer: null
			}
		],
		links: {
			first: "/projects/3/activity?page=1",
			last: "/projects/3/activity?page=1",
			prev: null,
			next: null
		},
		meta: {
			current_page: 1,
			from: 1,
			last_page: 1,
			path: "/projects/3/activity",
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
					name: "Language",
					fieldType: {
						id: "input-select",
						props: {
							clearable: false,
							value: "{language_code}",
							entities: [
								{
									label: "Danmark",
									value: "dk"
								},
								{
									label: "England",
									value: "uk"
								},
								{
									label: "Murica",
									value: "us",
									disabled: true
								}
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
						name: "stuff1",
						type: "table",
						definitions: {
							expand: {
								type: "fields",
								fields: [
									{
										width: 20,
										name: "Name",
										fieldType: {
											id: "text",
											props: {
												text: "{name}"
											}
										}
									},
									{
										width: 20,
										name: "Tags",
										fieldType: {
											id: "item-list-tooltip",
											props: {
												items: {
													link: "/i/tags/{id}",
													"@scope": "tags",
													label: "{key}"
												}
											}
										}
									},
									{
										name: "input",
										fieldType: {
											id: "input-toggle",
											props: {
												value: "{test.switch}"
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
								url: "/projects",
								params: {
									include: ["tags"]
								}
							},
							sort: {
								default: "name",
								items: [
									{
										label: "Name (A-Z)",
										value: "name"
									},
									{
										label: "Name (Z-A)",
										value: "-name"
									},
									{
										label: "Position",
										value: "pos",
										manual: true
									}
								]
							},
							columns: [
								{
									width: 30,
									name: "Name",
									fieldType: {
										id: "text",
										props: {
											text: "{name}"
										}
									},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "item-list-tooltip",
										props: {
											items: {
												link: "/i/tags/{id}",
												"@scope": "tags",
												label: "{key}"
											}
										}
									}
								},
								{
									name: "input",
									fieldType: {
										id: "input-toggle",
										props: {
											value: "{test.switch}"
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
										fieldType: {
											id: "input-text",
											props: {
												value: "{name}"
											}
										}
									}
								]
							}
						}
					},
					{
						name: "stuff 2",
						type: "table",
						definitions: {
							endpoint: {
								url: "/projects",
								params: {
									include: ["tags"]
								}
							},
							pagination: {},
							columns: [
								{
									width: 30,
									name: "Name",
									fieldType: {
										id: "text",
										props: {
											text: "{name}"
										}
									},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "item-list-tooltip",
										props: {
											items: {
												_link: "/i/tags/{id}",
												"@scope": "tags",
												label: "{key}"
											}
										}
									}
								},
								{
									name: "input",
									fieldType: {
										id: "input-toggle",
										props: {
											value: "{switch}"
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
						name: "stuff1",
						type: "table",
						definitions: {
							expand: {
								type: "fields",
								fields: [
									{
										width: 20,
										name: "Name",
										fieldType: {
											id: "text",
											props: {
												text: "{name}"
											}
										}
									},
									{
										width: 20,
										name: "Tags",
										fieldType: {
											id: "item-list-tooltip",
											props: {
												items: {
													link: "/i/tags/{id}",
													"@scope": "tags",
													label: "{key}"
												}
											}
										}
									},
									{
										name: "input",
										fieldType: {
											id: "input-toggle",
											props: {
												value: "{test.switch}"
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
								url: "/projects",
								params: {
									include: ["tags"]
								}
							},
							sort: {
								default: "name",
								items: [
									{
										label: "Name (A-Z)",
										value: "name"
									},
									{
										label: "Name (Z-A)",
										value: "-name"
									},
									{
										label: "Position",
										value: "pos",
										manual: true
									}
								]
							},
							columns: [
								{
									width: 30,
									name: "Name",
									fieldType: {
										id: "text",
										props: {
											text: "{name}"
										}
									},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "item-list-tooltip",
										props: {
											items: {
												link: "/i/tags/{id}",
												"@scope": "tags",
												label: "{key}"
											}
										}
									}
								},
								{
									name: "input",
									fieldType: {
										id: "input-toggle",
										props: {
											value: "{test.switch}"
										}
									}
								}
							],
							filters: {
								search: {
									placeholder: "Search..."
								}
							}
						}
					},
					{
						id: "stuff2",
						name: "stuff 2",
						type: "table",
						definitions: {
							endpoint: {
								url: "/projects",
								params: {
									include: ["tags"]
								}
							},
							pagination: {},
							columns: [
								{
									width: 30,
									name: "Name",
									fieldType: {
										id: "text",
										props: {
											text: "{name}"
										}
									},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "item-list-tooltip",
										props: {
											items: {
												link: "/i/tags/{id}",
												"@scope": "tags",
												label: "{key}"
											}
										}
									}
								},
								{
									name: "input",
									fieldType: {
										id: "input-toggle",
										props: {
											value: "{switch}"
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
						name: "stuff1",
						type: "table",
						definitions: {
							expand: {
								type: "fields",
								fields: [
									{
										width: 20,
										name: "Name",
										fieldType: {
											id: "text",
											props: {
												text: "{name}"
											}
										}
									},
									{
										width: 20,
										name: "Tags",
										fieldType: {
											id: "item-list-tooltip",
											props: {
												items: {
													link: "/i/tags/{id}",
													"@scope": "tags",
													label: "{key}"
												}
											}
										}
									},
									{
										name: "input",
										fieldType: {
											id: "input-toggle",
											props: {
												value: "{test.switch}"
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
								url: "/projects",
								params: {
									include: ["tags"]
								}
							},
							sort: {
								default: "name",
								items: [
									{
										label: "Name (A-Z)",
										value: "name"
									},
									{
										label: "Name (Z-A)",
										value: "-name"
									},
									{
										label: "Position",
										value: "pos",
										manual: true
									}
								]
							},
							columns: [
								{
									width: 30,
									name: "Name",
									fieldType: {
										id: "text",
										props: {
											text: "{name}"
										}
									},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "item-list-tooltip",
										props: {
											items: {
												link: "/i/tags/{id}",
												"@scope": "tags",
												label: "{key}"
											}
										}
									}
								},
								{
									name: "input",
									fieldType: {
										id: "input-toggle",
										props: {
											value: "{test.switch}"
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
										fieldType: {
											id: "input-text",
											props: {
												value: "{name}"
											}
										}
									}
								]
							}
						}
					},
					{
						id: "stuff2",
						name: "stuff 2",
						type: "table",
						definitions: {
							endpoint: {
								url: "/projects",
								params: {
									include: ["tags"]
								}
							},
							pagination: {},
							columns: [
								{
									width: 30,
									name: "Name",
									fieldType: {
										id: "text",
										props: {
											text: "{name}"
										}
									},
									onClick: "/i/projects/{id}"
								},
								{
									name: "Tags",
									fieldType: {
										id: "item-list-tooltip",
										props: {
											items: {
												link: "/i/tags/{id}",
												"@scope": "tags",
												label: "{key}"
											}
										}
									}
								},
								{
									name: "input",
									fieldType: {
										id: "input-toggle",
										props: {
											value: "{switch}"
										}
									}
								}
							]
						}
					}
				]
			}
		]
	},

	"/signedurls": {
		data: {
			id: "d85eba1e-979c-448c-9a4a-8a8c3e23b397",
			key: "string",
			url: "http://localhost:3001/s3-upload",
			headers: {
				"Content-Type": "application/octet-stream"
			}
		}
	},

	"/s3-upload": {}
};
