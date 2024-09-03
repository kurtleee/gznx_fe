<!--
接口调用说明：
1. 获取风险预警列表
   - 接口地址：GET /api/post-loan-management/task-management/risk-warning
   - 作用：获取所有风险预警信息，用于在表格中展示。

2. 更新风险预警状态
   - 接口地址：PUT /api/post-loan-management/task-management/risk-warning/:id
   - 作用：更新指定风险预警的状态（已处理或未处理）。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>风险预警管理</span>
        </div>
        <el-table :data="warnings" style="width: 100%">
          <el-table-column prop="id" label="预警编号" width="150"></el-table-column>
          <el-table-column prop="customerName" label="客户名称"></el-table-column>
          <el-table-column prop="warningType" label="预警类型"></el-table-column>
          <el-table-column prop="status" label="预警状态"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleResolve(scope.row)">处理预警</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RiskWarning',
    data() {
      return {
        warnings: []
      };
    },
    created() {
      this.fetchWarnings();
    },
    methods: {
      // 获取风险预警列表
      fetchWarnings() {
        axios.get('/api/post-loan-management/task-management/risk-warning')
          .then(response => {
            this.warnings = response.data;
          })
          .catch(error => {
            this.$message.error('获取风险预警列表失败');
            console.error(error);
          });
      },
      // 处理预警
      handleResolve(warning) {
        this.$confirm('确定将此预警标记为已处理吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.put(`/api/post-loan-management/task-management/risk-warning/${warning.id}`)
            .then(() => {
              this.$message.success('预警已标记为已处理');
              this.fetchWarnings();
            })
            .catch(error => {
              this.$message.error('标记预警为已处理失败');
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
  