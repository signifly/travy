<template>
	<div class="view-head">
		<div class="image">
			<div class="img" :style="{backgroundImage: `url(${image})`}" />
		</div>
		<div class="info">
			<div class="title">
				<div class="text">{{title}}</div>
				<Tag size="small">{{tag}}</Tag>
			</div>
		</div>
	</div>
</template>

<script>
const noimage = require("!file-loader!@/assets/icons/noimage.svg");
import {Tag} from "element-ui";

export default {
	components: {Tag},
	props: {
		title: {type: String, required: true},
		image: {type: String, required: false, default: noimage},
		tag: {type: [String, Number], required: true}
	}
};
</script>

<style lang="scss" scoped>
.view-head {
	display: flex;

	.image {
		.img {
			background-color: $white1;
			$s: em(160);
			width: $s;
			height: $s;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			box-shadow: 0 4px 6px 0 rgba(94,109,130,0.07);
		}
	}

	.info {
		margin-left: 2em;
		margin-top: 1em;

		.title {
			display: flex;
			align-items: center;

			.text {
				font-size: em(20);
				margin-right: 0.75em;
			}
		}
	}
}
</style>
