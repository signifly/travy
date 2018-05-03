<template>
	<div class="ext">
		<div class="title">External scripts</div>
		<div class="items">
			<div class="item">

				<a class="title" href="/ext/retailers" target="_blank">Retailers</a>

				<div class="script">
					<div class="text">Indsæt script hvor kortet skal vises</div>
					<code>&lt;script src="{{host}}/ext/retailers.js"&gt;&lt;/script&gt;</code>
				</div>

				<div class="content">
					<iframe src="/ext/retailers" width="100%" height="600px"></iframe>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			host: `${window.location.protocol}//${window.location.host}`
		}
	}
};
</script>

<style lang="scss" scoped>
.ext {
	margin: 4em 0;

	> .title {
		font-size: 1.5em;
		font-weight: 600;
	}

	.items {
		.item {
			margin: 3em 0;

			.title {
				display: inline-block;
				color: $blue5;
				font-size: 1.25em;
				text-decoration: none;
			}

			.script {
				margin: 1.5em 0;
				font-size: 0.9em;

				code {
					display: inline-block;
					font-size: 0.9em;
					background-color: $blue2;
					border-radius: 4px;
					margin: 1em 0;
					padding: 0.5em 0.75em;
				}
			}

			.content {
				margin-top: 1em;

				iframe {
					border: 0;
				}
			}
		}
	}
}
</style>
