<template>
    <div>
        <el-row>
        <el-col :span="2">
            <h3>客户统计</h3>
        </el-col>
    </el-row>
      <el-row>
          <el-col :span="24">
              <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="66">
      </el-table-column>
      <el-table-column
        prop="name"
        label="客户名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="check"
        label="检查笔数">
      </el-table-column>
      <el-table-column
        prop="money"
        label="检查余额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="任务生成时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="任务到期时间">
      </el-table-column>
      <el-table-column
        prop="collectionType"
        label="催收类型">
      </el-table-column>
      <el-table-column
        prop="collectionName"
        label="催收人">
      </el-table-column>
      <el-table-column
        prop="status"
        label="任务状态">
      </el-table-column>
    </el-table>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
              <!-- 分页 -->
              <el-pagination
            background
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            :current-page="pageNum"
            layout="total, sizes, prev, pager, next"
            :total="total"
            @next-click="nextPage"
            @prev-click="lastPage"
            @current-change="changePage"
            @size-change="changeSize"
          ></el-pagination>
          </el-col>
      </el-row>
    </div>
  
  </template>
  
  <script>
  export default {
      data(){
          return{
              pageSize: 5,
              pageNum: 1,
              total: 0,
              pages: 1,
              tableData:[],
              clientManagementId:""
          }
      },
      methods:{
          queryAll(){
              this.tableData=[{id:1,name:"张三",check:5,money:8000,createTime:"2022-12-12",endTime:"2024-9-25",collectionType:1,collectionName:"小王",status:1},
              {id:2,name:"李四",check:3,money:20000,createTime:"2022-12-12",endTime:"2024-9-25",collectionType:1,collectionName:"小张",status:1}
              ]
          },
          changePage(val) {
        this.pageNum = val;
        this.queryAll();
      },
      changeSize(val) {
        this.pageNum = 1;
        this.pageSize = val;
        this.queryAll();
      },
      lastPage(val) {
        this.pageNum = val;
        this.queryAll();
      },
      nextPage(val) {
        this.pageNum = val;
        this.queryAll();
      }
  
      },
      created(){
        this.clientManagementId=this.$route.query.clientManagementId;
        this.queryAll()
      }
  
  }
  </script>
  
  <style>
  
  </style>