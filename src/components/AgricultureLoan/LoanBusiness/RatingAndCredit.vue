<!--
接口调用说明：
1. 获取信用评级列表
   - 接口地址：GET /api/agriculture-loan/loan-business/rating-and-credit
   - 作用：获取所有客户的信用评级信息，用于在表格中展示。

2. 提交信用评级
   - 接口地址：POST /api/agriculture-loan/loan-business/rating-and-credit
   - 作用：提交新的信用评级信息，用于评定客户的信用等级。

3. 获取额度授信信息
   - 接口地址：GET /api/agriculture-loan/loan-business/rating-and-credit/:customerId/credit
   - 作用：获取指定客户的额度授信信息。

4. 更新额度授信
   - 接口地址：PUT /api/agriculture-loan/loan-business/rating-and-credit/:customerId/credit
   - 作用：更新指定客户的额度授信信息。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>评级授信</span>
          <el-button type="primary" size="small" @click="handleSubmitRating">提交信用评级</el-button>
        </div>
        <el-table :data="ratings" style="width: 100%">
          <el-table-column prop="customerId" label="客户编号" width="150"></el-table-column>
          <el-table-column prop="customerName" label="客户名称"></el-table-column>
          <el-table-column prop="creditRating" label="信用等级"></el-table-column>
          <el-table-column prop="creditAmount" label="授信额度"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleViewCredit(scope.row)">查看额度</el-button>
              <el-button size="mini" type="primary" @click="handleEditCredit(scope.row)">调整额度</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 提交信用评级对话框 -->
      <el-dialog :title="'提交信用评级'" :visible.sync="ratingDialogVisible">
        <el-form :model="currentRating" ref="ratingForm">
          <el-form-item label="客户编号" :label-width="formLabelWidth" required>
            <el-input v-model="currentRating.customerId"></el-input>
          </el-form-item>
          <el-form-item label="信用等级" :label-width="formLabelWidth" required>
            <el-select v-model="currentRating.creditRating" placeholder="请选择信用等级">
              <el-option label="A级" value="A"></el-option>
              <el-option label="B级" value="B"></el-option>
              <el-option label="C级" value="C"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授信额度" :label-width="formLabelWidth" required>
            <el-input type="number" v-model="currentRating.creditAmount"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ratingDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitRating">确定</el-button>
        </div>
      </el-dialog>
  
      <!-- 查看额度对话框 -->
      <el-dialog :title="'额度详情 - ' + selectedCredit.customerName" :visible.sync="creditDialogVisible">
        <el-form :model="selectedCredit" label-width="100px">
          <el-form-item label="客户编号">
            <span>{{ selectedCredit.customerId }}</span>
          </el-form-item>
          <el-form-item label="客户名称">
            <span>{{ selectedCredit.customerName }}</span>
          </el-form-item>
          <el-form-item label="授信额度">
            <span>{{ selectedCredit.creditAmount }}</span>
          </el-form-item>
          <el-form-item label="授信日期">
            <span>{{ selectedCredit.creditDate }}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="creditDialogVisible = false">关闭</el-button>
        </div>
      </el-dialog>
  
      <!-- 调整额度对话框 -->
      <el-dialog :title="'调整授信额度 - ' + selectedCredit.customerName" :visible.sync="adjustDialogVisible">
        <el-form :model="adjustCredit" ref="adjustForm">
          <el-form-item label="新授信额度" :label-width="formLabelWidth" required>
            <el-input type="number" v-model="adjustCredit.creditAmount"></el-input>
          </el-form-item>
          <el-form-item label="调整原因" :label-width="formLabelWidth" required>
            <el-input type="textarea" v-model="adjustCredit.reason"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adjustDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAdjustment">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RatingAndCredit',
    data() {
      return {
        ratings: [],
        ratingDialogVisible: false,
        currentRating: {
          customerId: '',
          creditRating: '',
          creditAmount: 0
        },
        formLabelWidth: '100px',
        creditDialogVisible: false,
        selectedCredit: {},
        adjustDialogVisible: false,
        adjustCredit: {
          customerId: '',
          customerName: '',
          creditAmount: 0,
          reason: ''
        }
      };
    },
    created() {
      this.fetchRatings();
    },
    methods: {
      // 获取信用评级列表
      fetchRatings() {
        axios.get('/api/agriculture-loan/loan-business/rating-and-credit')
          .then(response => {
            this.ratings = response.data;
          })
          .catch(error => {
            this.$message.error('获取信用评级列表失败');
            console.error(error);
          });
      },
      // 打开提交信用评级对话框
      handleSubmitRating() {
        this.ratingDialogVisible = true;
        this.currentRating = { customerId: '', creditRating: '', creditAmount: 0 };
      },
      // 提交信用评级
      submitRating() {
        this.$refs.ratingForm.validate(valid => {
          if (valid) {
            axios.post('/api/agriculture-loan/loan-business/rating-and-credit', this.currentRating)
              .then(() => {
                this.$message.success('信用评级提交成功');
                this.ratingDialogVisible = false;
                this.fetchRatings();
              })
              .catch(error => {
                this.$message.error('信用评级提交失败');
                console.error(error);
              });
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      },
      // 查看额度详情
      handleViewCredit(credit) {
        axios.get(`/api/agriculture-loan/loan-business/rating-and-credit/${credit.customerId}/credit`)
          .then(response => {
            this.selectedCredit = response.data;
            this.creditDialogVisible = true;
          })
          .catch(error => {
            this.$message.error('获取额度详情失败');
            console.error(error);
          });
      },
      // 打开调整额度对话框
      handleEditCredit(credit) {
        this.adjustDialogVisible = true;
        this.adjustCredit = {
          customerId: credit.customerId,
          customerName: credit.customerName,
          creditAmount: credit.creditAmount,
          reason: ''
        };
      },
      // 提交额度调整
      submitAdjustment() {
        this.$refs.adjustForm.validate(valid => {
          if (valid) {
            axios.put(`/api/agriculture-loan/loan-business/rating-and-credit/${this.adjustCredit.customerId}/credit`, {
              creditAmount: this.adjustCredit.creditAmount,
              reason: this.adjustCredit.reason
            })
              .then(() => {
                this.$message.success('额度调整成功');
                this.adjustDialogVisible = false;
                this.fetchRatings();
              })
              .catch(error => {
                this.$message.error('额度调整失败');
                console.error(error);
              });
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
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
