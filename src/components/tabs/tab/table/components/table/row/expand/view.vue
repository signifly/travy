<template>
	<tr>
		<td colspan="100%">
			<div class="expand">
				<div class="fields">
					<field
						v-for="(field, i) in expand.fields"
						@event="$emit('event', $event)"
						v-bind="{field, data}"
						:key="i"
					/>
				</div>
			</div>
		</td>
	</tr>
</template>

<script>
import field from "@/components/field";

export default {
	components: {field},
	props: {
		expand: {type: Object, required: true},
		data: {type: Object, required: true}
	}
};
</script>

<style lang="scss" scoped>
.expand {
	background-color: $white1;
	font-size: 16px;
	padding: 1em 2.5em;

	.fields {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
