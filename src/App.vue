<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script> -->

<script setup>
</script>


<template>
  <div id="app">
    <!-- <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div> 
    </header> -->

    <header>
      <h1>{{ sitename }}</h1>
      <button @click="showCheckout">{{ this.cart.length }} Checkout </button>
    </header>

    <!-- <main>
      <TheWelcome />
    </main> -->

    <main>
      <component :is="currentView"></component>
    </main>
  </div>
</template>

<script>
import LessonList from './components/LessonList.vue'
import Checkout from './components/Checkout.vue'

export default {
  name: "app",
  data() {
    return {
      sitename: "Lesson booking app",
      cart:[],
      currentView: LessonList
    }
  },
  components: { LessonList, Checkout},
  methods: {
    showCheckout() {
      if (this.currentView === LessonList) {
        this.currentView = Checkout;
      } else {
        this.currentView = LessonList;
      }
    }
  }

}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
