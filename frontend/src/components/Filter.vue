<template>
  <div class="filter">
    <div class="filter__price">
      <label for="sort" class="filter__label">Sắp xếp giá:</label>
      <select
        @change="handleSort"
        v-model="sort"
        id="sort"
        class="filter__select"
      >
        <option :value="''">Mặc định</option>
        <option value="asc">Tăng dần</option>
        <option value="desc">Giảm dần</option>
      </select>
    </div>
    <div class="filter__range">
      <label for="priceRange" class="filter__label">Mức giá: </label>
      <input
        type="range"
        id="priceRange"
        min="0"
        max="100000"
        step="1000"
        v-model="price"
        @input="filterPrice"
        class="filter__range-input"
      />
      <span class="filter__price-value">{{ formatPrice }} VNĐ</span>
    </div>
  </div>
</template>

<script>
import menuService from "@/services/book.service";

export default {
  computed: {
    formatPrice() {
      return parseInt(this.price).toLocaleString();
    },
  },
  methods: {
    async handleSort() {
      this.$emit("sort", this.sort);
    },
    async filterPrice() {
      this.$emit("range", this.price);
    },
  },
  data() {
    return {
      sort: "",
      price: 0,
    };
  },
};
</script>

<style scoped>
.filter {
  background-color: rgba(30, 30, 30, 0.7); /* Màu nền trong suốt */
  backdrop-filter: blur(15px); /* Mờ nền phía sau */
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
}

.filter__price,
.filter__range {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter__label {
  font-size: 1rem;
  margin-bottom: 5px;
  font-weight: 500;
  text-transform: uppercase;
}

.filter__select {
  padding: 8px 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #34495e;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter__select:hover {
  background-color: #2c3e50;
}

.filter__range-input {
  width: 100%;
  max-width: 250px;
  margin-top: 10px;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: #ddd;
  border-radius: 10px;
  outline: none;
  transition: background 0.3s ease;
}

.filter__range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #3498db;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter__range-input::-webkit-slider-thumb:hover {
  background-color: #2980b9;
}

.filter__price-value {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 10px;
}

@media only screen and (max-width: 768px) {
  .filter {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .filter__price,
  .filter__range {
    align-items: flex-start;
  }

  .filter__price-value {
    margin-top: 5px;
  }
}
</style>
