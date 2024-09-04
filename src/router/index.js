import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue'; // 导入 Home 组件

// Agriculture Loan Components
import GroupManagement from '@/components/AgricultureLoan/CustomerManagement/GroupManagement.vue';
import GroupAgreement from '@/components/AgricultureLoan/CustomerManagement/GroupAgreement.vue';

import CustomerArchiving from '@/components/AgricultureLoan/LoanBusiness/CustomerArchiving.vue';
import RatingAndCredit from '@/components/AgricultureLoan/LoanBusiness/RatingAndCredit.vue';
import AgricultureLoanOverview from '@/components/AgricultureLoan/LoanBusiness/AgricultureLoanOverview.vue'; // 导入概览组件

// 注释掉已计划但未实现的组件导入
// import CreditLedger from '@/components/AgricultureLoan/LoanBusiness/CreditManagement/CreditLedger.vue';
// import CreditAdjustmentIncrease from '@/components/AgricultureLoan/LoanBusiness/CreditManagement/CreditAdjustmentIncrease.vue';
// import CreditAdjustmentDecrease from '@/components/AgricultureLoan/LoanBusiness/CreditManagement/CreditAdjustmentDecrease.vue';
// import CreditFreeze from '@/components/AgricultureLoan/LoanBusiness/CreditManagement/CreditFreeze.vue';
// import AnnualReviewAuto from '@/components/AgricultureLoan/LoanBusiness/AnnualReview/AnnualReviewAuto.vue';
// import AnnualReviewManual from '@/components/AgricultureLoan/LoanBusiness/AnnualReview/AnnualReviewManual.vue';
// import CreditLoanApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/CreditLoanApplication.vue';
// import GuaranteeLoanApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/GuaranteeLoanApplication.vue';
// import RenewalApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/RenewalApplication.vue';
// import ExtensionApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/ExtensionApplication.vue';
// import RestructuringApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/RestructuringApplication.vue';

// Personal Loan Components
import LoanExtension from '@/components/PersonalLoan/LoanManagement/LoanExtension.vue';
import CreditAdjustment from '@/components/PersonalLoan/LoanManagement/CreditAdjustment.vue';

// Post Loan Management Components
import TaskStatistics from '@/components/PostLoanManagement/TaskManagement/TaskStatistics.vue';
import PostLoanVisit from '@/components/PostLoanManagement/TaskManagement/PostLoanVisit.vue';
import PostLoanInspection from '@/components/PostLoanManagement/TaskManagement/PostLoanInspection.vue';
import CollectionManagement from '@/components/PostLoanManagement/TaskManagement/CollectionManagement.vue';
import RiskWarning from '@/components/PostLoanManagement/TaskManagement/RiskWarning.vue';
import Collections from '@/components/PostLoanManagement/TaskManagement/statistics/Collections.vue';
import CollectionsClientManager from '@/components/PostLoanManagement/TaskManagement/statistics/CollectionsClientManager.vue';
import CollectionsClient from '@/components/PostLoanManagement/TaskManagement/statistics/CollectionsClient.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: '首页' }
    },
    {
      path: '/agriculture-loan',
      name: 'AgricultureLoan',
      component: AgricultureLoanOverview, // 默认展示农贷业务概览页面
      meta: { title: '农贷业务' },
      children: [
        {
          path: 'customer-management',
          name: 'CustomerManagement',
          meta: { title: '客户管理' },
          children: [
            {
              path: 'group-management',
              name: 'GroupManagement',
              component: GroupManagement,
              meta: { title: '联保小组申请' }
            },
            {
              path: 'group-agreement',
              name: 'GroupAgreement',
              component: GroupAgreement,
              meta: { title: '联保小组协议' }
            }
          ]
        },
        {
          path: 'loan-business',
          name: 'LoanBusiness',
          meta: { title: '农贷业务' },
          component: AgricultureLoanOverview, // 在 loan-business 路径下展示概览页面
          children: [
            {
              path: 'customer-archiving',
              name: 'CustomerArchiving',
              component: CustomerArchiving,
              meta: { title: '客户建档' }
            },
            {
              path: 'rating-and-credit',
              name: 'RatingAndCredit',
              component: RatingAndCredit,
              meta: { title: '评级授信' }
            }
          ]
        }
      ]
    },
    {
      path: '/personal-loan',
      name: 'PersonalLoan',
      meta: { title: '个贷业务' },
      children: [
        {
          path: 'loan-management',
          name: 'LoanManagement',
          meta: { title: '贷款管理' },
          children: [
            {
              path: 'loan-extension',
              name: 'LoanExtension',
              component: LoanExtension,
              meta: { title: '贷款展期' }
            },
            {
              path: 'credit-adjustment',
              name: 'CreditAdjustment',
              component: CreditAdjustment,
              meta: { title: '额度调整' }
            }
          ]
        }
      ]
    },
    {
      path: '/post-loan-management',
      name: 'PostLoanManagement',
      meta: { title: '贷后管理' },
      children: [
        {
          path: '/task-management',
          name: 'TaskManagement',
          meta: { title: '任务管理' },
          children: [
            {
              path: '/task-statistics',
              name: 'TaskStatistics',
              component: TaskStatistics,
              meta: { title: '任务统计' }
            },
            {
              path: 'post-loan-visit',
              name: 'PostLoanVisit',
              component: PostLoanVisit,
              meta: { title: '贷后回访' }
            },
            {
              path: 'post-loan-inspection',
              name: 'PostLoanInspection',
              component: PostLoanInspection,
              meta: { title: '贷后检查' }
            },
            {
              path: 'collection-management',
              name: 'CollectionManagement',
              component: CollectionManagement,
              meta: { title: '催收管理' }
            },
            {
              path: 'risk-warning',
              name: 'RiskWarning',
              component: RiskWarning,
              meta: { title: '风险预警' }
            },
            {
              path: 'Collections',
              name: 'Collections',
              component: Collections,
              meta: { title: '催收任务网点名称统计' }
            },
            {
              path: 'CollectionsClientManager',
              name: 'CollectionsClientManager',
              component: CollectionsClientManager,
              meta: { title: '催收任务客户经理统计' }
            },
            {
              path: 'CollectionsClient',
              name: 'CollectionsClient',
              component: CollectionsClient,
              meta: { title: '催收任务客户统计' }
            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
