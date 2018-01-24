<template>
	<div class="section">
		<div class="title">{{section.title}}</div>

		<div class="fields">
			<field v-for="field in section.fields" v-bind="{field, data}" :key="field.name" @update="$emit('update', $event)"/>
		</div>
	</div>
</template>

<script>
import field from "./field.vue";

export default {
	components: {field},
	props: {
		section: {type: Object, required: true},
		data: {type: Object, required: true}
	}
};
</script>

<style lang="scss" scoped>
.section {
	margin-bottom: 1.5em;

	.title {
		font-size: em(14);
		font-weight: 500;
		border-bottom: 1px solid $black1;
		padding-bottom: 1.2em;
		margin-bottom: 1.2em;
		height: 1.3em;
		display: flex;
		align-items: center;

		.status {
			margin-left: 0.5em;
		}
	}
	.fields {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		// .item {
		// 	width: calc(50% - 1em);
		// 	margin-bottom: 1.5em;
    // 
		// 	.label {
		// 		font-size: em(14);
		// 		color: $blue4;
		// 		margin-bottom: 0.5em;
    //
		// 		display: flex;
		// 		align-items: center;
    //
		// 		.dot {
		// 			display: block;
		// 			$s: 9px;
		// 			width: $s;
		// 			height: $s;
		// 			border-radius: 50%;
		// 			margin-left: 0.5em;
    //
		// 			&.outdated {
		// 				background-color: $warning;
		// 			}
		// 			&.nodata {
		// 				background-color: $danger;
		// 			}
		// 		}
		// 	}
    //
		// 	.el-input {
		// 		.unit {
		// 			user-select: none;
		// 			height: 100%;
		// 			display: flex;
		// 			align-items: center;
		// 			font-size: em(14);
		// 			margin-right: 0.5em;
		// 		}
		// 	}
		// }
	}
}
</style>
