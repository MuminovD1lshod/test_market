<template>
  <div class="main">
    <div class="container flex justify-between items-center pt-7">
      <h2 class="title text-2xl text-gray-800" @click="test">Products</h2>

      <div class="">
        <TheButton type="bg-green-600" @action="isCartOpen = true">
          <i class="fas fa-shopping-cart"></i>
          <span class="ml-1">History of cart</span>
        </TheButton>

        <TheButton type="bg-blue-600 ml-2" @action="isPopupOpen = true">
          <i class="fas fa-plus"></i>
          <span class="ml-1">Add new product</span>
        </TheButton>
      </div>
    </div>

    <ProductsList :key="counter" @edit="editProd" />

    <!-- Create product popup -->
    <Popup :open="isPopupOpen" @close="isPopupOpen = false">
      <CreateProduct @cancel="isPopupOpen = false, counter++" />
    </Popup>

    <!-- Edit product popup -->
    <Popup :open="isEditing" @close="isEditing = null">
      <EditProduct :productId="isEditing" @cancel="isEditing = null, counter++" />
    </Popup>

    <!-- Cart history -->
    <Popup :open="isCartOpen" @close="isCartOpen = null">
      <CartHistory @cancel="isCartOpen = null, counter++" />
    </Popup>
  </div>
</template>
CRUD
<script>
import CreateProduct from './components/CreateProduct.vue';
import Popup from './components/Popup.vue';
import ProductsList from './components/ProductsList.vue';
import TheButton from './components/TheButton.vue';
import EditProduct from './components/EditProduct.vue';
import CartHistory from './components/CartHistory.vue';

export default {
  components: {
    ProductsList,
    TheButton,
    Popup,
    CreateProduct,
    EditProduct,
    CartHistory,
  },
  data() {
    return {
      isPopupOpen: false,
      isCartOpen: false,
      isEditing: null,
      api: 'https://benzin-market-default-rtdb.firebaseio.com/products',
      counter: 0
    }
  },
  methods: {
    test() {
      this.toast.success('hello')
    },
    editProd(id) {
      this.isEditing = id
    }
  }
}
</script>

<style>
body{
  background: #f1f1f1;
}
</style>