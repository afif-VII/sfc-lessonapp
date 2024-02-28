<template>
  <div id="app">
    <header>
      <h1>{{ sitename }}</h1>
      <button v-on:click="showCheckout">
        {{ itemsInCart }}
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        Checkout
      </button>

      <div>
        <button v-if="testConsole" @click="toggleShowTestConsole">
          <font-awesome-icon icon="fas fa-text-height" />
          Test console
        </button>

        <div v-if="testConsole && showTestConsole" class="test-console">
          <button @click="saveLessonToDB" class="test-elem">
            <font-awesome-icon :icon="['fas', 'floppy-disk']" />
            Test save lesson to DB
          </button>

          <button @click="deleteAllCaches" class="test-elem">
            <font-awesome-icon :icon="['fas', 'trash']" />
            Delete all caches
          </button>

          <button @click="reloadPage" class="test-elem">Reload page</button>

          <strong class="test-elem">HTTPS Test: </strong
          ><a v-bind:href="serverURL" target="_blank">link</a>
          <button @click="unregisterAllServiceWorkers" class="test-elem">
            <font-awesome-icon icon="fab fa-uniregistry" />
            Unregister all service workers
          </button>
        </div>
      </div>
    </header>

    <main>
      <br/>
      <component :is="currentView" :sortedLessons="sortedLessons" 
      :imagesBaseURL="imagesBaseURL" :cart="cart" @add-item-to-cart="addToCart"
      @manage-remove-item="manageRemoveItem"></component>
    </main>
  </div>
</template>

<script>
import LessonList from "./components/LessonList.vue";
import Checkout from "./components/Checkout.vue";

// import lessons from "./assets/json/lessons.json"

export default {
  name: "app",
  data() {
    return {
      sitename: "Lesson booking app",
      cart: [],
      currentView: LessonList,
      // lessons: lessons,
      lessons: [],
      imagesBaseURL: "",
      // imagesBaseURL: "https://lessonsapp-env.eba-3nvapgfm.eu-west-2.elasticbeanstalk.com/collections/lessons",
      testConsole: true,
      showTestConsole: true,
      // serverURL: "http://localhost:3000/collections/lessons",
      serverURL: "https://lessonsapp-env.eba-3nvapgfm.eu-west-2.elasticbeanstalk.com/collections/lessons",
    };
  },
  components: { LessonList, Checkout },

  created: function () {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }

    let webstore = this;

    fetch(this.serverURL).then(function (response) {
      response.json().then(function (json) {
        webstore.lessons = json;
      });
    });
  },

  methods: {
    showCheckout() {
      if (this.currentView === LessonList) { this.currentView = Checkout} 
      else { this.currentView = LessonList }
    },
    toggleShowTestConsole() {
      this.showTestConsole = !this.showTestConsole;
    },

    saveLessonToDB() {
      const newLesson = {
        "id": 1011,
        "subject": "Maths2",
        "location": "Room: 11",
        "price": 15.99,
        "image": "images/maths.png",
        "inventory": 5,
      }

      let webstore = this;

      fetch(this.serverURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLesson),
      }).then(function (response) {
        response.json().then(function (json) {
          alert("Success: " + json.acknowledged);
          console.log("Success: " + json.acknowledged);

          webstore.lessons.push(newLesson);
        });
      });
    },

    deleteAllCaches() {
      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name);
      });
      console.log("All caches deleted");
    },

    reloadPage() {
      window.location.reload();
    },

    unregisterAllServiceWorkers() {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
      console.log("Service workers unregistered");
    },

    addToCart: function (lesson) {
      this.cart.push(lesson.id);
    },

    removeItemFromCart(lesson) {
      let index = this.cart.indexOf(lesson.id);
      this.cart.splice(index, 1);
    },

    manageRemoveItem(lesson) {
      this.removeItemFromCart(lesson);
      if (!this.atLeastOneItemInTheCart) {
        this.currentView = LessonList;
  }
},

  },


  computed: {
    itemsInCart: function () {
      return this.cart.length || "";
    },

    sortedLessons() {
      function compare(a, b) {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
        return 0;
      }

      return this.lessons.sort(compare);
    },

    atLeastOneItemInTheCart() {
      return this.itemsInCart >=1;
    },
  },
};
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
