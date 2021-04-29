<template>
  <v-card class="data-viewer" elevation="8">
    <v-card-title class="data-viewer__title">
      <v-btn v-if="back" icon style="margin-right: 50px" @click="returnBack">
        <v-icon aria-hidden="true">mdi-keyboard-backspace</v-icon>
      </v-btn>
      <span>{{ title }}</span>
      <v-spacer />

      <v-btn
        v-if="create"
        aria-hidden="true"
        elevation="0"
        color="primary"
        style="
          padding: 0 13px 0 7px !important;
          border-radius: 4px;
          margin-right: 10px;
        "
        @click="handleCreateEvent"
      >
        <v-icon small aria-hidden="true">mdi-plus</v-icon>
        <span>Add New</span>
      </v-btn>

      <v-btn
        v-if="pdf"
        aria-hidden="true"
        color="primary"
        elevation="0"
        style="
          padding: 0 13px 0 7px !important;
          border-radius: 4px;
          margin-right: 10px;
        "
        @click="handlePrintEvent"
      >
        <v-icon small aria-hidden="true">mdi-printer</v-icon>
        <span>Print</span>
      </v-btn>

      <!--      <v-bottom-sheet v-model="filter" persistent>-->
      <!--        <template v-slot:activator="{ on }">-->
      <!--          <v-btn icon v-on="on">-->
      <!--            <v-icon>mdi-filter</v-icon>-->
      <!--          </v-btn>-->
      <!--        </template>-->
      <!--        <v-sheet class="text-center" height="200px">-->
      <!--          <v-btn class="mt-6" flat color="error" @click="sheet = !sheet"-->
      <!--            >close</v-btn-->
      <!--          >-->
      <!--          <div class="py-3">-->
      <!--            This is a bottom sheet using the persistent prop-->
      <!--          </div>-->
      <!--        </v-sheet>-->
      <!--      </v-bottom-sheet>-->

      <v-btn aria-hidden="true" icon @click="load">
        <v-icon aria-hidden="true">mdi-reload</v-icon>
      </v-btn>
    </v-card-title>

    <div class="data-viewer__search px-4 px-md-0">
      <div class="data-viewer__search--spacer" />
      <v-text-field
        v-model="search"
        placeholder="Search"
        dense
        filled
        outlined
        aria-hidden="true"
        style="margin-left: auto; width: 450px; margin-right: 20px"
        prepend-inner-icon="mdi-magnify"
      />
    </div>
    <v-data-table
      :headers="columns"
      :loading="loading"
      :search="search"
      :items="data"
      :dense="dense"
      height="500"
      fixed-header
      class="data-table__content"
    >
      <template #[`item.image`]="{ item }">
        <v-avatar v-if="item.image != null" style="margin: 5px; padding: 0">
          <img
            alt="person"
            style="object-fit: cover"
            :src="$axios.defaults.baseURL + 'uploads/' + item.image.name"
          />
        </v-avatar>
        <p v-if="item.image == null" style="margin: 0">No Image</p>
      </template>
      <template #[`item.images`]="{ item }">
        <div v-if="item.images != null && item.images.length !== 0">
          <div class="avatars">
            <v-avatar
              v-for="(image, i) in item.images.slice(0, 3)"
              :key="i"
              :style="
                'margin: 5px; padding: 0;left: ' +
                i * 20 +
                'px;z-index: ' +
                (item.images.length - i)
              "
              class="avatar elevation-3"
            >
              <img
                alt="multiimage"
                style="object-fit: cover"
                :src="$axios.defaults.baseURL + 'uploads/' + image.name"
              />
            </v-avatar>
          </div>
        </div>
        <p v-else style="margin: 0">No Image</p>
      </template>
      <template #[`item.createdAt`]="{ item }">
        <slot name="createdAt" :item="item" />
        {{ date(item.createdAt) }}
      </template>
      <template #[`item.dob`]="{ item }">
        <slot name="dob" :item="item" />
        {{ date(item.dob) }}
      </template>
      <template #[`item.countdown`]="{ item }">
        <slot name="countdown" :item="item" />
        {{ getCountdown(item) }}
      </template>
      <template #[`item.active`]="{ item }">
        <slot name="active" :item="item" />
        {{ item.active ? 'Active' : 'Inactive' }}
      </template>
      <template #[`item.sr`]="{ item, index }">
        <slot name="sr" :item="item" />
        {{ index + 1 }}
      </template>
      <template #[`item.rating`]="item">
        <slot name="rating" :item="item" />
        <p v-if="item.item.quality && item.item.fitting" style="margin: 0">
          <v-icon color="gold">mdi-star</v-icon>
          <span v-if="item.item.quality && item.item.fitting">{{
            (item.item.quality + item.item.fitting) / 2
          }}</span>
        </p>
        <p v-else style="margin: 0">
          <v-icon color="grey">mdi-star</v-icon>
        </p>
      </template>
      <template #[`item.persons`]="{ item }">
        <slot name="persons" :item="item" />
        <div v-if="item.persons.length">
          <span v-for="(person, i) of item.persons" :key="i">
            <span v-if="i === item.persons.length - 1">
              {{ person ? person.name : 'No Name' }}
            </span>
            <span v-else>
              {{ person ? person.name + ' -' : 'No Name' + ' -' }}
            </span>
          </span>
        </div>
        <div v-else>
          <span>All</span>
        </div>
      </template>
      <template #[`item.action`]="{ item }">
        <slot name="actions" :item="item" />
        <v-icon
          v-if="detail"
          style="margin: 5px"
          size="20"
          color="green"
          aria-hidden="true"
          @click="detailItem(item)"
          >mdi-clipboard
        </v-icon>
        <v-icon
          v-if="review"
          style="margin: 5px"
          size="20"
          color="gold"
          aria-hidden="true"
          @click="reviewItem(item)"
          >mdi-star-outline
        </v-icon>
        <v-icon
          v-if="approve"
          size="20"
          style="margin: 5px"
          color="green"
          aria-hidden="true"
          @click="approveItem(item)"
          >mdi-check-circle
        </v-icon>
        <v-icon
          v-if="reject"
          style="margin: 5px"
          size="20"
          color="red"
          aria-hidden="true"
          @click="rejectItem(item)"
          >mdi-close-circle
        </v-icon>
        <v-icon
          v-if="change"
          style="margin: 5px"
          size="20"
          color="green"
          aria-hidden="true"
          @click="changeItem(item)"
          >mdi-pencil
        </v-icon>
        <v-icon
          v-if="remove"
          style="margin: 5px"
          size="20"
          color="red"
          aria-hidden="true"
          @click="removeItem(item)"
          >mdi-delete
        </v-icon>
        <v-icon
          v-if="block"
          style="margin: 5px"
          size="20"
          color="red"
          aria-hidden="true"
          @click="blockItem(item)"
          >mdi-block-helper
        </v-icon>
        <v-icon
          v-if="unblock"
          style="margin: 5px"
          small
          color="green"
          aria-hidden="true"
          @click="unblockItem(item)"
          >mdi-check
        </v-icon>
        <v-icon
          v-if="productPrint"
          style="margin: 5px"
          small
          color="green"
          aria-hidden="true"
          @click="printProduct(item)"
          >mdi-widgets
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import moment from 'moment'
import { setupDataLoader } from '../../lib/data-loader'

/**
 * @displayName DataViewer
 *
 * @version 1.0.0
 * @author Arish Khan <arishsultan104@gmail.com>
 */
export default defineComponent({
  name: 'DataViewer',

  props: {
    /**
     * Title of the Viewer, it determines the type
     * of data that is being displayed.
     *
     * @since 1.0.0
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Material design related prop
     *
     * @since 1.0.0
     */
    dense: {
      type: Boolean,
      default: false,
    },

    /**
     * List of columns that are required to be viewed.
     *
     * @since 1.0.0
     */
    columns: {
      type: Array,
      required: true,
    },

    onBlock: Function,
    onUnblock: Function,
    onAccepted: Function,
    onRejected: Function,
    onDelete: Function,

    /**
     * Options or additional action that need to be
     * performed on the data such as, printing a summary
     * report etc.
     *
     * @since 1.0.0
     */
    options: {
      type: Array,
      required: false,
      default: () => [],
    },

    /**
     * Determines if the account can create new items
     * or not.
     *
     * @since 1.0.0
     */
    create: {
      type: Boolean,
      default: false,
    },
    sr: {
      type: Boolean,
      default: true,
    },

    pdf: {
      type: Boolean,
      default: false,
    },

    /**
     * Determines if the account can change items or not.
     *
     * @since 1.0.0
     */
    change: {
      type: Boolean,
      default: false,
    },

    detail: {
      type: Boolean,
      default: false,
    },
    review: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Boolean,
      default: false,
    },
    approve: {
      type: Boolean,
      default: false,
    },
    reject: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    unblock: {
      type: Boolean,
      default: false,
    },
    productPrint: {
      type: Boolean,
      default: false,
    },

    /**
     * Determines if the account can create remove items
     * or not.
     *
     * @since 1.0.0
     */
    remove: {
      type: Boolean,
      default: false,
    },
    action: {
      type: Boolean,
      default: true,
    },

    /**
     * It is the Service that will make the request to
     * server including the parsing of request data and
     * response data.
     *
     * @since 1.0.0
     */
    endpoint: {
      type: String,
      required: true,
    },

    pagination: {
      type: Boolean,
      default: false,
    },

    createRoute: {
      type: String,
      default: null,
      required: false,
    },

    pdfRoute: {
      type: String,
      default: null,
      required: false,
    },

    changeRoute: {
      type: String,
      default: null,
      required: false,
    },

    detailRoute: {
      type: String,
      default: null,
      required: false,
    },
    reviewRoute: {
      type: String,
      default: null,
      required: false,
    },
    approveRoute: {
      type: String,
      default: null,
      required: false,
    },
    rejectRoute: {
      type: String,
      default: null,
      required: false,
    },

    removeRoute: {
      type: String,
      default: null,
      required: false,
    },
    blockRoute: {
      type: String,
      default: null,
      required: false,
    },
    unblockRoute: {
      type: String,
      default: null,
      required: false,
    },
    productPrintRoute: {
      type: String,
      default: null,
      required: false,
    },
  },

  setup(props, context) {
    const loader = setupDataLoader(context.root.$axios, props.endpoint, true)

    onMounted(loader.load)

    const search = ref('')
    const filter = ref(false)
    // eslint-disable-next-line vue/no-mutating-props
    if (props.columns[0].text !== 'SR#' && props.sr)
      props.columns.unshift({
        text: 'SR#',
        value: 'sr',
        sortable: false,
        filterable: false,
      })

    if (
      props.columns[props.columns.length - 1].text !== 'Action' &&
      props.action
    )
      // eslint-disable-next-line vue/no-mutating-props
      props.columns.push({
        text: 'Action',
        value: 'action',
        sortable: false,
        filterable: false,
        align: 'center',
        width: '150px',
      })

    function handleCreateEvent() {
      context.root.$options.router.push(props.createRoute)
    }

    function handlePrintEvent() {
      console.log('in print')
      window.open(this.$axios.defaults.baseURL + props.pdfRoute)
    }

    async function removeItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        const r = await context.root.$axios.$delete(
          props.removeRoute.replace('$id', item._id)
        )
        console.log(r)
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onDelete() != null) {
          this.onDelete()
        }
      }
    }

    async function approveItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        const data = {
          status: '2',
          submission: item._id,
        }
        await context.root.$axios.$patch(props.approveRoute, data)
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onAccepted() != null) {
          this.onAccepted()
        }
      }
    }

    async function rejectItem(item) {
      if (confirm('Are you sure?')) {
        const data = {
          status: '3',
          submission: item._id,
        }
        await context.root.$axios.$patch(props.rejectRoute, data)
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onRejected() != null) {
          this.onRejected()
        }
      }
    }

    async function blockItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await context.root.$axios.$patch(
          props.blockRoute.replace('$id', item._id)
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onBlock != null) {
          this.onBlock()
        }
      }
    }

    async function unblockItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await context.root.$axios.$patch(
          props.unblockRoute.replace('$id', item._id)
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onUnblock != null) {
          this.onUnblock()
        }
      }
    }
    function printProduct(item) {
      context.root.$options.router.push(
        props.productPrintRoute.replace('$id', item.date)
      )
    }

    function returnBack() {
      this.$router.back()
    }

    function changeItem(item) {
      context.root.$options.router.push(
        props.changeRoute.replace('$id', item._id)
      )
    }

    function detailItem(item) {
      if (this.detail) {
        context.root.$options.router.push(
          props.detailRoute.replace('$id', item._id)
        )
      }
    }

    function reviewItem(item) {
      if (this.review) {
        context.root.$options.router.push(
          props.reviewRoute.replace('$id', item._id)
        )
      }
    }

    function getCountdown(item) {
      if (item.status === 0)
        return moment().to(moment(item.createdAt).add(3, 'days')).toUpperCase()
      else return '- -'
    }

    return {
      search,
      filter,
      ...loader,
      getCountdown,
      removeItem,
      reviewItem,
      unblockItem,
      returnBack,
      changeItem,
      detailItem,
      blockItem,
      approveItem,
      rejectItem,
      date: (date) => moment(date).format('MMMM Do YYYY'),
      handleCreateEvent,
      handlePrintEvent,
      printProduct,
    }
  },
})
</script>

<style lang="sass">
.data-viewer
  width: 100% !important

.theme--light.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
  background: #fff !important

.avatars
  display: inline-flex
  position: relative
  height: 50px

.avatar
  position: absolute
  top: 0

.avatar:not(:last-child)
  margin-left: -60px
</style>
