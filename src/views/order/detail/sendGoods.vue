<!--发货 组件-->

<template>
<div>
    <dl class="line">
<dt>&nbsp;</dt>
	</dl>
	  	
<dl><dt class="active"><a href="#myModal4" data-toggle="modal">{{$t('order.Detail.Shipping')}}</a></dt>
	   <!-- 发货 Modal -->
<div class="modal fade" id="myModal4" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.ShipmentInfo')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
              <div class="col-md-6">
	              <div class="form-group">
	                <label for="">{{$t('order.Detail.Sendername')}}<b>* </b></label>
	                <p>{{baseInfo.providerName}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.tel')}}<b>* </b></label>
	                <p>{{baseInfo.providerPhone}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.mail')}}<b>* </b> </label>
	                <p>{{baseInfo.providerEmail}}</p>
	              </div>
              </div>
              <div class="form-group col-md-2">
                <label for="">{{$t('order.address')}}<b>*</b>:</label>
                <p>{{baseInfo.providerAddress}}</p>
              </div>
          </form></div>
          <div class="panel-body">
              <div class="col-md-6">
	              <div class="form-group">
	                <label for="">{{$t('order.userName')}}<b>* </b></label>
	                <p>{{baseInfo.userName}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.tel')}}<b>* </b></label>
	                <p>{{baseInfo.userPhone}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.mail')}}<b>* </b> </label>
	                <p>{{baseInfo.userEmail}}</p>
	              </div>
              </div>
              <div class="form-group col-md-6">
                
              </div>
          </div>

          <div class="panel-body"> 
              <div class="form-group col-md-6">
                <label for="">{{$t('order.country')}} </label>
                  <el-select class="select_list default form-control" clearable v-model="orderAddrForm.country" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in countryOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

								<div class="clearfix"></div>		
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.province')}}</label>
                  <el-select class="select_list default form-control" clearable v-model="orderAddrForm.province" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in provinceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
								<div class="clearfix"></div>		
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.city')}}</label>
                  <el-select class="select_list default form-control" clearable v-model="orderAddrForm.city" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in cityOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
								<div class="clearfix"></div>		
              </div>
              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.zipcode')}}</label>
                <input class="form-control" v-model="orderAddrForm.postcode" :placeholder="baseInfo.userPostcode" id="" type="text" />
              </div>	
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.address')}}</label>
                <input class="form-control" id="" v-model="orderAddrForm.addressDetail" :placeholder="baseInfo.userAddress" type="text" />
              </div>
          </div>
					<div class="panel-body">
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.Courier')}}</label>
                  <el-select class="select_list default form-control" v-model="orderAddrForm.sendExpresscode" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in sendExpresscodeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
								<div class="clearfix"></div>		
              </div>              

					</div>
        
        
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button class="btn btn-primary" type="button" @click="confirm()">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>	            				
	</div></dl>

</div>
</template>


<script>

import { getChannelCodeList } from 'api/channelMgr';
import { sendOrder } from 'api/baseInfo';

export default {
  name: 'sendGoods',
  props: {
    baseInfo: {}
  },
  created() {
    this.getExpressCodeList(this.orderAddrForm.orderNumber, this.providerCode);
  },
  data() {
    return {
      providerCode: this.$store.getters.providerCode,
      orderAddrForm: {
          uid: this.$store.getters.uid,
          orderNumber: this.$route.params.orderNumber,
          country: '',
          province: '',
          city: '',
          postcode: '',
          addressDetail: '',
          sendExpresscode: ''
      },
      countryOptions: [{
          value: this.$t('order.Detail.China'),
          label: this.$t('order.Detail.China')
        }],
       provinceOptions: [{
          value: this.$t('order.Detail.Guangdong'),
          label: this.$t('order.Detail.Guangdong')
        }],
      cityOptions: [{
          value: this.$t('order.Detail.Shenzhen'),
          label: this.$t('order.Detail.Shenzhen')
        }],
      sendExpresscodeOptions: [],
      sendGood: {
        visibility: '' // hidden
      }
    }
  },
  methods: {
    confirm() {
      if (this.orderAddrForm.sendExpresscode === '') {
          this.$message.error(this.$t('order.Detail.ShippingExpressCode'));
          return;
      }

      // 确认
      sendOrder(this.orderAddrForm).then(response => {
            if (response.data.status === '0') {
                this.$message.info(this.$t('order.Detail.Deliveryfinished'));
                this.$emit('listenBaseInfo');
                $('#myModal4').modal('hide');
            } else {
                this.$message.error(this.$t('order.Detail.Exceptional') + response.data.message);
            }
      });
    },
    getExpressCodeList(orderNumber, providerCode) {
      //
      getChannelCodeList(orderNumber, providerCode).then(response => {
          if (response.data.status === '0') {
              const codeList = response.data.rsltData;
              codeList.forEach(element => {
                  this.$set(element, 'value', element.expresscode)
                  this.$set(element, 'label', element.expresscode);
              });
              this.sendExpresscodeOptions = codeList;
          } else {
              this.$message.error(this.$t('order.Detail.Getexception') + response.data.message);
          }
      });
    }
  }
}
</script>
