<template>
  <div class="contentInfo" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading">
    <div class="mapindexcontent">
      <!-- 地图区域 -->
      <div class="map" id="container"></div>
      <!-- 轨迹播放信息 -->
      <div class="PlaybackTrack" v-if="carinfostate==7">
      	<div class="title">
      		<div>轨迹回放</div>
      		<div class="speed"><span>慢</span>
      			<el-slider :disabled="disabledslider" :show-tooltip="false" style="width: 100px;display: inline-block;" :min="minspeed"
      			 :max="maxspeed" v-model="setspeed"></el-slider><span>快</span>
      		</div>
      	</div>
      	<div class="TrackContent">
      		<div class="TrackContent-item">
      			<span class="line"><span class="line-item" :style="{width:activewidth+'%'}"></span></span>
      			<span class="icoCrivet" v-if="isMoveCar==1" @click="startAnimation()"><i class="el-icon-video-play"></i></span>
      			<span class="icoCrivet" v-if="isMoveCar==3" @click="resumeAnimation()"><i class="el-icon-video-play"></i></span>
      			<span class="icoCrivet" v-if="isMoveCar==2" @click="pauseAnimation()"><i class="el-icon-video-pause"></i></span>
      		</div>
      		<div class="center">
      			<span>{{Currentdistance || '--'}} / {{totalMileage || '--'}} km</span>
      		</div>
      	</div>
      </div>
      <div class="PlaybackTrack" style="top:50px ;" v-else>
        <div  class="freshContent">
          <el-button type="primary" size="small" @click="GetInfo()">刷新</el-button>
        </div>
      </div>
      <!-- 内容 -->
      <div class="infolist" >
        <div class="updownbutton"><el-button @click="updowntoggt()" :icon="qiehuanicon" circle size="small" type="primary"></el-button></div>
        <!-- 信息显示 -->
        <div class="infolistconbtent">
          <div class="infolistconbtent-item">
            <div class="infolistconbtent-item-img">
              <img src="../../../public/img/zx.png" width="40" height="40" style="margin-top: 10px;"/>
            </div>
            <div class="infolistconbtent-item-text">
              <div class="infolistconbtent-item-text-item"><span>中交兴路设备</span><span class="circular greeybg"></span><span class="greencolor greey">在线</span></div>
              <div class="infolistconbtent-item-text-item"><span>设备号：1234567895555</span></div>
            </div>
            <div class="infolistconbtent-item-traOpen">
              显示地图轨迹
              <el-switch v-model="openbutton1" disabled active-color="#13ce66" inactive-color="#666666"> </el-switch>
            </div>
          </div>
          <div class="infolistconbtent-item-line"></div>
          <div class="infolistconbtent-item">
            <div class="infolistconbtent-item-img">
              <img src="../../../public/img/wl.png" width="40" height="40" style="margin-top: 10px;"/>
            </div>
            <div class="infolistconbtent-item-text">
              <div v-if="trajectorytableData" class="infolistconbtent-item-text-item"><span>大粮物联设备</span><span class="circular"></span><span class="greencolor">在线</span></div>
              <div v-else class="infolistconbtent-item-text-item"><span>大粮物联设备</span><span class="circular greeybg"></span><span class="greencolor greey">在线</span></div>
              <div class="infolistconbtent-item-text-item"><span>设备号：1234567895555</span></div>
            </div>
            <div class="infolistconbtent-item-traOpen">
              显示地图轨迹
              <el-switch v-model="openbutton2"  active-color="#13ce66" inactive-color="#666666"> </el-switch>
            </div>
          </div>
        </div>
        <div class="tabledata" :class="qiehuan==1?'dnone':'dinne'">
        	<el-tabs v-model="activeName" type="border-card">
        		<el-tab-pane label="实时轨迹" name="first">
        			<el-card class="box-card">
        				<el-table :data="trajectorytableData" border style="width: 100%;" height="220" @cell-mouse-enter="mousegetaddress">
        					<el-table-column label="司机姓名" align="center"><template slot-scope="{row}">{{row.driverName || '--'}}</template></el-table-column>
        					<el-table-column label="车牌号" align="center"><template slot-scope="{row}">{{row.carNumber || '--'}}</template></el-table-column>
        					<el-table-column label="定位时间" align="center"><template slot-scope="{row}">{{row.locationTime || '--'}}</template></el-table-column>
        					<el-table-column label="速度(Km/h)" align="center"><template slot-scope="{row}">{{row.speed || '--'}}</template></el-table-column>
        					<el-table-column label="当前位置" align="center"><template slot-scope="{row}">
                    <el-tooltip class="item" effect="dark" :content="getaddressst" placement="bottom-end">
                      <span style="color: #2626e0;">{{row.lonAndLat || '--'}} [解析]</span>
                    </el-tooltip>
                  </template></el-table-column>
        				</el-table>
        			</el-card>
        		</el-tab-pane>
        		<el-tab-pane label="停车信息" name="second">
        			<el-card class="box-card">
        				<el-table :data="parktableData" border style="width: 100%;" height="220" @cell-mouse-enter="mousegetaddress">
        					<el-table-column label="司机姓名" align="center"><template slot-scope="{row}">{{row.driverName || '--'}}</template></el-table-column>
        					<el-table-column label="车牌号" align="center"><template slot-scope="{row}">{{row.carNumber || '--'}}</template></el-table-column>
        					<el-table-column label="开始时间" align="center"><template slot-scope="{row}">{{row.startTime || '--'}}</template></el-table-column>
        					<el-table-column label="结束时间" align="center"><template slot-scope="{row}">{{row.endTime || '--'}}</template></el-table-column>
        					<el-table-column label="停车时长" align="center"><template slot-scope="{row}">{{row.dockingTime || '--'}}分钟</template></el-table-column>
        					<el-table-column label="停车位置" align="center"><template slot-scope="{row}">
                    <el-tooltip class="item" effect="dark" :content="getaddressst" placement="bottom-end">
                      <span style="color: #2626e0;">{{row.lonAndLat || '--'}} [解析]</span>
                    </el-tooltip>
                  </template></el-table-column>
        				</el-table>
        			</el-card>
        		</el-tab-pane>
        	</el-tabs>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { getTrajectoryInfo,historygetTrajectoryInfo } from "@/api/car/car";
	export default {
		data() {
			return {
				disabledslider: false,//是否禁用调节快慢
				minspeed: 0,//最小值
				maxspeed: 0,//最大值
				setspeed: 0,//当前设置值
				activewidth: 0,//进度条宽度
				isMoveCar: 1,//1开始 2移动 3暂停
				Currentdistance: 0,//当前行走米数
				totalMileage: '',//总里程
				dataloading: false,//加载
        timer:null,//移动定时器
        activeName:'first',//活动内容
        trajectorytableData:[],//实时轨迹列表
        parktableData:[],//停车轨迹列表
        qiehuan:2,
        openbutton1:false,
        qiehuanicon:'el-icon-arrow-up',
        carinfostate:0,
        openbutton2:true,
        getaddressst:'',
        alertaddress:''
			}
		},
		methods: {
      GetInfo(){
        let params = {'carId':this.$route.query.carid}
        getTrajectoryInfo(params).then((res) => {
          if(res.data && res.data.data && res.data.data.list){
            this.trajectorytableData = res.data.data.list
            let trajectoryList = res.data.data.list
            this.parktableData = res.data.data.stopList
            let stopList = res.data.data.stopList
            let Standardlist = []
            this.initializationMap(116.26284,40.033261, trajectoryList, stopList,Standardlist)
          }else{
            this.trajectorytableData = []
            let trajectoryList = []
            let stopList = []
            let Standardlist = []
            this.initializationMap(116.26284,40.033261, trajectoryList, stopList,Standardlist)
          }
        }, error => {
          window.console.log(error);
        });
      },
      GetInfohistory(){
        let params = {'carId':this.$route.query.carid}
        historygetTrajectoryInfo(params).then((res) => {
          if(res.data && res.data.data && res.data.data.list){
            this.trajectorytableData = res.data.data.list
            let trajectoryList = res.data.data.list
            this.parktableData = res.data.data.stopList
            let stopList = res.data.data.stopList
            let Standardlist = []
            this.initializationMap(116.26284,40.033261, trajectoryList, stopList,Standardlist)
          }else{
            this.trajectorytableData = []
            let trajectoryList = []
            let stopList = []
            let Standardlist = []
            this.initializationMap(116.26284,40.033261, trajectoryList, stopList,Standardlist)
          }
          if(res.data && res.data.data && res.data.data.totalMileage>0){
            this.totalMileage = res.data.data.totalMileage
            // 最快10秒走完
            this.maxspeed = Math.ceil((res.data.data.totalMileage*1 / 10) * 3600)
            // 最慢30秒走完
            this.minspeed = Math.ceil((res.data.data.totalMileage*1 / 60) * 3600)
            // 中间速度
            this.setspeed = Math.ceil((res.data.data.totalMileage*1 / 20) * 3600)
          }else{
            this.totalMileage = 0
            // 最快10秒走完
            this.maxspeed = 0
            // 最慢30秒走完
            this.minspeed = 0
            // 中间速度
            this.setspeed = 0
          }
        }, error => {
          window.console.log(error);
        });
      },
       // 显示隐藏
      updowntoggt:function(){
        if(this.qiehuan == 1){
          this.qiehuan = 2
          this.qiehuanicon = 'el-icon-arrow-down'
        }else{
          this.qiehuan = 1
          this.qiehuanicon = 'el-icon-arrow-up'
        }
      },
      mousegetaddress:function(row){
        this.Getaddressinfo(row.lonAndLat)
      },
      // 根据经纬度获取地址
      Getaddressinfo:function(lnglatvalue,type=1){
        AMap.plugin('AMap.Geocoder',function(){
        })
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
         let lnglat  = lnglatvalue.split(',');
         let _that = this
         geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete'&&result.regeocode) {
                 var address = result.regeocode.formattedAddress;
                 if(type==1){
                   _that.getaddressst = address
                 }else{
                   _that.alertaddress = address
                 }
            }else{
                window.console.log('根据经纬度查询地址失败')
            }
        });

    },

			// 初始化地图
			initializationMap: function(Centerlongitude, Centerlatitude, trajectoryList, parkingtableList,Standardlist) {
				let map = new AMap.Map('container', {
					resizeEnable: true, //是否监控地图容器尺寸变化
					zoom: 12, //初始化地图层级
					center: [Centerlongitude, Centerlatitude]
				});
				map.plugin(["AMap.ToolBar"], function() {
					map.addControl(new AMap.ToolBar());
				});
				var mouseTool = ''
				map.plugin(["AMap.MouseTool"], function() {
					mouseTool = new AMap.MouseTool(map);
				});
				this.mapInfo = map
				// 绘制轨迹
				let lineArr = []
				let marker
				// 信息窗体
				let infoWindow = new AMap.InfoWindow({
					offset: new AMap.Pixel(0, -30)
				});
				// 轨迹点
				trajectoryList.map((item, index) => {
					let tude = item.lonAndLat.split(',')
					lineArr.push([tude[0] * 1, tude[1] * 1])
          // 起点
          if(index == 0 ){
            let markerinfoWindowStart = []
            let EquiltCarInfoStart = []
            markerinfoWindowStart = new AMap.Marker({
                position: [tude[0]*1,tude[1]*1],
                map: map,
                icon: new AMap.Icon({
                    size: new AMap.Size(25, 34),
                    imageSize: new AMap.Size(135, 40),
                    imageOffset: new AMap.Pixel(-9, -3),
                    image: "https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png"
                }),
            })
            EquiltCarInfoStart.push("<div style='line-height: 25px'><div style='display: flex;flex-direction: row;justify-content: space-between;border-bottom: 1px solid #eaeaea;width:100%'><div>起点</div></div> ");
            // EquiltCarInfoStart.push("<div>定位时间："+item.crttime+"</div>");
            EquiltCarInfoStart.push("<div>定位时间：<span style='color: #0077AA;'>"+item.locationTime+"</span></div></div>");
            markerinfoWindowStart.content = EquiltCarInfoStart.join('');
            markerinfoWindowStart.on('click', markerClick);
          }
          if(trajectoryList.length-1==index){
            let markerinfoWindowEnd = []
            let EquiltCarInfoEnd = []
            markerinfoWindowEnd = new AMap.Marker({
                position: [tude[0]*1,tude[1]*1],
                map: map,
                icon: new AMap.Icon({
                    size: new AMap.Size(25, 34),
                    imageSize: new AMap.Size(135, 40),
                    imageOffset: new AMap.Pixel(-95, -3),
                    image: "https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png"
                }),
            })
            EquiltCarInfoEnd.push("<div style='line-height: 25px'><div style='display: flex;flex-direction: row;justify-content: space-between;border-bottom: 1px solid #eaeaea;width:100%'><div>终点</div></div> ");
            EquiltCarInfoEnd.push("<div>定位时间：<span style='color: #0077AA;'>"+item.locationTime+"</span></div></div>");
            markerinfoWindowEnd.content = EquiltCarInfoEnd.join('');
            markerinfoWindowEnd.on('click', markerClick);
          }
					// 信息窗体信息
					let markerinfoWindow = []
					let EquiltCarInfo = []
					markerinfoWindow = new AMap.Marker({
						position: [tude[0] * 1, tude[1] * 1],
						map: map,
						icon: new AMap.Icon({
							size: new AMap.Size(16, 19), //图标大小
							imageSize: new AMap.Size(16, 19),
							image: "https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png"
						}),
						offset: new AMap.Pixel(-3, -15),
					})
					let currentindex = index + 1
					let totlenumber = trajectoryList.length
					EquiltCarInfo.push(
						"<div style='line-height: 25px'><div style='display: flex;flex-direction: row;justify-content: space-between;border-bottom: 1px solid #eaeaea;width:100%'>轨迹点" +
						currentindex + "/" + totlenumber + "</div> ");
					EquiltCarInfo.push("<div>速度：" + item.speed + "km/h</div>");
					EquiltCarInfo.push("<div>里程：" + item.mileage + "/" + item.totalMileage + "km</div>");
					EquiltCarInfo.push("<div>定位时间：" + item.locationTime + "</div>");
					if (index == 0) {
            let geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress(tude, function(status, result) {
                if (status === 'complete'&&result.regeocode) {
                     let  getValue = result.regeocode.formattedAddress;
                     var infoWindowmarker = new AMap.InfoWindow({
                     	position: lineArr[0],
                     	offset: new AMap.Pixel(0, -10),
                     	content: EquiltCarInfo.join('')+"<div>地址：<span style='color: #0077AA;' >" + getValue + "</span></div></div>"
                     });
                     infoWindowmarker.open(map)
                }else{
                    window.console.log('根据经纬度查询地址失败')
                }
            });
					} else {
						markerinfoWindow.content = EquiltCarInfo.join('');
						markerinfoWindow.on('click', markerClick);
					}
				})
				this.CarTackllineArr = lineArr
				marker = new AMap.Marker({
					map: map,
					position: lineArr[0],
					icon: new AMap.Icon({
						size: new AMap.Size(50, 25), //图标大小
						imageSize: new AMap.Size(50, 25),
						image: require('../../../public/img/car.png'),
					}),
					autoRotation: true,
					offset: new AMap.Pixel(-25, -12.5),
					angle: -90,
				});
        // 国家轨迹
        // let StandardlineArr = []
//         Standardlist.map((item, index) => {
//         	let tudes = item.longitudeAndLatitude.split(',')
//         	StandardlineArr.push([tudes[0] * 1, tudes[1] * 1])
//           // 起点
//           if(index == 0 ){
//             let StandardmarkerinfoWindowStart = []
//             StandardmarkerinfoWindowStart = new AMap.Marker({
//                 position: [tudes[0]*1,tudes[1]*1],
//                 map: map,
//                 icon: new AMap.Icon({
//                     size: new AMap.Size(25, 34),
//                     imageSize: new AMap.Size(135, 40),
//                     imageOffset: new AMap.Pixel(-9, -3),
//                     image: "https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png"
//                 }),
//             })
//           }
//           // 终点
//           if(Standardlist.length-1==index){
//             let StandardmarkerinfoWindowEnd = []
//             StandardmarkerinfoWindowEnd = new AMap.Marker({
//                 position: [tudes[0]*1,tudes[1]*1],
//                 map: map,
//                 icon: new AMap.Icon({
//                     size: new AMap.Size(25, 34),
//                     imageSize: new AMap.Size(135, 40),
//                     imageOffset: new AMap.Pixel(-95, -3),
//                     image: "https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png"
//                 }),
//             })
//           }
//
//
//         })
				// 轨迹点
        var polyline = new AMap.Polyline({
        	map: map,
        	path: lineArr,
        	showDir: true,
        	strokeColor: "#28F", //线颜色
        	strokeWeight: 6, //线宽
        });

        // 国家轨迹点
        // var Standardpolyline = new AMap.Polyline({
        // 	map: map,
        // 	path: StandardlineArr,
        // 	showDir: true,
        // 	strokeColor: "#9c27b0", //线颜色
        // 	strokeWeight: 6, //线宽
        // });


				var passedPolyline = new AMap.Polyline({
					map: map,
					strokeColor: "#AF5", //线颜色
					strokeWeight: 6, //线宽
				});
				marker.on('moving', function(e) {
					passedPolyline.setPath(e.passedPath);
				});
				this.markerInfo = marker
				map.setFitView();
				// 停车信息
				parkingtableList.map((item, index) => {

          let tude = item.lonAndLat.split(',')

					let markerinfoWindow = []
					markerinfoWindow = new AMap.Marker({
						position: [tude[0] * 1, tude[1] * 1],
						map: map,
						icon: new AMap.Icon({
							image: require('../../../public/img/parking.png'),
							size: new AMap.Size(25, 34), //图标大小
							imageSize: new AMap.Size(25, 34),
						}),
						offset: new AMap.Pixel(0, -10),
					})
					let EquiltCarInfo = []
					EquiltCarInfo.push(
						"<div style='line-height: 25px'><div style='display: flex;flex-direction: row;justify-content: space-between;border-bottom: 1px solid #eaeaea;width:100%'><div>P" +
						(index * 1 + 1) + "</div></div> ");
					EquiltCarInfo.push("<div>开始时间：" + item.startTime + "</div>");
					EquiltCarInfo.push("<div>结束时间：" + item.endTime + "</div>");
					EquiltCarInfo.push("<div>停留时间：" + item.dockingTime + "分钟</div>");
					markerinfoWindow.content = EquiltCarInfo.join('');
					markerinfoWindow.on('click', markerClick);
				})
				// 点击弹框信息窗体
				function markerClick(e) {
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress(e.target.getPosition(), function(status, result) {
              if (status === 'complete'&&result.regeocode) {
                   let  getValue = result.regeocode.formattedAddress;
                   infoWindow.setContent(e.target.content+"<div>地址：<span style='color: #0077AA;' >" + getValue + "</span></div></div>");
              }else{
                  window.console.log('根据经纬度查询地址失败')
              }
          });
					infoWindow.open(map, e.target.getPosition());
				}
			},
      // 移动/
      startAnimation:function(){
        this.disabledslider = true
        this.SetTimeDistinct()
        this.isMoveCar = 2
        this.markerInfo.moveAlong(this.CarTackllineArr, this.setspeed);
      },
      // 暂停
      pauseAnimation:function(){
         this.isMoveCar = 3
         if(this.Currentdistance == this.totalMileage){
           this.disabledslider = false
           this.EndSetTimeDistinct()
         }else{
           this.SetTimeDistinct()
           this.markerInfo.pauseMove();
         }
      },
      //继续动画
      resumeAnimation:function () {
        this.isMoveCar = 2
        if(this.Currentdistance == this.totalMileage){
          this.disabledslider = true
          this.Currentdistance = 0
          this.activewidth = 0
          this.SetTimeDistinct()
          this.markerInfo.moveAlong(this.CarTackllineArr, this.setspeed);
        }else{
          this.SetTimeDistinct()
          this.markerInfo.resumeMove();
        }
      },
      // 定时设置长度
      SetTimeDistinct:function(){
        if(this.timer != null){
          this.EndSetTimeDistinct()
        }else{
          this.timer = setInterval(() =>{
            if(this.Currentdistance == this.totalMileage){
              this.EndSetTimeDistinct()
            }else{
               let stemin = (this.setspeed/3600).toFixed(2)
              if(stemin<=0){
                let stemin=0.5
              }
              let Currentdistance = ((this.Currentdistance+stemin*1).toFixed(2))*1
              if(Currentdistance< this.totalMileage){
                this.Currentdistance = Currentdistance
              }else{
                this.Currentdistance = this.totalMileage
              }
              this.activewidth = (this.Currentdistance/this.totalMileage)*100
            }
           }, 1000);
        }
      },
      EndSetTimeDistinct:function(){
        clearInterval(this.timer);
        this.timer = null
      },
		},
    destroyed(){
      this.EndSetTimeDistinct()
    },
		mounted() {
      this.Getaddressinfo('117.229739,31.818466')
      this.carinfostate = this.$route.query.status
      if(this.$route.query.status==7){
        this.GetInfohistory()
      }else{
        this.GetInfo()
      }
      // 轨迹数据
      // let trajectoryList = [
      //   {'longitudeAndLatitude':'116.399669,40.027958','address':'地址1','crttime':'2020-10-1','speed':'20','mileage':'10','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.489356,40.065074','address':'地址2','crttime':'2020-10-1','speed':'30','mileage':'20','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.506029,40.005412','address':'地址3','crttime':'2020-10-1','speed':'20','mileage':'30','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.456586,39.963839','address':'地址4','crttime':'2020-10-1','speed':'40','mileage':'60','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.404844,39.918255','address':'地址5','crttime':'2020-10-1','speed':'20','mileage':'80','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.388171,39.86954','address':'地址6','crttime':'2020-10-1','speed':'90','mileage':'90','totalMileage':'100'}
      // ]
      // // 停车数据
      // let stopList = [
      //     {'longitudeAndLatitude':'116.506029,40.005412','address':'地址3','startTime':'2020-10-1','speed':'20','dockingTime':'30','endTime':'2020-10-1'},
      //     {'longitudeAndLatitude':'116.456586,39.963839','address':'地址4','startTime':'2020-10-1','speed':'40','dockingTime':'60','endTime':'2020-10-1'},
      //     {'longitudeAndLatitude':'116.388171,39.86954','address':'地址6','startTime':'2020-10-1','speed':'90','dockingTime':'90','endTime':'2020-10-1'}
      //   ]
      // // 国家路线
      // let Standardlist = [
      //   {'longitudeAndLatitude':'116.186376,40.057564','address':'地址1','crttime':'2020-10-1','speed':'20','mileage':'10','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.222021,40.029283','address':'地址2','crttime':'2020-10-1','speed':'30','mileage':'20','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.242718,40.007623','address':'地址3','crttime':'2020-10-1','speed':'20','mileage':'30','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.195,39.995685','address':'地址4','crttime':'2020-10-1','speed':'40','mileage':'60','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.168553,39.918255','address':'地址5','crttime':'2020-10-1','speed':'20','mileage':'80','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.185226,39.910286','address':'地址6','crttime':'2020-10-1','speed':'90','mileage':'90','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.203623,39.896117','address':'地址7','crttime':'2020-10-1','speed':'20','mileage':'80','totalMileage':'100'},
      //   {'longitudeAndLatitude':'116.212822,39.881944','address':'地址8','crttime':'2020-10-1','speed':'90','mileage':'90','totalMileage':'100'},
      // ]
      // this.totalMileage = 100
      // // 最快10秒走完
      // this.maxspeed = Math.ceil((100 / 10) * 3600)
      // // 最慢30秒走完
      // this.minspeed = Math.ceil((100 / 60) * 3600)
      // // 中间速度
      // this.setspeed = Math.ceil((100 / 20) * 3600)
      // this.initializationMap(116.26284,40.033261, trajectoryList, stopList,Standardlist)
		}
	}
</script>

<style scoped>




	.mapindexcontent {
		width: 100%;
    position: relative;
    padding-bottom: 20px;
    height: 50rem;
	}

	#container {
		width: 100%;
    top: 0;
		height: 100%;
    left: 0;
	}


	.PlaybackTrack {
		position: absolute;
		top: 70px;
		right: 20px;
		background: #FFFFFF;
		width: 220px;
		z-index: 9999;
	}

	.PlaybackTrack .speed {
		width: 120px;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.PlaybackTrack .speed span {
		padding: 0 8px;
	}

	.PlaybackTrack .title {
		line-height: 35px;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.PlaybackTrack .TrackContent {
		background: #F4F4F5;
		padding: 10px 10px 0 10px;
	}

	.TrackContent-item {
		width: 160px;
		margin: 0 auto;
		display: flex;
	}

	.TrackContent-item .line {
		position: relative;
		display: inline-block;
		width: 120px;
		height: 5px;
		border-radius: 10px;
		background: #EAEAEA;
		margin-top: 10px;
		margin-right: 10px;
	}

	.TrackContent-item .line .line-item {
    transition: width 1s;
    -webkit-transition: width 1s;
		display: inline-block;
		position: absolute;
		height: 5px;
		border-radius: 10px;
		top: 0px;
		left: 0;
		background: #409EFF;
	}

	.TrackContent .center {
		text-align: center;
		color: #999999;
		font-size: 14px;
		line-height: 30px;
	}

	.TrackContent-item .icoCrivet {
		background: #fff;
		color: #409EFF;
		font-size: 25px;
		display: inline-block;
		width: 25px;
		height: 25px;
		border-radius: 25px;
		line-height: 25px;
		text-align: center;
		cursor: pointer;
	}
  .dnone{display: none;}
  .dinne{display: block;}
  .infolist{position: absolute;bottom:0;width: 100%;}
  .infolistconbtent{width: 100%;background: #FFFFFF;margin-bottom: 0.625rem;display: flex;justify-content: space-between;padding: 0.625rem;font-size: 0.875rem;}
  .infolistconbtent .infolistconbtent-item{width: 48%;display: flex;justify-content: center;}
  .infolistconbtent .infolistconbtent-item-line{width: 1px;height:60px;background: #847878;}
  .infolistconbtent .infolistconbtent-item-img{padding-right: 1.875rem;}
  .infolistconbtent .infolistconbtent-item-text .infolistconbtent-item-text-item{line-height: 30px;height:30px;}
  .infolistconbtent-item-traOpen{height: 60px;line-height: 60px;margin-left: 10%;}
  .greencolor{color: #004444;}
  .circular{display: inline-block;margin: 0 1.25rem 0 1.25rem;width:10px;height:10px;border-radius: 50%;background: #008000;}
  .updownbutton{text-align: center;margin-bottom: -7px;margin-left: 17px;}
  .PlaybackTrack .freshContent{text-align: center;padding: 20px 0;}
   .greey{color: #666666;}
   .greeybg{background: #666666;}
</style>
