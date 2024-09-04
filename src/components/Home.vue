<!-- src/components/Home.vue -->
<template>
    <div class="home">
      <h1>欢迎来到贵州农业银行贷款管理系统</h1>
      <el-button type="primary" @click="goToDashboard">进入系统</el-button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    methods: {
      goToDashboard() {
        this.$router.push('/index'); // 跳转到index页面
      }
    }
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .el-button {
    font-size: 18px;
    padding: 10px 20px;
  }
  </style>
  