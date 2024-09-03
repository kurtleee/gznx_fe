<!--
接口调用说明：
1. 获取业务申请列表
   - 接口地址：GET /api/agriculture-loan/loan-business/business-application
   - 作用：获取所有客户的业务申请信息，用于在表格中展示。

2. 提交农户信用贷款申请
   - 接口地址：POST /api/agriculture-loan/loan-business/business-application/credit-loan
   - 作用：提交农户的信用贷款申请。

3. 提交担保类农贷业务申请
   - 接口地址：POST /api/agriculture-loan/loan-business/business-application/guarantee-loan
   - 作用：提交农户的担保类农贷业务申请。

4. 提交农户续贷申请
   - 接口地址：POST /api/agriculture-loan/loan-business/business-application/renewal
   - 作用：提交农户的续贷申请。

5. 提交农户展期申请
   - 接口地址：POST /api/agriculture-loan/loan-business/business-application/extension
   - 作用：提交农户的展期申请。

6. 提交农户重组申请
   - 接口地址：POST /api/agriculture-loan/loan-business/business-application/restructuring
   - 作用：提交农户的重组申请。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>业务申请</span>
          <el-button type="primary" size="small" @click="handleAddApplication">新增申请</el-button>
        </div>
        <el-table :data="applications" style="width: 100%">
          <el-table-column prop="id" label="申请编号" width="150"></el-table-column>
          <el-table-column prop="customerName" label="客户名称"></el-table-column>
          <el-table-column prop="applicationType" label="申请类型"></el-table-column>
          <el-table-column prop="status" label="申请状态"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleView(scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 新增/编辑申请对话框 -->
      <el-dialog title="新增业务申请" :visible.sync="applicationDialogVisible">
        <el-form :model="currentApplication" ref="applicationForm">
          <el-form-item label="客户名称" :label-width="formLabelWidth" required>
            <el-input v-model="currentApplication.customerName"></el-input>
          </el-form-item>
          <el-form-item label="申请类型" :label-width="formLabelWidth" required>
            <el-select v-model="currentApplication.applicationType" placeholder="请选择申请类型">
              <el-option label="农户信用贷款" value="credit-loan"></el-option>
              <el-option label="担保类农贷业务" value="guarantee-loan"></el-option>
              <el-option label="续贷" value="renewal"></el-option>
              <el-option label="展期" value="extension"></el-option>
              <el-option label="重组" value="restructuring"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请描述" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="currentApplication.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="applicationDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitApplication">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BusinessApplication',
    data() {
      return {
        applications: [],
        applicationDialogVisible: false,
        currentApplication: {
          id: null,
          customerName: '',
          applicationType: '',
          description: ''
        },
        formLabelWidth: '120px'
      };
    },
    created() {
      this.fetchApplications();
    },
    methods: {
      // 获取业务申请列表
      fetchApplications() {
        axios.get('/api/agriculture-loan/loan-business/business-application')
          .then(response => {
            this.applications = response.data;
          })
          .catch(error => {
            this.$message.error('获取业务申请列表失败');
            console.error(error);
          });
      },
      // 打开新增申请对话框
      handleAddApplication() {
        this.currentApplication = { id: null, customerName: '', applicationType: '', description: '' };
        this.applicationDialogVisible = true;
      },
      // 提交业务申请
      submitApplication() {
        this.$refs.applicationForm.validate(valid => {
          if (valid) {
            let apiUrl = '';
            switch (this.currentApplication.applicationType) {
              case 'credit-loan':
                apiUrl = '/api/agriculture-loan/loan-business/business-application/credit-loan';
                break;
              case 'guarantee-loan':
                apiUrl = '/api/agriculture-loan/loan-business/business-application/guarantee-loan';
                break;
              case 'renewal':
                apiUrl = '/api/agriculture-loan/loan-business/business-application/renewal';
                break;
              case 'extension':
                apiUrl = '/api/agriculture-loan/loan-business/business-application/extension';
                break;
              case 'restructuring':
                apiUrl = '/api/agriculture-loan/loan-business/business-application/restructuring';
                break;
              default:
                this.$message.error('请选择有效的申请类型');
                return;
            }
  
            axios.post(apiUrl, this.currentApplication)
              .then(() => {
                this.$message.success('业务申请提交成功');
                this.applicationDialogVisible = false;
                this.fetchApplications();
              })
              .catch(error => {
                this.$message.error('业务申请提交失败');
                console.error(error);
              });
          } else {
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      },
      // 查看申请详情
      handleView(application) {
        // 可以根据需求进一步实现查看详情逻辑
        this.$message.info(`查看申请详情: ${application.customerName}`);
      },
      // 删除业务申请
      handleDelete(application) {
        this.$confirm('确定要删除该业务申请吗？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(`/api/agriculture-loan/loan-business/business-application/${application.id}`)
            .then(() => {
              this.$message.success('业务申请删除成功');
              this.fetchApplications();
            })
            .catch(error => {
              this.$message.error('业务申请删除失败');
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
  