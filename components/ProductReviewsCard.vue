<script setup>
import { useDateFormat } from "@vueuse/core";
const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
});
const date = useDateFormat(new Date(props.review.createdAt), "MM-YYYY");
</script>

<template>


  <div class="card border-2 border-gray-200 rounded-md">
    <div class="card-body">
      <div class="card-actions justify-between text-sm">
          <div class="rating gap-1">
            <input type="radio" name="rating-3" class="mask mask-heart bg-red-400" disabled :checked="review.rating === 1" />
            <input type="radio" name="rating-3" class="mask mask-heart bg-orange-400" disabled :checked="review.rating === 2" />
            <input type="radio" name="rating-3" class="mask mask-heart bg-yellow-400" disabled :checked="review.rating === 3" />
            <input type="radio" name="rating-3" class="mask mask-heart bg-lime-400" disabled :checked="review.rating === 4" />
            <input type="radio" name="rating-3" class="mask mask-heart bg-green-400" disabled :checked="review.rating === 5" />
          </div>
        <div>{{ date }}</div>
      </div>
      <h2 class="card-title">{{ review.title }}</h2>
      <p>
        {{ review.text }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  .mask-heart{
    cursor: initial;
  }
</style>
