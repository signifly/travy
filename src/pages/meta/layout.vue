<template>
	<div class="page" :class="{sidebar}">
		<div class="sidebar" v-if="sidebar">
			<div class="wrap">
				<div class="title" v-text="sidebar.title" />

				<div class="sections">
					<div
						class="section"
						v-for="(section, i) in sidebar.sections"
						:key="i"
					>
						<div class="items">
							<template v-for="item in section">
								<a
									:key="item.value"
									:href="`#${item.value}`"
									:class="{active: $route.hash === `#${item.value}`}"
								>
									{{ item.label }}
								</a>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="main">
			<div class="wrap">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {type: String, required: false},
		sidebar: {type: Object, required: false}
	},
	mounted() {
		const hash = location.hash;
		location.hash = "";
		location.hash = hash;
	}
};
</script>

<style lang="scss" scoped>
$sidebar: 18em;

.page {
	display: flex;
	justify-content: center;

	&.sidebar {
		justify-content: flex-end;
	}

	.sidebar {
		position: fixed;
		overflow-y: auto;
		width: $sidebar;
		top: 3.5em;
		left: 0;
		bottom: 0;
		border-right: 1px solid $blue2;

		.wrap {
			padding: 3em 2em;

			.title {
				font-size: 1.25em;
				font-weight: 500;
				margin-bottom: 1em;
			}

			.sections {
				.section {
					border-bottom: 1px solid $blue2;
					margin-bottom: 1em;
					padding-bottom: 1em;

					&:last-child {
						border-bottom: 0;
						margin-bottom: 0;
						padding-bottom: 0;
					}

					.items {
						display: flex;
						flex-direction: column;
						font-size: 0.9em;
						// padding-left: 0.75em;

						a {
							margin: 0.3em 0;
							color: $black1;
							text-decoration: none;

							&.active {
								color: $blue5;
								font-weight: 500;
							}
							&:hover {
								color: $blue5;
							}
						}
					}
				}
			}
		}
	}

	.main {
		width: calc(100% - #{$sidebar});
		padding: 5em 0;

		.wrap {
			max-width: 65em;
			margin: 0 auto;
			padding: 0 2em;

			:target:before {
				$s: 140px;
				content: "";
				display: block;
				height: $s;
				margin-top: -$s;
			}

			::v-deep {
				h1 {
					font-size: 1.9em;
					font-weight: 500;
					border-bottom: 1px solid $blue2;
					padding-bottom: 0.5em;
				}

				h2 {
					font-size: 1.5em;
					font-weight: 500;
					margin-top: 1.5em;
				}
			}

			.html {
				line-height: 1.5em;

				::v-deep {
					ul {
						padding-left: 1em;

						li {
							margin-bottom: 0.5em;

							ul {
								li {
									margin-bottom: 0.2em;
								}
							}
						}
					}

					code {
						background-color: rgba(black, 0.05);
						border-radius: 2px;
						padding: 0.1em 0.3em;
						font-size: 0.9em;
					}

					pre {
						display: inline-flex;
						margin: 0;

						code {
							padding: 1em 1.5em;
						}
					}
				}
			}
		}
	}
}
</style>
