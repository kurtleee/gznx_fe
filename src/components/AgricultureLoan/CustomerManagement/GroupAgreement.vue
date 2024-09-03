<!--
接口调用说明：
1. 获取联保小组协议列表
   - 接口地址：GET /api/agriculture-loan/customer-management/group-agreement
   - 作用：获取所有联保小组协议的列表，用于在表格中展示。

2. 下载联保小组协议
   - 接口地址：GET /api/agriculture-loan/customer-management/group-agreement/:id/download
   - 作用：下载指定联保小组的协议文件。

3. 查看联保小组协议详情
   - 接口地址：GET /api/agriculture-loan/customer-management/group-agreement/:id
   - 作用：获取指定联保小组协议的详细信息。
-->

<template>
    <div>
      <el-card>
        <div slot="header">
          <span>联保小组协议</span>
        </div>
        <el-table :data="agreements" style="width: 100%">
          <el-table-column prop="id" label="协议编号" width="150"></el-table-column>
          <el-table-column prop="groupName" label="联保小组名称"></el-table-column>
          <el-table-column prop="agreementDate" label="协议日期"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
              <el-button size="mini" type="primary" @click="handleDownload(scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 查看协议详情对话框 -->
      <el-dialog :title="'协议详情 - ' + currentAgreement.groupName" :visible.sync="dialogVisible">
        <el-form :model="currentAgreement" label-width="100px">
          <el-form-item label="协议编号">
            <span>{{ currentAgreement.id }}</span>
          </el-form-item>
          <el-form-item label="联保小组名称">
            <span>{{ currentAgreement.groupName }}</span>
          </el-form-item>
          <el-form-item label="协议内容">
            <span>{{ currentAgreement.content }}</span>
          </el-form-item>
          <el-form-item label="协议日期">
            <span>{{ currentAgreement.agreementDate }}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GroupAgreement',
    data() {
      return {
        agreements: [],
        dialogVisible: false,
        currentAgreement: {}
      };
    },
    created() {
      this.fetchAgreements();
    },
    methods: {
      // 获取联保小组协议列表
      fetchAgreements() {
        axios.get('/api/agriculture-loan/customer-management/group-agreement')
          .then(response => {
            this.agreements = response.data;
          })
          .catch(error => {
            this.$message.error('获取联保小组协议列表失败');
            console.error(error);
          });
      },
      // 查看协议详情
      handleView(agreement) {
        axios.get(`/api/agriculture-loan/customer-management/group-agreement/${agreement.id}`)
          .then(response => {
            this.currentAgreement = response.data;
            this.dialogVisible = true;
          })
          .catch(error => {
            this.$message.error('获取协议详情失败');
            console.error(error);
          });
      },
      // 下载协议文件
      handleDownload(agreement) {
        axios({
          url: `/api/agriculture-loan/customer-management/group-agreement/${agreement.id}/download`,
          method: 'GET',
          responseType: 'blob' // 重要
        })
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${agreement.groupName}_协议.pdf`); // 根据实际情况设置文件名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch(error => {
            this.$message.error('下载协议失败');
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
  