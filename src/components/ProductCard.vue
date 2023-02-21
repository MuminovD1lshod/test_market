<template>
  <div class="product-card max-w-[320px] bg-white p-5 rounded-md shadow-md">
    <div class="image rounded-md overflow-hidden w-full h-[200px]">
      <img :src="info.image" alt="product-picture" class="w-full h-full object-cover">
    </div>
    <h3 class="name my-3 font-semibold text-xl text-gray-700">{{ info.name }}</h3>
    <p class="desc text-sm text-gray-500">{{ info.description }}</p>
    <p class="price mt-4 text-2xl text-yellow-800 font-medium">{{ info.price }} so'm</p>

    <div class="buttons mt-2">
      <TheButton type="bg-yellow-500" @action="$emit('editClicked', id)">
        <i class="fas fa-edit"></i>
        <span class="ml-1">Edit</span>
      </TheButton>

      <TheButton type="bg-red-600 ml-2" @action="deleteProduct">
        <i class="fas fa-trash"></i>
        <span class="ml-1">Delete</span>
      </TheButton>
    </div>
  </div>
</template>

<script>
import TheButton from './TheButton.vue';
import { useToast } from "vue-toastification";
export default {
  props: {
    info: {
      type: Object,
      default: {}
    },
    id: {
      type: String
    }
  },
  components: {
    TheButton
  }, 
  data() {
    return {
      api: 'https://benzin-market-default-rtdb.firebaseio.com/products/',
      toast: useToast(),
    }
  },
  methods: {
    // async deleteProduct() {
    //   await fetch(this.api + this.id + '.json', { method: 'DELETE' })
    //   this.toast.success('Product has been deleted!')
    //   this.$emit('productDeleted')
    // }
    async deleteProduct() {
      const res = await fetch('https://benzin-market-default-rtdb.firebaseio.com/arxiv.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.info)
      })
      await fetch(this.api + this.id + '.json', { method: 'DELETE' })
      this.toast.success('Product has been deleted!')
      this.$emit('productDeleted')
    }
  }
}
</script>