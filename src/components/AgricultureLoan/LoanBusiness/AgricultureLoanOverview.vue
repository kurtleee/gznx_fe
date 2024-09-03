<!-- src/components/AgricultureLoan/LoanBusiness/AgricultureLoanOverview.vue -->
<template>
    <div class="overview">
      <h2>农贷业务概览</h2>
      <p>在这里您可以管理客户建档、评级授信等业务。</p>
  
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <h3>客户建档</h3>
            <p>管理客户的基本信息和建档操作。</p>
            <el-button type="primary" @click="navigateTo('customer-archiving')">进入客户建档</el-button>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <h3>评级授信</h3>
            <p>对客户进行信用评级和授信管理。</p>
            <el-button type="primary" @click="navigateTo('rating-and-credit')">进入评级授信</el-button>
          </el-card>
        </el-col>
        <!-- Add more cards as needed -->
      </el-row>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AgricultureLoanOverview',
    methods: {
      navigateTo(route) {
        this.$router.push(`/agriculture-loan/loan-business/${route}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .overview {
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .el-card {
    text-align: center;
  }
  </style>
  