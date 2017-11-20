<!--编辑工单机能 一加-->

<template>
  <div>
<dl class="line">
<dt>&nbsp;</dt>
	</dl>
<dl>
	 <dt class="active"><a href="#myModal99" data-toggle="modal">{{$t('order.EditWorkOrder')}}</a></dt>

    <!--编辑工单-->
		 <!-- <orderDetailInfo></orderDetailInfo>   -->
 <div class="modal fade" id="myModal99">
  <div class="modal-dialog" style="min-width:758px;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h5 class="modal-title">{{$t('order.EditWorkOrder')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
            <form role="form" ref="orderForm">
               <div class="panel-body">
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.userName')}}<b>* </b></label>
	                <input class="form-control" placeholder="" id="userName" alt="verifyEditOrderForm" v-verify-input:nonvoid ="{id:'userName',format:true,title:$t('order.userName')}" type="text" v-model="order.userName">
                  <div v-verify-msg:userName></div>
	              </div>
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.tel')}}<b>* </b></label>
	                <input class="form-control" placeholder="" id="phone" alt="verifyEditOrderForm" v-verify-input:reg ="{id:'phone',format:'Phone',title:$t('order.tel')}"  type="text" maxLength='20' v-model="order.phone">
                  <div v-verify-msg:phone></div>
	              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.mail')}}<b>*</b>:</label>
                <input class="form-control" id="email" alt="verifyEditOrderForm" v-verify-input:reg="{id:'email',format:'Mail',title:$t('order.mail')}" placeholder="" type="text" v-model.trim="order.email">
                <div v-verify-msg:email></div>
              </div>                
	              <div class="clearfix"></div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.country')}}<b>*</b> </label>
                    <el-select v-model="order.country" filterable id="country" :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="countyChange">
                        <el-option
                        v-for="item in countryList"
                        :key="item.sortname"
                        :label="item.name"
                        :value="item">
                        </el-option>
                    </el-select>
                    <div v-verify-msg:country ref="country"></div>
                    <input v-model="order.country" hidden alt="verifyEditOrderForm" v-verify-input:nonvoid ="{id:'country',format:true,title:$t('order.country')}"/>
              </div>               	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.province')}}</label>
                  <el-select v-model="order.province" id="province" :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="stateChange">
                        <el-option
                        v-for="item in stateList"
                        :key="item.sortname"
                        :label="item.name"
                        :value="item">
                        </el-option>
                  </el-select>
                  <input v-model="order.province" hidden />
              </div> 
              <div class="form-group col-md-4">
                <label for="">{{$t('order.city')}}<b>*</b> </label>
                    <el-autocomplete class="select_list form-control" v-model="order.city" id="city" :fetch-suggestions="querySearchCity" @keyup.native="cityChange" @select="cityChange"></el-autocomplete>
                    <!--<el-select v-model="order.city" id="city" :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="cityChange">
                        <el-option
                        v-for="item in cityList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                  </el-select>-->
                  <div v-verify-msg:city ref="city"></div>
                  <input v-model="order.city" hidden alt="verifyEditOrderForm" v-verify-input:nonvoid ="{id:'city',format:true,title:$t('order.city')}"/>
              </div>               	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.zipcode')}}<b>*</b> </label>
 										<input class="form-control" id="postCode" placeholder="" type="text" v-model="order.postCode" maxLength='15' alt="verifyEditOrderForm" v-verify-input:nonvoid ="{id:'postCode',format:true,title:$t('order.zipcode')}">
                     <div v-verify-msg:postCode></div>							
              </div> 
              <div class="form-group col-md-8">
                <label for="">{{$t('order.address')}}<b>*</b>:</label>
                <input class="form-control" id="addressDetail" placeholder="" alt="verifyEditOrderForm" v-verify-input:lessthan ="{id:'addressDetail',format:3,title:$t('order.address')}" type="text" maxLength='35' v-model="order.addressDetail">
                <div v-verify-msg:addressDetail></div>
              </div>
               </div>
              <div class="clearfix"></div>
              <div class="panel-body">
                  <div class="form-group col-md-4">
                  <label for="">{{$t('order.Alternativecontact')}}</label>
                  <input class="form-control" id="emergencyName" placeholder="" type="text" v-model="order.emergencyName">
                </div>
                <div class="form-group col-md-4">
                  <label for="">{{$t('order.Alternativecontacttel')}} </label>
                  <input class="form-control" id="emergencyPhone" placeholder="" type="text" v-model="order.emergencyPhone">
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="panel-body">            
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.AWBNo')}}</label>
	                <input class="form-control" id="trackingNo" placeholder="" type="text" v-model="order.trackingNo">
	              </div>              
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.Courier')}}</label>
	                <input class="form-control" id="expresscode" placeholder="" type="text" v-model="order.expresscode">
	              </div>
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.productType')}} <b>* </b></label>
	                <input class="form-control" id="productType" placeholder="" alt="verifyEditOrderForm" v-verify-input:nonvoid ="{id:'productType',format:true,title:$t('order.productType')}" type="text" v-model="order.productType">
                  <div v-verify-msg:productType></div>
                </div>              
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.imei')}}<b>* </b></label>
	                <input class="form-control" id="imei" placeholder="" alt="verifyEditOrderForm" v-verify-input:checkimei ="{id:'imei',format:15,title:$t('order.imei')}" type="text" v-model="order.imei">
                  <div v-verify-msg:imei></div>
	              </div>              
              <div class="form-group col-md-4 buy_data">
                <label for="">{{$t('order.Purchasedate')}} </label>
                 <el-date-picker
                  v-model="order.orderTime"
                  type="date"
                  id = "orderTime"
                  ref = "orderTime"
                  format = "yyyy-MM-dd"
                  :editable="false"
                  :placeholder="$t('order.choose')"
                  :picker-options="pickerOptions"
                  class="select_list form-control">
          </el-date-picker>               	
              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Color')}} </label>
                <input class="form-control" id="color" placeholder="" type="text" v-model="order.color">
              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Accessories')}} </label>
                <p>
                	<el-checkbox-group v-model="baseInfo.partsStatusArray" id="partsStatusArray">
                    <el-checkbox v-for="tmp in partOptions" :label="tmp" :key="tmp" ></el-checkbox>
                  </el-checkbox-group>
                </p>
              </div>
              <div class="form-group col-md-8">
                <label for="">{{$t('order.Otheraccessories')}}</label>
                <input class="form-control" id="partsother" placeholder="" type="text" v-model="order.partsother">
              </div> 
              <div class="clearfix"></div>	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Appearance')}} </label>
                    <el-select :placeholder="$t('order.choose')" id="appearance" size="small" class="select_list form-control" v-model="order.appearance">
                        <el-option
                        v-for="item in appearanceOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                        </el-option>
                  </el-select>									
              </div>              
              <div class="form-group col-md-8">
                <label for="">{{$t('order.Appearancedescription')}} </label>
                <input class="form-control" id="appearanceinfo" placeholder="" type="text" v-model="order.appearanceinfo">
              </div> 
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.Failuredescription')}}<b>*</b></label>
              	<input class="form-control" id="troubleInfo" placeholder="" alt="verifyEditOrderForm" v-verify-input:nonvoid ="{id:'troubleInfo',format:true,title:$t('order.Failuredescription')}" type="text" v-model="order.troubleInfo">
                <div v-verify-msg:troubleInfo></div>
              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.facilitatorName')}}<b>*</b> </label>
                    <el-select v-model="order.facilitatorCode" id="facilitatorCode" placeholder="" size="small"  class="select_list form-control" @change="handleChangeProvider">
                        <el-option
                          v-for="item in providerOptions"
                          :key="item.providerCode"
                          :label="item.providerName"
                          :value="item.providerCode">
                        </el-option>
                  </el-select>
                  <div v-verify-msg:facilitatorCode ref="facilitatorCode"></div>
              </div>
              <div class="form-group col-md-8">
                <label for="">{{$t('order.Serviceprovideraddress')}}:</label>
 								<p>{{order.providerAddress}}</p>
	              <label for="">{{$t('order.Serviceprovidertel')}}:</label>
	              <!-- <p>{{providerPhone}}</p> -->
                <input v-model="order.providerPhone" style="border:0;" readonly alt="verifyEditOrderForm" v-verify-input:nonvoid ="{id:'facilitatorCode',format:true,title:$t('order.facilitatorName')}"/>
              </div> 
              </div>
          </form>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" v-verify-final-check:verifyEditOrderForm type="submit">{{$t('order.Affirm')}}</button>
        </div>
      </div>
    </div>
  </div>
  </div>

    </dl>
  </div>
</template>

<script>

import { updateOrder, getOrderByOrderNumber } from 'api/morder';
import { getProviderList } from 'api/providerMgr';
import { getChannelList } from 'api/channelMgr';
import moment from 'moment';
import { getCountryList, getStateList, getCityList} from 'api/country_state';

// const partOptions123 = ['彩盒', '数据线', '适配器'];
export default {
  name: 'editOrderButtonChild',
  props: {
    baseInfo: {}
  },
  data() {
    return {
      countrytmp: '',
      statetmp:'',
      orderNumber: this.$route.params.orderNumber,
      trackingNoTemp: '',
      expresscodeTemp: '',
      order: {
          orderNumber: '',
          refNumber: '',
          userName: '',
          mobile: '',
          phone: '',
          email: '',
          postCode: '',
          country: '',
          countryCode:'',
          province: '',
          provinceCode:'',
          city: '',
          street: '',
          addressDetail: '',
          addressDetail1: '',
          emergencyName: '',
          emergencyPhone: '',
          imei: '',
          orderTime: '',
          color: '',
          appearance: '',
          appearanceinfo: '',
          partsStatus: '',
          partsStatusArr: [],
          partsother : '',
          troubleInfo: '',
          facilitatorCode: '',
          trackingNo: '',
          expresscode : '',
          productType : '',
          providerAddress : '',
          providerPhone : '',
          countrytmp: '',
          statetmp:''
      },
      tempOrder: '',
      providerOptions: [],
      orderModalTitle: this.$t('order.EditWorkOrder'),
      providerType: '',
      partOptions: [this.$t('order.Giftbox'), this.$t('order.USBcable'),this.$t('order.Poweradaptor')],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      appearanceOptions:this.$t('order.appearanceOptions'),
      channeloptions: [],
      countryList: [],
      stateList: [],
      cityList: []
    }
  },
  created() {
        const _this = this;
        _this.providerType = _this.$store.getters.providerCode.substr(0, 1);
        _this.getProviderList();
        // this.getChannelList();
        _this.$on('verifyEditOrderForm', function() {
          _this.handleSaveOrder();
        });
         _this.getCountryList();
        this.getOrderByOrderNumber();
  },
  // computed: {
  //   partsStatusArrayTmp: partsStatusArray
  // },
  methods: {
    getOrderByOrderNumber(){
          this.order.orderNumber = this.orderNumber;
          getOrderByOrderNumber(this.order).then(response => {
                if(response.data.status=='0'){
                    this.order = response.data.order;
                    this.order.userId = this.$store.getters.uid;
                    this.trackingNoTemp = this.order.trackingNo;
                    this.expresscodeTemp = this.order.expresscode;
                    if(this.getAppLanguage()=='en' && this.order.appearance != '' && this.order.appearance != null){
                          this.order.appearance = this.order.appearance.replace('外观完好','Normal').replace('外观破损','Abnormal');
                    }
                    if(this.getAppLanguage()=='zh' && this.order.appearance != '' && this.order.appearance != null){
                        this.order.appearance = this.order.appearance.replace('Normal','外观完好').replace('Abnormal','外观破损');
                    }
                }else{
                  this.$message.error(response.data.message);
                }
            })
    },
     getProviderList() {
             getProviderList(this.$store.getters.providerCode).then(response => {
                this.providerOptions = response.data;
            })
        },
    getChannelList(){
            getChannelList().then(response => {
                this.channeloptions = response.data;
            })
    },
    handleChangeProvider(val){
            if(val != ''){
                this.$refs.facilitatorCode.style.display = "none";
            }
            this.providerOptions.forEach(function(obj) {
                if(obj.providerCode == val){
                    this.order.providerAddress = obj.address;
                    this.order.providerPhone = obj.phone;
                }
            }, this);
    },
    handleSaveOrder() {
            // console.log('handle------------save----------------order------------');
            // // this.orderTmp.orderTime = new Date(this.orderTmp.orderTime).getTime();
            // this.orderTmp.partsStatus = this.baseInfo.partsStatusArray.toString();
            // this.orderTmp.refNumber = this.baseInfo.refNumber;
            // this.orderTmp.userName = this.baseInfo.userName;
            // this.orderTmp.phone = this.baseInfo.userPhone;
            // this.orderTmp.mobile = '';
            // this.orderTmp.email = this.baseInfo.userEmail;
            // this.orderTmp.postCode = this.baseInfo.userPostcode;
            // //this.orderTmp.country = this.baseInfo.userCountry;
            // //this.orderTmp.province = this.baseInfo.userProvince;
            // this.orderTmp.city = this.baseInfo.userCity;
            // this.orderTmp.street = this.baseInfo.userStreet;
            // this.orderTmp.addressDetail = this.baseInfo.userAddress;
            // this.orderTmp.addressDetail1 = '';
            // this.orderTmp.emergencyName = this.baseInfo.emergencyName;
            // this.orderTmp.emergencyPhone = this.baseInfo.emergencyPhone;
            // this.orderTmp.imei = this.baseInfo.imei;
            // this.orderTmp.orderTime = this.baseInfo.orderTime === '' ? '' : moment(this.baseInfo.orderTime).format('YYYY-MM-DD HH:mm:ss')
            // this.orderTmp.color = this.baseInfo.color;
            // this.orderTmp.appearance = this.baseInfo.appearance;
            // this.orderTmp.appearanceinfo = this.baseInfo.appearanceInfo;
            // this.orderTmp.partsother = this.baseInfo.partsOther;
            // this.orderTmp.troubleInfo = this.baseInfo.troubleInfo;
            // this.orderTmp.facilitatorCode = this.baseInfo.providerCode;
            // this.orderTmp.trackingNo = this.baseInfo.trackingNo;
            // this.orderTmp.expresscode = this.baseInfo.expressCode;
            // this.orderTmp.productType = this.baseInfo.productType;
            // this.orderTmp.repairId = this.baseInfo.repairId;
            // console.dir(this.orderTmp);
            if(this.trackingNoTemp != '' || this.trackingNoTemp != null){
                if(this.order.trackingNo == ''){
                  this.$message.error(this.$t('order.AWBNoisNull'));
                  return;
                }
            }
            if(this.expresscodeTemp != '' || this.expresscodeTemp != null){
              if(this.order.expresscode == ''){
                this.$message.error(this.$t('order.CourierIsNull'));
                return;
              }
            }
            this.order.partsStatus = this.baseInfo.partsStatusArray.toString();
            if(this.getAppLanguage()=='en' && this.order.partsStatus != '' && this.order.partsStatus != null){
                this.order.partsStatus = this.order.partsStatus.replace('Giftbox','包装盒').replace('USB cable','数据线').replace('Power adaptor','适配器');
            }
            //防止连续点击
            $('#btnSubmit').attr('disabled', 'true');
            setTimeout(() => {
                $('#btnSubmit').removeAttr('disabled');
            }, 3000);
            updateOrder(this.order).then(response => {
              if (response.data.status === '0') {
                  this.$message.info(this.$t(response.data.message));
                  this.$emit('listenBaseInfo');
                    $('#myModal99').modal('hide');
              } else {
                this.$message.error(response.data.message);
              }
            })
        },
        getCountryList() {
          getCountryList().then(response => {
              if (response.data.status === '0') {
                  this.countryList = response.data.rsltData;
              } else {
                  this.$message.error(response.data.message);
              }
          })
        },
        getStateList(countryId) {
          getStateList(countryId).then(response => {
              if (response.data.status === '0') {
                  this.stateList = response.data.rsltData;
              } else {
                  this.$message.error(response.data.message);
              }
          })
        },
        getCityList(stateId){
          getCityList(stateId).then(response => {
              if (response.data.status === '0') {
                  this.baseInfo.userCity = '';
                  this.cityList = response.data.rsltData;
                  this.cityList.forEach(item => {
                    this.$set(item,'value',item.name);
                  });
              } else {
                  this.$message.error(response.data.message);
              }
          })
        },
        countyChange(val){
          console.dir(val);
          if(typeof(val)=='string'){
            return ;
          }
          //如果有值，则去掉国家的验证提示
          if(val != ''){
                  this.$refs.country.style.display = "none";
          }
          this.order.countryCode = val.sortname;
          this.order.country = val.name;
          this.order.province = '';
          this.order.provinceCode = '';
          this.getStateList(val.id);
        },
        stateChange(val){
          if(typeof(val)=='string'){
            return ;
          }
          //如果有值，则去掉省/州的验证提示
          // if(val != ''){
          //     this.$refs.province.style.display = "none";
          // }
          this.order.province = val.name;
          this.order.provinceCode = val.sortname;
          this.order.city = '';
          this.getCityList(val.id);
        },
        cityChange(val){
          //如果有值，则去掉城市的验证提示
          if(this.order.city != ''){
              this.$refs.city.style.display = "none";
          }
          if(this.order.city == ''){
              this.$refs.city.style.display = "";
          }
        },
        querySearchCity(queryString, cb) {
          console.dir(this.cityList);
          var restaurants = this.cityList;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
          };
        },
        checkIMEI() {
          this.order.imei=this.order.imei.replace(/\D/g,'','');
        }
    //     handleEditOrderModal(orderNumber) {
    //       this.orderModalTitle = '编辑工单';
    //       this.orderTmp.orderNumber = orderNumber;
    //       console.log('----@@@@@@@@@@@@@------------@@@@@@@@@@@');
    //       console.dir(this.orderTmp);
    //       getOrderByOrderNumber(this.orderTmp).then(response => {
    //             if (response.data.status === '0') {
    //                 this.orderTmp = response.data.order;

    //                 console.log('---------!!!!!!!!!!!!!!______---');
    //                 console.dir(this.orderTmp);
    //                 console.log(this.orderTmp.partsStatus);
    //                 if (this.orderTmp.partsStatus !== null && this.orderTmp.partsStatus.trim().length > 0) {
    //                     this.orderTmp.partsStatusArr = this.orderTmp.partsStatus.split(',');
    //                     console.dir(this.orderTmp.partsStatusArr);
    //                 }
    //                 this.isEdit = response.data.isEdit;
    //             } else {
    //               this.$message.error(response.data.message);
    //             }
    //         })
    //       $('#orderInfoEdit').modal();
    // }
  }
}
</script>
<style>
.el-checkbox, .el-checkbox__input{
    margin-right: 0px;
}
.el-checkbox__label{
  padding-right: 5px;
}
</style>
