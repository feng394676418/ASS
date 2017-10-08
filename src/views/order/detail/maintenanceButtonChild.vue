<template>
  <dl>
	            				<dt class="active"><a href="#myModal7" data-toggle="modal">{{$t('order.Detail.Repair')}}</a></dt>
	            				  <!-- 受理 Modal -->
<div class="modal fade" id="myModal7" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Repair')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
              <div class="col-md-12">
	              <div class="form-group">	                
	                <p>{{$t('order.Detail.Confirmtherepair')}}</p>
	              </div>
              </div>
          </form></div>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button class="btn btn-primary" :data-dismiss="dialog_dismiss" type="button" @click="confirm()">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>
	            			</div></dl>
</template>


<script>

import { maintain } from 'api/report';

export default {
  name: 'maintenanceButtonChild',
  props: '',
  data() {
    return {
      dialog_dismiss: 'modal',
      uid: this.$store.getters.uid,
      orderNumber: this.$route.params.orderNumber
    }
  },
  methods: {
      confirm() {
      maintain(this.orderNumber, this.uid).then(response => {
            if (response.data.status === '0') {
                this.$message.info(this.$t('order.Detail.updatesuccess'));
                this.$emit('listenBaseInfo');
            } else {
                this.$message.info(this.$t('order.Detail.updatefailed'));
                this.dialog_dismiss = '';
            }
      });
    }
  }
}
</script>
