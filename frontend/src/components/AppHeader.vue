<template>
  <header class="header">
    <!-- Logo -->
    <div class="header__logo">
      <router-link to="/" class="header__logo__title"
        >My Book Store</router-link
      >
    </div>

    <!-- Button to toggle mobile navigation -->
    <div class="header__menu-toggle" @click="toggleNav">
      <i class="fa-solid fa-bars"></i>
    </div>

    <!-- Desktop Menu -->
    <nav :class="['header__nav', { active: isNavOpen }]">
      <router-link to="/" class="header__nav__link">Trang chủ</router-link>
      <router-link to="/product" class="header__nav__link">Sách</router-link>
      <router-link to="/about" class="header__nav__link"
        >Giới thiệu</router-link
      >

      <!-- User Authentication Links -->
      <div class="header__auth">
        <template v-if="!userStore.login">
          <router-link to="/register" class="header__auth__btn"
            >Đăng ký</router-link
          >
          <router-link to="/login" class="header__auth__btn"
            >Đăng nhập</router-link
          >
        </template>
        <template v-else>
          <div class="header__user-info">
            <span class="header__user-name"
              >{{ userStore.user.ho }} {{ userStore.user.ten }}</span
            >
            <div class="header__user-dropdown">
              <router-link to="/order">Đơn hàng</router-link>
              <button @click="userStore.logout">Đăng xuất</button>
            </div>
          </div>
        </template>
      </div>

      <!-- Cart Icon -->
      <div class="header__cart">
        <router-link to="/cart">
          <i class="fa-solid fa-bag-shopping"></i>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { useUserStore } from "@/stores/userStore";

export default {
  data() {
    return {
      isNavOpen: false, // Điều khiển việc mở/đóng menu trên di động
      userStore: useUserStore(),
    };
  },
  computed: {
    // Tạo hàm tính toán cho trạng thái người dùng
    user() {
      return this.userStore.user;
    },
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen; // Mở hoặc đóng menu trên di động
    },
  },
};
</script>

<style scoped>
/* Tạo một số biến màu sắc */
:root {
  --color-background: #f8f9fa;
  --color-main: #007bff;
  --color-text: #333;
  --color-gray: #6c757d;
}

/* Header Container */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--color-background);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Logo */
.header__logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-main);
  text-decoration: none;
}

.header__logo__title {
  font-family: "Satisfy", cursive;
}

/* Toggle Button for Mobile */
.header__menu-toggle {
  display: none;
  font-size: 2rem;
  cursor: pointer;
}

/* Navbar Links */
.header__nav {
  display: flex;
  gap: 20px;
  align-items: center;
}

.header__nav__link {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.header__nav__link:hover {
  background-color: var(--color-main);
  color: white;
}

/* Authentication Buttons */
.header__auth__btn {
  margin-left: 10px;
  font-size: 1rem;
  padding: 8px 15px;
  background-color: var(--color-main);
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.header__auth__btn:hover {
  background-color: #0056b3;
}

/* Cart Icon */
.header__cart i {
  font-size: 1.5rem;
  color: var(--color-text);
  cursor: pointer;
  transition: color 0.3s ease;
}

.header__cart i:hover {
  color: var(--color-main);
}

/* User Info Dropdown */
.header__user-info {
  position: relative;
}

.header__user-name {
  font-weight: 600;
  color: var(--color-text);
}

.header__user-dropdown {
  position: absolute;
  top: 100%;
  transform: translateX(-50%);
  background-color: var(--color-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  display: none;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
}

.header__user-info:hover .header__user-dropdown {
  display: flex;
}

.header__user-dropdown a,
.header__user-dropdown button {
  width: 100%;
  padding: 10px;
  text-align: center;
  border: none;
  background-color: transparent;
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.header__user-dropdown a:hover,
.header__user-dropdown button:hover {
  background-color: var(--color-main);
  color: white;
}

/* Mobile Styles */
@media only screen and (max-width: 768px) {
  .header__menu-toggle {
    display: block;
  }

  .header__nav {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--color-background);
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: none;
  }

  .header__nav.active {
    display: flex;
  }

  .header__nav__link {
    width: 100%;
    padding: 15px 20px;
    text-align: left;
  }

  .header__auth__btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
