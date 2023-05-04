<!-- using defineComonent -->
<script lang="ts">
import NewRestaurantForm from '../components/NewRestaurantForm.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Restaurant } from '@/types'
//import global store composable
import { useRestaurantStore } from '@/stores/RestaurantStore'

export default defineComponent({
  components: {
    NewRestaurantForm,
    RestaurantCard,
    SideMenu,
  },
  setup() {
    //store
    const restaurantStore = useRestaurantStore()

    // reactive data
    const filterText = ref<string>('')
    const showNewForm = ref<boolean>(false)

    // computed properties
    const restaurantList = computed((): Restaurant[] => {
      //get list of restaurants from store
      return restaurantStore.list
    })

    const filteredRestaurantList = computed((): Restaurant[] => {
      return restaurantList.value.filter((restaurant) => {
        if (restaurant.name) {
          return restaurant.name.toLowerCase().includes(filterText.value.toLowerCase())
        } else {
          return restaurantList
        }
      })
    })
    const numberOfRestaurants = computed((): number => {
      return filteredRestaurantList.value.length
    })

    // methods
    const addRestaurant = (payload: Restaurant): void => {
      restaurantStore.addRestaurant(payload) // call store action
      hideForm()
    }
    const deleteRestaurant = (payload: Restaurant): void => {
      restaurantStore.deleteRestaurant(payload) // call store action
    }
    const hideForm = (): void => {
      showNewForm.value = false
    }

    // lifecycle
    onMounted(() => {
      const route = useRoute()
      if (route.query.new) {
        showNewForm.value = true
      }
    })

    return {
      filterText,
      showNewForm,
      restaurantList,
      numberOfRestaurants,
      filteredRestaurantList,
      addRestaurant,
      deleteRestaurant,
      hideForm,
    }
  },
})
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Restaurants</h1>

        <!-- CTA Bar -->
        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfRestaurants }}</strong> restaurants
              </p>
            </div>

            <p class="level-item">
              <button @click="showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Restaurant name" v-model="filterText" />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Restaurant Form -->
        <NewRestaurantForm v-if="showNewForm" @add-new-restaurant="addRestaurant" @cancel-new-restaurant="hideForm" />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredRestaurantList" class="column is-full" :key="`item-${item}`">
            <RestaurantCard :restaurant="item" @delete-restaurant="deleteRestaurant" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
