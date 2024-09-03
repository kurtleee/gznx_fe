<!--
接口调用说明：
1. 获取贷后回访任务列表
   - 接口地址：GET /api/post-loan-management/task-management/visit
   - 作用：获取所有贷后回访任务信息，用于在表格中展示。

2. 更新贷后回访任务状态
   - 接口地址：PUT /api/post-loan-management/task-management/visit/:id
   - 作用：更新指定回访任务的状态（完成或未完成）。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>贷后回访任务</span>
        </div>
        <el-table :data="visits" style="width: 100%">
          <el-table-column prop="id" label="任务编号" width="150"></el-table-column>
          <el-table-column prop="customerName" label="客户名称"></el-table-column>
          <el-table-column prop="visitDate" label="回访日期"></el-table-column>
          <el-table-column prop="status" label="任务状态"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleComplete(scope.row)">完成任务</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PostLoanVisit',
    data() {
      return {
        visits: []
      };
    },
    created() {
      this.fetchVisits();
    },
    methods: {
      // 获取贷后回访任务列表
      fetchVisits() {
        axios.get('/api/post-loan-management/task-management/visit')
          .then(response => {
            this.visits = response.data;
          })
          .catch(error => {
            this.$message.error('获取贷后回访任务列表失败');
            console.error(error);
          });
      },
      // 完成任务
      handleComplete(visit) {
        this.$confirm('确定将此任务标记为完成吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.put(`/api/post-loan-management/task-management/visit/${visit.id}`)
            .then(() => {
              this.$message.success('任务已标记为完成');
              this.fetchVisits();
            })
            .catch(error => {
              this.$message.error('标记任务为完成失败');
              console.error(error);
            });
        }).catch(() => {
          // 取消操作
        });
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  