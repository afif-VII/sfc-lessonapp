<template>
  <div>
    <h1>Welcome to the checkout</h1>
    <h2>Added Lessons</h2>
    <h2>Your current items in the cart are {{ itemsInCart }} in total:</h2>

    <div>
      <div v-for="lesson in sortedLessons">

      <div v-if="atLeastOneInTheCart(lesson)" class="lesson">
        <h3 v-text="lesson.title"></h3>
        <p><span>Lesson ID: </span> {{ " " + lesson.id }}</p>

        <figure>
          <img v-bind:src="imagesBaseURL + lesson.image" class="lessonIcon" />
        </figure>

        <p>
          <span>Price <font-awesome-icon icon="fas fa-pound-sign" /></span>{{ " " + lesson.price }}
        </p>
        <p>
          Available spaces: {{ itemsLeft(lesson) }} (<strong>In the cart you have added: {{ cartCount(lesson.id) }}
          </strong>)
        </p>

        <button v-on:click="manageRemoveItem(lesson)">
          Remove 1 from your cart
        </button>
      </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Checkout",
  props: ["sortedLessons", "imagesBaseURL", "cart"],
  data() {
    return {};
  },

  methods: {
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },

    itemsLeft(lesson) {
      return lesson.inventory - this.cartCount(lesson.id);
    },
    atLeastOneInTheCart(lesson) {
      return this.cart.includes(lesson.id);
    },
    manageRemoveItem: function(lesson) {
      this.$emit("manage-remove-item", lesson);
    },
  },
  computed: {
    itemsInCart: function () {
      return this.cart.length || "";
    },
  }
}
</script>

