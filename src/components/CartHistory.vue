<template>
  <div class="cart p-5">
    <h2 class="title text-xl mb-5">Edit Product</h2>

    <div class="item p-5 shadow-md rounded-md flex mb-3" v-for="(product, key) in cartProducts" :key="key">
      <div class="product-image w-[150px] h-[100px]">
        <img
          :src="product.image"
          alt="image"
          class="w-full h-full object-cover rounded-md"
        />
      </div>
      <div class="text-wrap ml-3">
        <h3 class="name font-semibold text-xl mb-3">{{ product.name }}</h3>
        <div class="actions flex items-center">
          <TheButton type="bg-green-600" @action="restoreProduct(product, key)">
            <i class="fas fa-plus"></i>
            <span class="ml-1">Restore</span>
          </TheButton>

          <TheButton type="bg-red-600 ml-2" @action="deleteFromCart(key)">
            <i class="fas fa-trash"></i>
            <span class="ml-1">Remove</span>
          </TheButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheButton from './TheButton.vue'
import { useToast } from "vue-toastification";

export default {
  components: {
    TheButton
  },
  data() {
    return {
      api: 'https://benzin-market-default-rtdb.firebaseio.com/',
      toast: useToast(),
      cartProducts: {}
    }
  },
  methods: {
    async fetchProductsFromCart() {
      const res = await fetch(this.api + 'arxiv.json')
      const data = await res.json()
      this.cartProducts = data
    },
    async deleteFromCart(id, hasToast = true) {
      await fetch(this.api + `arxiv/${id}.json`, { method: 'DELETE' })
      this.fetchProductsFromCart()
      if(hasToast) {
        this.toast.success('Product has been deleted from cart!')
        this.$emit('cancel')
      }
    },
    async restoreProduct(product, id) {
      const res = await fetch(this.api + 'products.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
      this.toast.success('Product has been restored from cart!')
      this.deleteFromCart(id, false)
      this.$emit('cancel')
    }
  },
  mounted() {
    this.fetchProductsFromCart()
  }
};
</script>