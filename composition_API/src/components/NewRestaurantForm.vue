<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { defineComponent, ref, computed, onMounted } from 'vue'
import type { Restaurant } from '@/types'
import { restaurantStatusList } from '@/constants'

/* emits */

//runtime
//const emit = defineEmits(['add-new-restaurant', 'cancel-new-restaurant'])

//type-based
const emit = defineEmits<{
  (e: 'add-new-restaurant', restaurant: Restaurant): void
  (e: 'cancel-new-restaurant'): void
}>()

/* data */
const newRestaurant = ref<Restaurant>({
  id: uuidv4(),
  name: '',
  address: '',
  website: '',
  status: 'Want to Try',
})

/* methods */
const addRestaurant = () => {
  emit('add-new-restaurant', newRestaurant.value)
}
const cancelRestaurant = () => {
  emit('cancel-new-restaurant')
}
const updateNameOnSpacePress = (event: InputEvent) => {
  // console.log(event.data)
  // console.log((event.target as HTMLInputElement).value)
  if (event.data === ' ') {
    newRestaurant.value.name = (event.target as HTMLInputElement).value
  }
}

/* refs */
const elNameInput = ref<HTMLInputElement | null>(null)

/* lifecycle */
onMounted(() => {
  // auto focus on the name input
  elNameInput.value?.focus()
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="newRestaurant.name"
            type="text"
            class="input is-large"
            placeholder="Immidiately update"
            required
            ref="elNameInput"
          />
          <input
            :value="newRestaurant.name"
            @input="updateNameOnSpacePress"
            type="text"
            class="input is-large"
            placeholder="Update on space press"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <label for="website" class="label">Website</label>
        <div class="control">
          <input v-model="newRestaurant.website" type="text" class="input" placeholder="www.beignetandthejets.com" />
        </div>
      </div>
      <div class="field mb-5">
        <label for="status" class="label">Status</label>
        <div class="select">
          <select v-model="newRestaurant.status" id="status">
            <option v-for="status in restaurantStatusList" :value="status" :key="`option-${status}`">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="addRestaurant" class="button is-success">Create</button>
          <button @click="cancelRestaurant" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
