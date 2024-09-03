<!--
接口调用说明：
1. 获取贷款展期列表
   - 接口地址：GET /api/personal-loan/loan-management/loan-extension
   - 作用：获取所有贷款展期申请的信息，用于在表格中展示。

2. 提交贷款展期申请
   - 接口地址：POST /api/personal-loan/loan-management/loan-extension
   - 作用：提交新的贷款展期申请。

3. 更新贷款展期申请状态
   - 接口地址：PUT /api/personal-loan/loan-management/loan-extension/:id
   - 作用：更新指定贷款展期申请的状态（批准或拒绝）。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>贷款展期管理</span>
          <el-button type="primary" size="small" @click="handleAdd">新增展期申请</el-button>
        </div>
        <el-table :data="extensions" style="width: 100%">
          <el-table-column prop="id" label="申请编号" width="150"></el-table-column>
          <el-table-column prop="customerName" label="客户名称"></el-table-column>
          <el-table-column prop="loanAmount" label="贷款金额"></el-table-column>
          <el-table-column prop="extensionPeriod" label="展期期限"></el-table-column>
          <el-table-column prop="status" label="申请状态"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleApprove(scope.row)">批准</el-button>
              <el-button size="mini" type="danger" @click="handleReject(scope.row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 新增展期申请对话框 -->
      <el-dialog title="新增贷款展期申请" :visible.sync="dialogVisible">
        <el-form :model="currentExtension" ref="extensionForm">
          <el-form-item label="客户名称" :label-width="formLabelWidth" required>
            <el-input v-model="currentExtension.customerName"></el-input>
          </el-form-item>
          <el-form-item label="贷款金额" :label-width="formLabelWidth" required>
            <el-input type="number" v-model="currentExtension.loanAmount"></el-input>
          </el-form-item>
          <el-form-item label="展期期限" :label-width="formLabelWidth" required>
            <el-input type="number" v-model="currentExtension.extensionPeriod"></el-input>
          </el-form-item>
          <el-form-item label="申请理由" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="currentExtension.reason"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitExtension">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoanExtension',
    data() {
      return {
        extensions: [],
        dialogVisible: false,
        currentExtension: {
          id: null,
          customerName: '',
          loanAmount: 0,
          extensionPeriod: 0,
          reason: ''
        },
        formLabelWidth: '120px'
      };
    },
    created() {
      this.fetchExtensions();
    },
    methods: {
      // 获取贷款展期列表
      fetchExtensions() {
        axios.get('/api/personal-loan/loan-management/loan-extension')
          .then(response => {
            this.extensions = response.data;
          })
          .catch(error => {
            this.$message.error('获取贷款展期列表失败');
            console.error(error);
          });
      },
      // 打开新增展期申请对话框
      handleAdd() {
        this.currentExtension = { id: null, customerName: '', loanAmount: 0, extensionPeriod: 0, reason: '' };
        this.dialogVisible = true;
      },
      // 提交展期申请
      submitExtension() {
        this.$refs.extensionForm.validate(valid => {
          if (valid) {
            axios.post('/api/personal-loan/loan-management/loan-extension', this.currentExtension)
              .then(() => {
                this.$message.success('展期申请提交成功');
                this.dialogVisible = false;
                this.fetchExtensions();
              })
              .catch(error => {
                this.$message.error('展期申请提交失败');
                console.error(error);
              });
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      },
      // 批准展期申请
      handleApprove(extension) {
        this.$confirm('确定要批准该展期申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.put(`/api/personal-loan/loan-management/loan-extension/${extension.id}`, { status: 'approved' })
            .then(() => {
              this.$message.success('展期申请已批准');
              this.fetchExtensions();
            })
            .catch(error => {
              this.$message.error('批准展期申请失败');
              console.error(error);
            });
        }).catch(() => {
          // 取消操作
        });
      },
      // 拒绝展期申请
      handleReject(extension) {
        this.$confirm('确定要拒绝该展期申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.put(`/api/personal-loan/loan-management/loan-extension/${extension.id}`, { status: 'rejected' })
            .then(() => {
              this.$message.success('展期申请已拒绝');
              this.fetchExtensions();
            })
            .catch(error => {
              this.$message.error('拒绝展期申请失败');
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
  