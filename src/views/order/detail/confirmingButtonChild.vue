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
                    <p>{{$t('order.Detail.Agreetorepair')}} :{{$t('order.Detail.totalcost')}} <strong class="text_yellow">€70.00</strong></p>
                    <p><span  class="text_blue">{{$t('order.Detail.agreeingquotedes')}} </span></p>
                  </el-radio>               
	                <!-- <p>{{$t('order.Detail.Quotationdescription')}}</p> -->
	              </div>
	              <div class="form-group grey_border Refuse_repair_active" :class="{Refuse_repair: RefuseActive}" @click="Refuse_repair">                  
                  <el-radio v-model="Quote" label="0">
                    <p>{{$t('order.Detail.Disagreequotation')}} :{{$t('order.Detail.totalcost')}}  <strong class="text_yellow">€7.00</strong></p>
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

export default {  
  name: 'confirmingButtonChild',
  props: '',
  data() {
    return {
      AgreeActive:true,
      RefuseActive:true,
      Quote: '',
      orderNumber: this.$route.params.orderNumber,
      uid: this.$store.getters.uid
    }
  },
  methods: {
    //同意维修
    Agree_repair:function(){
        this.AgreeActive = false;
        this.RefuseActive = true;
        this.Quote='1';
        $('#btnSubmit').removeAttr('disabled');
    },
    //拒绝报价
    Refuse_repair:function(){      
        this.RefuseActive = false;        
        this.AgreeActive = true;
        this.Quote='0';
        $('#btnSubmit').removeAttr('disabled');
    },   
    confirm() {
      //防止连续点击
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
