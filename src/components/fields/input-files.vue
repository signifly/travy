<template>
	<div class="input-file">
		<Upload
			action=""
			:limit="_limit"
			:on-exceed="limitError"
			:auto-upload="false"
      :file-list="fileList"
			:accept="_fileTypes"
			:on-change="addFile"
      :on-preview="preview"
			:on-remove="removeFile"
			multiple
		>
      <Button type="primary" size="small" v-bind="{loading}">Upload</Button>
			<div class="el-upload__tip" slot="tip">
				{{ _note }}
				<template v-if="_limit">
					, {{ files.length }}/{{ _limit }} selected.
				</template>
				<span class="limit" v-if="limitNote">{{ limitNote }}</span>
			</div>
		</Upload>
	</div>
</template>

<script>
import {Upload, Button} from "element-ui";
import {base64Encode} from "@/modules/utils";

export default {
	components: {Upload, Button},
	meta: {
		res: {
			props: {
				note: "jpg/png files with a size less than 500kb",
				fileTypes: ".jpg, .jpeg, .png",
				limit: 10,
				files: "key"
			},
			data: {
			  urls: ["https://pbs.twimg.com/media/DVnfJkqVAAAqS91.jpg"]
      }
		}
	},
	props: {
    urls: {type: Array, required: false, default: () => []},
		_note: {type: String, required: false, doc: true},
		_fileTypes: {type: String, required: false, doc: true},
		_limit: {type: Number, required: false, doc: true},
    _files: {type: String, required: true, doc: true},
    // files: {type: Array, required: true, doc: true},
	},
	data() {
		return {
      loading: false,
			limitNote: false,
			fileList: [],
      files: [],
      deletes: [],
		};
	},
	methods: {
    preview({url}) {
      if (!url.startsWith("blob")) {
        window.open(url, "_blank");
      }
    },

		async addFile(file) {
      this.loading = true;
			this.limitNote = false;

      const base64 = await base64Encode(file.raw);
			this.files.push({ file: base64, title: file.name });

			this.update();

      this.loading = false;
		},

		removeFile(file) {
		  if (file.id) {
		    this.deletes.push(file.id)
      } else {
        const index = this.files.findIndex((x) => x === file.raw);
        this.files.splice(index, 1);
      }
			this.update();
		},

		update() {
			this.$emit("event", {
				actions: {
					update: {data: {[this._files]: [
					    ...this.files,
              ...this.deletes.map(id => ({ id, delete: true}))
					]}}
				}
			});
		},

		limitError(files) {
			const rest = this._limit - this.files.length;
			this.limitNote = `${
				files.length
			} files selected, but only ${rest} more can be added.`;
		}
	},

  watch: {
    urls: {
      immediate: true,
      handler(urls) {
        this.fileList = [];
        urls.forEach(item => {
          if (typeof item.url === 'string') {
            this.fileList.push({
              id: item.id,
              url: item.url,
              name: item.url.split("/").slice(-1)[0]
            });
          }
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
	::v-deep {
		.el-upload,
		.el-upload-dragger {
			width: 100%;
		}

		.el-progress-bar__inner {
			transition: width 0.25s linear;
		}
	}
	.el-upload__tip {
		line-height: 1.5em;
		margin-bottom: 1em;

		.limit {
			margin-left: 0.5em;
			color: $danger;
		}
	}

	.upload-el {
		margin-bottom: 1em;
	}

	.progress {
		height: 19px;
		overflow: hidden;

		&-enter-active,
		&-leave-active {
			transition: cubic(height 0.4s);
		}
		&-enter, &-leave-to /* .fade-leave-active below version 2.1.8 */ {
			height: 0;
		}
	}
}
</style>
