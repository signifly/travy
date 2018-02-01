<template>
	<transition name="el-fade-in-linear" appear>
		<div class="delete">
			<Popover class="popover" v-model="active" transition="null">
				<div class="text">
					{{item.description}}
				</div>
				<div class="buttons">
					<Button size="mini" :disabled="loading" @click="close">Cancel</Button>
					<Button size="mini" type="primary" :loading="loading" @click="remove">Confirm</Button>
				</div>
			</Popover>
		</div>
	</transition>
</template>

<script>
import {Popover, Button} from "element-ui";

export default {
	components: {Popover, Button},
	props: {
		item: {type: Object, required: true}
	},
	data() {
		return {
			active: true,
			loading: false
		}
	},
	methods: {
		close() {
			this.$emit("close");
		},
		remove() {
			this.loading = true;

			this.$parent.$emit("fieldA", {
				action: "remove",
				done: () => {
					this.loading = false;
					this.close();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.delete {
	position: relative;
	z-index: 1;

	.popover {
		.text {
			word-break: break-word;
			text-align: left;
			margin-bottom: 1em;
			font-size: em(15);
		}
		.buttons {
			display: flex;
			align-items: center;
		}

		/deep/ {
			.el-popover {
				right: 0;
			}
		}
	}
}
</style>
