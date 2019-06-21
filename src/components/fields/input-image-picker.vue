<template>
	<div class="image-picker">
		<a class="image" @click="modalActivate(true)">
			<div class="img" :style="{backgroundImage: `url('${imageUrl}')`}" />

			<div class="overlay">
				<i class="el-icon-picture" />
			</div>
		</a>

		<Dialog
			title="Select image"
			width="700px"
			:visible.sync="modal.active"
			:append-to-body="true"
			:modal-append-to-body="true"
		>
			<div class="modal">
				<div class="header">
					<div class="search">
						<Input
							v-model="searchInput"
							size="medium"
							placeholder="Search"
							@input="search"
							:prefix-icon="searchIcon"
						/>
					</div>

					<div class="button">
						<Button size="small" type="danger" @click="remove">Delete</Button>
					</div>
				</div>

				<div class="items">
					<a
						class="item"
						v-for="item in modalItemsMap"
						:key="item.id"
						:title="item.label"
						@click="update(item)"
					>
						<div class="img" :style="{backgroundImage: `url('${item.url}')`}" />
						<div class="label" v-text="item.label" />
					</a>

					<div class="noitems" v-if="!modal.items.length">
						No items
					</div>
				</div>

				<div class="more" v-if="more">
					<Button size="small" :loading="modal.loading" @click="getMore"
						>More</Button
					>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script>
import {Dialog, Input, Button} from "element-ui";
import {get, debounce} from "lodash";
import {meta} from "@/modules/utils";

export default {
	components: {Dialog, Input, Button},
	meta: {
		res: {
			props: {
				id: "file_id",
				url: "image_url",
				options: {
					endpoint: {
						url: meta.items,
						params: {sort: "name"}
					},
					key: "",
					url: "image",
					value: "id",
					label: "name"
				}
			},
			data: {
				file_id: 1,
				image_url: "https://picsum.photos/300/300"
			}
		}
	},
	props: {
		id: {type: Number, required: false, doc: true},
		_id: {type: String, required: true},
		url: {type: String, required: false, doc: true},
		_options: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			searchInput: "",
			image: this.url,
			modal: {
				loading: false,
				active: false,
				items: [],
				meta: {}
			}
		};
	},
	computed: {
		searchIcon: (t) => (t.modal.loading ? "el-icon-loading" : "el-icon-search"),
		more: (t) => t.modal.meta.current_page !== t.modal.meta.last_page,

		imageUrl() {
			return (
				this.image ||
				`data:image/svg+xml;utf8,${encodeURIComponent(
					require("@/assets/icons/noimage.svg")
				)}`
			);
		},

		modalItemsMap: (t) =>
			t.modal.items.map((x) => ({
				url: get(x, t._options.url),
				id: get(x, t._options.value),
				label: get(x, t._options.label)
			}))
	},
	methods: {
		modalActivate(bool) {
			if (bool) this.getItems();
			this.modal.active = bool;
		},

		search(search) {
			console.log({search});
			this.modal.loading = true;
			this.getItemsDebounce({search});
		},

		getMore() {
			this.modal.loading = true;
			this.getItems({page: this.modal.meta.current_page + 1});
		},

		getItemsDebounce() {},

		async getItems({search, page = 1} = {}) {
			const {
				key,
				endpoint: {params, url}
			} = this._options;

			const {data} = await this.$axios.get(url, {
				params: {
					...params,
					page,
					count: 25,
					filter: {
						type: "image",
						search
					}
				}
			});

			const items = get(data, key, data);

			this.modal.items = page > 1 ? [...this.modal.items, ...items] : items;
			this.modal.meta = data.meta || {};
			this.modal.loading = false;
		},

		remove() {
			this.update({url: null, id: null});
		},

		update({url, id}) {
			this.modal.active = false;
			this.image = url;

			this.$emit("event", {
				actions: {
					update: {data: {[this._id]: id}}
				}
			});
		}
	},
	watch: {
		url(url) {
			this.image = url;
		}
	},
	created() {
		this.searchInput = "";
		this.getItemsDebounce = debounce(this.getItems, 400);
	}
};
</script>

<style lang="scss" scoped>
.image-picker {
	.image {
		display: block;
		position: relative;
		$s: 150px;
		width: $s;
		height: $s;

		.img {
			border-radius: 4px;
			border: 1px dashed $blue3;
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
		}

		&:hover {
			.overlay {
				opacity: 1;
			}
		}

		.overlay {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			transition: cubic(opacity, 0.075s);

			i {
				font-size: 1.2em;
				background-color: #409eff;
				color: white;
				padding: 0.3em;
				border-radius: 3px;
			}
		}
	}

	@at-root .modal {
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.search {
				width: 250px;
			}
		}

		.items {
			margin-top: 3em;
			display: flex;
			flex-wrap: wrap;

			.item {
				display: block;
				padding: 0.5em;
				$s: 100px;
				width: percentage(1/4);
				height: 150px;
				display: flex;
				flex-direction: column;

				&:hover {
					.label {
						color: #409eff;
					}
				}

				.img {
					display: block;
					border: 1px solid transparent;
					width: 100%;
					height: 100%;
					background-repeat: no-repeat;
					background-position: center;
					background-size: cover;
				}

				.label {
					font-weight: 500;
					font-size: 0.8em;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					transition: cubic(color);
				}
			}

			.noitems {
				font-size: 0.9em;
			}
		}

		.more {
			text-align: center;
			margin-top: 2em;
		}
	}
}
</style>
