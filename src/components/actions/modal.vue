<template>
	<div
		class="modal"
		v-shortkey="{win: ['ctrl', 'enter'], mac: ['meta', 'enter']}"
		@shortkey="submit"
	>
		<Dialog
			:modal-append-to-body="false"
			:visible.sync="visible"
			:append-to-body="false"
			:width="`${width}px`"
			:title="trans.name"
		>
			<div class="fields">
				<field
					:data="{...modalData, $parent: data}"
					v-for="(field, i) in fields"
					v-bind="{field, error}"
					@event="event"
					:key="i"
				/>
			</div>

			<div class="footer" slot="footer">
				<div class="actions">
					<Button size="medium" @click="visible = false" :disabled="loading">
						{{ $translate({en: "Cancel", da: "Annuller"}) }}
					</Button>
					<Button
						:loading="loading"
						@click="submit"
						type="primary"
						size="medium"
					>
						{{ $translate({en: "Submit", da: "Gem"}) }}
					</Button>
				</div>

				<div class="error" v-if="error.message">{{ error.message }}</div>

				<slot name="footer" />
			</div>
		</Dialog>
	</div>
</template>

<script>
import {transProps, mergeData} from "@/modules/utils";
import {Dialog, Button} from "element-ui";
import field from "@/components/field";
import {get} from "lodash";

export default {
	components: {Dialog, Button, field},
	props: {
		actionOpts: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		payload: {type: Object, required: false},
		fields: {type: Array, required: true},
		data: {type: Object, required: false},
		name: {type: String, required: false},
		width: {type: Number, default: 700}
	},
	data() {
		return {
			loading: false,
			modalData: {},
			error: {}
		};
	},
	computed: {
		trans() {
			return transProps({
				data: this.data,
				val: {
					endpoint: this.endpoint,
					payload: this.payload,
					name: this.name
				}
			});
		},

		visible: {
			get: () => true,
			set() {
				this.$emit("close");
			}
		}
	},
	methods: {
		event({actions}) {
			if (actions.update) {
				this.modalData = mergeData(this.modalData, actions.update.data);
			}
		},

		async submit() {
			try {
				const {endpoint, payload} = this.trans;
				this.loading = true;

				const {data} = await this.$axios({
					method: endpoint.method,
					url: endpoint.url,
					customErr: true,
					data: {
						...this.actionOpts.payload,
						...payload,
						data: this.modalData
					}
				});

				this.$emit("submit", data);
			} catch (err) {
				this.error = err;
				this.loading = false;
			}
		}
	},
	created() {
		this.modalData = get(this.trans.payload, "data", {});
	}
};
</script>

<style lang="scss" scoped>
.modal {
	text-align: left;
}

.fields {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: -$fieldMargin 0;
}

.footer {
	.error {
		margin-top: 1em;
		font-size: 0.875em;
		color: $danger;
	}
}
</style>
