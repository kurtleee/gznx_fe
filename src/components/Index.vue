<template>
    <el-container class="container">
      <el-aside class="aside" width="180px">
        <el-menu
          default-active="/agriculture-loan"
          class="el-menu-demo"
          text-color="#BFCBD9"
          active-text-color="#409EE0"
          background-color="#304156"
          router
        >
          <el-menu-item index="/agriculture-loan">农贷业务</el-menu-item>
          <el-menu-item index="/personal-loan">个贷业务</el-menu-item>
          <el-menu-item index="/post-loan-management">贷后业务</el-menu-item>
        </el-menu>
      </el-aside>
  
      <el-container>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script>
  
  export default {
    name: 'Index',
  };
  </script>
  
  <style>
  .container {
    height: 100vh;
  }
  
  .el-aside {
    background-color: #304156;
    /* height: 100vh;
    position: fixed;
    z-index: 100; */
  }
  
  .el-aside .el-submenu .el-menu-item {
    background-color: #1F2D3D !important;
  }
  
  .el-header {
    background-color: #f5f5f5;
    padding: 0 20px;
  }
  
  .main {
    background-color: #fff;
    padding: 20px;
  }
  </style>
  