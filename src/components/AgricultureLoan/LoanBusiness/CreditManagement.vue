<!--
接口调用说明：
1. 获取授信台账列表
   - 接口地址：GET /api/agriculture-loan/loan-business/credit-management/ledger
   - 作用：获取所有客户的授信台账信息，用于在表格中展示。

2. 调整授信额度
   - 接口地址：PUT /api/agriculture-loan/loan-business/credit-management/:id/adjust
   - 作用：调整指定客户的授信额度（调增或调减）。

3. 冻结/解冻/注销额度
   - 接口地址：PUT /api/agriculture-loan/loan-business/credit-management/:id/freeze
   - 作用：冻结、解冻或注销指定客户的授信额度。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>授信额度管理</span>
        </div>
        <el-table :data="credits" style="width: 100%">
          <el-table-column prop="id" label="客户编号" width="150"></el-table-column>
          <el-table-column prop="name" label="客户名称"></el-table-column>
          <el-table-column prop="creditAmount" label="授信额度"></el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleAdjust(scope.row)">调整额度</el-button>
              <el-button size="mini" type="warning" @click="handleFreeze(scope.row)">冻结/解冻</el-button>
              <el-button size="mini" type="danger" @click="handleCancel(scope.row)">注销额度</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 调整额度对话框 -->
      <el-dialog title="调整授信额度" :visible.sync="adjustDialogVisible">
        <el-form :model="currentCredit" ref="adjustForm">
          <el-form-item label="新授信额度" :label-width="formLabelWidth" required>
            <el-input type="number" v-model="currentCredit.newCreditAmount"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adjustDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAdjustment">确定</el-button>
        </div>
      </el-dialog>
  
      <!-- 冻结/解冻对话框 -->
      <el-dialog title="冻结/解冻额度" :visible.sync="freezeDialogVisible">
        <el-form :model="currentCredit" ref="freezeForm">
          <el-form-item label="操作" :label-width="formLabelWidth" required>
            <el-select v-model="currentCredit.action" placeholder="请选择操作">
              <el-option label="冻结" value="freeze"></el-option>
              <el-option label="解冻" value="unfreeze"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="freezeDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFreeze">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreditManagement',
    data() {
      return {
        credits: [],
        adjustDialogVisible: false,
        freezeDialogVisible: false,
        currentCredit: {
          id: null,
          newCreditAmount: 0,
          action: ''
        },
        formLabelWidth: '120px'
      };
    },
    created() {
      this.fetchCredits();
    },
    methods: {
      // 获取授信台账列表
      fetchCredits() {
        axios.get('/api/agriculture-loan/loan-business/credit-management/ledger')
          .then(response => {
            this.credits = response.data;
          })
          .catch(error => {
            this.$message.error('获取授信台账失败');
            console.error(error);
          });
      },
      // 打开调整额度对话框
      handleAdjust(credit) {
        this.currentCredit = { id: credit.id, newCreditAmount: credit.creditAmount };
        this.adjustDialogVisible = true;
      },
      // 提交调整额度
      submitAdjustment() {
        this.$refs.adjustForm.validate(valid => {
          if (valid) {
            axios.put(`/api/agriculture-loan/loan-business/credit-management/${this.currentCredit.id}/adjust`, {
              creditAmount: this.currentCredit.newCreditAmount
            })
              .then(() => {
                this.$message.success('授信额度调整成功');
                this.adjustDialogVisible = false;
                this.fetchCredits();
              })
              .catch(error => {
                this.$message.error('授信额度调整失败');
                console.error(error);
              });
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      },
      // 打开冻结/解冻对话框
      handleFreeze(credit) {
        this.currentCredit = { id: credit.id, action: '' };
        this.freezeDialogVisible = true;
      },
      // 提交冻结/解冻操作
      submitFreeze() {
        this.$refs.freezeForm.validate(valid => {
          if (valid) {
            axios.put(`/api/agriculture-loan/loan-business/credit-management/${this.currentCredit.id}/freeze`, {
              action: this.currentCredit.action
            })
              .then(() => {
                this.$message.success('操作成功');
                this.freezeDialogVisible = false;
                this.fetchCredits();
              })
              .catch(error => {
                this.$message.error('操作失败');
                console.error(error);
              });
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      },
      // 注销额度
      handleCancel(credit) {
        this.$confirm('确定要注销该客户的授信额度吗？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.put(`/api/agriculture-loan/loan-business/credit-management/${credit.id}/cancel`)
            .then(() => {
              this.$message.success('授信额度注销成功');
              this.fetchCredits();
            })
            .catch(error => {
              this.$message.error('授信额度注销失败');
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
  