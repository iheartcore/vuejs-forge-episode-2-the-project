<script setup>
const productStore = useProductStore();
const filters = computed(() => productStore.filters);
</script>
<template>
  <div class="filters-wrapper flex gap-2 items-center">
    <div class="form-control">
      <label class="label" for="search">
        <span class="label-text">Search</span>
      </label>
      <input
        id="search"
        v-model="filters.query"
        type="text"
        class="input input-bordered"
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="filterSpeed">
        <span class="label-text">Filter By Speed</span>
      </label>
      <select
        id="filterSpeed"
        class="select select-bordered"
        v-model="filters[`fields.speedLevel`]"
      >
        <option value="">All</option>
        <option value="Mild">Slow</option>
        <option value="Medium">Medium</option>
        <option value="Hot">Fast</option>
      </select>
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="orderBy">
        <span class="label-text">Order by</span>
      </label>
      <select
        class="select select-bordered"
        v-model="filters.order"
        id="orderBy"
      >
        <option value="">None</option>
        <option value="-fields.speedLevel">Speed (Slow First)</option>
        <option value="fields.speedLevel">Speed (Fast First)</option>
        <option value="fields.price">Price (Low to High)</option>
        <option value="-fields.price">Price (High to Low)</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 560px) {
  .filters-wrapper {
    display: block;
    width: 100%;
  }
  .form-control {
    width: 100% !important;
    max-width: 100%;
  }
  input,
  select {
    width: 100%;
  }
}
</style>
