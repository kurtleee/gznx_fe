<template>
    <div>
        <el-row>
        <el-col :span="3">
            <h3>客户经理统计</h3>
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
        label="客户经理名称"
        width="180">
        <template slot-scope="scope">  
            <!-- 使用scoped slot为单元格添加点击事件 -->  
            <span @click="handleClick(scope.row)">{{ scope.row.name }}</span>  
          </template> 
      </el-table-column>
      <el-table-column
        prop="count"
        label="总任务量">
      </el-table-column>
      <el-table-column
        prop="wancheng"
        label="已完成任务量">
      </el-table-column>
      <el-table-column
        prop="weiwancheng"
        label="未完成任务量">
      </el-table-column>
      <el-table-column
        prop="bili"
        label="完成比例">
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
              bankId:0
          }
      },
      methods:{
          handleClick(row) {  
            this.$router.push({ path: '/CollectionsClient', query: { clientManagementId: row.id } });
    },
          queryAll(){
              this.tableData=[{id:1,name:"花花客户经理",count:15,wancheng:5,weiwancheng:10,bili:0.02},
              {id:2,name:"小华客户经理",count:25,wancheng:15,weiwancheng:10,bili:0.02}
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
        this.bankId=this.$route.query.bankId;
        this.queryAll()
      }
  
  }
  </script>
  
  <style>
  
  </style>