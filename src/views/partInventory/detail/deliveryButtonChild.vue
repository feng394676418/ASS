<!--厂商发货-->
<template>
<div>
<dl class="line">
<dt>&nbsp;</dt>
	</dl>
<dl>
	 <dt class="active"><a href="#myModal7" data-toggle="modal">{{$t('order.Detail.Shipping')}}</a></dt>
</dl>

<div class="modal fade" id="myModal7" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Shipping')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
              <div class="col-md-12">
	              <div class="form-group">
	                <p>{{$t('part.Confirmdelivery')}}</p>
	              </div>
              </div>
          </form></div>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button class="btn btn-primary" type="button" @click="confirm()">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { deliveryOrder } from 'api/applyStockIn';

export default {
  name: 'deliveryButtonChild',
  props: { baseInfo: {} },
  data() {
    return {
      inStockOrderForm: {
        stockOrderNumber: this.$route.params.stockOrderNumber,
        uid: this.$store.getters.uid
      }
    }
  },
  methods: {
    confirm() {
      deliveryOrder(this.inStockOrderForm).then(response => {
        if (response.data.status === '0') {
          this.$message.info('发货处理完了!');
          $('#myModal7').modal('hide');
          this.$emit('listenBaseInfo');
        } else {
          this.$message.error(response.data.message);
        }
      });
    }
  }
}
</script>

<style>
</style>