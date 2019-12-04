<template>
	<div class="popover">
		<div class="text">
			{{ $translate({en: "Move", da: "Flyt"}) }}
			{{ selected.items.length }}/{{ meta.total }}
		</div>

		<div class="position">
			<Select
				:style="{width: '55%'}"
				placeholder="Select"
				v-model="select"
				size="small"
			>
				<Option label="Top" value="top" />
				<Option label="Bottom" value="bottom" />
				<Option label="Position" value="position" />
			</Select>

			<InputNumber
				v-if="select === 'position'"
				controls-position="right"
				:style="{width: '40%'}"
				v-model="position"
				:max="meta.total"
				size="small"
				:min="0"
			/>
		</div>

		<Button
			:disabled="!select"
			v-bind="{loading}"
			class="submit"
			@click="move"
			size="small"
		>
			{{ $translate({en: "Submit", da: "Gem"}) }}
		</Button>
	</div>
</template>

<script>
import {Button, Select, Option, InputNumber} from "element-ui";

export default {
	components: {Button, Select, Option, InputNumber},
	props: {
		endpoint: {type: Object, required: true},
		selected: {type: Object, required: true},
		state: {type: Object, required: true},
		meta: {type: Object, required: true}
	},
	data: () => ({
		loading: false,
		position: 0,
		select: ""
	}),
	methods: {
		async move() {
			this.loading = true;

			await this.$axios.post(`${this.endpoint.url}/move`, {
				ids: this.selected.items.map((x) => x.id),
				value: this.state.query.sort,
				position: {
					position: this.position,
					bottom: this.meta.total,
					top: 0
				}[this.select]
			});

			this.$emit("event", {
				actions: {refresh: true},
				done: () => {
					this.select = "";
					this.position = 0;
					this.$emit("close");
					this.loading = false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.popover {
	font-weight: 500;
	font-size: 12px;
	padding: 0.75em;

	.position {
		justify-content: space-between;
		margin: 1em 0 1.5em;
		display: flex;
	}

	.submit {
		width: 100%;
	}
}
</style>
