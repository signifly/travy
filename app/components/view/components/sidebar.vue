<template>
	<div class="sidebar">
		<div class="sections">
			<div class="section" v-for="(section, i) in sections" :class="sectionClasses[i]">
				<div class="wrap">
					<vField
						v-for="field in section.fields"
						:key="field.name"
						v-bind="field"
						:alt="{data}"
						@fieldA="fieldA"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vField from "@/components/field.vue";

export default {
	components: {vField},
	props: {
		sidebar: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		sections: (t) => t.sidebar ? t.sidebar.sections : [],
		sectionClasses() {
			return this.sections.map(x => x.fields.map(x => x.fieldType.id));
		}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.sidebar {
	.sections {
		margin-top: 2.5em;

		.section {
			background-color: $white1;
			border: 1px solid $blue2;
			border-radius: 4px;
			padding: 1.5em 1.25em;
			margin-bottom: 1.25em;

			.wrap {
				transform: scale(0.95);
			}

			&.vStatusSet {
				padding: 0;

				.wrap {
					transform: none;
				}
			}
		}
	}
}
</style>
