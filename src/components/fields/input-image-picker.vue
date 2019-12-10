<template>
	<div class="image-picker">
		<a
			class="image"
			:class="{noimage: !image}"
			:style="imageStyle"
			@click="modalActivate(true)"
		>
			<div class="img" v-if="image" :style="imgStyle" />

			<i v-else class="placeholder el-icon-picture-outline-round" />

			<div class="icon">
				<i class="el-icon-files" />
			</div>
		</a>

		<Dialog
			:modal-append-to-body="true"
			:visible.sync="modal.active"
			:append-to-body="true"
			title="Select image"
			width="700px"
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

export default {
	components: {Dialog, Input, Button},
	meta: {
		spec: {
			_fit: {type: String, default: "cover", note: "contain/cover"},
			_height: {type: String, default: "200px"},
			_width: {type: String, default: "100%"},
			url: {type: String, required: false},
			id: {type: Number, required: false},
			_entities: {
				type: Object,
				required: true,
				children: {
					label: {type: String, required: true, note: "maps to an entity"},
					url: {type: String, required: true, note: "maps to an entity"},
					dataWrap: {type: String, required: false},
					value: {
						type: [String, Number],
						required: true,
						note: "maps to an entity"
					},
					endpoint: {
						type: Object,
						required: true,
						children: {
							url: {type: String, required: true},
							params: {type: Object, required: false}
						}
					}
				}
			}
		},
		res: {
			props: {
				url: "image_url",
				id: "id",
				_entities: {
					endpoint: {
						url: "items",
						params: {sort: "name"}
					},
					dataWrap: "",
					url: "url",
					value: "id",
					label: "name"
				}
			},
			data: {
				id: 1,
				image_url: "https://picsum.photos/id/135/2000/2000"
			}
		}
	},
	props: {
		_fit: {type: String, default: "cover", note: "contain/cover"},
		_entities: {type: Object, required: true},
		_height: {type: String, default: "200px"},
		_width: {type: String, default: "100%"},
		url: {type: String, required: false},
		id: {type: Number, required: false}
	},
	data() {
		return {
			searchInput: "",
			image: null,
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

		imageStyle: (t) => ({
			height: t._height,
			width: t._width
		}),

		imgStyle: (t) => ({
			backgroundImage: `url('${t.image}')`,
			backgroundSize: t._fit
		}),

		modalItemsMap: (t) =>
			t.modal.items.map((x) => ({
				url: get(x, t._entities.url),
				id: get(x, t._entities.value),
				label: get(x, t._entities.label)
			}))
	},
	methods: {
		modalActivate(bool) {
			if (bool) this.getItems();
			this.modal.active = bool;
		},

		search(search) {
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
				dataWrap,
				endpoint: {params, url}
			} = this._entities;

			const {data} = await this.$axios.get(url, {
				params: {
					...params,
					page,
					filter: {
						type: "image",
						search
					}
				}
			});

			const items = get(data, dataWrap, data);

			this.modal.items = [...(page > 1 ? this.modal.items : []), ...items];
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
					update: {data: {id}}
				}
			});
		}
	},
	created() {
		this.searchInput = "";
		this.getItemsDebounce = debounce(this.getItems, 400);
		this.$watch("url", (url) => (this.image = url), {immediate: true});
	}
};
</script>

<style lang="scss" scoped>
.image-picker {
	.image {
		display: inline-block;
		position: relative;
		border-radius: 4px;
		overflow: hidden;

		&.noimage {
			background-color: $blue6;
			justify-content: center;
			align-items: center;
			text-align: center;
			display: flex;
		}

		.placeholder {
			font-size: 24px;
			color: $blue4;
		}

		.img {
			background-repeat: no-repeat;
			background-position: center;
			height: 100%;
			width: 100%;
		}

		.icon {
			background-color: transparentize($black1, 0.8);
			transition: background-color 0.05s linear;
			position: absolute;
			padding: 0.2em;
			color: $white1;
			right: 0;
			top: 0;
		}

		&:hover {
			.icon {
				background-color: transparentize($black1, 0.6);
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
					background-repeat: no-repeat;
					background-position: center;
					background-size: cover;
					display: block;
					height: 100%;
					width: 100%;
				}

				.label {
					font-weight: 500;
					font-size: 0.8em;
					margin-top: 0.5em;
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
