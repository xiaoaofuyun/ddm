<template>
  <div id="app">

    <router-view v-if="isRouterAlive"></router-view>

    <div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'App',
  provide (){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }




  },
  methods:{
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  *,ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:0px;
  margin:0px;
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  border:hidden;
  background-color: #fff;
}
</style>
