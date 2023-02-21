<template>
  <div class="create-product p-5">
    <h2 class="title text-xl mb-3">Edit Product</h2>

    <div class="mb-2">
      <p class="text-xs text-gray-500 mb-1">Name:</p>
      <input type="text" :class="inputStyles" v-model="product.name">
    </div>

    <div class="mb-2">
      <p class="text-xs text-gray-500 mb-1">Description:</p>
      <input type="text" :class="inputStyles" v-model="product.description">
    </div>

    <div class="mb-2">
      <p class="text-xs text-gray-500 mb-1">Price:</p>
      <input type="text" :class="inputStyles" v-model="product.price">
    </div>

    <div class="mb-2">
      <p class="text-xs text-gray-500 mb-1">Image:</p>
      <input type="text" :class="inputStyles" placeholder="url://" v-model="product.image">
    </div>

    <div class="mt-3 flex gap-2">
      <TheButton type="bg-red-600 w-1/2" @action="$emit('cancel')">
        Cancel
      </TheButton>

      <TheButton type="bg-yellow-600 w-1/2" @action="editProduct">
        Edit product
      </TheButton>
    </div>

  </div>
</template>

<script>
import TheButton from './TheButton.vue'
import { useToast } from "vue-toastification";

export default {
  components: { TheButton },
  props: {
    productId: {
      type: [String, null],
      default: null
    }
  },
  data() {
    return {
      inputStyles: 'w-full py-2 px-3 border border-gray-500 rounded-md outline-none focus:border-green-500',
      api: 'https://benzin-market-default-rtdb.firebaseio.com/products/',
      toast: useToast(),
      product: {
        name: null,
        description: null,
        price: null,
        image: null,
      }
    }
  },
  methods: {
    async editProduct() {
      const res = await fetch(this.api + this.productId + '.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.product)
      })
      this.toast.success('Product has been changed!')
      this.$emit('cancel')
    },
    async getProductInfo() {
      const res = await fetch(this.api + this.productId + '.json')
      const data = await res.json()
      this.product = data
    }
  },
  mounted() {
    this.getProductInfo()
  }
}
</script>

<style>

</style>