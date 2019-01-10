<template>

    <div class="head">
      <div >
        <div class="top">
          <h2 class="top_h2">越中档案管理系统</h2>
        <table style="margin: auto" class="top_table">
          <tr>
            <td> <span>用户名：</span></td>
            <td><input type="text" v-model="username" placeholder="请输入登录名"></td>
            <!--<td></td>-->
          </tr>
          <tr>
            <td>  <span>密     &nbsp;&nbsp;码：</span></td>
            <td><input type="password" v-model="password" placeholder="请输入密码"></td>
            <td><input class="lg_btn" type="submit" v-on:click="dothis" value="提交"></td>
          </tr>
        </table>
          <!--{{username}}11111111111{{password}}1111111111{{sign}}-->
        </div>
      </div>
    </div>
</template>
<style>
  @import url('../../assets/css/login.css');




</style>
<script>
  // var crypto = require('crypto');
  // var sha1 = crypto.createHash('sha1');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；

     // var d = md5.digest('hex');
  //console.log(crypto.getHashes());
  var dateFormat = require('dateformat');
  var sha256 = require("js-sha256").sha256;
  var now = new Date();
  var Qs = require('qs');
  var qs = require('qs');
  var cookie=require('vue-cookies');
  var that=this;
  function sha1(str) {
    var crypto = require('crypto')
    var sha1 = crypto.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    sha1.update(str);
    var res = sha1.digest("hex");  //加密后的值d
    return res;
  }

  function  setSha(str = "") {

      let sha256 = require("js-sha256").sha256
      return sha256(str)

  }
 function getDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
    export default {
        name: "Login",



      data(){
          return {
            username:'',
            password:'',
            sign:'',
            errmsg:''

          }
      }
      ,methods:{
              dothis:function () {
                var _this=this;
                this.$axios.post(_this.global.repathurl+'api/login  ', qs.stringify({
                  username:  Base64.encode(this.username),
                  password:  Base64.encode(this.password),
                  sign:setSha(  Base64.encode(this.username)+  Base64.encode(this.password)+getDate()+"xb")
                }),{
                  headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                  }
                },
                  {
                    transformRequest: [
                      function (data) {
                        let params = ''
                        for (let index in data) {
                          params += index + '=' + data[index] + '&'
                        }
                        return params
                      }
                    ]
                  }).then(function (response) {

                      console.log(response.data.code);
                      console.log(_this);

                    if(response.data.code=='1'){
                     cookie.set("token",response.data.api_token);
                      //console.log(cookie.get('token'));
                      console.log(response.data);
                      alert('登录成功');
                      sessionStorage.loginname = 'loginname';
                      //_this.$router.push('/');
                      window.location.href=_this.global.pathurl;

                    }else{

                      if(_this.username==''){
                        alert('登录名不能为空');
                        throw SyntaxError();
                      }
                      if(_this.password==''){
                        alert('密码不能为空');
                      }
                    }
                 // console.log(response)





                }).catch(function (err) {
                 console.log(err)
                })
              }
        }
    }

</script>


