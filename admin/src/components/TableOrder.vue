<template>
  <div class="header__search">
    <div class="search-bar">
      <i class="ri-search-line"></i>
      <input
        type="text"
        placeholder="Tìm kiếm"
        v-model="search"
        @keyup="getAllOrder"
      />
    </div>
  </div>

  <div class="tables">
    <div class="table__name">{{ nameTable }}</div>

    <div class="table__title row">
      <div class="table__title__item col-1">STT</div>
      <div class="table__title__item col-3">MÃ PHIẾU</div>
      <div class="table__title__item col-2">TÊN KHÁCH HÀNG</div>
      <div class="table__title__item col-1">TỔNG TIỀN</div>
      <div class="table__title__item col-1">NGÀY MƯỢN</div>
      <div class="table__title__item col-1">NGÀY TRẢ</div>
      <div class="table__title__item col-2">TRẠNG THÁI</div>
      <div class="table__title__item col-1"></div>
    </div>

    <div
      v-for="(item, index) in filteredList"
      class="table__list row"
      :key="item.id"
    >
      <div class="table__list__item col-1">{{ index + 1 }}</div>
      <div class="table__list__item col-3">{{ item._id }}</div>
      <div class="table__list__item col-2">
        {{ item.docgia.ho + " " + item.docgia.ten }}
      </div>
      <div class="table__list__item col-1">{{ item.tongtien }} VND</div>
      <div class="table__list__item col-1">{{ item.ngaymuon }}</div>
      <div class="table__list__item col-1">{{ item.ngaytra }}</div>

      <div :class="['table__list__item col-2', statusClass(item.trangthai)]">
        {{ item.trangthai }}
      </div>

      <div class="table__list__item col-1">
        <i class="ri-pencil-line" @click="handleEmit(item)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import StaffService from "@/services/staff.service.js";

export default {
  props: ["nameTable"],
  watch: {
    list(newValue) {
      this.getAllOrder();
    },
  },
  mounted() {
    this.getAllOrder();
  },
  computed: {
    productStrings() {
      return this.list.map((product) => {
        const { ho, ten, diachi, sodienthoai } = product.docgia;
        const { ngaymuon, ngaytra, trangthai, _id } = product;
        return [ten, ho, diachi, _id, sodienthoai, trangthai, ngaymuon, ngaytra]
          .join(" ")
          .toUpperCase();
      });
    },
    filteredList() {
      if (this.search === "") return this.list;
      return this.list.filter((product, index) => {
        return this.productStrings[index].includes(this.search.toUpperCase());
      });
    },
  },
  methods: {
    async getAllOrder() {
      this.list = await StaffService.getAllOrder();
      if (this.search !== "") {
        this.list = this.filteredList;
      }
    },
    handleEmit(item) {
      this.$emit("edit", item);
    },
    statusClass(status) {
      switch (status) {
        case "Đã trả":
          return "text-success";
        case "Quá hạn":
          return "text-danger";
        default:
          return "text-primary";
      }
    },
  },
  data() {
    return {
      list: [],
      search: "",
    };
  },
};
</script>

<style scoped>
/* Styling for the entire table */
.tables {
  flex-grow: 1;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
}

.table__name {
  background: linear-gradient(135deg, #2980b9, #6dd5fa);
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: left;
}

.table__title {
  font-weight: 700;
  color: #333;
  font-size: 0.9rem;
  padding-bottom: 15px;
}

.table__title__item {
  text-align: center;
  padding: 10px;
  background-color: #f8f8f8;
  font-size: 0.9rem;
  font-weight: bold;
}

.table__list {
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  padding: 10px 0;
  font-size: 0.9rem;
}

.table__list__item {
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
}

.table__list__item i {
  color: #3498db;
  font-size: 1.2rem;
  cursor: pointer;
}

.table__list__item i:hover {
  background-color: #ecf0f1;
  border-radius: 50%;
  padding: 5px;
}

.table__list__item.text-success {
  color: #27ae60;
}

.table__list__item.text-danger {
  color: #e74c3c;
}

.table__list__item.text-primary {
  color: #3498db;
}

.search-bar {
  position: relative;
  max-width: 400px;
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 30px;
  padding-left: 30px;
  background-color: #f8f8f8;
}

.search-bar i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #888;
}

.search-bar input {
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-radius: 30px;
  outline: none;
  font-size: 1rem;
  background-color: transparent;
  color: #333;
}

.search-bar input:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}
</style>
