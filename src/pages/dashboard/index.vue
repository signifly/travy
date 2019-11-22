<template>
	<div class="dashboard" v-if="definitions">
		<hero v-bind="{hero, modifiers}" :data="user" @refresh="refresh" />

		<div class="container">
			<div class="sections" :key="refreshKey">
				<Section
					v-for="(section, i) in definitions.sections"
					v-bind="section"
					:key="i"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import hero from "@/components/hero";
import Section from "./section";

export default {
	components: {Section, hero},
	data: () => ({
		definitions: null,
		refreshKey: 0
	}),
	computed: {
		url: (t) => `definitions/dashboard/${t.id}`,
		user: (t) => t.$store.getters["user/data"],
		modifiers: (t) => t.definitions.modifiers,
		hero: (t) => t.definitions.hero,
		id: (t) => t.$route.params.id
	},
	methods: {
		async refresh() {
			await this.getData();
			this.refreshKey++;
		},
		async getData() {
			try {
				const {data} = await this.$axios.get(this.url, {
					params: {modifiers: this.$route.query.modifiers},
					customErr: true
				});

				this.definitions = data;
				this.$store.dispatch("base/meta", {title: data.pageTitle});
			} catch ({status}) {
				this.$router.replace({name: "error", params: {status}});
			}
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.dashboard {
	.sections {
		justify-content: space-between;
		overflow: hidden;
		flex-wrap: wrap;
		display: flex;
	}
}
</style>
