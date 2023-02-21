<template>
  <div class="container wrapper flex flex-wrap justify-center gap-5 mt-5 pb-5">
    <ProductCard 
      v-for="(product, key) in products" 
      :key="key"
      :info="product"
      :id="key"
      @productDeleted="fetchProducts"
      @editClicked="editClicked"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      api: 'https://benzin-market-default-rtdb.firebaseio.com/products.json',
      products: {}
    }
  },
  methods: {
    async fetchProducts() {
      const res = await fetch(this.api)
      const data = await res.json()
      this.products = data
    },
    editClicked(id) {
      this.$emit('edit', id)
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>