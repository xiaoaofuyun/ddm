<template>
<div>
  <div style="text-align: center">
  <form>
    <!--<table style="width: 400px;margin: 20px auto;padding: 20px;box-sizing: border-box;background-color: #f7f7f7;">-->
          <!--<tr><td>导航名称：</td><td><input type="text" v-model="navname" id="navname"></td></tr>-->
          <!--<tr><td>导航分类：</td><td><select v-model="selclassfiy" name=""  id="selclass" >-->
            <!--</select></td></tr>-->
      <!--<tr><td> <button style="height: 35px;width: 100px" @click="updatedo()">保存修改</button></td></tr>-->
    <!--</table>-->
      <div class="tableaddbox">
          <h2 class="tableaddbox_h2">导航名称：</h2>
          <input type="text" v-model="navname" id="navname">
          <h2 class="tableaddbox_h2">导航分类：</h2>
          <select v-model="selclassfiy" name=""  id="selclass" ></select>
          <button class="tableaddbox_but" @click="updatedo()">保存修改</button>
      </div>
  </form>
  </div>
</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "Updatedo",
      data(){
          return{
            pathurl:this.global.pathurl,
            navname:'',
            selclassfiy:''
          }

      },
      mounted:function(){
          this.update()

      },
      methods:{
        update:function() {
          var nid=this.$route.query.id;
          //console.log(nid);
          var that=this;
          that.$axios.post(that.global.repathurl+'api/menu/list',qs.stringify({tree_menu_id:nid}),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
                //console.log(res.data.length);

            var treeArr = [];
            function tree( arr , pid , level){
              for (var i = 0; i < arr.length; i++) {
                if( arr[i].pid == pid ){
                  arr[i].level = level;
                  treeArr.push(arr[i]);
                  tree( arr,arr[i].tree_menu_id,level+1 );
                }
              }
            }
            var arr=res.data;
            tree( arr , 0 , 0);
            // console.log(treeArr);

            var tmpStr = "<option value='0' >顶级</option>";
            for (var i = 0; i < treeArr.length; i++) {

              var tm='';
              for (var j = 0; j < treeArr[i].level; j++) {
                tm += "--";
              }
              // document.write( tmpStr  + treeArr[i].city + "<br/>");
              tmpStr+="<option value="+treeArr[i].tree_menu_id+">"+tm+treeArr[i].name+"</option>";

            }
            $('#selclass').append(tmpStr);





            for ( var i = 0; i <res.data.length; i++){
                if(res.data[i].tree_menu_id==nid){
                // $('#navname').value()=res.data[i].name;
                  // res.data[i].name;
                    //console.log(res.data[i]);
                  $('#navname').val(res.data[i].name);
                  var thispid=res.data[i].pid;
                  //$('#selclass').append("<option selected='selected'>"+'111111111'+"</option>");
                    //alert();
                  $('#selclass option').each(function () {
                    //console.log($(this).val());
                    if($(this).val()==thispid)
                    {
                      $(this).attr('selected','selected');
                    }
                  })



                }
            }

          })


        },updatedo:function () {
          var that=this;
          var nid=this.$route.query.id;
          that.$axios.post(that.global.repathurl+'api/menu/update',qs.stringify({
            tree_menu_id:nid,
            name:that.navname,
            pid:that.selclassfiy
          }),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            if(res.data.code=='1'){
              alert('修改成功');
            }else{
              alert('修改失败');
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>
    .tableaddbox{
        width: 400px;
        margin: 20px auto;
        background-color: #f7f7f7;
        padding: 20px;
        box-sizing: border-box;
    }
    .tableaddbox_h2{
        font-size: 16px;
        line-height: 30px;
        color:#333;
        text-align: left;
    }
    .tableaddbox input{
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: hidden;
        border:1px solid #ccc;
        margin: 5px 0;
    }
    .tableaddbox select{
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: hidden;
        border:1px solid #ccc;
        margin: 5px 0;
    }
    .tableaddbox_but{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #579fe9;
        color:#fff;
        font-size: 16px;
        text-align: center;
        border:1px solid #579fe9;
        margin-top: 10px;
        cursor: pointer;
    }
</style>
