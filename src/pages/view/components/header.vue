<template>
	<div class="header">
		<div class="image" :style="{backgroundImage: `url('${image}')`}"/>

		<div class="info">
			<div class="title">
				<div class="text">{{propsData.title}}</div>
				<Tag size="small">{{propsData.tag}}</Tag>
			</div>
		</div>
	</div>
</template>

<script>
import {mapValues, get} from "lodash";
import {Tag} from "element-ui";

export default {
	components: {Tag},
	props: {
		header: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		props: (t) => t.header.props,
		propsData: (t) => mapValues(t.props, (val) => get(t.data, val)),
		image: (t) => t.propsData.image || require("!file-loader!@/assets/icons/noimage.svg")
	}
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	margin-bottom: 2em;

	.image {
		$s: 140px;
		width: $s;
		height: $s;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		margin-right: 2em;
	}

	.info {
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
