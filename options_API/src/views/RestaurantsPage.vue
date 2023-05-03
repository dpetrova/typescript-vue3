<script lang="ts">
import NewRestaurantForm from '../components/NewRestaurantForm.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { defineComponent, ref, computed, onMounted } from 'vue'
import type { Restaurant } from '@/types'

export default defineComponent({
  components: {
    NewRestaurantForm,
    RestaurantCard,
    SideMenu,
  },
  setup() {
    // reactive data
    const filterText = ref<string>('')
    const showNewForm = ref<boolean>(false)
    const restaurantList = ref<Restaurant[]>([
      {
        id: '9f995ce4-d2fc-4d00-af1d-6cb1647c6bd3',
        name: 'Quiche From a Rose',
        address: '283 Thisisnota St.',
        website: 'www.quichefromarose.com',
        status: 'Want to Try',
      },
      {
        id: 'ae62a3da-791b-4f44-99a1-4be1b0ec30b8',
        name: 'Tamago Never Dies',
        address: '529 Letsgofora Dr.',
        website: 'www.tamagoneverdies.com',
        status: 'Recommended',
      },
      {
        id: '9b361dae-2d44-4499-9940-97e188d41a32',
        name: 'Penne For Your Thoughts',
        address: '870 Thisisa St.',
        website: 'www.penneforyourthoughts.com',
        status: 'Do Not Recommend',
      },
    ])

    // computed properties
    const numberOfRestaurants = computed((): number => {
      return filteredRestaurantList.value.length
    })
    const filteredRestaurantList = computed((): Restaurant[] => {
      return restaurantList.value.filter((restaurant) => {
        if (restaurant.name) {
          return restaurant.name.toLowerCase().includes(filterText.value.toLowerCase())
        } else {
          return restaurantList.value
        }
      })
    })

    // methods
    const addRestaurant = (payload: Restaurant): void => {
      restaurantList.value.push(payload)
      hideForm()
    }
    const deleteRestaurant = (payload: Restaurant): void => {
      restaurantList.value = restaurantList.value.filter((restaurant) => {
        return restaurant.id !== payload.id
      })
    }
    const hideForm = (): void => {
      showNewForm.value = false
    }

    // lifecycle 
    onMounted(() => {
      const route = this.$route
      if (this.$route.query.new) {
        this.showNewForm = true
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
      hideForm
    }
  }  
}
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