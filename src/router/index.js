// src/router/index.js

import Vue from 'vue';
import Router from 'vue-router';

// Agriculture Loan Components
import GroupManagement from '@/components/AgricultureLoan/CustomerManagement/GroupManagement.vue';
import GroupAgreement from '@/components/AgricultureLoan/CustomerManagement/GroupAgreement.vue';

import CustomerArchiving from '@/components/AgricultureLoan/LoanBusiness/CustomerArchiving.vue';
import RatingAndCredit from '@/components/AgricultureLoan/LoanBusiness/RatingAndCredit.vue';
import CreditLedger from '@/components/AgricultureLoan/LoanBusiness/CreditManagement/CreditLedger.vue';
import CreditAdjustmentIncrease from '@/components/AgricultureLoan/LoanBusiness/CreditManagement/CreditAdjustmentIncrease.vue';
import CreditAdjustmentDecrease from '@/components/AgricultureLoan/LoanBusiness/CreditManagement/CreditAdjustmentDecrease.vue';
import CreditFreeze from '@/components/AgricultureLoan/LoanBusiness/CreditManagement/CreditFreeze.vue';
import AnnualReviewAuto from '@/components/AgricultureLoan/LoanBusiness/AnnualReview/AnnualReviewAuto.vue';
import AnnualReviewManual from '@/components/AgricultureLoan/LoanBusiness/AnnualReview/AnnualReviewManual.vue';
import CreditLoanApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/CreditLoanApplication.vue';
import GuaranteeLoanApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/GuaranteeLoanApplication.vue';
import RenewalApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/RenewalApplication.vue';
import ExtensionApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/ExtensionApplication.vue';
import RestructuringApplication from '@/components/AgricultureLoan/LoanBusiness/BusinessApplication/RestructuringApplication.vue';

// Personal Loan Components
import LoanExtension from '@/components/PersonalLoan/LoanManagement/LoanExtension.vue';
import CreditAdjustment from '@/components/PersonalLoan/LoanManagement/CreditAdjustment.vue';

// Post Loan Management Components
import TaskStatistics from '@/components/PostLoanManagement/TaskManagement/TaskStatistics.vue';
import PostLoanVisit from '@/components/PostLoanManagement/TaskManagement/PostLoanVisit.vue';
import PostLoanInspection from '@/components/PostLoanManagement/TaskManagement/PostLoanInspection.vue';
import CollectionManagement from '@/components/PostLoanManagement/TaskManagement/CollectionManagement.vue';
import RiskWarning from '@/components/PostLoanManagement/TaskManagement/RiskWarning.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/agriculture-loan',
      name: 'AgricultureLoan',
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
            },
            {
              path: 'credit-management',
              name: 'CreditManagement',
              meta: { title: '额度管理' },
              children: [
                {
                  path: 'credit-ledger',
                  name: 'CreditLedger',
                  component: CreditLedger,
                  meta: { title: '授信台账' }
                },
                {
                  path: 'credit-adjustment-increase',
                  name: 'CreditAdjustmentIncrease',
                  component: CreditAdjustmentIncrease,
                  meta: { title: '额度调增' }
                },
                {
                  path: 'credit-adjustment-decrease',
                  name: 'CreditAdjustmentDecrease',
                  component: CreditAdjustmentDecrease,
                  meta: { title: '额度调减' }
                },
                {
                  path: 'credit-freeze',
                  name: 'CreditFreeze',
                  component: CreditFreeze,
                  meta: { title: '额度冻结/解冻/注销' }
                }
              ]
            },
            {
              path: 'annual-review',
              name: 'AnnualReview',
              meta: { title: '农户年审' },
              children: [
                {
                  path: 'annual-review-auto',
                  name: 'AnnualReviewAuto',
                  component: AnnualReviewAuto,
                  meta: { title: '系统自动年审' }
                },
                {
                  path: 'annual-review-manual',
                  name: 'AnnualReviewManual',
                  component: AnnualReviewManual,
                  meta: { title: '人工年审' }
                }
              ]
            },
            {
              path: 'business-application',
              name: 'BusinessApplication',
              meta: { title: '业务申请' },
              children: [
                {
                  path: 'credit-loan-application',
                  name: 'CreditLoanApplication',
                  component: CreditLoanApplication,
                  meta: { title: '农户信用贷款申请' }
                },
                {
                  path: 'guarantee-loan-application',
                  name: 'GuaranteeLoanApplication',
                  component: GuaranteeLoanApplication,
                  meta: { title: '担保类农贷业务申请' }
                },
                {
                  path: 'renewal-application',
                  name: 'RenewalApplication',
                  component: RenewalApplication,
                  meta: { title: '农户续贷申请' }
                },
                {
                  path: 'extension-application',
                  name: 'ExtensionApplication',
                  component: ExtensionApplication,
                  meta: { title: '农户展期申请' }
                },
                {
                  path: 'restructuring-application',
                  name: 'RestructuringApplication',
                  component: RestructuringApplication,
                  meta: { title: '农户重组申请' }
                }
              ]
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
          path: 'task-management',
          name: 'TaskManagement',
          meta: { title: '任务管理' },
          children: [
            {
              path: 'task-statistics',
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
            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/agriculture-loan'
    }
  ]
});
