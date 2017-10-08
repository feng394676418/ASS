<template>
  <div class="page-content">
    <!--head below-->
    <div class="Sharing_head">
      <!-- BEGIN HEADER -->
      <div class="page-header navbar">
        <!-- BEGIN HEADER INNER -->
        <div class="page-header-inner">                  
          <!-- END RESPONSIVE MENU TOGGLER -->
          <div class="search-form search-form-expanded">
            <div class="input-group">
              <span class="input-group-btn">
                <a href="javascript:;" class="btn submit">
                  <i class="icon-search" @click="searchOrderInfo()"></i>
                </a>
              </span>
              <input type="text" class="form-control" v-model="queryInfo.odrNumber" maxlength="" :placeholder="$t('stockOrder.searchplaceholder')" name="number" @keydown="handleSerachEnter($event)"></div>
            </div>

            <div class="pull-right">
              <!-- BEGIN HEADER SEARCH BOX -->
              <!-- END HEADER SEARCH BOX -->
              <!-- BEGIN TOP NAVIGATION MENU -->
              <div class="top-menu">
                <ul class="nav navbar-nav">
                  <!--<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">                     
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" :title="$t('Unreadmessage')">
                      <i class="icon-bell"></i>
                      <span class="badge bg-important"></span>
                    </a>						
                    <ul class="dropdown-menu dropdown_msg">
                      <li>
                        <ul class="dropdown-menu-list" tabindex="5001" style="overflow: hidden; outline: none;">
                          <li class="esh-menu-list-no-msg">
                            厂商一加备件申请单PP17062700001于2017/06/27 10:50:30<span class="yellow">通过审核</span>。
                          </li>
                          <li class="esh-menu-list-no-msg">
                            工单AS170627000001于2017/06/27 10:50:30<span class="yellow">已确认报价</span>，待维修。
                          </li>
                          <li class="esh-menu-list-no-msg">
                            工单AS170627000001于2017/06/27 10:50:30<span class="yellow">已确认报价</span>，待维修。
                          </li>
                          <li class="esh-menu-list-no-msg">
                            厂商一加于2017/06/27 10:50:30<span class="yellow">发起坏件返厂</span>单RT17062700001，待发货。
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>-->

                  <li>
                    <rightButtonChild></rightButtonChild>
                  </li>
                </ul>

              </div>                    
            <!-- END TOP NAVIGATION MENU -->
            </div>
          </div>
        <!-- END HEADER INNER -->
        </div>
      <!-- END HEADER -->
      </div>
      <div class="clearfix"></div>
<!--head upper-->


<div id="top_menu">
	<h2 class="">{{$t('part.Sparepartsform')}}</h2>
  <div class="order_list_menu ">
      <div class="pull-right order_list_top">
        <el-select clearable v-model="queryInfo.providerCode" :placeholder="$t('order.facilitatorName')" @change="statusChange" size="small">
          <el-option
            v-for="item in providerCodeList"
            :key="item.providerCode"
            :label="item.providerName"
            :value="item.providerCode"
            >
          </el-option>
        </el-select>
          
        <el-select clearable v-model="queryInfo.review" :placeholder="$t('part.Auditresults')" @change="statusChange" size="small">
          <el-option
            v-for="item in reviewArray"
            :key="item"
            :label="item | review"
            :value="item"
            >
          </el-option>
        </el-select>
          
        <el-select clearable v-model="queryInfo.status" :placeholder="$t('Warehouse.status')" @change="statusChange" size="small">
          <el-option
            v-for="item in statusArray"
            :key="item"
            :label="item | statusName"
            :value="item"
            >
          </el-option>
        </el-select>

        <el-date-picker
          v-model="queryInfo.createDateRange"
          type="daterange"
          :placeholder="$t('order.daterange')" size="small" @change="showDatePickerValue">
        </el-date-picker>
        <a class="btn btn-primary" @click="handleExpInventoryApply">{{$t('export')}}</a>                 
      </div>
	  </div>
	</div>


 <el-table ref="orderTable"  :data="list" v-loading.body="listLoading" @sort-change="handTableSort" style="margin-top:5px;width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="35">
      </el-table-column>
      <el-table-column  min-width="10%" align="center" :label="$t('stockOrder.odrNumber')" prop="odrnumber" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.odrnumber}}</span>
        </template>
      </el-table-column>

       <el-table-column min-width="10%" align="center" :label="$t('order.facilitatorName')" prop="providercode" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.providerCode}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%"  :label="$t('part.Auditresults')" prop="status"  sortable="custom">
        <template scope="scope">
          <span>{{scope.row.status === 11 ? "" : scope.row.status | review}}</span>          
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('Warehouse.status')" prop="status" sortable="custom">
        <template scope="scope">         
          <el-tag :type="scope.row.status | statusTagFilter ">{{scope.row.status  | statusName}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('order.createDate')" prop="createdate" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('stockOrder.createUserName')" prop="createusername" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.createUserName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="5%" align="center" :label="$t('stockOrder.viewDetail')" >
        <template scope="scope">
          <a  herf="javascript:viod(0);" class="icon_check" @click="handleViewOrder(scope.row.stockOrderNumber)">
          </a>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="queryInfo.pageSize" layout="total,sizes,prev, pager, next" :total="total">
      </el-pagination>
    </div> 
</div>
</template>

<script>
import rightButtonChild from './../layout/rightButtonChild'
import { getProviderList } from 'api/providerMgr';
import { getAllSkuName } from 'api/partManage';
import { getSkuRemnant } from 'api/partInventoryMgr';
import { createApplyStockOrder, listApplyInStockOrder, applyStockOrderListByOdrNumber } from 'api/applyStockIn';
import moment from 'moment';
import {parseTime} from 'utils/index';
import Vue from 'vue';

export default {
  name: 'inventory_apply',
  props: {},
  components: { rightButtonChild },
  data() {
    return {
        listLoading: false,
        total: null,
        queryInfo: {
          pageNum: 1,
          pageSize: 10,
          createDateStart: '',
          createDateEnd: '',
          owner: this.$store.getters.providerCode, // 厂商内部CODE
          review: '',
          status: '',
          createDateRange: '',
          sortName: 'createDate',
          sortOrder: 'desc',
          providerCode: '', // 下拉选择项目值
          odrNumber:''
        },
        list: [],

        statusArray: [11, 12, 13, 14],
        reviewArray: [11, 12],
        dismissModal: 'modal',
        partSelectItem: {
            sku: '',
            cnname: '', // 中文名
            enname: '', // 英文名
            qty: 1,
            remnantQty: 0
        },
        partSelectItemList: [], // 备件申请界面列表
        partSelectItemListTmp: [],
        providerCodeList: [],
        searchInfo: {
          cnname: '',
          enname: '',
          searchSku: '',
          searchOwner: '',
          searchProviderCode: this.$store.getters.providerCode
        },
        requestPartInfo: {},
        //searchValue: '',
        multipleSelection: [],
        partInfoShowList: [],
        partCnt: '1',
        partName: '',
        partSearchValue: '',
        partOptions: [],
        partList: [],
        loading: false,
        partSelectList: ['Alba', 'Blba', 'Clba'],
        ownerList: [],
        statusNameOptions: this.$t('part.statusNameOptions'),
        passOptions: this.$t('part.passOptions'),
        stockOrderForm: {
          owner: '',
          providercode: this.$store.getters.providerCode,
          warehousecode: '',
          logisticscode: '',
          createuser: this.$store.getters.uid,
          stockDetailList: []
        }
    }
  },
  beforeCreate() {
      const _this = this;
      Vue.filter('review', function(status) {
            let statusname = '';
            _this.passOptions.forEach(item => {
            if (item.status === status + '') {
                statusname = item.name;
                return;
            }
          });
            return statusname;
      });

      Vue.filter('statusName', function(status) {
          let statusname = '';
            _this.statusNameOptions.forEach(item => {
            if (item.status === status) {
                statusname = item.name;
            }
          });
            return statusname;
        });
  },
    filters: {
    statusTagFilter(status) {
      const statusMap = {
            11: 'primary',
            12: 'warning',
            13: 'warning',
            14: 'gray',
            1: 'gray'
          };
          return statusMap[status]
        }
  },
  created() {
      // 获取备件必要信息 库存等
      // 货主list获取
      this.getProviderCodeList();
      this.searchBaseInfoList();
  },
  methods: {
    statusChange(val) {
      console.log(val);
      this.searchBaseInfoList();
    },
    handTableSort(val) {
          this.queryInfo.sortName = val.prop;
          this.queryInfo.sortOrder = val.order === 'ascending' ? 'desc' : 'asc';
          this.searchBaseInfoList();
    },
    handleCurrentChange(val) {
          this.queryInfo.pageNum = val;
          this.searchBaseInfoList();
    },
    handleSizeChange(val) {
          this.queryInfo.pageSize = val;
          this.searchBaseInfoList();
    },
    showDatePickerValue(val) {
      if (val === null || val === '') {
        this.queryInfo.createDateStart = '';
        this.queryInfo.createDateEnd = '';
      } else {
        this.queryInfo.createDateStart = moment(this.queryInfo.createDateRange[0]).format('YYYY-MM-DD');
        this.queryInfo.createDateEnd = moment(this.queryInfo.createDateRange[1]).format('YYYY-MM-DD');
      }
      this.searchBaseInfoList();
    },
    searchBaseInfoList() {
      // 获取页面列表信息
      listApplyInStockOrder(this.queryInfo).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
      });
    },
    confirmApply() {
      if (this.partSelectItemList.length === 0) {
        this.$message.error(this.$t('part.selectaccessories'));
        return;
      }
      // 申请备件确认
      this.stockOrderForm.owner = this.searchInfo.searchOwner;
      this.stockOrderForm.stockDetailList = this.partSelectItemList;
      createApplyStockOrder(this.stockOrderForm).then(response => {
          if (response.data.status === '0') {
              this.$message.info(this.$t('part.partsapplicationsuccessful'));
              this.searchBaseInfoList();
          } else {
              this.$message.error('Exception:' + response.data.message);
              this.dismissModal = '';
          }
      });
    },
    itemDel(sku) {
      this.partSelectItemListTmp = this.partSelectItemList;
      this.partSelectItemList.forEach((item, index) => {
          if (item.sku === sku) {
              this.partSelectItemListTmp.splice(index, 1);
          }
      });
      this.partSelectItemList = this.partSelectItemListTmp;
    },
    itemPlus(sku) {
      // TODO
      console.log(sku);
      // this.partSelectItemListTmp = this.partSelectItemList;
      // this.partSelectItemListTmp.forEach(item => {
      //     if (item.sku === sku) {
      //       // this.partSelectItemList[index].qty++;
      //       console.dir(item);
      //       item.qty = ++item.qty;
      //     }
      // });
      // this.partSelectItemList = this.partSelectItemListTmp;
    },
    itemMinus(sku) {
      // TODO
      console.log(sku);
      // this.partSelectItemListTmp = this.partSelectItemList;
      // this.partSelectItemList.forEach((item, index) => {
      //     if (item.sku === sku) {
      //       if (this.partSelectItemListTmp[index].qty > 1) {
      //           this.partSelectItemListTmp[index].qty--;
      //       }
      //     } else {
      //       this.partSelectItemListTmp[index].qty = item.qty;
      //     }
      // });
      // this.partSelectItemList = this.partSelectItemListTmp;
    },
    getProviderCodeList() {
        getProviderList(this.$store.getters.providerCode).then(response => {
            this.providerCodeList = response.data;
        })
    },
    handlesearchByProviderCode(value) {
        // 数据清空
        this.partSelectList = [];
        this.partList = [];
        this.partName = '';
        this.partSearchValue = '';
        this.searchInfo.searchSku = '';

        getAllSkuName(this.$store.getters.providerCode, value).then(response => {
            if (response.data.status === '0') {
                this.partSelectList = response.data.rsltData;
                this.partList = this.partSelectList.map(item => {
                    return { value: item.sku, label: item.enname, cnname: item.cnname };
                });
                console.dir(this.partList);
            }
        });
    },
    searchOrderInfo() {
      this.searchBaseInfoList();
    },
    changeItem(item) {
      // 前台显示
      this.partName = item.label;
      this.searchInfo.searchSku = item.value;
      this.searchInfo.cnname = item.cnname;
      this.searchInfo.enname = item.label;
    },
    partItemPush() {
        // 相关信息查询
        if (this.searchInfo.searchSku === '' || this.searchInfo.searchSku === undefined) {
          this.$message.error(this.$t('part.partcannotbeempty'));
          return;
        }
        getSkuRemnant(this.searchInfo.searchSku, this.searchInfo.searchProviderCode, this.searchInfo.searchOwner).then(response => {
            if (response.data.status === '0') {
              this.partSelectItem.remnantQty = response.data.rsltData;
            } else {
              this.$message.error(response.data.message);
              return;
            }
        });
        let runningFlg = 0;
        this.partSelectItem.sku = this.searchInfo.searchSku;
        this.partSelectItem.cnname = this.searchInfo.cnname;
        this.partSelectItem.enname = this.searchInfo.enname;
        this.partSelectItem.qty = this.partCnt;
        this.partSelectItemList.forEach(item => {
            if (item.sku === this.partSelectItem.sku) {
                this.$message.error(this.$t('part.partshavebeenadd'));
                runningFlg = 1;
                return runningFlg;
            }
        });
        console.log('runningFlg:' + runningFlg);
        if (runningFlg === 1) {
            return;
        }
       this.partSelectItemList.push(this.partSelectItem);
       this.partSelectItem = {};
    },
    partCntAdd() {
        this.partCnt++;
    },
    partCntMinus() {
      if (this.partCnt > 1) {
        this.partCnt--;
      }
    },
    handleViewOrder(stockOrderNumber) {
      //
      console.log(stockOrderNumber);
      this.$router.push('/partInventory/detail/' + stockOrderNumber);
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    remotePartSearch(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.partOptions = this.partList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.partOptions = [];
        }
    },
    handleExpInventoryApply(){
      var expList;
          if(this.multipleSelection.length>0){
            expList = this.multipleSelection;
            console.dir(expList);
            this.expInventoryApply(expList);
          }else{
           listApplyInStockOrder(this.queryInfo).then(response => {
              expList = response.data.list;            
              this.expInventoryApply(expList);
            })
          }
    },
    expInventoryApply(expList){
      console.dir(expList);
        expList.forEach(obj => {
                this.statusNameOptions.map(function (item) {
                  if(item.status == obj.status){
                      obj.statusName =  item.name;
                  }
                })
                this.passOptions.map(function (item) {
                  if (item.status.indexOf(obj.status)>-1) {
                      obj.passName =  item.name;
                  }
                })
          })
            require.ensure([], () => {
                const { export_json_to_excel } = require('vendor/Export2Excel');
                var tHeader;
                var filterVal;

                    tHeader = [this.$t('stockOrder.odrNumber'), this.$t('order.facilitatorName'),this.$t('part.Auditresults'),this.$t('Warehouse.status'),
                    this.$t('order.createDate'), this.$t('stockOrder.createUserName')];
                     filterVal = ['odrnumber', 'providerCode','passName','statusName','createDate','createUserName'];
                
                const data = this.formatJson(filterVal, expList);
                export_json_to_excel(tHeader, data, this.$t('part.Sparepartsform')+'  '+parseTime(new Date()));
              })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
       },
       handleSerachEnter(ev){
        if(ev.keyCode == 13){
            this.searchBaseInfoList();
        }
    },
  }
}
</script>

<style>

.el-date-editor--daterange.el-input{
 width: 190px
}
.el-input__inner {
    border: 1px solid #d4d8ec;
    border-radius: 10px!important;
    color: #555;
    line-height: 28px;
    font-size: 12px;
}
.el-input__icon{
  width: 30px;
}
.el-input__icon + .el-input__inner{
  padding-right: 28px;
}
.el-picker-panel{
  border-radius: 10px;
}
.el-select-dropdown{
  border-radius: 10px;
}
.navbar {
    margin-bottom: 0px!important;
}
.el-table th{
  background: #f7f8fd;
}

.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
  background: none;
}
.el-table td, .el-table th.is-leaf{
  border: none;
}
.el-table td, .el-table th{
  height: 45px;
}
.el-table{
  border:none!important;
}
.el-pager li,.el-pagination .btn-next,.el-pagination .btn-prev,.el-pagination button.disabled{
  border-radius: 10px;
  border: 1px solid #e8ebfa;
  margin-right: 8px;  
}
.el-pager li.active + li{
  border-left: 1px solid #e8ebfa;
}
.el-pager li:last-child{
  border-right: 1px solid #e8ebfa;
}
.pagination-container{
  margin: 20px auto;
}
.el-pagination{
  width: 29%;
  margin: 0 auto;
}
.order_list_top .el-select input{
  width: 114px;
  margin-left: 8px;
}
.el-pagination .el-select .el-input input{
  line-height: 28px;
}
.el-table .cell{
  white-space:nowrap;
}

</style>
<style scoped>
  @import '/static/css/bootstrap.min.css';
  @import '/static/css/layout.css';
  @import '/static/css/custom.css';
  @import '/static/css/default.css';
  @import '/static/css/style.css';
  @import '/static/css/style-responsive.css';
</style>
