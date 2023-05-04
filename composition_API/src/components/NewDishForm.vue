<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Dish } from '@/types'

/* emits */

//runtime
//const emit = defineEmits(['add-new-dish', 'cancel-new-dish'])

//type-based
const emit = defineEmits<{
  (e: 'add-new-dish', dish: Dish): void
  (e: 'cancel-new-dish'): void
}>()

/* data */
const newDish = ref<Dish>({
  id: uuidv4(),
  name: '',
  status: 'Want to Try',
  diet: '',
})

/* methods */
const addDish = () => {
  emit('add-new-dish', newDish.value)
}
const cancelDish = () => {
  emit('cancel-new-dish')
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
            v-model="newDish.name"
            type="text"
            class="input is-large"
            placeholder="Mystery Flavored Shrimp"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="addDish" class="button is-success">Create</button>
          <button @click="cancelDish" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
