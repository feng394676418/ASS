<template>
<div>
  <div class="modal fade" id="orderInfo">
  <div class="modal-dialog" style="min-width:758px;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h5 class="modal-title">{{$t('order.NewWorkOrder')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
            <form role="form" ref="orderForm">
               <div class="panel-body">
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.userName')}}<b>* </b></label>
	                <input class="form-control" placeholder="" id="userName" alt="verifyForm" v-verify-input:nonvoid ="{id:'userName',format:true,title:$t('order.userName')}" type="text" v-model="order.userName">
                  <div v-verify-msg:userName></div>
	              </div>
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.tel')}}<b>* </b></label>
	                <input class="form-control" placeholder="" id="phone" alt="verifyForm" v-verify-input:phone ="{id:'phone',format:15,title:$t('order.tel')}"  type="text" maxLength='20' v-model="order.phone">
                  <div v-verify-msg:phone></div>
	              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.mail')}}<b>*</b>:</label>
                <input class="form-control" id="email" alt="verifyForm" v-verify-input:reg="{id:'email',format:'Mail',title:$t('order.mail')}" placeholder="" type="text" v-model.trim="order.email">
                <div v-verify-msg:email></div>
              </div>                
	              <div class="clearfix"></div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.country')}}<b>*</b> </label>
                    <el-select v-model="order.countrytmp" filterable id="country" :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="countyChange">
                        <el-option
                        v-for="item in countryList"
                        :key="item.sortname"
                        :label="item.name"
                        :value="item">
                        </el-option>
                    </el-select>
                    <div v-verify-msg:country ref="country"></div>
                    <input v-model="order.country" hidden alt="verifyForm" v-verify-input:nonvoid ="{id:'country',format:true,title:$t('order.country')}"/>
              </div>               	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.province')}}</label>
                  <el-select v-model="order.statetmp" id="province" filterable :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="stateChange">
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
                    <el-autocomplete class="select_list form-control" v-model="order.city" id="city" :fetch-suggestions="querySearchCity" @keyup.native="cityChange"></el-autocomplete>
                    <!--<el-select v-model="order.city" id="city" :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="cityChange">
                        <el-option
                        v-for="item in cityList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                  </el-select>-->
                  <div v-verify-msg:city ref="city"></div>
                  <input v-model="order.city" hidden alt="verifyForm" v-verify-input:nonvoid ="{id:'city',format:true,title:$t('order.city')}"/>
              </div>               	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.zipcode')}}<b>*</b> </label>
 										<input class="form-control" id="postCode" alt="verifyForm" placeholder="" type="text" v-model="order.postCode" maxLength='15' v-verify-input:nonvoid ="{id:'postCode',format:true,title:$t('order.zipcode')}">
                     <div v-verify-msg:postCode></div>							
              </div> 
              <div class="form-group col-md-8">
                <label for="">{{$t('order.address')}}<b>*</b>:</label>
                <input class="form-control" id="addressDetail" alt="verifyForm" placeholder="" v-verify-input:lessthan ="{id:'addressDetail',format:3,title:$t('order.address')}" type="text" maxLength='35' v-model="order.addressDetail">
                <div v-verify-msg:addressDetail></div>
              </div>
               </div>
              <div class="clearfix"></div>
              <div class="panel-body">
                  <div class="form-group col-md-4">
                  <label for="">{{$t('order.Alternativecontact')}}</label>
                  <input class="form-control" id="emergencyName" alt="verifyForm" placeholder="" type="text" v-model="order.emergencyName">
                </div>
                <div class="form-group col-md-4">
                  <label for="">{{$t('order.Alternativecontacttel')}} </label>
                  <input class="form-control" id="emergencyPhone" alt="verifyForm" placeholder="" type="text" v-model="order.emergencyPhone">
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="panel-body">            
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.AWBNo')}}</label>
	                <input class="form-control" id="trackingNo" alt="verifyForm" placeholder="" type="text" v-model="order.trackingNo">
	              </div>              
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.Courier')}}</label>
	                <input class="form-control" id="expresscode" alt="verifyForm" placeholder="" type="text" v-model="order.expresscode">
	              </div>
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.productType')}} <b>* </b></label>
	                <input class="form-control" id="productType" alt="verifyForm" placeholder="" v-verify-input:nonvoid ="{id:'productType',format:true,title:$t('order.productType')}" type="text" v-model="order.productType">
                  <div v-verify-msg:productType></div>
                </div>
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.imei')}}<b>* </b></label>
	                <input class="form-control" id="imei" placeholder="" alt="verifyForm" v-verify-input:checkimei ="{id:'imei',format:15,title:$t('order.imei')}" type="text" v-model="order.imei">
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
                <label for="">{{$t('order.Color')}}</label>
                <input class="form-control" id="color" alt="verifyForm" placeholder="" type="text" v-model="order.color">
              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Originalorderno')}}</label>
                <input class="form-control" id="originalnumber" alt="verifyForm" placeholder="" type="text" v-model="order.originalnumber">
              </div>
              <div class="form-group col-md-8">              
                &nbsp;
              </div> 
              <div class="clearfix"></div>                           
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Accessories')}} </label>
                <p>
                	<!-- <input type="checkbox" v-model="partsStatusArr"><span>包装盒</span>
                	<input type="checkbox" v-model="partsStatusArr"><span>数据线</span>
                	<input type="checkbox" v-model="partsStatusArr"><span>适配器</span> -->
                  <el-checkbox-group v-model="order.partsStatusArr" size="small" id="partsStatusArr">
                      <el-checkbox :label="$t('order.Giftbox')" name="partsStatusArr"></el-checkbox>
                      <el-checkbox :label="$t('order.USBcable')" name="partsStatusArr"></el-checkbox>
                      <el-checkbox :label="$t('order.Poweradaptor')" name="partsStatusArr"></el-checkbox>
                  </el-checkbox-group>
                </p>
              </div>
              <div class="form-group col-md-8">
                <label for="">{{$t('order.Otheraccessories')}}</label>
                <input class="form-control" id="partsother" alt="verifyForm" placeholder="" type="text" v-model="order.partsother">
              </div> 
              <div class="clearfix"></div>	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Appearance')}} </label>
                    <el-select :placeholder="$t('order.choose')" id="appearance" filterable size="small" class="select_list form-control" v-model="order.appearance">
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
                <input class="form-control" id="appearanceinfo" alt="verifyForm" placeholder="" type="text" v-model="order.appearanceinfo">
              </div> 
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.Failuredescription')}}<b>*</b></label>
              	<input class="form-control" id="troubleInfo" alt="verifyForm" placeholder="" v-verify-input:nonvoid ="{id:'troubleInfo',format:true,title:$t('order.Failuredescription')}" type="text" v-model="order.troubleInfo">
                <div v-verify-msg:troubleInfo></div>
              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.facilitatorName')}}<b>*</b> </label>
                    <el-select v-model="order.facilitatorCode" id="facilitatorCode" filterable placeholder="" size="small"  class="select_list form-control" @change="handleChangeProvider">
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
                <input v-model="order.providerPhone" alt="verifyForm" style="border:0;" readonly v-verify-input:nonvoid ="{id:'facilitatorCode',format:true,title:$t('order.facilitatorName')}"/>
              </div> 
              </div>
          </form>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" v-verify-final-check:verifyForm type="submit">{{$t('order.Affirm')}}</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import { getProviderList } from 'api/providerMgr';
import { getChannelList } from 'api/channelMgr';
import { addOrder, getOrderByOrderNumber } from 'api/morder';
import { parseTime } from 'utils/index';
import Vue from 'vue';
import { getCountryList, getStateList, getCityList } from 'api/country_state';
import Cookies from 'js-cookie';

export default {
  name: 'orderDetailInfo',
  data() {
    return {
      order: {
          originalnumber: '', // 原始工单号 TODO
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
          partsother: '',
          troubleInfo: '',
          facilitatorCode: '',
          trackingNo: '',
          expresscode: '',
          productType: '',
          providerAddress: '',
          providerPhone: '',
          countrytmp: '',
          statetmp: '',
          language: Cookies.get("assLang")
      },
      isEdit : false,
      defaultOrder :'',
      providerOptions: [],
      orderModalTitle : this.$t('order.NewWorkOrder'),
      providerType : '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      appearanceOptions:this.$t('order.appearanceOptions'),
      channeloptions :[],
      countryList: [],
      stateList: [],
      cityList: []
      }
    },
  created() {
        const _this = this;
        _this.defaultOrder = JSON.parse(JSON.stringify(_this.$data.order));
        _this.providerType = _this.$store.getters.providerCode.substr(0, 1);
        _this.getProviderList();
        //this.getChannelList();
        _this.$on('verifyForm', function() {
          _this.handleSaveOrder();
        });
        _this.getCountryList();
  },
  methods: {
    countyChange(val){
      if(typeof(val)=='string'){
        return ;
      }
      //如果有值，则去掉国家的验证提示
      if(val != ''){
              this.$refs.country.style.display = "none";
      }
      this.order.countryCode = val.sortname;
      this.order.country = val.name;
      console.dir('%%%CountryCode='+val.sortname+'%%%CountryName='+val.name);
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
      console.dir('%%%stateCode'+val.sortname+'%%%stateName'+val.name);
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
    getProviderList() {
             getProviderList(this.$store.getters.providerCode).then(response => {
                this.providerOptions = response.data;
            })
        },
    getChannelList() {
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
        const _this = this;
        _this.order.orderTime = new Date(_this.order.orderTime).getTime();
        _this.order.partsStatus = _this.order.partsStatusArr.toString();
        if(_this.getAppLanguage()=='en' && _this.order.partsStatus != '' && _this.order.partsStatus != null){
            _this.order.partsStatus = _this.order.partsStatus.replace('Giftbox','包装盒').replace('USB cable','数据线').replace('Power adaptor','适配器');
        }
        // if(_this.getAppLanguage()=='en' && _this.order.appearance != '' && _this.order.appearance != null){
        //         _this.order.appearance = _this.order.appearance.replace('Normal','外观完好').replace('Abnormal','外观破损');
        // }
        if(_this.isEdit){
            updateOrder(_this.order).then(response => {
              if(response.data.status=='0'){
                _this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                _this.$data.order = Object.assign(this.$data.order, this.defaultOrder);
                _this.getList();
              }else{ 
                _this.$message.error(this.$t(response.data.message));
              }
          })
        } else {
          // 为了防止连续点击两次保存、生成重复数据、所以做以下处理
          $('#btnSubmit').attr('disabled', 'true');
          setTimeout(() => {
              $('#btnSubmit').removeAttr('disabled');
          }, 30000);
          addOrder(_this.order).then(response => {
              if (response.data.status === '0') {
                _this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                $('#orderInfo').modal('hide');
                 _this.$data.order = Object.assign(this.$data.order, this.defaultOrder);
                if(!_this.isEdit){
                  _this.$parent.getList();
                  _this.$parent.getOrderNumByStatus();
                  //this.$router.push({ path: '/order/index'});
                  // _this.$emit('refreshList');
                }
              }else{
                _this.$message.error(this.$t(response.data.message));
              }
          })
        }
    },
    handleEditOrderModal(orderNumber){
          this.orderModalTitle = this.$t('order.EditWorkOrder');
          this.order.orderNumber = orderNumber;
          getOrderByOrderNumber(this.order).then(response => {
                if(response.data.status=='0'){
                    this.order = response.data.order;
        
                }else{
                  this.$message.error(response.data.message);
                }
            })
          $('#orderInfo').modal();
    },
    getCountryList() {
      console.log('国家信息查询开始!');
      getCountryList().then(response => {
          console.log('国家信息查询结果!');
          console.dir(response);
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
    getCityList(stateId) {
      getCityList(stateId).then(response => {
          if (response.data.status === '0') {
              this.order.city = '';
              this.cityList = response.data.rsltData;
              this.cityList.forEach(item => {
                  this.$set(item, 'value', item.name);
              });
          } else {
              this.$message.error(response.data.message);
          }
      })
    },
    querySearchCity(queryString, cb) {
      console.dir(this.cityList);
      const restaurants = this.cityList;
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant =>
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    checkIMEI() {
      console.log('aaaaaaaaaaaa' + Cookies.get('assLang'))
      this.order.imei = this.order.imei.replace(/\D/g, '');
    }
  }
}
</script>

