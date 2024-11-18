<template>
  <div class="detail">
    <div class="notification" @click="hideNotify" v-if="message">
      <div class="notification__message">
        <i class="fa-solid fa-circle-check"></i>
        <p>{{ message }}</p>
      </div>
    </div>
    <div v-if="item" class="detail__content">
      <!-- Product Image -->
      <div class="detail__image">
        <img :src="'http://localhost:3000/static/' + item.hinhanh" alt="" />
      </div>

      <!-- Product Info -->
      <div class="detail__info">
        <h3 class="detail__name">{{ item.ten }}</h3>
        <p class="detail__description">{{ item.mota }}</p>
        <p class="detail__author">Tác giả: {{ item.tacgia }}</p>
        <p class="detail__publisher">Nhà xuất bản: {{ item.nhaxuatban }}</p>
        <p class="detail__price">
          Giá:
          <span class="price"
            >{{ parseInt(item.dongia).toLocaleString() }} VNĐ</span
          >
        </p>
        <p class="detail__stock">Số lượng còn lại: {{ item.soluong }}</p>

        <!-- Quantity Input and Add to Cart Button -->
        <div class="detail__quantity">
          <input type="number" min="1" v-model="quanlity" :max="item.soluong" />
          <button class="btn btn-info" @click="addToCart(item)">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>

    <!-- Fallback for no product -->
    <p v-else class="no-product">Không có sản phẩm</p>
  </div>
</template>

<script>
import ProductService from "@/services/book.service";
import userService from "@/services/user.service";
import Notification from "@/components/Notification.vue";
import { useUserStore } from "@/stores/userStore";

export default {
  components: {
    Notification,
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.getItem();
      },
    },
  },
  methods: {
    async getItem() {
      this.item = await ProductService.getOne(this.$route.params.id);
    },
    async addToCart(data) {
      if (!useUserStore().login) {
        const confirmed = confirm(
          "Bạn cần đăng nhập để mua hàng. Bạn có muốn đăng nhập ngay không?"
        );
        if (confirmed) {
          this.$router.push("/login");
        }
      } else {
        const { _id, dongia, ten, hinhanh } = data;
        const quanlity = { soluong: this.quanlity };
        const filterData = { _id, dongia, ten, hinhanh, ...quanlity };

        const success = await userService.addCart(filterData);
        if (!success.message) {
          this.message = "Thêm vào giỏ hàng thành công!";
        } else {
          this.message = "Thất bại!";
        }
      }
    },
  },

  data() {
    return {
      item: "",
      quanlity: 1,
      message: "",
    };
  },
};
</script>

<style scoped>
.detail {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  color: #000000;
  background-size: cover;
  background-repeat: no-repeat;
}

.detail__content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  gap: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.detail__image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail__image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.detail__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail__name {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-main);
}

.detail__description {
  font-size: 1rem;
  color: #555;
}

.detail__author,
.detail__publisher {
  font-size: 1rem;
  color: #777;
}

.detail__price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-main);
}

.detail__stock {
  font-size: 1rem;
  color: #333;
}

.detail__quantity {
  display: flex;
  gap: 10px;
  align-items: center;
}

.detail__quantity input {
  width: 80px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.detail__quantity input:focus {
  border-color: var(--color-main);
}

.detail__quantity button {
  padding: 10px 20px;
  background-color: var(--color-main);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.detail__quantity button:hover {
  background-color: #0056b3;
}

.no-product {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .detail__content {
    flex-direction: column;
    align-items: center;
  }

  .detail__image {
    margin-bottom: 20px;
  }

  .detail__quantity {
    flex-direction: column;
    align-items: center;
  }

  .detail__quantity input {
    margin-bottom: 10px;
  }
}
</style>
