<template>
  <el-container>
    <el-header class="el-menu-demo">
      <el-row>
        <el-col style="color:#fff" :xs="24" :sm="{span:20, offset: 2}" :md="{span: 18, offset: 3}" :xl="{span: 12, offset: 6}" ><h1 style="margin:0 20px; float:left; line-height:60px">五笔练习</h1>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">字根练习</el-menu-item>
          <el-menu-item index="2">一级简码</el-menu-item>
          <el-menu-item index="3">二级简码</el-menu-item>
          <el-menu-item index="4" style="color:#F56C6C;"><i style="color:#F56C6C;" class="el-icon-document"></i><a href="https://wubi.yantuz.cn" style="text-decoration: none;" target="_blank"><b>五笔7天速成</b></a></el-menu-item>
        </el-menu>
        </el-col>
      </el-row>

    </el-header>
    <el-main>
      <el-row>
        <el-col :xs="24" :sm="{span:20, offset: 2}" :md="{span: 18, offset: 3}" :xl="{span: 12, offset: 6}" >
          <Game :gameModel = this.gameModel />
        </el-col>
      </el-row>
    </el-main>
    <el-footer style="text-align:center">&copy; {{new Date().getFullYear()}} <a href="https://yantuz.cn/">岩兔站</a></el-footer>
  </el-container>
</template>


<script>
import Game from './components/Game.vue'

export default {
  name: 'App',
  data() {
      return {
        activeIndex: '1',
        gameModel: 'zigen',
      };
    },
  components: {
    Game
  },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        switch(key){
          case "1":
            this.gameModel = "zigen";
            break;
          case "2":
            this.gameModel = "yiji";
            break;
          case "3":
            this.gameModel = "erji";
            break;
        }
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body{margin:0; padding: 0;}
.el-divider{
  margin-top:0;
}
.el-header{
  background: #545c64;
  height: 80px;
  color:"#fff";
}
.el-menu-demo{float: left;}
</style>
