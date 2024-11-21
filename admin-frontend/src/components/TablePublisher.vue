<template>
  <div class="header__search">
    <i class="ri-search-line"></i>
    <input
      type="text"
      placeholder="Tìm kiếm"
      v-model="search"
      @keyup="getAllPublisher"
    />
  </div>

  <div class="tables">
    <div class="table__name">{{ nameTable }}</div>

    <div class="table__title row">
      <div class="table__title__item col-sm-1">STT</div>
      <div class="table__title__item col-sm-3">MÃ</div>
      <div class="table__title__item col-sm-3">TÊN</div>
      <div class="table__title__item col-sm-3">ĐỊA CHỈ</div>
      <div class="table__title__item col-sm-2"></div>
    </div>

    <div v-for="(item, index) in list" class="table__list row" :key="item._id">
      <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
      <div class="table__list__item col-sm-3">{{ item._id }}</div>
      <div class="table__list__item col-sm-3">{{ item.ten }}</div>
      <div class="table__list__item col-sm-3">{{ item.diachi }}</div>

      <div class="table__list__item col-sm-1">
        <i class="ri-pencil-line table__icon" @click="handleEmit(item)"></i>
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
import StaffService from "@/services/staff.service.js";

export default {
  props: ["nameTable"],
  watch: {
    list(newValue) {
      this.getAllPublisher();
    },
  },
  mounted() {
    this.getAllPublisher();
  },
  computed: {
    productStrings() {
      return this.list.map((product) => {
        const { ten, diachi } = product;
        return [ten, diachi].join(" ").toUpperCase();
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
    async getAllPublisher() {
      this.list = await StaffService.getAllPublisher();
      this.list = this.list.filter((item) => item.deleted !== 1);

      if (this.search !== "") {
        this.list = this.filteredProducts;
      }
    },
    handleEmit(publisher) {
      this.$emit("edit", publisher);
    },
    confirmDelete(publisher) {
      if (window.confirm("Are you sure you want to delete this publisher?")) {
        this.handleDelete(publisher);
      }
    },
    async handleDelete(publisher) {
      const data = {
        _id: publisher._id,
        ten: publisher.ten,
        diachi: publisher.diachi,
      };
      if (await StaffService.deletePublisher(data)) {
        this.getAllPublisher();
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
  display: flex;
  align-items: center;
  width: 400px;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 5px 15px;
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
