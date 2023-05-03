<script setup lang="ts">
import type { PropType } from 'vue'
import type { Restaurant } from '@/types'
import { computed } from 'vue'

// type Restaurant = {
//   id: string
//   name: string
//   address: string
//   website: string
//   status: string
// }

type Props = {
  restaurant: Restaurant // required
  promotion?: Boolean // optional
}

//do not need to import defineProps and defineEmits, because in script setup block they are import globally!!!!

/* props */

// define:
// defineProps({
//   restaurant: {
//     type: Object as PropType<Restaurant>,
//     required: true,
//   },
//   promotion: {
//     type: Boolean,
//     default: false
//   }
// })

//or:
const props = defineProps<Props>()

//or with default value:
//const { restaurant, promotion = false } = defineProps<Props>() //default value is compiled to equivalent runtime

/* emits */

//runtime
//const emit = defineEmits(['delete-restaurant'])

//type-based
const emit = defineEmits<{
  (e: 'delete-restaurant', restaurant: Restaurant): void
}>()

/* computed */
const statusColor = computed(() => {
  switch (props.restaurant.status) {
    case 'Want to Try':
      return 'is-warning'
    case 'Recommended':
      return 'is-success'
    case 'Do Not Recommend':
      return 'is-danger'
    default:
      return ''
  }
})

/* methods */
const deleteRestaurant = () => {
  emit('delete-restaurant', props.restaurant)
}
</script>

<template>
  <article class="box">
    <div class="media">
      <aside class="media-left">
        <img src="https://placehold.jp/150x150.png" alt="" />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-1">
          {{ restaurant.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ restaurant.status }}</span>
        </p>
        <div class="content mb-2">
          {{ restaurant.address }}
        </div>
        <div>
          <button @click="deleteRestaurant" class="button is-small is-danger is-light">Delete</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
