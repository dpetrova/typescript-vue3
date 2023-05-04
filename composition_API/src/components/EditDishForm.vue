<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Dish } from '@/types'
import { useDishStore } from '@/stores/DishStore'

const dishStore = useDishStore()

/* props */
const props = defineProps<{
  dishId?: string
}>()

/* emits */
const emit = defineEmits<{
  (e: 'edit-dish', dish: Dish): void
  (e: 'cancel-edit-dish'): void
}>()

/* computed */
const targetDish = computed(() => {
  if (!props.dishId) return null
  return dishStore.dishById(props.dishId) as Dish
})

/* methods */
const updateDish = () => {
  if (targetDish.value) {
    emit('edit-dish', targetDish.value)
  }
}
const cancelDish = () => {
  emit('cancel-edit-dish')
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
    <div v-if="targetDish" class="field">
      <div class="field">
        <label for="name" class="label">Edit Name </label>
        <div class="control">
          <input
            v-model="targetDish.name"
            type="text"
            class="input is-large"
            placeholder="Name..."
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="updateDish" class="button is-success">Update</button>
          <button @click="cancelDish" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
