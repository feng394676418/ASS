<template>
  <div class="app-container calendar-list-container page-content">
    <div class="Sharing_head">
      <div class="page-header navbar">
        <div class="page-header-inner">
          <div class="pull-right">
            <div class="top-menu">
              <ul>
                <li>
                  <rightButtonChild></rightButtonChild>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="top_menu">
      <h2 class="title_shadow"> {{$t('Changepassword')}}</h2>
    </div>
    <div class="clearfix"></div>
    <div class="user_content main_form_input">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
        <el-form-item :label="$t('oldpassword')" prop="pass">
          <el-input id="oldpassword" :type="pwdType" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          <div id="oldpaderror" class="el-form-item__error" style="display: none;"></div>
          <span class="svg-container show-pwd" @click='showPwd'>
            <wscn-icon-svg :icon-class="iconclass" />
          </span> 
        </el-form-item>
        <el-form-item :label="$t('newpassword')" prop="checkPass">
          <el-input :type="pwdType2" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          <span class="svg-container show-pwd" @click='showPwd2'>
            <wscn-icon-svg :icon-class="iconclass2" />
          </span>  
        </el-form-item>
        <el-form-item :label="$t('confirmpassword')" prop="confirmpass">
          <el-input :type="pwdType3" v-model="ruleForm2.confirmpass" auto-complete="off"></el-input>
          <span class="svg-container show-pwd" @click='showPwd3'>
            <wscn-icon-svg :icon-class="iconclass3" />
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">{{$t('order.Affirm')}}</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import bootstrap from 'bootstrap';
import { updatePassword,checkoldpwd } from 'api/userInfo';
import rightButtonChild from './../layout/rightButtonChild';
import Vue from 'vue';

export default {
  components: { rightButtonChild },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('enterpassword')));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    const validateoldpwd = (rule,value,callback) => {
      checkoldpwd(value).then(response => {
          if (response.data.status === '1') {
            callback(new Error(this.$t('originalpassworderror')));
          } else {
            callback();
          }
      });
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('enterpasswordagain')));
      } else if (value === this.ruleForm2.pass) {
        callback(new Error(this.$t('passwordexist')));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('enterpasswordagain')));
      } else if (value !== this.ruleForm2.checkPass) {
        callback(new Error(this.$t('Passwordinconsistent')));
      } else if (value === this.ruleForm2.pass) {
        callback(new Error(this.$t('passwordexist')));
      } else {
        callback();
      }
    };
    return {
      pwdType: 'password',
      pwdType2: 'password',
      pwdType3: 'password',
      iconclass: 'Invisible',
      iconclass2: 'Invisible',
      iconclass3: 'Invisible',  
      ruleForm2: {
        pass: '', // 原密码
        checkPass: '', // 新密码
        confirmpass: '' // 确认新密码
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { validator: validateoldpwd, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        confirmpass: [
          { validator: validatePass3, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '',
        this.iconclass = 'visible'
      } else {
        this.pwdType = 'password',
        this.iconclass = 'Invisible'
      }
    },
    showPwd2() {
      if (this.pwdType2 === 'password') {
        this.pwdType2 = '',
        this.iconclass2 = 'visible'
      } else {
        this.pwdType2 = 'password',
        this.iconclass2 = 'Invisible'
      }
    },
    showPwd3() {
      if (this.pwdType3 === 'password') {
        this.pwdType3 = '',
        this.iconclass3 = 'visible'
      } else {
        this.pwdType3 = 'password',
        this.iconclass3 = 'Invisible'
      }
    },   
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updatePassword(this.ruleForm2).then(response => {
            console.dir(response);
            if (response.data.status === '0') {
              this.$message.info(this.$t('passwordupdateok'));
              // 退出登录
              const this_ = this;
              setTimeout(() => {
                this_.$store.dispatch('LogOut').then(() => {
                  location.reload();// 为了重新实例化
                });
              }, 1000);
            } else {
              this.$message.error(this.$t('originalpassworderror'));
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

    // checkoldpwd(){
    //   const oldpassword = this.ruleForm2.pass;
    //   //去除原来的错误提示
    //   $(".el-form-item__error").attr("style", "display:none;");
    //   if(oldpassword != null && oldpassword != ''){
    //     checkoldpwd(oldpassword).then(response => {
    //       if (response.data.status === '1') {
    //         $("#oldpaderror").attr("style", "display:block;");
    //         $('#oldpaderror').text(this.$t('originalpassworderror'));
    //       } else {
    //         $("#oldpaderror").attr("style", "display:none;");
    //       }
    //     });
    //   }
    // }
  }
}
</script>

<style scoped>
@import '/static/css/bootstrap.min.css';
@import '/static/css/layout.css';
@import '/static/css/custom.css';
@import '/static/css/default.css';
@import '/static/css/style.css';
</style>
<style>
.show-pwd {
  position: absolute;
  left: 175px;
  top: 0px;
  font-size: 16px;
  color: #d0d1d2;
  cursor: pointer;
}
.el-form-item__error{
  padding-top:3px
}
.demo-ruleForm input {
  max-width: 200px;
}

.main_form_input .form-group {
  margin-bottom: 25px;
}

.el-form-item__error {
  left: 0;
}

.el-form-item__label {
  font-weight: normal;
  color: #666577;
  font-size: 12px;
}

.el-input__inner {
  background: #f7f8fd;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  border: 1px solid #aab0d1;
  height: 34px;
  border-radius: 4px!important;
}

.el-button--primary,
.el-button--primary:hover,
.el-button--primary:focus {
  background: #2486c5;
  border-radius: 10px;
  height: 34px;
  padding-left: 30px;
  padding-right: 30px;
}
</style>
