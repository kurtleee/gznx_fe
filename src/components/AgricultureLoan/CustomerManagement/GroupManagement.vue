<!--
接口调用说明：
1. 获取联保小组列表
   - 接口地址：GET /api/agriculture-loan/customer-management/group-management
   - 作用：获取所有联保小组的列表，用于在表格中展示。

2. 新增联保小组
   - 接口地址：POST /api/agriculture-loan/customer-management/group-management
   - 作用：提交新联保小组的信息，用于创建新的联保小组。

3. 更新联保小组
   - 接口地址：PUT /api/agriculture-loan/customer-management/group-management/:id
   - 作用：更新指定联保小组的信息。

4. 删除联保小组
   - 接口地址：DELETE /api/agriculture-loan/customer-management/group-management/:id
   - 作用：删除指定的联保小组。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>联保小组管理</span>
          <el-button type="primary" size="small" @click="handleAdd">新增联保小组</el-button>
        </div>
        <el-table :data="groups" style="width: 100%">
          <el-table-column prop="id" label="编号" width="80"></el-table-column>
          <el-table-column prop="name" label="小组名称"></el-table-column>
          <el-table-column prop="leader" label="组长"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 新增/编辑联保小组对话框 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
        <el-form :model="currentGroup" ref="groupForm">
          <el-form-item label="小组名称" :label-width="formLabelWidth">
            <el-input v-model="currentGroup.name"></el-input>
          </el-form-item>
          <el-form-item label="组长" :label-width="formLabelWidth">
            <el-input v-model="currentGroup.leader"></el-input>
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
    name: 'GroupManagement',
    data() {
      return {
        groups: [],
        dialogVisible: false,
        dialogTitle: '新增联保小组',
        currentGroup: {
          id: null,
          name: '',
          leader: ''
        },
        formLabelWidth: '80px'
      };
    },
    created() {
      this.fetchGroups();
    },
    methods: {
      // 获取联保小组列表
      fetchGroups() {
        axios.get('/api/agriculture-loan/customer-management/group-management')
          .then(response => {
            this.groups = response.data;
          })
          .catch(error => {
            this.$message.error('获取联保小组列表失败');
            console.error(error);
          });
      },
      // 打开新增联保小组对话框
      handleAdd() {
        this.dialogTitle = '新增联保小组';
        this.currentGroup = { id: null, name: '', leader: '' };
        this.dialogVisible = true;
      },
      // 打开编辑联保小组对话框
      handleEdit(group) {
        this.dialogTitle = '编辑联保小组';
        this.currentGroup = Object.assign({}, group);
        this.dialogVisible = true;
      },
      // 删除联保小组
      handleDelete(group) {
        this.$confirm('确定删除该联保小组吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(`/api/agriculture-loan/customer-management/group-management/${group.id}`)
            .then(() => {
              this.$message.success('删除成功');
              this.fetchGroups();
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
        this.$refs.groupForm.validate(valid => {
          if (valid) {
            if (this.currentGroup.id) {
              // 编辑
              axios.put(`/api/agriculture-loan/customer-management/group-management/${this.currentGroup.id}`, this.currentGroup)
                .then(() => {
                  this.$message.success('更新成功');
                  this.dialogVisible = false;
                  this.fetchGroups();
                })
                .catch(error => {
                  this.$message.error('更新失败');
                  console.error(error);
                });
            } else {
              // 新增
              axios.post('/api/agriculture-loan/customer-management/group-management', this.currentGroup)
                .then(() => {
                  this.$message.success('新增成功');
                  this.dialogVisible = false;
                  this.fetchGroups();
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
  