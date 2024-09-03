### 一级菜单设计
1. **农贷业务**
2. **个贷业务**
3. **贷后管理**

### 农贷业务菜单设计

**1. 客户管理**
   - **联保小组管理**
     - 联保小组申请
     - 联保小组协议

**2. 农贷业务**
   - **客户建档**
     - 农户信息新增、修改、查看
   - **评级授信**
     - 客户信息建档、信用评级、额度授信、影像管理
   - **额度管理**
     - 授信台账
     - 额度调整（调增、调减）
     - 额度冻结/解冻/注销
   - **农户年审**
     - 系统自动年审及人工年审
   - **业务申请**
     - 农户信用贷款申请
     - 担保类农贷业务申请
     - 农户续贷申请
     - 农户展期申请
     - 农户重组申请

### 个贷业务菜单设计

**1. 贷款管理**
   - **贷款展期**
     - 展期申请新增、修改、删除、查看
   - **额度管理**
     - 线上额度调整
     - 综合额度台账

### 贷后管理菜单设计

**1. 任务管理**
   - **任务统计**
     - 贷后回访任务统计
     - 贷后检查任务统计
   - **贷后回访**
     - 生成回访任务，登记完成情况
   - **贷后检查**
     - 首次检查任务
     - 定期检查任务
     - 专项检查任务生成及登记
   - **催收管理**
     - 催收登记及任务统计
   - **风险预警**
     - 风险预警管理

### 各个菜单下的内容
1. **客户管理**：用于管理客户信息，包括联保小组的申请及管理。
2. **农贷业务**：覆盖从客户建档、评级授信到各类贷款申请及额度管理的所有功能。
3. **个贷业务**：主要管理个人贷款的展期和额度调整。
4. **贷后管理**：包括贷后回访、检查、催收管理，以及任务统计和风险预警的功能。

### 项目结构
```shell
src/
├── components/
│   ├── AgricultureLoan/
│   │   ├── CustomerManagement/
│   │   │   ├── GroupManagement.vue
│   │   │   └── GroupAgreement.vue
│   │   ├── LoanBusiness/
│   │   │   ├── CustomerArchiving.vue
│   │   │   ├── RatingAndCredit.vue
│   │   │   ├── CreditManagement.vue
│   │   │   ├── AnnualReview.vue
│   │   │   └── BusinessApplication.vue
│   ├── PersonalLoan/
│   │   └── LoanManagement/
│   │       ├── LoanExtension.vue
│   │       └── CreditAdjustment.vue
│   ├── PostLoanManagement/
│   │   ├── TaskManagement/
│   │   │   ├── TaskStatistics.vue
│   │   │   ├── PostLoanVisit.vue
│   │   │   ├── PostLoanInspection.vue
│   │   │   ├── CollectionManagement.vue
│   │   │   └── RiskWarning.vue
