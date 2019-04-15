<template>
	<div class="meta">
		<div class="header">
			<div class="wrap">
				<router-link class="title" :to="{name: 'meta'}">Meta</router-link>

				<div class="menu">
					<router-link to="/meta/actions">Actions</router-link>
					<router-link to="/meta/fields">Fields</router-link>
					<a class="ext" href="/" target="_blank">App</a>
				</div>
			</div>
		</div>

		<div class="router">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.meta {
	$h: 3.5em;

	.header {
		z-index: 2;
		background-color: $white1;
		border-bottom: 1px solid $blue2;
		position: fixed;
		width: 100%;
		display: flex;
		align-items: center;
		height: $h;
		top: 0;
		left: 0;

		a {
			color: $black1;
			text-decoration: none;
		}

		.wrap {
			width: 100%;
			padding: 0 2em;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: 1.5em;
				font-weight: 600;
			}

			.menu {
				font-size: 0.9em;

				a {
					position: relative;
					font-weight: 500;
					padding-bottom: 0.1em;
					margin-left: 1em;

					&.router-link-active,
					&:hover {
						border-bottom: 2px solid $blue5;
					}

					&.ext {
						border-bottom: 0;

						&:after {
							content: "↗️";
							font-size: 0.6em;
							margin-left: 0.2em;
							vertical-align: super;
						}
					}
				}
			}
		}
	}

	.router {
		padding-top: $h;
	}
}
</style>
