import { defineStore, acceptHMRUpdate } from "pinia";
import { watchDebounced } from '@vueuse/core'

export const useCartStore = defineStore("CartStore", () => {
  const deskree = useDeskree();

  // state
  const products = ref([]);
  const taxRate = 0.1;
  const isFirstLoad = ref(false);
  const loading = ref(false);

  // getters
  const count = computed(() => products.value.length);
  const isEmpty = computed(() => count.value === 0);
  const subtotal = computed((state) => {
    return products.value.reduce((p, product) => {
      return product?.fields?.price
        ? product.fields.price * product.count + p
        : p;
    }, 0);
  });
  const taxTotal = computed(() => subtotal.value * taxRate);
  const total = computed(() => taxTotal.value + subtotal.value);

  // actions
  function removeFromCart(productIds) {
    productIds = Array.isArray(productIds) ? productIds : [productIds];
    products.value = products.value.filter(
      (p) => !productIds.includes(p.sys.id)
    );
  }

  function addToCart(product, count) {
    const existingProduct = products.value.find(
      (p) => p.sys.id === product.sys.id
    );
    if (existingProduct) {
      existingProduct.count += count;
    } else {
      products.value.push({ ...product, count });
    }
    return count;
  }

  function reset () {
    products.value = [];
  }

  // triggers
  // init data
  deskree.auth.onAuthStateChange(async (user) => {
    isFirstLoad.value = true
    loading.value = true
    const res = await deskree.user.getCart();
    res.products.forEach((product) => addToCart(product, product.count));
    loading.value = false;
    setTimeout(() => (isFirstLoad.value = false), 1000)
  })

  // update data whenever products change
  watchDebounced(
    products,
    async () => {
      if (isFirstLoad.value) return;
      if (!deskree.user.get()) return;
      await deskree.user.updateCart(products.value);
    }
  )

  return {
    products,
    taxRate,
    count,
    isEmpty,
    subtotal,
    taxTotal,
    total,
    loading,
    isFirstLoad,
    removeFromCart,
    addToCart,
    reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
