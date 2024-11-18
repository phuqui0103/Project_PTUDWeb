<template>
  <footer>
    <div class="footer">
      <div class="footer__left">
        <p>&copy; 2024 - Book Store</p>
      </div>
      <div class="footer__right">
        <ul>
          <li>Địa chỉ: thành phố Cần Thơ, Việt Nam</li>
          <li>Email: web@project.com</li>
          <li>Số điện thoại: 0911 222 333</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2c3e50; /* Màu nền footer */
  color: #ecf0f1; /* Màu chữ sáng */
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
  position: relative;
}

.footer__left p {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.footer__right ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__right li {
  font-size: 1rem;
  margin: 5px 0;
  line-height: 1.5;
}

.footer__right li a {
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s;
}

.footer__right li a:hover {
  color: #3498db; /* Màu sáng khi hover lên liên kết */
}

@media only screen and (max-width: 768px) {
  .footer {
    flex-direction: column;
    text-align: center;
  }

  .footer__left {
    margin-bottom: 20px;
  }

  .footer__right ul {
    padding-left: 0;
  }

  .footer__right li {
    font-size: 0.9rem;
  }
}
</style>
