<<template>
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
                    <ul class="nav navbar-nav pull-right" style="position:absolute;right:120px;">
                        <li class="dropdown">
                          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                            <i class="icon-add"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-default dropdown_add">
                            <li>
                              <a href="javascript:;"><i class="icon-doc"></i>新建备件申请</a>
                              <a class="icon-doc" href="#orderInfo" data-toggle="modal" v-if="providerType == 'B'"><i class="icon-doc"></i>{{$t('order.NewWorkOrder')}}</a>
                            </li>
                          </ul>
                        </li>
						<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
						                            
						   <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"  data-close-others="true" :title="$t('Unreadmessage')">
						        <i class="icon-bell"></i>
						        <span class="badge bg-important"></span>
						   </a>						
						    <ul class="dropdown-menu dropdown_msg">
						        <li>
						            <ul class="dropdown-menu-list">
						                 <li class="esh-menu-list-no-msg">
						                 		厂商一加备件申请单PP17062700
																001于2017/06/27 10:50:30<span class="yellow">通过审核</span>。
						                 </li>
						                 <li class="esh-menu-list-no-msg">
						                 		工单AS170627000001于2017/06/
																27 10:50:30<span class="yellow">已确认报价</span>，待维修。
						                 </li>
						                 <li class="esh-menu-list-no-msg">
						                 		工单AS170627000001于2017/06/
																27 10:50:30<span class="yellow">已确认报价</span>，待维修。
						                 </li>
						                 <li class="esh-menu-list-no-msg">
						                 		厂商一加于2017/06/27 10:50:30<span class="yellow">发
																起坏件返厂</span>单RT17062700001，
																待发货。
						                 </li>
						            </ul>
						        </li>
					  	</ul>
                        </li>
                        
                      
                      </ul>

                       <ul><li>
                            <rightButtonChild></rightButtonChild></li></ul>
                      
                  </div>                    
                  </div>
                </div>
               </div>
              </div>
    <div id="top_menu">
	            <h2 class="">备件出入库单</h2>
	            <div class="order_list_menu ">
	            	<div class="pull-right order_list_top">
                        <form>	                 
                            <el-select v-model="listQuery.searchValue" placeholder="请选择厂商" @change="handlesearchByProviderCode" size="small">
                                <el-option
                                v-for="item in providerOptions"
                                :key="item.providerCode"
                                :label="item.providerName"
                                :value="item.providerCode"
                                >
                                </el-option>
                            </el-select>
                            
                            <el-select v-model="listQuery.inventoryType"  placeholder="" @change="handlesearchByProviderCode" size="small">
                                <el-option
                                v-for="item in inventoryTypeOptions"
                                :key="item.inventoryTypeName"
                                :label="item.inventoryTypeName"
                                :value="item.inventoryTypeName"
                                >
                                </el-option>
                            </el-select>
                            <el-select v-model="listQuery.searchValue" placeholder="请选择单据类型" @change="handlesearchByProviderCode" size="small">
                                <el-option
                                v-for="item in providerOptions"
                                :key="item.providerCode"
                                :label="item.providerName"
                                :value="item.providerCode"
                                >
                                </el-option>
                            </el-select>
                            <el-select v-model="listQuery.searchValue" placeholder="请选择出入库类别" @change="handlesearchByProviderCode" size="small">
                                <el-option
                                v-for="item in providerOptions"
                                :key="item.providerCode"
                                :label="item.providerName"
                                :value="item.providerCode"
                                >
                                </el-option>
                            </el-select>
                            <el-date-picker
                                v-model="listQuery.createDate"
                                type="daterange"
                                size="small"
                                :placeholder="$t('order.daterange')"
                                @change="handlesearchByCreateDate"
                              >
                              </el-date-picker>
                            <a class="btn btn-primary" @click="handleExpPartInventory">Excel导出</a>
                            <!-- <a class="btn btn-primary">新建</a> -->
                        </form>
	                </div>
	            </div>
	</div>
    <el-table ref="partInventoryTable"  :data="list" v-loading.body="listLoading"  style="margin-top:5px;width: 100%" @sort-change="handTableSort" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="35">
      </el-table-column>
      <el-table-column  min-width="10%" align="center" label="订单编号" prop="owner" >
        <template scope="scope">
          <span>{{scope.row.owner}}</span>
        </template>
      </el-table-column>
      <el-table-column  min-width="10%" align="center" label="厂商" prop="owner" >
        <template scope="scope">
          <span>{{scope.row.owner}}</span>
        </template>
      </el-table-column>

       <el-table-column min-width="10%" align="center" label="好/坏料" prop="inventoryType" >
        <template scope="scope">
          <span>{{scope.row.inventoryType}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" label="单据类型" prop="sku" >
        <template scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" label="出入库类别">
        <template scope="scope">
          <span>{{scope.row.cnName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" label="发货机构">
        <template scope="scope">
          <span>{{scope.row.unit}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" label="收货机构">
        <template scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="14%" align="center" label="创建时间">
        <template scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="8%" align="center" label="创建人员">
        <template scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="8%" align="center" label="详情">
        <template scope="scope">
          <a  herf="javascript:viod(0);" class="icon_check" @click="handleViewInventoryChange(scope.row.sku,scope.row.providerCode,scope.row.owner)"></a>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total,sizes,prev, pager, next" :total="total">
      </el-pagination>
    </div>
</div>
</template>
<script>
import {getPartInventoryList } from 'api/partInventoryMgr';
import {parseTime} from 'utils/index';
import { getProviderList } from 'api/providerMgr';
import rightButtonChild from './../../layout/rightButtonChild';


export default {
    name : 'orderMgr',
    components: {rightButtonChild },
    data() {
        return {
        list: null,
        total :null,
        listLoading: true,
        listQuery: {
            pageNum: 1,
            pageSize: 10,
            searchValue: '',
            inventoryType: '',
            sortName: 'createDate',
            sortOrder: 'desc'
      },
      ids :'',
      inventoryTypeOptions :[{inventoryTypeName:'好料'},{inventoryTypeName:'坏料'}],
      providerType :'',
      providerOptions: []
    }
    },
    created() {
        const _this = this;
        _this.getList();
        _this.providerCode = _this.$store.getters.providerCode;
        _this.providerType = _this.providerCode.substr(0, 1);
        _this.getProviderList();
    },
    methods: {
        getList() {
          this.listLoading = true;
          getPartInventoryList(this.listQuery).then(response => {
              this.list = response.data.list;
              this.total = response.data.total;
              this.listLoading = false;
          })
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
        handleSelectionChange(rows) {
            this.ids = [];
            rows.forEach(row => {
                this.ids.push(row.orderNumber);
            });
        },
        handlesearchByProviderCode(val){
          this.listQuery.inventoryType = val;
          this.getList();
        },
        handleViewInventoryChange(sku,providerCode,owner){
            // console.dir(sku+"    "+providerCode+"            "+owner);
            this.$router.push({ path: '/partInventory/provider/change/index/'+sku+"/"+owner+"/"+providerCode });
        },
        getProviderList(){
             const providerQuery = {};
             if(this.providerType == 'C'){
               providerQuery.searchValue = 'B';
             }
             if(this.providerType == 'B'){
               providerQuery.searchValue = 'C';
             }
             getProviderList(providerQuery).then(response => {
                this.providerOptions = response.data;
            })
        },
        handleExpPartInventory(){
            console.dir('handleExpPartInventory')
        }
    }
}


</script>

<style>

.el-input__inner {
    border: 1px solid #d4d8ec;
    border-radius: 10px!important;
    color: #555;
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
</style>
<style scoped>
  @import '/static/css/bootstrap.min.css';
  @import '/static/css/layout.css';
  @import '/static/css/custom.css';
  @import '/static/css/default.css';
  @import '/static/css/style.css';
</style>