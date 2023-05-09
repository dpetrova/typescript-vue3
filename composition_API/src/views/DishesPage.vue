<!-- using script setup block -->
<script setup lang="ts">
import NewDishForm from '../components/NewDishForm.vue'
import EditDishForm from '../components/EditDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Dish } from '@/types'
//import global store composable
import { useDishStore } from '@/stores/DishStore'

//store
const dishStore = useDishStore()

type ShowFormState = '' | 'new' | 'edit'

// reactive data
const filterText = ref<string>('')
const showForm = ref<ShowFormState>('')
const editDishId = ref('') // Type inference (the ability of the TypeScript compiler to automatically determine the type of a variable based on the value that is assigned to it)

// computed properties
const dishList = computed((): Dish[] => {
  //get list of dishes from store
  return dishStore.list
})
const filteredDishList = computed((): Dish[] => {
  return dishList.value.filter((dish: Dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishList
    }
  })
})
const numberOfDishes = computed((): number => {
  return filteredDishList.value.length
})

// methods
const addDish = (payload: Dish): void => {
  dishStore.addDish(payload) // call store action
  hideForm()
}
const editDish = (payload: Dish): void => {
  showForm.value = 'edit'
  editDishId.value = payload.id
}
const updateDish = (payload: Dish): void => {
  dishStore.updateDish(payload) // call store action
  hideForm()
}
const hideForm = (): void => {
  showForm.value = ''
}
const updateFilterText = (event: KeyboardEvent): void => {
  //console.log(event.code)
  if (event.code === 'Enter') {
    filterText.value = (event.target as HTMLInputElement).value
  }
}
const updateFilterTextOnPressEnter = (event: KeyboardEvent): void => {
  filterText.value = (event.target as HTMLInputElement).value
}

// lifecycle
onMounted(() => {
  const route = useRoute()
  if (route.query.new) {
    showForm.value = 'new'
  } else if (route.query.edit) {
    showForm.value = 'edit'
  }
})
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav v-if="!showForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <!-- search on typing -->
                  <input class="input" type="text" placeholder="Dish name" v-model="filterText" />
                  <!-- search on Enter press -->
                  <!-- <input
                    class="input"
                    type="text"
                    placeholder="Dish name"
                    :value="filterText"
                    @keyup="updateFilterText"
                  /> -->
                  <!-- search on Enter press using modifier -->
                  <!-- <input
                    class="input"
                    type="text"
                    placeholder="Dish name"
                    :value="filterText"
                    @keyup.enter="updateFilterTextOnPressEnter"
                  /> -->
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <NewDishForm v-if="showForm === 'new'" @add-new-dish="addDish" @cancel-new-dish="hideForm" />

        <!-- Edit Dish Form -->
        <EditDishForm
          v-else-if="showForm === 'edit'"
          @edit-dish="updateDish"
          @cancel-edit-dish="hideForm"
          :dish-id="editDishId"
        />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @edit-dish="editDish" @delete-dish="dishStore.deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
