<!--
接口调用说明：
1. 获取任务统计数据
   - 接口地址：GET /api/post-loan-management/task-management/statistics
   - 作用：获取贷后任务的统计数据，用于在图表中展示。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>任务统计</span>
        </div>
        <el-table :data="statistics" style="width: 100%">
          <el-table-column prop="taskType" label="任务类型"></el-table-column>
          <el-table-column prop="taskCount" label="任务数量"></el-table-column>
          <el-table-column prop="completedCount" label="已完成数量"></el-table-column>
          <el-table-column prop="pendingCount" label="待处理数量"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TaskStatistics',
    data() {
      return {
        statistics: []
      };
    },
    created() {
      this.fetchStatistics();
    },
    methods: {
      // 获取任务统计数据
      fetchStatistics() {
        axios.get('/api/post-loan-management/task-management/statistics')
          .then(response => {
            this.statistics = response.data;
          })
          .catch(error => {
            this.$message.error('获取任务统计数据失败');
            console.error(error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  