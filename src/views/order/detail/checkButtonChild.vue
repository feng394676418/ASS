<!--检测 Examing Order-->
<template>
  <div>
<dl class="line">
<dt>&nbsp;</dt>
	            			</dl>
	            			<dl>
	            				<dt class="active"><a href="#myModal2" data-toggle="modal">{{$t('order.Detail.Examing')}}</a></dt>

<div class="modal fade" id="myModal2">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Examing')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">

          <div class="panel-body"> 
						<form>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.Productmodelconfirmation')}} </label>
              <el-select class="select_list default form-control" v-model="checkReportForm.productTypeCfm" @change="productTypeChange()" :placeholder="$t('order.choose')">
              <el-option
                v-for="item in productTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
                   
								<div class="clearfix"></div>		
              </div>              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.productType')}}</label>
                <input class="form-control" id="" v-model="checkReportForm.productType" :readonly="checkReportForm.productTypeCfm" :placeholder="baseInfo.productType" type="text">
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.IMEInumberconfirmation')}} </label>
                    <el-select v-model="checkReportForm.imeiCfm" @change="imeiChange()" class="select_list default form-control" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in productTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

								<div class="clearfix"></div>		
              </div>              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.imei')}}</label>
                <input class="form-control" id="" v-model="checkReportForm.imei" :readonly="checkReportForm.imeiCfm" :placeholder="baseInfo.imei" type="text">
              </div>  
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.Detail.Causeoffailure')}}</label>
                <input class="form-control" id="" v-model="checkReportForm.causeInfo" :placeholder="baseInfo.troubleInfo" type="text">
              </div>              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.Servicetype')}} </label>
                    <el-select class="select_list default form-control" v-model="checkReportForm.serviceType" :placeholder="$t('order.choose')" @change="totalCostCalc()">
                    <el-option
                      v-for="item in maintenanceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

								<div class="clearfix"></div>		
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.RepairLevel')}}</label>               
                <el-select class="select_list default form-control choice_leve" v-model="repairLevels" multiple :placeholder="$t('order.choose')">
                  <el-option
                    v-for="item in maintenanceLevelOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>

								<div class="clearfix"></div>		
              </div>
                  <ul class="add_img">
                    <el-upload
                      name="upFile"
                      action="api/file/upload"
                      list-type="picture-card"
                      :drag="false"
                      :file-list="partImageList"
                      :on-success="uploadSuccess"
                      :before-upload="beforeAvatarUpload"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  	<p class="add_text">
                  		{{$t('order.Detail.addtext')}}
                  	</p>
                  </ul>               
          </form></div>
          <div class="panel-body"> 
						<div class="form-group col-md-12 search">
							<label>{{$t('order.Detail.Sparepartsrequesttable')}}</label>
              <el-autocomplete class="select_list default form-control"
                v-model="accessories"
                :fetch-suggestions="querySearchAsync"
                :placeholder="$t('order.Detail.Enterthesparepartcode')"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
 
						<div class="form-group col-md-12 form-inline spare_code">
							<span class="spare_tit">{{$t('order.Detail.Sparepartscodename')}}：</span><span>{{this.showPartName}}</span>
							<div class="pull-right spare_right">
								<div class="form-group">
								<div class="input-group count">
                  <!-- <el-input-number  size="small" v-model="tmpPartNumber" class="default form-control"></el-input-number> -->
								   <span class="input-group-addon minus" @click="minus()">-</span>
								  <input class="form-control" v-model="tmpPartNumber" :value="tmpPartNumber" size="3" placeholder="0" type="text">
								  <span class="input-group-addon plus" @click="plus()">+</span> 
								</div>
								</div>
								<!-- <div class="form-group">
								<input class="form-control" id="" size="8" placeholder="价格(币种) " type="text">
								</div> -->
								<div class="form-group">
                <a class="btn btn-default" @click="assPartSelectionAdd()">{{$t('Add')}}</a>
                </div>
              </div>
            </div>  
 								<div class="table-scrollable modal_find grey_bg">
                    <table class="table">
                      <tbody>
                        <tr class="" v-for=" item in orderPartTableData " :key="item.sku">
                          <td class="" width="20%">
                             		{{$t('order.Detail.SKU')}}: {{item.sku}}
                          </td>
                          <td class="" width="27%">
                               	{{$t('order.Detail.Sparepartsname')}}: {{item.enName}}
                          </td>
                          <td class="" width="15%">
														    {{$t('order.Detail.Price')}}: <span class="text_yellow">{{item.price}}</span>
                          </td>
                          <td class="" width="15%">
                             		{{$t('order.Detail.Quantity')}}: {{item.tmpPartNumber}}
                          </td>
                          <td class="" width="15%">
														   {{$t('order.Detail.Total')}}: <span class="text_yellow">{{ item.price * item.tmpPartNumber | money }}</span>
                          </td>
                          <td class="" width="8%" style="text-align: center;">
														<a href="javascript:viod(0);" class="del" @click="partSelectDelete(item)"></a>
                          </td>
                        </tr>
                     </tbody>
                    </table>
                  </div> 
            
          </div>

          <div class="panel-body"> 
								<div class="table-scrollable modal_find">
                    <table class="table">
                      <thead>
                        <tr>                        
                          <th width="25%"><label>{{$t('order.Detail.Inboundshippingcost')}}</label></th>
                          <th width="25%"><label>{{$t('order.Detail.Servicecost')}}</label></th>
                          <th width="25%"><label>{{$t('order.Detail.OutboundShippingCost')}}</label></th>
                          <th width="25%"><label>{{$t('order.Detail.Totaloffer')}}</label></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="">
                          <td class="">
                             <input class="form-control" v-verify-input:reg="{id:'',format:'Money',title:''}" @blur="totalCostCalc()" id="" v-model="checkReportForm.collectionCost" placeholder="" type="text">
                          </td>
                          <td class="">
                               <input class="form-control" v-verify-input:reg="{id:'',format:'Money',title:''}" @blur="totalCostCalc()" id="" v-model="checkReportForm.repairCost" placeholder="" type="text">
                          </td>
                          <td class="">
                             <input class="form-control" v-verify-input:reg="{id:'',format:'Money',title:''}" @blur="totalCostCalc()" id="" v-model="checkReportForm.mailingCost" placeholder="" type="text">
                          </td>
                          <td class="">
														<span class="text_yellow big_text">€ {{this.totalCost | money}}</span>
                          </td>
                        </tr>
                     </tbody>
                    </table>
                  </div>
          </div>

        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button class="btn btn-primary" type="button" @click="commit()">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>	            				
	</div>


</dl>	 

<el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

  </div>
</template>
<script>

import { getPartInfoList, getPartInfoListByPO } from 'api/partManage';
import { checkReportUpdate } from 'api/report';

export default {
  name: 'checkButtonChild',
  props: {
    baseInfo: {}
  },
  data() {
    return {
      tmpPartNumber: 1, // 配件数量手动可调
      showPartName: '',
      partList: [],
      totalCost: 0,
      orderPartTableData: [], // 工单配件
      accessories: '', // 配件查询key
      assSelectPart: {},
      PartInfoList: [{}], // 配件一览表
      assPartsdialogVisible: false,
      uploadFileCnt: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      partImageList: [], // 配件图像列表初始利用
      repairLevels: ['L0'],
      maintenanceOptions: [{
        value: '保内维修',
        label: this.$t('order.Detail.Inwarranty')
      }, {
        value: '保外维修',
        label: this.$t('order.Detail.Outwarranty')
      }],
      maintenanceLevelOptions: ['L0', 'L1', 'L2', 'L3'],
      productTypeOptions: [{
        value: true,
        label: this.$t('order.Detail.Match')
      }, {
        value: false,
        label: this.$t('order.Detail.Mismatch')
      }],
      checkReportForm: { // 保存Form
        productType: '',
        productTypeCfm: true,
        imei: '',
        imeiCfm: true,
        causeInfo: '',
        serviceType: '保外维修',
        repairLevel: [],
        collectionCost: 0,
        partsCost: 0,
        mailingCost: 0,
        repairCost: 0,
        photoGrpurl: [], // 图片url
        updateUser: '',
        createUser: this.$store.getters.uid,
        orderNumber: this.$route.params.orderNumber,
        // 配件列表
        orderPartList: []
      }
    }
  },
  created() {
      this.imageUploadCompute();
  },
  // 过滤器
  filters: {
        money(val) {
        val = val.toString().replace(/\$|,/g, '');
        if (isNaN(val)) {
          val = '0';
        }
        const sign = val === (val = Math.abs(val));
        val = Math.floor(val * 100 + 0.50000000001);
        let cents = val % 100;
        val = Math.floor(val / 100).toString();
        if (cents < 10) {
          cents = '0' + cents;
        }
        for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
            val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
        }

        return sign ? '' : val + '.' + cents;
        }
  },
  methods: {
    imageUploadCompute() {
      this.uploadFileCnt = this.partImageList.length + 1;
      // 既存url保存
      let imageUploadItem;
      for (imageUploadItem of this.partImageList) {
          this.checkReportForm.photoGrpurl.push(imageUploadItem.url);
      }
    },
    uploadSuccess(response, file) {
        if (response.status === '0') {
          console.log(this.uploadFileCnt);
            this.uploadFileCnt++;
            this.checkReportForm.photoGrpurl.push(response.url);
        }
        console.log('aaaaaaaa');
        console.dir(response);
        console.dir(this.checkReportForm.photoGrpurl);
        console.dir(file);
        console.log('bbbbbbbb');
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        const isCanUpload = this.uploadFileCnt <= 5;
        if (!isCanUpload) {
          this.$message.error(this.$t('order.Detail.Canuploadimages'));
        }
        if (!isJPG) {
          this.$message.error(this.$t('order.Detail.imagesformatincorrect'));
        }
        if (!isLt2M) {
          this.$message.error(this.$t('order.Detail.Maximumimage'));
        }
        return isJPG && isLt2M && isCanUpload;
      },
         handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        handleRemove(file, fileList) {
        this.uploadFileCnt--;
        this.checkReportForm.photoGrpurl = [];
        // console.dir(file);
        console.dir(fileList);
        // 一旦涉及删除,url全部变化
        console.dir(this.partImageList);
        let fileItem;
        for (fileItem of fileList) {
            if (fileItem.response) {
              // 新上传图片
              if (fileItem.response.status === '0') {
                  this.checkReportForm.photoGrpurl.push(fileItem.response.url);
              }
            } else {
              // 旧上传图片
              this.checkReportForm.photoGrpurl.push(fileItem.url);
              }
        }
        console.dir(this.checkReportForm.photoGrpurl);
      },
        handleIconClick() { // 配件查询
        this.searchPartInfoList();
        this.assPartsdialogVisible = true;
    },
      searchPartInfoList() {
        getPartInfoList(this.accessories).then(response => { // 配件信息获取
          this.PartInfoList = response.data;
      })
    },
        toggleSelection(rows) { // 配件选择
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
      assPartSelectionAdd() {
        if (this.accessories.trim() === '' || Number.parseInt(this.tmpPartNumber) <= 0 || this.assSelectPart.value === undefined) {
          this.$message.error(this.$t('order.Detail.worryaboutyourIQ'));
          return;
        }
        // 追加配件
        let orderPart;
        for (orderPart of this.orderPartTableData) {
            if (this.assSelectPart.owner === orderPart.owner && this.assSelectPart.sku === orderPart.sku) {
              this.$message.error(this.$t('order.Detail.Accessoriesadded'));
              this.assSelectPart = {};
              return;
          }
        }

        this.$set(this.assSelectPart, 'tmpPartNumber', this.tmpPartNumber);
        this.tmpPartNumber = 1; // 临时配件数量清空
        // Array.prototype.push.apply(this.orderPartTableData, this.assPartsSelectArray); //刷新触发不能
        this.orderPartTableData = [...this.orderPartTableData, this.assSelectPart];

        // 配件总价计算(追加)
        let priceCountItem;
        let partPriceSumTmp = 0;
        for (priceCountItem of this.orderPartTableData) {
            partPriceSumTmp += Number.parseFloat(priceCountItem.price) * Number.parseInt(priceCountItem.tmpPartNumber);
        }
        this.checkReportForm.partsCost = partPriceSumTmp;
        this.totalCostCalc();
        this.assSelectPart = {};
    },
      totalCostCalc() {
        this.totalCost = Number.parseFloat(this.checkReportForm.partsCost) + Number.parseFloat(this.checkReportForm.collectionCost) + Number.parseFloat(this.checkReportForm.mailingCost) + Number.parseFloat(this.checkReportForm.repairCost);

        // if (this.checkReportForm.serviceType === this.$t('order.Detail.Inwarranty')) {
        //   // 保内不收任何费用
        //   console.log('-------------Inwarranty--Inwarranty-------');
        //   this.totalCost = 0;
        // }
      },
      // 删除特定配件
      partSelectDelete(item) {
        console.dir(item);
        const rtnArray = this.orderPartTableData;
        let tmpDelTotalCost = 0;
        this.orderPartTableData.forEach((element, index) => {
            if (element.owner === item.owner && element.sku === item.sku) {
                rtnArray.splice(index, 1);
                tmpDelTotalCost = Number.parseFloat(element.price) * Number.parseInt(element.tmpPartNumber);
            }
        });
        // 重新覆盖
        this.orderPartTableData = rtnArray;
        this.checkReportForm.partsCost -= tmpDelTotalCost;
        this.totalCostCalc();
        this.accessories = '';
      },
      loadAll() {
        // 获取信息
        const partOwner = this.$store.getters.owner; // 废弃不用
        const partProviderCode = this.$store.getters.providerCode;
        const orderNumber = this.$route.params.orderNumber;
        console.log('------->' + partOwner);

        getPartInfoListByPO(partProviderCode, orderNumber).then(response => {
          console.dir(response);
            if (response.data.status === '0') {
            const list = response.data.rsltData;
            list.forEach(element => {
             this.$set(element, 'value', element.sku);
            });
                this.partlist = list;
            }
        });
      },
      querySearchAsync(queryString, cb) {
        const tmpPartlist = this.partlist;
        const results = queryString ? tmpPartlist.filter(this.createStateFilter(queryString)) : tmpPartlist;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return state => {
          return state.value.indexOf(queryString.toLowerCase()) === 0;
        };
      },
      handleSelect(item) {
        console.log('---->item---->------------------->');
        console.log(item);
        this.showPartName = item.enName;
        this.assSelectPart = item;
      },
      plus() {
        this.tmpPartNumber++;
      },
      minus() {
        if (this.tmpPartNumber >= 2) {
        this.tmpPartNumber--;
        }
      },
      productTypeChange() {
        this.checkReportForm.productType = '';
      },
      imeiChange() {
        this.checkReportForm.imei = '';
      },
      commit() {
        this.totalCostCalc();
        this.checkReportForm.repairLevel = this.repairLevels;

        // 产品型号不匹配 型号必须填入
        if (!this.checkReportForm.productTypeCfm && this.checkReportForm.productType === '') {
              this.$message.error(this.$t('order.modalNotInput'));
              return;
        }

        // IMEI不匹配 IMEI必须填入
        if (!this.checkReportForm.imeiCfm && this.checkReportForm.imei === '') {
              this.$message.error(this.$t('order.imeiNoNotInput'));
              return;
        }

        // this.checkReportForm.orderPartList = this.orderPartTableData;
        // 局部属性调整
        const tmpList = this.orderPartTableData;
        tmpList.forEach(element => {
          this.$set(element, 'partCnt', element.tmpPartNumber);
          this.$set(element, 'partCode', element.sku);
          this.$set(element, 'orderNumber', this.$route.params.orderNumber)
          this.$set(element, 'providerCode', this.$store.getters.providerCode);
        });
        this.checkReportForm.orderPartList = tmpList;
        console.log('--------------report---------response------------->');
        console.dir(this.checkReportForm);
        checkReportUpdate(this.checkReportForm).then(response => {
            console.dir(response);
            if (response.data.status === '0') {
                this.$message.info(this.$t('order.Detail.Examingfinish'));
                this.$emit('listenBaseInfo');
                $('#myModal2').modal('hide');
            } else {
                this.$message.error('Error! ' + response.data.message);
            }
        });
      }
  },
  mounted() {
    this.loadAll();
  }
}
</script>



<style>
.el-upload-list--picture-card .el-upload-list__item{
  width: 54px;
  height: 54px;
}
.el-upload--picture-card{
  width: 54px;
  height: 54px;  
  line-height: 58px;
  }
.el-upload-list--picture-card .el-upload-list__item-actions{
  font-size: 15px;
}
.choice_leve .el-input__inner{
 height: 28px!important;
}
</style>
