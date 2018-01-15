<!--确认报价组件-->

<template>
  <div>
<dl class="line">
<dt>&nbsp;</dt>
	</dl>
<dl>
	 <dt class="active"><a href="#myModal6" data-toggle="modal">{{$t('order.Detail.Confirmtheoffer')}}</a></dt>
	            				
<div class="modal fade" id="myModal6">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Confirmtheoffer')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input Repair_description">      
            <form role="form">              
	              <div class="form-group grey_border Agree_repair_active" :class="{Agree_repair: AgreeActive}" @click="Agree_repair">
                  <el-radio v-model="Quote" label="1">
                    <!--同意报价-->
                    <p>{{$t('order.Detail.Agreetorepair')}} :{{$t('order.Detail.totalcost')}} <strong class="text_yellow">€ {{baseInfo.collectionCost + baseInfo.mailingCost + baseInfo.repairCost + baseInfo.partsCost | money}}</strong></p>
                    <p><span  class="text_blue">{{$t('order.Detail.agreeingquotedes')}} </span></p>
                  </el-radio>               
	                <!-- <p>{{$t('order.Detail.Quotationdescription')}}</p> -->
	              </div>
	              <div class="form-group grey_border Refuse_repair_active" :class="{Refuse_repair: RefuseActive}" @click="Refuse_repair">                  
                  <el-radio v-model="Quote" label="0">
                    <!--拒绝报价-->
                    <p>{{$t('order.Detail.Disagreequotation')}} :{{$t('order.Detail.totalcost')}}  <strong class="text_yellow">€ {{baseInfo.collectionCost + baseInfo.mailingCost + baseInfo.partsCost | money}}</strong></p>
                    <p><span  class="text_blue">{{$t('order.Detail.quotationrefuseddes')}} </span></p>
                  </el-radio> 
	              </div>                
          </form>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" type="button" @click="confirm()" disabled="true" >{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>
</div></dl>

  </div>
</template>


<script>

import { confirmQuotesUpdate } from 'api/report';

// 确认报价组件
export default {
  name: 'confirmingButtonChild',
  props: {
    baseInfo: {}
  },
  data() {
    return {
      AgreeActive: true,
      RefuseActive: true,
      Quote: '',
      orderNumber: this.$route.params.orderNumber,
      uid: this.$store.getters.uid
    }
  },
  filters: {
        money(val) {
        val = val === undefined ? '' : val.toString().replace(/\$|,/g, '');
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
    // 同意维修
    Agree_repair() {
        this.AgreeActive = false;
        this.RefuseActive = true;
        this.Quote = '1';
        $('#btnSubmit').removeAttr('disabled');
    },
    // 拒绝报价
    Refuse_repair() {
        this.RefuseActive = false;
        this.AgreeActive = true;
        this.Quote = '0';
        $('#btnSubmit').removeAttr('disabled');
    },
    confirm() {
      // 防止连续点击
      $('#btnSubmit').attr('disabled', 'true');
      setTimeout(() => {
          $('#btnSubmit').removeAttr('disabled');
      }, 3000);
      confirmQuotesUpdate(this.orderNumber, this.uid).then(response => {
          if (response.data.status === '0') {
              this.$message.info(this.$t('order.Detail.Quoteconfirmedfinished'));
              this.$emit('listenBaseInfo');
              $('#myModal6').modal('hide');
          } else {
              this.$message.info(this.$t('order.Detail.Quoteconfirmationfailed'));
          }
      });
    }
  }
}
</script>
