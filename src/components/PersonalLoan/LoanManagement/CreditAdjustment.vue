<!--
接口调用说明：
1. 获取额度调整列表
   - 接口地址：GET /api/personal-loan/loan-management/credit-adjustment
   - 作用：获取所有额度调整申请的信息，用于在表格中展示。

2. 提交额度调整申请
   - 接口地址：POST /api/personal-loan/loan-management/credit-adjustment
   - 作用：提交新的额度调整申请。

3. 更新额度调整申请状态
   - 接口地址：PUT /api/personal-loan/loan-management/credit-adjustment/:id
   - 作用：更新指定额度调整申请的状态（批准或拒绝）。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>额度调整管理</span>
          <el-button type="primary" size="small" @click="handleAdd">新增额度调整申请</el-button>
        </div>
        <el-table :data="adjustments" style="width: 100%">
          <el-table-column prop="id" label="申请编号" width="150"></el-table-column>
          <el-table-column prop="customerName" label="客户名称"></el-table-column>
          <el-table-column prop="currentCredit" label="当前授信额度"></el-table-column>
          <el-table-column prop="requestedCredit" label="申请调整后的额度"></el-table-column>
          <el-table-column prop="status" label="申请状态"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleApprove(scope.row)">批准</el-button>
              <el-button size="mini" type="danger" @click="handleReject(scope.row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 新增额度调整申请对话框 -->
      <el-dialog title="新增额度调整申请" :visible.sync="dialogVisible">
        <el-form :model="currentAdjustment" ref="adjustmentForm">
          <el-form-item label="客户名称" :label-width="formLabelWidth" required>
            <el-input v-model="currentAdjustment.customerName"></el-input>
          </el-form-item>
          <el-form-item label="当前授信额度" :label-width="formLabelWidth" required>
            <el-input type="number" v-model="currentAdjustment.currentCredit"></el-input>
          </el-form-item>
          <el-form-item label="申请调整后的额度" :label-width="formLabelWidth" required>
            <el-input type="number" v-model="currentAdjustment.requestedCredit"></el-input>
          </el-form-item>
          <el-form-item label="申请理由" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="currentAdjustment.reason"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAdjustment">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreditAdjustment',
    data() {
      return {
        adjustments: [],
        dialogVisible: false,
        currentAdjustment: {
          id: null,
          customerName: '',
          currentCredit: 0,
          requestedCredit: 0,
          reason: ''
        },
        formLabelWidth: '150px'
      };
    },
    created() {
      this.fetchAdjustments();
    },
    methods: {
      // 获取额度调整列表
      fetchAdjustments() {
        axios.get('/api/personal-loan/loan-management/credit-adjustment')
          .then(response => {
            this.adjustments = response.data;
          })
          .catch(error => {
            this.$message.error('获取额度调整列表失败');
            console.error(error);
          });
      },
      // 打开新增额度调整申请对话框
      handleAdd() {
        this.currentAdjustment = { id: null, customerName: '', currentCredit: 0, requestedCredit: 0, reason: '' };
        this.dialogVisible = true;
      },
      // 提交额度调整申请
      submitAdjustment() {
        this.$refs.adjustmentForm.validate(valid => {
          if (valid) {
            axios.post('/api/personal-loan/loan-management/credit-adjustment', this.currentAdjustment)
              .then(() => {
                this.$message.success('额度调整申请提交成功');
                this.dialogVisible = false;
                this.fetchAdjustments();
              })
              .catch(error => {
                this.$message.error('额度调整申请提交失败');
                console.error(error);
              });
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      },
      // 批准额度调整申请
      handleApprove(adjustment) {
        this.$confirm('确定要批准该额度调整申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.put(`/api/personal-loan/loan-management/credit-adjustment/${adjustment.id}`, { status: 'approved' })
            .then(() => {
              this.$message.success('额度调整申请已批准');
              this.fetchAdjustments();
            })
            .catch(error => {
              this.$message.error('批准额度调整申请失败');
              console.error(error);
            });
        }).catch(() => {
          // 取消操作
        });
      },
      // 拒绝额度调整申请
      handleReject(adjustment) {
        this.$confirm('确定要拒绝该额度调整申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.put(`/api/personal-loan/loan-management/credit-adjustment/${adjustment.id}`, { status: 'rejected' })
            .then(() => {
              this.$message.success('额度调整申请已拒绝');
              this.fetchAdjustments();
            })
            .catch(error => {
              this.$message.error('拒绝额度调整申请失败');
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
  .dialog-footer {
    text-align: right;
  }
  </style>
  