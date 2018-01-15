<template>
  <div class="app-container calendar-list-container page-content">
            <div class="Sharing_head">
              <div class="page-header navbar">
                <div class="page-header-inner">
                  <div class="search-form search-form-expanded">
                    <div class="input-group">
                      <span class="input-group-btn">
                        <a href="javascript:;" class="btn submit">
                          <i class="icon-search" @click="handleSearch()"></i>
                        </a>
                      </span>
                      <input type="text" class="form-control" v-model="listQuery.searchValue" maxlength="" :placeholder="$t('order.searchplaceholder')" name="number" @keydown="handleSerachEnter($event)"></div>
                  </div>                 
                 
                  <div class="pull-right">
                  <div class="top-menu">
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                            <i class="icon-add"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-default dropdown_add">
                            <li>
                              <!-- <a href="javascript:;"><i class="icon-doc"></i>新建备件申请</a> -->
                              <a class="icon-doc" href="#orderInfo" data-toggle="modal"><i class="icon-doc"></i>{{$t('order.NewWorkOrder')}}</a>
                              <a class="icon-doc" href="#batchImport" data-toggle="modal"><i class="icon-doc"></i>{{$t('order.BatchImport')}}</a>
                            </li>
                          </ul>
                        </li>

                        <!--<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">                           
                          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"  data-close-others="true" :title="$t('Unreadmessage')">
                            <i class="icon-bell"></i>
                            <span class="badge bg-important"></span>
                          </a>						
                          <ul class="dropdown-menu dropdown_msg">
                            <li>
                                <ul class="dropdown-menu-list">
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
                  </div>
                </div>
               </div>
              </div>
            <div class="clearfix"></div>


    <h2>{{$t('order.orderList')}}</h2>
        <div class="order_list_menu ">
	            	<ul class="list_menu">
                  <li v-for="item in $t('order.statusItems')" @click="handleSearchByStatus(item)" :class="{'active':item.active,'unactive':!item.active}" >
                    {{item.name+"("+item.value+")"}} 
                  </li>
	            	</ul>
                <div class="pull-right order_list_top">
                  <el-date-picker
                    v-model="listQuery.createDate"
                    type="daterange"
                    size="small"
                    :placeholder="$t('order.daterange')"
                    @change="handlesearchByCreateDate"
                  >
                  </el-date-picker>
                  <el-select clearable v-model="listQuery.facilitator" :placeholder="$t('order.serviceprovider')" @change="handlesearchByProviderCode" size="small">
                    <el-option
                      v-for="item in providerOptions"
                      :key="item.providerCode"
                      :label="item.providerName"
                      :value="item.providerCode"
                      >
                    </el-option>
                  </el-select>

                 

                  <a class="btn btn-primary" @click="handleExpOrder">{{$t('export')}}</a>
                     <!-- <a class="btn btn-primary" @click="handleEditOrderModal">编辑工单</a>   -->
                   <!-- <a class="btn btn-primary" @click="handleAddOrderModal">新建工单</a>  -->
                  

                  <!-- <a class="btn btn-primary" @click="handleLockOrder">锁定工单</a> -->
                  <!-- <a class="btn btn-primary" @click="handleDeleteOrder">删除工单</a> -->
              </div>
        </div>
    <el-table ref="orderTable"  :data="list" v-loading.body="listLoading"  style="margin-top:5px;width: 100%" @sort-change="handTableSort" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="35">
      </el-table-column>
      <el-table-column  min-width="10%" align="center" :label="$t('order.refNumber')" prop="refNumber" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.refNumber}}</span>
        </template>
      </el-table-column>

       <el-table-column min-width="10%" align="center" :label="$t('order.userName')" prop="userName" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" :label="$t('order.trackingNo')" prop="trackingNo" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.trackingNo}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('order.productType')">
        <template scope="scope">
          <span>{{scope.row.productType}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('order.imei')">
        <template scope="scope">
          <span>{{scope.row.imei}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('order.facilitatorName')">
        <template scope="scope">
          <span>{{scope.row.facilitatorName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('order.status')" prop="status" sortable="custom">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusTagFilter ">{{scope.row.status  | statusFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('order.createDate')" prop="createDate" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="5%" align="center" :label="$t('order.operation')" >
        <template scope="scope">
          <!-- <el-button  size="small" type="success"  @click="handleViewOrder(scope.row.orderNumber)">
          </el-button> -->
          <a  herf="javascript:viod(0);" class="icon_check" @click="handleViewOrder(scope.row.orderNumber)">
          </a>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total,sizes,prev, pager, next" :total="total">
      </el-pagination>
    </div> 
     <orderDetailInfo ref="orderDetail"></orderDetailInfo> 
    <!-- 批量导入工单-->
    <div class="modal fade" id="batchImport">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h5 class="modal-title">{{$t('order.BatchImport')}}</h5>
          </div>
          <div class="modal-body">
            <div class="order_detection main_form_input">
              <div class="main_form_input" style="padding-bottom:5px;">
                <div class="batchImport_body">
                  <form id="batchform" enctype="multipart/form-data" method="post" action="">
                      <input class="form-control" type="text" id="showfilename" :placeholder="$t('order.choose')" />
                      <i class="icon-upload"></i>
                      <input class="form-control input_file" type="file" id="orderfile" name="file" @change="selectedFile($event.target)"/>
                      <div id='returnMessage' class="error_message"></div>             
                  </form>
                  <span class="grey_text">{{$t('part.importExplain')}}</span>&nbsp;&nbsp;<a :href="orderExcelUrl" class="purple_text">{{$t('part.templatesDownload')}}</a><br/>								
                </div>
                <ul class="batchImport_body batchImportdes">
                  <li>2018/01/08 10:00 <span class="black_text">400</span> {{$t('order.orders')}}{{$t('order.pass')}}，<span class="orange_text">100</span> {{$t('order.orders')}}{{$t('order.failed')}} <a class="purple_text">{{$t('order.Downloadfailedorders')}}。</a></li>
                  <li>• {{$t('order.Contactinfoincomplete')}} 20 {{$t('order.orders')}}</li>
                  <li>• {{$t('order.Addressinfoincorrect')}} 20 {{$t('order.orders')}}</li>
                  <li>• {{$t('order.Productinfoerror')}} 20 {{$t('order.orders')}}</li>
                  <li>• {{$t('order.addressprovider')}} 20 {{$t('order.orders')}}</li>
                  <li>• {{$t('order.Other')}} 20 {{$t('order.orders')}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
            <button type="button" class="btn btn-primary"  @click="importExcel()" >{{$t('part.import')}}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
  
</template>



<script>

  import { getOrderList, lockOrder, deleteOrder, getOrderNumByStatus, expOrder, getOrderByOrderNumber} from 'api/morder';
  import { parseTime } from 'utils/index';
  import { addOrder } from 'api/morder';
  import { getProviderList } from 'api/providerMgr';
  import orderDetailInfo from './orderDetailInfo';
  import rightButtonChild from './../layout/rightButtonChild';
  import Vue from 'vue';
  import bootstrap from 'bootstrap';
 
  export default {
    name : 'orderMgr',
    components: { orderDetailInfo, rightButtonChild },
    data() {
    return {
      list: null,
      total :null,
      listLoading: true,
      active: "active",
      listQuery: {
            pageNum: 1,
            pageSize: 10,
            searchValue: '',
            status: '',
            createDate: '',
            createStartDate: '',
            createEndDate: '',
            facilitator: '',
            sortName: 'createDate',
            sortOrder: 'desc',
            orderNumber: '',
            searchProviderCode: '',
            providerCode: this.$store.getters.providerCode
      },
      statusItems: this.$t('order.statusItems'),
      orders: [],
      statusArr: [],
      tempOrder: '',
      isEdit: false,
      providerOptions: [],
      orderModalTitle: '',
      providerAddress: '',
      providerPhone: '',
      providerCode: '',
      providerType: '',
      orderExcelUrl: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
    }
  },
  beforeCreate(){
    const _this = this;
     Vue.filter('statusFilter', function(val) {
      
       var statusName  = '';
       _this.statusItems.forEach(function (item) {
                  if(item.status == val){
                    statusName =  item.name;
         }
　　　});
        return statusName;
    });
  },
    filters: {
    statusTagFilter(status) {
      const statusMap = {
            11: 'primary',
            12: 'primary',
            13: 'primary',
            14: 'success',
            15: 'success',
            16: 'success',
            17: 'warning',
            18: 'warning',
            19: 'gray'
          };
          return statusMap[status]
        }
  },
  created() {
        this.$t('order.statusItems').forEach(function (item) {
            item.active = false;
　　　　});
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if(index > -1){this.splice(index,1);}
        }
        const _this = this;
        _this.getList();
        _this.getOrderNumByStatus();

        // _this.providerCode = _this.$store.getters.providerCode;
        // _this.providerType = _this.providerCode.substr(0, 1);
        _this.getProviderList();

  },
  methods: {
    getList() {
          this.listLoading = true;
          getOrderList(this.listQuery).then(response => {
              this.list = response.data.list;
              this.total = response.data.total;
              this.listLoading = false;
          })
    },
    getOrderNumByStatus(){
        getOrderNumByStatus(this.listQuery).then(response => {
              const data = response.data;
              for(var key in data)
              {
                this.statusItems.forEach(function (item) {
                  if(item.status == key){
                    item.value = data[key];
                  }
　　　　　　　 　});
              }
          })
    },
    handleSearch(val) {
          this.getList();
    },
    handleSerachEnter(ev){
        if(ev.keyCode == 13){
            this.getList();
        }
    },
    handleSearchByStatus(item) {
      if(item.active==true){
        item.active = false;
        this.statusArr.remove(item.status);
      }else{
        item.active = true;
        this.statusArr.push(item.status);
      }
      this.listQuery.status = this.statusArr.toString();
      this.getList();
    },
    handlesearchByCreateDate(val){
      if(this.listQuery.createDate[0] == null || this.listQuery.createDate[0] == ''){
        this.listQuery.createStartDate ='';
      }else{
        this.listQuery.createStartDate = parseTime(this.listQuery.createDate[0],'{y}-{m}-{d}');
      }
      if(this.listQuery.createDate[1] == null || this.listQuery.createDate[1] == ''){
        this.listQuery.createEndDate = '';
      }else{
        this.listQuery.createEndDate = parseTime(this.listQuery.createDate[1],'{y}-{m}-{d}');
      }
      this.getList();
    },
    handlesearchByProviderCode(val) {
          this.listQuery.searchProviderCode = val;
          this.getList();
    },
    handleViewOrder(val) {
          this.$router.push({ path: '/baseInfo/detail/' + val });
    },
    handleSizeChange(val) {
          this.listQuery.pageSize = val;
          this.getList();
    },
    handleCurrentChange(val) {
          this.listQuery.pageNum = val;
          this.getList();
    },
    handTableSort(val) {
          this.listQuery.sortName = val.prop;
          this.listQuery.sortOrder = val.order == "ascending" ? "asc" : "desc";
          this.getList();
    },
    handleAddOrderModal(){
          this.orderModalTitle = this.$t('order.NewWorkOrder');
          this.isEdit = false;
          $('#orderInfo').modal();
    },
    handleEditOrderModal(){
       if(this.orders.length!=1){
            this.$message.error(this.$t('order.selectOrderInfo'));
            return;
        }
        this.$refs.orderDetail.handleEditOrderModal(this.orders[0].orderNumber);
    },
    handleSelectionChange(rows) {
          this.orders = [];
          rows.forEach(row => {
             this.orders.push(row);
          });
    },
    selectedFile(obj) {
      if (!obj.files) {
          return;
      }
      let file = obj.files[0],
          types = file.name.split('.')[1],
          fileType = ["xlsx", "xls"].some(item => item === types);
      if (!fileType) {
          this.$message.error(this.$t('格式错误！请重新选择'));
          return;
      }
      $('#showfilename').val(file.name);
    },
    importExcel() {
      var that = this;
      let files = document.getElementById('orderfile').files;
      if (files && files.length) {
        var fd = new FormData();
        fd.append('file', files[0]);
        fd.append('assLang', Cookies.get('assLang'));
        var reader = new window.FileReader()
        // 文件大小 100KB
        //var fileSize = 100 * 1024
        reader.readAsDataURL(files[0])
        reader.onload = function (e) {
          // if (e.target.result.length > fileSize) {
          //   that.$dispatch('show-alert', 'msg_1016')
          //     document.getElementById('orderfile').value = ''
          // } else {
            var xhr = new XMLHttpRequest()
            xhr.addEventListener('load', that.uploadComplete, false)
            xhr.open('POST', 'api/part/importPartFactory')
            xhr.send(fd)
          //}
        }
      }else{
          this.$message.error(this.$t('请选择文件!'));
      }
    },
    uploadComplete(evt) {
      const rtnObj = $.parseJSON(evt.target.response);
      if(rtnObj.status=='0'){
        this.$message({ message: rtnObj.message,type: 'success' });
        $('#batchImport').modal('hide');
        this.getList();
      }else{
        $("#returnMessage").html(rtnObj.message);
      }
      $('#orderfile').val('');
    },
    getExcelUrl(){
      var language = Cookies.get('assLang');
      getPartExcelUrl(language).then(response => {
        this.orderExcelUrl = response.data;
      })
    },
    // handleLockOrder(){
    //     if(this.orderNumbers.length==0){
    //         this.$message.error('请选择工单信息！');
    //         return;
    //     }
    //     lockOrder(this.orderNumbers).then(response => {
    //           if(response.data.msg=='success'){
    //             this.$message({
    //                 message: '锁定工单成功！',
    //                 type: 'success'
    //             });
    //             this.getList();
    //           }
    //       })
    // },
    // handleDeleteOrder(){
    //       if(this.orderNumbers.length==0){
    //         this.$message.error(this.$t('order.selectOrderInfo'));
    //         return;
    //       }
    //       deleteOrder(this.orderNumbers).then(response => {
    //           if(response.data.msg=='success'){
    //             this.$message({
    //                 message: '删除工单成功！',
    //                 type: 'success'
    //             });
    //             this.getList();
    //           }
    //       })
    // },
    handCancel() {
            this.$router.push({ path: '/order/index' });
        },
    getProviderList() {
              // 获取货主对应的 服务商list
             getProviderList().then(response => {
                this.providerOptions = response.data;
            })
        },
    handleChangeProvider(val){
            this.providerOptions.forEach(function(obj) {
                if(obj.providerCode == val){
                    this.providerAddress = obj.address;
                    this.providerPhone = obj.phone;
                }
            }, this);
        },
    handleExpOrder(){

        let expList;
        if(this.orders.length>0){
          expList = this.orders;
          this.expOrder(expList); 
        }else{
          expOrder(this.listQuery).then(response => {
              expList = response.data;
              this.expOrder(expList);    
          })
        }
    },
    expOrder(expList){
          expList.map(obj => this.statusItems.map(function (item) {
                      if(item.status == obj.status){
                        obj.statusName =  item.name;
                      }
    　　　       }));
          require.ensure([], () => {
                const { export_json_to_excel } = require('vendor/Export2Excel');
                const tHeader = [this.$t('order.refNumber'), this.$t('order.userName'),this.$t('order.trackingNo'),this.$t('order.productType'),
                    this.$t('order.imei'), this.$t('order.facilitatorName'), this.$t('order.status'), this.$t('order.createDate')];
                const filterVal = ['refNumber', 'userName','trackingNo','productType','imei','facilitatorName','statusName','createDate'];

                const data = this.formatJson(filterVal, expList);
                export_json_to_excel(tHeader, data, this.$t('order.orderList')+parseTime(new Date()));
        })
    },
    formatJson(filterVal, jsonData) {
      return  jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
}
</script>
<style>
.batchImport_body .input_file{
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top:20px;
  left: 0;
  margin: 0 30px;
  width: 91%!important;
}
.batchImport_body .icon-upload{
  position: absolute;
  top:26px;
  right: 40px;  
}

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