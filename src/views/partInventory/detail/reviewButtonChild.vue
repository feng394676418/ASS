<!--审核按钮-->

<template>
<div>
<dl>
<dt class="active"><a href="#myModal2" data-toggle="modal">{{$t('part.Review')}}</a></dt>
</dl>

<div class="modal fade" id="myModal2" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('part.Reviewapplication')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
        	<form role="form">
          <div class="panel-body">
					<div class="form-group col-md-3">
                  <el-select class="select_list default form-control" v-model="verifyForm.reviewValue" :placeholder="$t('part.Auditresults')" @change="reviewChange" size="small">
                    <el-option
                      v-for="item in reviewArray"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
								<div class="clearfix"></div>		
              </div>
					<div class="form-group col-md-8">
            <template v-if="verifyForm.reviewValue">
                  <el-select class="select_list default form-control" v-model="verifyForm.warehouseCode" :placeholder="$t('part.Deliverywarehouse')" @change="warehouseCodeChange" size="small">
                    <el-option
                      v-for="item in warehouseCodeArray"
                      :key="item"
                      :label="item"
                      :value="item"
                      >
                    </el-option>
                  </el-select>
            </template>
            <template v-else>
                  <input class="form-control" id="color" :placeholder="$t('part.Notthroughreason')" type="text" v-model="verifyForm.rejectInfo">
            </template>
								<div class="clearfix"></div>		
              </div>        
	                  
          </div>
          <div class="panel-body inv_table">
 						<div class="table-scrollable modal_find">
                    <table class="table">
                 <thead>
                  <tr class="">
                    <th class="" width="15%">{{$t('stockOrder.detail.serialNo')}}</th>
                    <th class="" width="25%" style="text-align: center;">{{$t('order.Detail.SKU')}}</th>
                    <th class="" width="25%" style="text-align: center;">{{$t('order.Detail.Sparepartsname')}}</th>
                    <th class="" width="15%" style="text-align: center;">{{$t('order.Detail.Quantity')}}</th>
                    <th class="" width="15%" style="text-align: center;">{{$t('part.Serviceproexistinginventory')}}</th>
                  </tr>
                </thead>
                      <tbody>
                        <tr class="gray-bg" v-for="(item, index) in baseInfo.detailList" :key="item.sku">
                          <td class="">
                            {{index + 1}}
                          </td>
                          <td class="" style="text-align: center;">
                              {{item.sku}}
                          </td>
                          <td class="" style="text-align: center;">
                             {{item.cnName}}
                          </td>
                          <td class="" style="text-align: center;">
                             {{item.qty}}
                          </td>
                          <td class="" style="text-align: center;">
                            {{item.remnant}}
                          </td>
                        </tr>
                        <tr class="" style="height: 1px;">
                          <td class="" colspan="5" style="padding: 0!important;">
                          </td>
                        </tr>
                     </tbody>
                    </table>
                  </div>
          </div>

        
        </form></div>
        
      </div>
        <div class="modal-footer">
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" type="button" @click="confirm()">{{$t('order.Affirm')}}</button>
        </div>
    </div>
  </div> 
	</div>
</div>
</template>

<script>
import { getWarehouseCodeList } from 'api/warehouseManage';
import { verifyOrder } from 'api/applyStockIn';

export default {
  name: 'reviewButtonChild',
  props: { baseInfo: {} },
  data() {
    return {
      verifyForm: {
        uid: this.$store.getters.uid,
        stockOrderNumber: this.$route.params.stockOrderNumber,
        rejectInfo: '',
        warehouseCode: '',
        reviewValue: true
      },
      warehouseCodeArray: [],
      reviewArray: [{ label: this.$t('part.examinationpassed'), value: true }, { label: this.$t('part.Auditnotpassed'), value: false }]
    }
  },
  created() {
    this.warehouseCodeArrayInit();
  },
  methods: {
    confirm() {
      if (this.verifyForm.reviewValue && this.verifyForm.warehouseCode.trim().length === 0) {
        this.$message.error(this.$t('order.Detail.deliverywarehouse'));
        return;
      }

      if (!this.verifyForm.reviewValue && this.verifyForm.rejectInfo.trim().length === 0) {
        this.$message.error(this.$t('part.whyauditnotpass'));
        return;
      }

      //防止连续点击两次
      $('#btnSubmit').attr('disabled', 'true');
      setTimeout(() => {
          $('#btnSubmit').removeAttr('disabled');
      }, 3000);
      verifyOrder(this.verifyForm).then(response => {
        if (response.data.status === '0') {
          this.$message.info(this.$t('part.Successfulprocessing'));
          $('#myModal2').modal('hide');
          this.$emit('listenBaseInfo');
        } else {
          this.$message.error(response.date.message);
        }
      });
    },
    reviewChange(val) {
      console.dir(val);
    },
    warehouseCodeChange(val) {
      console.dir(val);
    },
    warehouseCodeArrayInit() {
      getWarehouseCodeList().then(response => {
        this.warehouseCodeArray = response.data;
      });
    }
  }
}

</script>


<style>

</style>