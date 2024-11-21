<template>
  <div class="order">
    <h3>Lịch sử mượn sách</h3>
    <div class="order__list order__list__title row col-sm-12">
      <div class="order__list__item col-sm-6">Sản phẩm</div>
      <div class="order__list__item col-sm-2">Ngày mượn</div>
      <div class="order__list__item col-sm-2">Ngày trả</div>
      <div class="order__list__item col-sm-2">Trạng thái</div>
    </div>
    <div
      v-for="(item, index) in order"
      class="order__list row col-sm-12"
      :key="item.id"
    >
      <div class="order__list__item order__list__item--sach col-sm-6">
        <div
          class="order__list__item__sach d-flex"
          style="margin-left: 50px"
          v-for="item_item in item.sach"
        >
          <img
            :src="'http://localhost:3000/static/' + item_item.sach.hinhanh"
            alt=""
          />
          <div>
            <p class="product-name" style="margin-left: 20px">
              {{ item_item.sach.ten }}
            </p>
            <p>x{{ item_item.soluong }}</p>
          </div>
        </div>
      </div>
      <div class="order__list__item col-sm-2">{{ item.ngaymuon }}</div>
      <div class="order__list__item col-sm-2">{{ item.ngaytra }}</div>
      <div
        v-if="item.trangthai == 'Đã trả'"
        class="order__list__item col-sm-2 text-success"
      >
        {{ item.trangthai }}
      </div>
      <div
        v-else-if="item.trangthai == 'Quá hạn'"
        class="order__list__item col-sm-2 text-danger"
      >
        {{ item.trangthai }}
      </div>
      <div v-else class="order__list__item col-sm-2 text-warning">
        {{ item.trangthai }}
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";
export default {
  updated() {
    this.getOrder();
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      this.order = await userService.getAllOrder();
    },
  },
  data() {
    return {
      order: [],
    };
  },
};
</script>

<style scoped>
.order {
  min-height: 100vh;
  background-color: #f4f6f9;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
}

.order h3 {
  font-size: 2rem;
  color: var(--color-main);
  margin-bottom: 20px;
}

.order__list {
  width: 100%;
  max-width: 1200px;
  margin: 10px auto;
  padding: 15px 0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order__list__item {
  padding: 10px;
  font-size: 0.9rem;
  text-align: center;
}

.order__list__item__sach img {
  width: 70px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.order__list__item--sach {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.order__list__item--sach p {
  margin-left: 10px;
  line-height: 1.4;
}

.order__list__title {
  background-color: var(--color-main);
  font-weight: 600;
  color: #fff;
  padding: 12px 0;
  border-radius: 8px;
}

.order__list__title .order__list__item {
  font-size: 1rem;
}

.order__list__item p {
  margin: 5px 0;
}

.product-name {
  font-weight: bold;
  color: #333;
}

.order__list__item.text-success {
  color: #28a745;
  font-weight: bold;
}

.order__list__item.text-danger {
  color: #dc3545;
  font-weight: bold;
}

.order__list__item.text-warning {
  color: #ffc107;
  font-weight: bold;
}

.order__list__item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

@media (max-width: 767px) {
  .order__list__title {
    font-size: 0.9rem;
  }

  .order__list__item {
    font-size: 0.85rem;
  }
}
</style>
