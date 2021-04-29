<template>
  <v-container class="d-flex justify-center">
    <SimpleForm
      title="Send E-Mail"
      method="post"
      :data="formData"
      endpoint="persons/email"
      clear
      @response="clear"
    >
      <div class="span-2">
        <label>Subject</label>
        <v-text-field
          v-model="mail.subject"
          :rules="[required]"
          single-line
          placeholder="e.g. Welcome"
          dense
        ></v-text-field>
        <label>Recipients</label>
        <v-checkbox v-model="mail.all" label="Send to All"></v-checkbox>
        <EntitySelector
          v-if="!mail.all"
          endpoint="persons/customers"
          :selection="customers"
          multiple
          required
          :columns-selected="columnsSelected"
          :columns-selector="columnsSelected"
          title-selected="Selected Users"
          title-selector="Users"
          @selected="mail.to = $event"
        />
        <v-card class="mb-3">
          <div id="editor"></div>
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import ImageUploader from 'quill-image-uploader'
import { required } from '@/common/utils/validators'
import { Mail } from '@/models/mail'
import { Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import EntitySelector from '../../../common/ui/widgets/EntitySelector'

export default {
  name: 'MailForm',
  components: { SimpleForm, EntitySelector },

  data() {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: {},
      mail: new Mail(),
      columnsSelected: [{ text: 'Name', value: 'name' }],
      customers: [],
      myQuill: null,
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
  },

  mounted() {
    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block', 'image', 'video'],
      ['clean'],
    ]
    Quill.register('modules/imageUploader', ImageUploader)
    Quill.register('modules/imageResize', ImageResize)

    // eslint-disable-next-line no-unused-vars
    const quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions,
        imageUploader: {
          upload: (file) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData()
              formData.append('image', file)
              this.$axios
                .post('/persons/save-image', formData)
                .then((result) => {
                  console.log(result)
                  resolve(
                    this.$axios.defaults.baseURL + 'uploads/' + result.data
                  )
                })
                .catch((error) => {
                  alert('Upload failed')
                  console.error('Error:', error)
                })
            })
          },
        },
        imageResize: {},
      },
      theme: 'snow',
    })
    this.myQuill = quill
  },
  methods: {
    required,
    formData() {
      console.log(this.mail)
      console.log(this.myQuill.root.innerHTML)
      this.mail.html = this.myQuill.root.innerHTML
      console.log(this.mail)
      location.reload()
      return this.mail
    },
    clear() {
      this.mail = new Mail()
    },
  },
}
</script>

<style>
.form {
  width: 800px !important;
}

@media screen and (max-width: 600px) {
  .form {
    width: 100% !important;
  }
}
</style>
