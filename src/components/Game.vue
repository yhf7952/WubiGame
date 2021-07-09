<template>
    <div>
        <el-row :class="{ zigen:gameModel == 'zigen' }" class="box" :gutter="20" style="margin-top:50px;">
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
                    <div class="rootImg"><img src="../assets/root.png" /></div>
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
                    <div class="rootImg"><img src="../assets/86erjijianma.gif" /></div>
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
.zigen{
    font-family: HanZiRootFont;
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
    var list = {
        "g":["一","丁","丅","丄","丂","七"],
        "f":["丐","丑","专","丒","丕","丘","丙","世","丗","且"],
        "d":["丠","両","两","严","並","丢","丣","丨","丩","个","丫","丧"],
        "s":["丰","丱","串","丳"],
        "a":["乀","乁","乂","久","乄","乆","乇","乃","么","之","乍","义","乊","乌"],
        "h":["乐","乒","乗","乘","乙","乕","乖","乓","乔","乑","乚"],
        "j":["习","乡","乢","乣","乤","乥","书","乧","乨"],
        "k":["买","乱","乲"],
        "l":["亀","亁","亃","亂","亄","亅","了","亇","争","予","亊"],
        "m":["亐","云","互","亓","五","井","亖","亗"],
        "t":["亠","亡","交","亥","亢","亣","亨","亦","产"],
        "r":["亰","亱","亳","亵","亲","亶","亴","亷","亹","亸"],
        "e":["什","仁","仃","仅","仆","仄","仂","仇","仈","仌","今","仉","介"],
        "w":["仐","仑","仒","仓","仔"],
        "q":["仠","仡","令","仨","以","仦","仢","代","仧","仩","仪","仫","们","仭","仮"],
        "y":["仰","仱","仲","仳","价","仵","件","仴","仸","仹"],
        "u":["伀","企","伅","伃","伇","伆","伋","伄","伉","伊","伂","伌","伈"],
        "i":["伐","伕","休","伓","伒","优","会","伔","伖","众","伙"],
        "o":["传","伡","伢","伤","伣","伥"],
        "p":["估","伴","伳","伲","伱","伵"],
        "n":["佀","佁","佂","佃","佄","佌","佋","位","低","住","佐","佒","体","佔","何","佖","佇","佈","佉","但","佑","佊","佅"],
        "b":["你","佡","佨","佥","佬","佦","佩","佧","佪","佫","佤","佢","佣","佭"],
        "v":["佰","佱","佲","佴","併","佶","佷","佳"],
        "c":["侀","侄","侅","侃","侁","侂"],
        "x":["侓","侔","侕","侖","侗","侒","侐","侑"],
    }
    var listYi = {
        "g":["一"],
        "f":["地"],
        "d":["在"],
        "s":["要"],
        "a":["工"],
        "h":["上"],
        "j":["是"],
        "k":["中"],
        "l":["国"],
        "m":["同"],
        "t":["和"],
        "r":["的"],
        "e":["有"],
        "w":["人"],
        "q":["我"],
        "y":["主"],
        "u":["产"],
        "i":["不"],
        "o":["为"],
        "p":["这"],
        "n":["民"],
        "b":["了"],
        "v":["发"],
        "c":["以"],
        "x":["经"],
    }

    var strEr="五于天末开下理事画现玫珠表珍列玉平不来与屯妻到互二寺城霜载直是吉协南才垢圾夫无坟增示赫过志地雪支三夺大厅左丰百右历成帮原胡春克太磁砂灰达成顾肆友龙本村枯林械相查可楞机格析极检构术样档杰棕杨李要权楷七革基苛式牙划或功贡攻匠菜共区芳燕东芝世节切芭药睛睦盯虎止旧占卤贞睡肯具餐眩瞳步眯瞎卢眼皮此量时晨果虹早昌蝇曙遇昨蝗明蛤晚景暗晃显晕电最归紧昆呈叶顺呆呀中虽吕另员呼听吸只史嘛啼吵喧叫啊哪吧哟车轩因困四辊加男轴力斩胃办罗罚较边思轨轻累同财央朵曲由则崭册几贩骨内风凡赠峭迪岂邮凤生行知条长处得各力向笔物秀答称入科秒管秘季委么第后持拓打找年提扣押抽手折扔失换扩拉朱搂近所报扫反批且肝肛胆肿肋肌用遥朋脸胸及胶膛爱甩服妥肥脂全会估休代个介保佃仙作伯仍从你信们偿伙亿他分公化钱针然钉氏外旬名锣负儿铁角欠多久匀乐炙锭包凶争色主计庆订度让刘训为高放诉衣认义方说就变这记离良充率闰半关亲并站间部曾商产瓣前闪交六立冰普帝决闻妆冯北汪法尖洒江小浊澡渐没少泊肖兴光注洋水淡学沁池当汉涨业灶类灯煤粘烛炽烟灿烽煌粗伙炮米料炒炎迷断籽娄烃定守害宁宽寂审宫军宙客宾家空宛社实宵灾之官字安它怀导居民收慢避惭届必怕愉懈心习悄屡忱忆敢恨怪尼卫际承阿陈耻阳职阵出降孤阴队隐防联孙耿辽也子限取陛姨寻姑杂毁旭如舅九奶婚妨嫌录灵巡刀好妇妈姆对参戏台劝观矣牟能难允驻驼马邓艰双线结顷红引旨强细纲张绵级给约纺弱纱继综纪弛绿经比";
    var listEr = strEr.split('');
    
    //console.log(getRandom());

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
                tableData: [
                    {t1: 'G（一）',t2: 'H（上）',t3: 'T（和）',t4: 'Y（主）',t5: 'N（民）',},
                    {t1: 'F（地）',t2: 'J（是）',t3: 'R（的）',t4: 'U（产）',t5: 'B（了）',},
                    {t1: 'D（在）',t2: 'K（中）',t3: 'E（有）',t4: 'I（不）',t5: 'V（发）',},
                    {t1: 'S（要）',t2: 'L（国）',t3: 'W（人）',t4: 'O（为）',t5: 'C（以）',},
                    {t1: 'A（工）',t2: 'M（同）',t3: 'Q（我）',t4: 'P（这）',t5: 'X（经）',},
                ]
            }
        },
        props:{
            gameModel: String,
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
                this.d1='';
                this.d2='';
                this.d3='';
                this.d4='';
                this.d5='';
                this.getData();
                this.reset();
                if(val == "erji"){
                    this.$message('当前是二级简码模式，请更换为五笔输入法练习');
                }
                document.getElementById("intext").focus();
            }
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
                this.errorSumTimes = 0;
                this.lastRightDate = new Date();
                this.isRight = true;
                document.getElementById("intext").focus();
            },
            getRandom(){
                var thisList = list;
                switch(this.gameModel){
                    case "zigen":
                        thisList = list;
                        break;
                    case "yiji":
                        thisList = listYi;
                        break;
                    case "erji":
                        return ["",listEr[Math.floor(Math.random() * listEr.length)]];
                }
                
                var returnVal = {};
                var keyList = Object.keys(thisList);
                var key = keyList[Math.floor(Math.random() * keyList.length)];
                var values = thisList[key];
                var value = values[Math.floor(Math.random() * values.length)];
                returnVal[key]=value;
                return [key,value];
            }

        },  
        //初始化方法
        created: function () {
            this.getData ();
        }

    }
</script>
