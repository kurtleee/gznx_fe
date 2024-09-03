<!--
接口调用说明：
1. 获取客户建档列表
   - 接口地址：GET /api/agriculture-loan/loan-business/customer-archiving
   - 作用：获取所有客户的建档信息，用于在表格中展示。

2. 新增客户建档
   - 接口地址：POST /api/agriculture-loan/loan-business/customer-archiving
   - 作用：提交新的客户建档信息，用于创建新的客户档案。

3. 更新客户建档
   - 接口地址：PUT /api/agriculture-loan/loan-business/customer-archiving/:id
   - 作用：更新指定客户的建档信息。

4. 删除客户建档
   - 接口地址：DELETE /api/agriculture-loan/loan-business/customer-archiving/:id
   - 作用：删除指定客户的建档信息。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>客户建档</span>
          <el-button type="primary" size="small" @click="handleAdd">新增客户</el-button>
        </div>
        <el-table :data="customers" style="width: 100%">
          <el-table-column prop="id" label="客户编号" width="150"></el-table-column>
          <el-table-column prop="name" label="客户名称"></el-table-column>
          <el-table-column prop="contact" label="联系方式"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 新增/编辑客户对话框 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
        <el-form :model="currentCustomer" ref="customerForm">
          <el-form-item label="客户名称" :label-width="formLabelWidth" required>
            <el-input v-model="currentCustomer.name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" required>
            <el-input v-model="currentCustomer.contact"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" required>
            <el-input v-model="currentCustomer.address"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CustomerArchiving',
    data() {
      return {
        customers: [],
        dialogVisible: false,
        dialogTitle: '新增客户',
        currentCustomer: {
          id: null,
          name: '',
          contact: '',
          address: ''
        },
        formLabelWidth: '80px'
      };
    },
    created() {
      this.fetchCustomers();
    },
    methods: {
      // 获取客户建档列表
      fetchCustomers() {
        axios.get('/api/agriculture-loan/loan-business/customer-archiving')
          .then(response => {
            this.customers = response.data;
          })
          .catch(error => {
            this.$message.error('获取客户建档列表失败');
            console.error(error);
          });
      },
      // 打开新增客户对话框
      handleAdd() {
        this.dialogTitle = '新增客户';
        this.currentCustomer = { id: null, name: '', contact: '', address: '' };
        this.dialogVisible = true;
      },
      // 打开编辑客户对话框
      handleEdit(customer) {
        this.dialogTitle = '编辑客户';
        this.currentCustomer = Object.assign({}, customer);
        this.dialogVisible = true;
      },
      // 删除客户
      handleDelete(customer) {
        this.$confirm('确定删除该客户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(`/api/agriculture-loan/loan-business/customer-archiving/${customer.id}`)
            .then(() => {
              this.$message.success('删除成功');
              this.fetchCustomers();
            })
            .catch(error => {
              this.$message.error('删除失败');
              console.error(error);
            });
        }).catch(() => {
          // 取消操作
        });
      },
      // 提交表单（新增或编辑）
      submitForm() {
        this.$refs.customerForm.validate(valid => {
          if (valid) {
            if (this.currentCustomer.id) {
              // 编辑
              axios.put(`/api/agriculture-loan/loan-business/customer-archiving/${this.currentCustomer.id}`, this.currentCustomer)
                .then(() => {
                  this.$message.success('更新成功');
                  this.dialogVisible = false;
                  this.fetchCustomers();
                })
                .catch(error => {
                  this.$message.error('更新失败');
                  console.error(error);
                });
            } else {
              // 新增
              axios.post('/api/agriculture-loan/loan-business/customer-archiving', this.currentCustomer)
                .then(() => {
                  this.$message.success('新增成功');
                  this.dialogVisible = false;
                  this.fetchCustomers();
                })
                .catch(error => {
                  this.$message.error('新增失败');
                  console.error(error);
                });
            }
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
  