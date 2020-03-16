<template>
	<div
		v-shortkey="{right: ['arrowright'], left: ['arrowleft']}"
		@shortkey="shortkey"
		class="pagination"
		:class="{loading}"
	>
		<Pagination
			background
			layout="sizes, prev, pager, next"
			:page-sizes="[15, 50, 100]"
			v-bind="pagination"
			@size-change="updateSize"
			@current-change="updatePage"
		/>

		<div class="info" v-if="from && to">
			{{ from.toLocaleString("en-US") }}-{{ to.toLocaleString("en-US") }}
			{{ $translate({en: "of", da: "af"}) }}
			{{ total.toLocaleString("en-US") }}
		</div>
	</div>
</template>

<script>
import {Pagination} from "element-ui";

export default {
	components: {Pagination},
	props: {
		current_page: {type: Number, required: true},
		last_page: {type: Number, required: true},
		loading: {type: Boolean, required: true},
		per_page: {type: Number, required: true},
		total: {type: Number, required: true},
		state: {type: Object, required: true},
		from: {type: Number, required: false},
		to: {type: Number, required: false}
	},
	computed: {
		pagination: (t) => ({
			"current-page": t.current_page,
			"page-size": t.per_page,
			total: t.total
		})
	},
	methods: {
		async updatePage(page) {
			page = page === 1 ? undefined : page;
			await this.state.set({page});
			this.$emit("getData");
		},

		async updateSize(pagesize) {
			pagesize = pagesize === 15 ? undefined : pagesize;
			await this.state.set({page: undefined, pagesize});
			this.$emit("getData");
		},

		shortkey({srcKey}) {
			if (this.loading) return;

			if (srcKey === "right" && this.current_page !== this.last_page) {
				this.updatePage(this.current_page + 1);
			}

			if (srcKey === "left" && this.current_page !== 1) {
				this.updatePage(this.current_page - 1);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.pagination {
	transition: cubic(opacity, 0.1s);
	border-top: 1px solid $blue6;
	position: relative;
	text-align: center;
	padding: 1.5em 0;

	&.loading {
		pointer-events: none;
		opacity: 0.6;
	}

	.info {
		align-items: center;
		position: absolute;
		font-size: 0.8em;
		display: flex;
		color: $blue4;
		margin: auto;
		right: 2em;
		bottom: 0;
		top: 0;
	}
}
</style>
