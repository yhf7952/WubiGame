<template>
    <div>
        <el-row
            :class="{ zigen: gameModel === 'zigen', version98: wubiVersion === '98'  }"
            class="box"
            :gutter="20"
            style="margin-top:50px;"
        >
            <el-col :span="4" :offset="2">
                <el-card shadow="always" v-bind:class="isRight ? 'boderNormal' :'boderError' " >
                    {{d1[1]}}
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    {{d2[1]}}
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    {{d3[1]}}
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    {{d4[1]}}
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    {{d5[1]}}
                </el-card>
            </el-col>
        </el-row>
        <el-row style="text-align:center; margin-top:50px;">
            <el-input v-model="intext" id="intext" placeholder="光标置于此处开始" @input="game($event)" autofocus="autofocus" style="width:150px;"></el-input>
        </el-row>
        <el-row style="margin:50px 0 20px 0;">
            <b><span>统计信息：</span></b><span>当前速度：<el-tag>{{typeSpeed}}</el-tag> 字/分钟；</span><span> 正确率：<el-tag>{{rightPercent}}%</el-tag>； </span>  
            <el-button @click="reset">重置</el-button>     
        </el-row>
        <el-collapse value = '1'>
                <el-collapse-item title="字根图" name="1">
                    <div class="rootImg">
                        <img :src="require(`../assets/root-${wubiVersion}.png`)" />
                    </div>
                </el-collapse-item>
                <el-collapse-item  title="一级简码" name="2">
                    <el-table style="width: 100%" :data="tableData" >
                        <el-table-column prop="t1" label="横区"></el-table-column>
                        <el-table-column prop="t2" label="竖区"></el-table-column>
                        <el-table-column prop="t3" label="撇区"></el-table-column>
                        <el-table-column prop="t4" label="捺区"></el-table-column>
                        <el-table-column prop="t5" label="折区"></el-table-column>                  
                    </el-table>
                </el-collapse-item>
                <el-collapse-item title="二级简码" name="3">
                    <div class="rootImg">
                        <img :src="require(`../assets/${wubiVersion}erjijianma.gif`)" />
                    </div>
                </el-collapse-item>
            </el-collapse>
    </div>
</template>

<style>
@font-face{
    font-family: "HanZiRootFont";
    font-style: normal;
    font-weight: 400;
    src: url("../assets/font/HanZiRootFont.woff2") format("woff2"), url("../assets/font/HanZiRootFont.ttf") format("ttf");
}
@font-face{
    font-family: "98WB";
    src: url("../assets/font/98WB-1.otf") format("opentype");
}
.zigen{
    font-family: HanZiRootFont;
}
.zigen.version98 {
    font-family: "98WB";
}
.box{
    font-size: 1cm;
    text-align: center;
}
.el-card__body{
    padding: 20px 0px;
}

.boderNormal{
    border: 2px solid #67C23A;
}
.boderError{
    border: 2px solid #F56C6C;
}
.rootImg{
    text-align: center;
}
.rootImg img{
    max-width: 100%;
}
</style>

<script>
    import { list86, list98, listYi, tableYi, listEr86, listEr98 } from '../const';

    export default {
        data() {
            return {
                d1: '',
                d2: '',
                d3: '',
                d4: '',
                d5: '',
                intext:'',
                isRight : true,
                errorTimes : 0,
                errorSumTimes : 0,
                rightTimes : 0,
                lastRightDate: new Date(),
                tableData: tableYi,
            }
        },
        props:{
            gameModel: String,
            wubiVersion: String,
        },
        computed: {
            //计算打字速度
            typeSpeed() {
                var time = new Date() - this.lastRightDate;
                return Math.floor(60000 / time * this.rightTimes) || 0;
            },
            //正确率
            rightPercent(){
                return this.rightTimes == 0 ? 100 : (this.rightTimes/(this.rightTimes + this.errorSumTimes)*100).toFixed(2);
            }
        },
        watch:{
            gameModel(val){
                this.startNewGame();
                if(val == "erji"){
                    this.$message('当前是二级简码模式，请更换为五笔输入法练习');
                }
            },
            wubiVersion(val) {
                this.startNewGame();
                this.$message({
                    message: `已切换为 ${val} 版本`,
                    type: 'success',
                });
            },
        },
        methods: {
            //初始化
            getData () {
                this.d1 = this.d2 == "" ? this.getRandom() : this.d2;
                this.d2 = this.d3 == "" ? this.getRandom() : this.d3;
                this.d3 = this.d4 == "" ? this.getRandom() : this.d4;
                this.d4 = this.d5 == "" ? this.getRandom() : this.d5;
                this.d5 = this.getRandom();
            },
            //开始游戏
            game ($event) {
                var input = $event.toLowerCase(); 
                if(this.gameModel== "erji"){
                    if(input == this.d1[1]){
                        this.getData ();
                        this.rightTimes++;
                        this.isRight = true;
                    }else{
                        this.isRight = false;
                        this.errorSumTimes++;
                    }
                    this.intext = ''; 
                    return;
                }

                if(input == this.d1[0]){
                    //输入正确
                    this.getData ();
                    this.errorTimes = 0;
                    this.isRight = true;
                    this.rightTimes++;
                }else{
                    this.isRight = false;
                    this.errorTimes++;
                    this.errorSumTimes++;
                    if(this.errorTimes >=3){
                        this.$message.error('错了哦，正确答案是：'+ this.d1[0].toUpperCase());
                    }
                }
                this.intext = '';               
            },
            reset(){
                this.rightTimes=0;
                this.errorTimes = 0;
                this.errorSumTimes = 0;
                this.lastRightDate = new Date();
                this.isRight = true;
                document.getElementById("intext").focus();
            },
            startNewGame() {
                this.d1='';
                this.d2='';
                this.d3='';
                this.d4='';
                this.d5='';
                this.getData();
                this.reset();
            },
            getRandom(){
                var thisList = {};
                const isVersion86 = this.wubiVersion === '86';

                switch(this.gameModel){
                    case "zigen": {
                        const list = isVersion86 ? list86 : list98;
                        thisList = list;
                        break;
                    }
                    case "yiji":
                        thisList = listYi;
                        break;
                    case "erji": {
                        const listEr = isVersion86 ? listEr86 : listEr98;
                        return ["",listEr[Math.floor(Math.random() * listEr.length)]];
                    }
                }
                
                var keyList = Object.keys(thisList);
                var key = keyList[Math.floor(Math.random() * keyList.length)];
                var values = thisList[key];
                var value = values[Math.floor(Math.random() * values.length)];
                return [key,value];
            }

        },  
        //初始化方法
        created: function () {
            this.getData ();
        }

    }
</script>
