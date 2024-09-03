<!--
接口调用说明：
1. 获取年审列表
   - 接口地址：GET /api/agriculture-loan/loan-business/annual-review
   - 作用：获取所有客户的年审信息，用于在表格中展示。

2. 执行年审
   - 接口地址：POST /api/agriculture-loan/loan-business/annual-review/:id
   - 作用：手动执行指定客户的年审操作。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>农户年审</span>
          <el-button type="primary" size="small" @click="handleAnnualReview">执行年审</el-button>
        </div>
        <el-table :data="annualReviews" style="width: 100%">
          <el-table-column prop="id" label="客户编号" width="150"></el-table-column>
          <el-table-column prop="name" label="客户名称"></el-table-column>
          <el-table-column prop="lastReviewDate" label="上次年审日期"></el-table-column>
          <el-table-column prop="status" label="年审状态"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleReview(scope.row)">执行年审</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 执行年审确认框 -->
      <el-dialog title="年审确认" :visible.sync="reviewDialogVisible">
        <span>确定要对客户 {{ currentReview.name }} 执行年审操作吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="reviewDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitReview">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AnnualReview',
    data() {
      return {
        annualReviews: [],
        reviewDialogVisible: false,
        currentReview: {
          id: null,
          name: ''
        }
      };
    },
    created() {
      this.fetchAnnualReviews();
    },
    methods: {
      // 获取年审列表
      fetchAnnualReviews() {
        axios.get('/api/agriculture-loan/loan-business/annual-review')
          .then(response => {
            this.annualReviews = response.data;
          })
          .catch(error => {
            this.$message.error('获取年审列表失败');
            console.error(error);
          });
      },
      // 打开年审确认对话框
      handleReview(review) {
        this.currentReview = review;
        this.reviewDialogVisible = true;
      },
      // 提交年审
      submitReview() {
        axios.post(`/api/agriculture-loan/loan-business/annual-review/${this.currentReview.id}`)
          .then(() => {
            this.$message.success('年审执行成功');
            this.reviewDialogVisible = false;
            this.fetchAnnualReviews();
          })
          .catch(error => {
            this.$message.error('年审执行失败');
            console.error(error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .dialog-footer {
    text-align: right;
  }
  </style>
  