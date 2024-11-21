<template>
  <div class="header__search">
    <i class="ri-search-line"></i>
    <input
      type="text"
      placeholder="Tìm kiếm"
      v-model="search"
      @keyup="getAllProduct"
    />
  </div>

  <div class="tables">
    <div class="table__name">{{ nameTable }}</div>

    <div class="table__title row">
      <div class="table__title__item col-sm-1">STT</div>
      <div class="table__title__item col-sm-2">HÌNH ẢNH</div>
      <div class="table__title__item col-sm-2">TÊN</div>
      <div class="table__title__item col-sm-2">GIÁ</div>
      <div class="table__title__item col-sm-2">SỐ LƯỢNG</div>
      <div class="table__title__item col-sm-2"></div>
    </div>

    <div v-for="(item, index) in list" class="table__list row" :key="item.id">
      <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
      <div class="table__list__item col-sm-2">
        <Image :src="item.hinhanh" alt="Product Image" />
      </div>
      <div class="table__list__item col-sm-2">
        {{ item.ten }} <br />
        {{ item.category }}
      </div>
      <div class="table__list__item col-sm-2">{{ item.dongia }} VND</div>
      <div class="table__list__item col-sm-2">{{ item.soluong }}</div>

      <div class="table__list__item table__list__item--edit col-sm-1">
        <i class="ri-edit-line table__icon" @click="handleEmit(item)"></i>
      </div>

      <div class="table__list__item table__list__item--delete col-sm-1">
        <i
          class="ri-delete-bin-2-line table__icon"
          @click="confirmDelete(item)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import Image from "@/components/Image.vue";
import ProductService from "@/services/product.service.js";

export default {
  props: ["nameTable"],
  mounted() {
    this.getAllProduct();
  },
  components: {
    Image,
  },
  watch: {
    list(newValue) {
      this.getAllProduct();
    },
  },
  emits: ["edit"],
  computed: {
    productStrings() {
      return this.list.map((product) => {
        const { ten, tacgia, mota, nhaxuatban } = product;
        return [ten, tacgia, mota, nhaxuatban].join(" ").toUpperCase();
      });
    },
    filteredProducts() {
      if (this.search === "") return this.list;
      return this.list.filter((_products, index) =>
        this.productStrings[index].includes(this.search.toUpperCase())
      );
    },
  },
  methods: {
    async getAllProduct() {
      this.list = await ProductService.getAll();
      this.list = this.list.filter((item) => item.deleted === 0);

      if (this.search !== "") {
        this.list = this.filteredProducts;
      }
    },
    handleEmit(product) {
      this.$emit("edit", product);
    },
    confirmDelete(product) {
      if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        this.handleDelete(product);
      }
    },
    async handleDelete(product) {
      if (await ProductService.deleteProduct(product)) {
        this.getAllProduct();
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
/* General styles for the table */
.tables {
  flex-grow: 1;
  background-color: #ffffff;
  border: 2px solid #f0f0f0;
  border-radius: 15px;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
  text-align: center;
  margin-top: 40px;
}

.table__name {
  background: linear-gradient(to right, #2980b9, #6dd5fa);
  padding: 15px 20px;
  color: #fff;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: left;
  border-radius: 10px;
  margin-bottom: 20px;
}

.table__title {
  font-weight: 700;
  color: #333;
  font-size: 0.9rem;
  padding-bottom: 15px;
}

.table__title__item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
}

.table__list {
  display: flex;
  align-items: center;
  color: #000000;
  font-size: 0.9rem;
  margin-bottom: 15px;
  border-top: 1px solid #f0f0f0;
}

.table__list__item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-right: 1px solid #f0f0f0;
}

.table__list__item:last-child {
  border-right: none;
}

.table__list__item i {
  font-size: 1.3rem;
  color: #3498db;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.table__list__item i:hover {
  background-color: #e1f0ff;
}

.table__list__item--edit i {
  color: #3498db;
}

.table__list__item--delete i {
  color: #e74c3c;
}

.header__search {
  position: relative;
  max-width: 400px;
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 30px;
  padding-left: 30px;
  background-color: #f8f8f8;
}

.header__search i {
  color: #888;
  margin-right: 10px;
}

.header__search input {
  width: 300px;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 50px;
  background-color: #f7f7f7;
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
.header__search input:focus {
  background-color: #fff;
  border: 2px solid #3498db;
}

/* Responsive Design */
@media (max-width: 768px) {
  .table__list__item {
    font-size: 0.8rem;
    padding: 10px;
  }

  .table__name {
    font-size: 1.2rem;
  }

  .header__search input {
    width: 250px;
  }
}
</style>
