<template>
  <div>Welcome to the lesson list

    <div v-for="lesson in sortedLessons">
        <h2 v-text="lesson.subject"></h2>

         <figure>
          <img v-bind:src ="imagesBaseURL + lesson.image" class="lessonIcon">
        </figure>

        <p v-text="lesson.location"></p>
        <p>Price: £{{lesson.price}}</p>

        <button v-if="canAddToCart(lesson)" v-on:click="addToCart(lesson)">Add to cart</button>
        <button v-else disabled>Add to cart</button>
        <span v-if="itemsLeft(lesson) == 0">All spaces booked!</span>
        <span v-else-if="itemsLeft(lesson) < 5">Only {{itemsLeft(lesson)}} spaces left!</span>
        <span v-else>Book now!</span>
      </div>
  </div>

</template>

<script>
export default {
  name: "LessonList",
  props: ["sortedLessons", "imagesBaseURL", "cart"],
  data() {
    return {}
  },
  
methods: {
  canAddToCart: function (lesson) {
    return lesson.inventory > this.cartCount(lesson.id);
  },

  cartCount(id) {
          let count = 0;
          for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i] === id) {
              count++;
            }
          }
          return count;
        },

addToCart: function (lesson) {
  this.$emit("add-item-to-cart", lesson)
  },
itemsLeft(lesson) {
  return lesson.inventory - this.cartCount(lesson.id);
  },
        
  }
}
</script>