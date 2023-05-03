<script setup lang="ts">
import type { PropType } from 'vue'
import type { Dish } from '@/types'
import { computed } from 'vue'

// type Dish = {
//   id: string
//   name: string
//   status: string
// }

type Props = {
  dish: Dish // required
  promotion?: Boolean // optional
}

//do not need to import defineProps and defineEmits, because in script setup block they are import globally!!!!

/* props */

// define:
// defineProps({
//   dish: {
//     type: Object as PropType<Dish>,
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
//const { dish, promotion = false } = defineProps<Props>() //default value is compiled to equivalent runtime

/* emits */

//runtime
//const emit = defineEmits(['delete-restaurant'])

//type-based
const emit = defineEmits<{
  (e: 'delete-dish', dish: Dish): void
}>()

/* computed */
const statusColor = computed(() => {
  switch (props.dish.status) {
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
const deleteDish = () => {
  emit('delete-dish', props.dish)
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
          {{ dish.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ dish.status }}</span>
        </p>
        <div>
          <button @click="deleteDish" class="button is-small is-danger is-light">Delete</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>
