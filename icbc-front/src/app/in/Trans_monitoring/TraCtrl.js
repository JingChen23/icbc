export default ($scope, $rootScope, qService, TransactionRes, ToasterTool, BASE_URL) => {
	'ngInject';
	const isNull = (value) => {
    	return typeof(value) == undefined || value == null;
};
//从数据库直接读取数据，在后面调用一下这个函数
	$scope.getAll = () => {
		// if (isNull($scope.params.value)) {
		// 	ToasterTool.warning("输入不能为空");
		// 	return;
		// }
		$rootScope.loading = true;
		
		qService.httpGet(TransactionRes.ResultsAll, {}, {}).then((data) => {
	    if (data.success) {
	        	//console.log("hehe");
	        if (data.data == null) {
	            ToasterTool.error("无结果");
	            $scope.items = null;
	        } else {
	            ToasterTool.success("查找成功");
	            $scope.items = data.data;
	            ToasterTool.success(data.data);
	           }
	    } else {
	    	ToasterTool.error("无结果");
	        $scope.items = null;
	    }
	    }, (err) => {
	    	ToasterTool.error("网络错误");
	    	$scope.items = null;
	    }).finally(() => {
	        $rootScope.loading = false;
	    });
	}
	$scope.getById = () => {
		// if (isNull($scope.params.value)) {
		// 	ToasterTool.warning("输入不能为空");
		// 	return;
		// }
		$rootScope.loading = true;
		const params = {
			"id": 1,
			//"value": $scope.params.value,
		}
		qService.httpGet(TransactionRes.TransactionInfo, params, {}).then((data) => {
	    if (data.success) {
	        	//console.log("hehe");
	        if (data.data == null) {
	            ToasterTool.error("无结果");
	            $scope.items = null;
	        } else {
	            ToasterTool.success("查找成功");
	            $scope.items = data.data;
	            ToasterTool.success(data.data);
	           }
	    } else {
	    	ToasterTool.error("无结果");
	        $scope.items = null;
	    }
	    }, (err) => {
	    	ToasterTool.error("网络错误");
	    	$scope.items = null;
	    }).finally(() => {
	        $rootScope.loading = false;
	    });
	};
	$scope.getAll();
	$scope.findInMap = (item) => {
		// alert(item);
		//console.log(item);
		var BJData = [
			  [{
			      name: item.tranOutAcctZoneNum
			  }, {
			      name: item.tranOutAcctZoneNum,
			      value: 5
			  }],
			  [{
			      name: item.tranOutAcctZoneNum
			  }, {
			      name: item.tranInAcctZoneNum,
			      value: item.txAmt
			  }]

			];
		    console.log(BJData);
			paint(BJData);
	}
	paint();
	tongjitu();
	function tongjitu(){
		var myChart = echarts.init(document.getElementById('main2'));
		var option = {
			title: {
				text: '实时用户（批处理）数据统计区',
				subtext: '',
				x:'center',
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: [''],
				y:'bottom',
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['line', 'bar', 'stack', 'tiled']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: '成交',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [10, 12, 21, 54, 260, 830, 710]
			}, {
				name: '预购',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [30, 182, 434, 791, 390, 30, 10]
			}, {
				name: '意向',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [1320, 1132, 601, 234, 120, 90, 20]
			}]
		};

		// 为echarts对象加载数据 
		myChart.setOption(option);
	}

	function paint(BJData){
			var myChart = echarts.init(document.getElementById('main'));
		    var myHosName;                
		    
		    
		    var geoCoordMap = {
		      '安徽省': [117.17, 31.52],
		      '北京市': [116.24, 39.55],
		      '重庆市': [106.54, 29.59],
		      '福建省': [119.18, 26.05],
		      '甘肃省': [103.51, 36.04],
		      '广东省': [113.14, 23.08],
		      '广西壮族自治区': [108.19, 22.48],
		      '贵州省': [106.42, 26.35],
		      '海南省': [110.20, 20.02],
		      '河北省': [114.30, 38.02],
		      '河南省': [113.40, 34.46],
		      '黑龙江省': [128.36, 45.44],
		      '湖北省': [112.27, 30.15],
		      '湖南省': [112.59, 28.12],
		      '吉林省': [125.19, 43.54],
		      '江苏省': [118.46, 32.03],
		      '江西省': [115.55, 28.40],
		      '辽宁省': [123.25, 41.48],
		      '内蒙古': [108.41, 40.48],
		      '宁夏回族自治区': [106.16, 38.27],
		      '青海省': [101.48, 36.38],
		      '山东省': [118.00, 36.40],
		      '山西省': [112.33, 37.54],
		      '陕西省': [108.57, 34.17],
		      '上海市': [121.29, 31.14],
		      '海南': [108.77, 19.10],
		      '四川省': [104.04, 30.40],
		      '天津市': [117.12, 39.02],
		      '西藏自治区': [91.08, 29.39],
		      '新疆维吾尔自治区': [87.36, 43.45],
		      '云南省': [102.42, 25.04],
		      '浙江省': [120.10, 30.16],
		      '澳门': [115.07, 21.33],
		      '台湾省': [121.21, 23.53]
		    };



			  var BJData_or = [
			  [{
			      name: '重庆市'
			  }, {
			      name: '重庆市',
			      value: 5
			  }],
			  [{
			      name: '重庆市'
			  }, {
			      name: '上海市',
			      value: 9
			  }]
			];
			console.log(BJData_or);
			if(BJData == null){
				BJData = BJData_or;
			}
		    // console.log(BJData);
		    var convertData = function(data) {
		      var res = [];
		      for (var i = 0; i < data.length; i++) {
		        var dataItem = data[i];
		        var fromCoord = geoCoordMap[dataItem[0].name];
		        var toCoord = geoCoordMap[dataItem[1].name];
		        if (fromCoord && toCoord) {
		            res.push({
		              fromName: dataItem[0].name,
		              toName: dataItem[1].name,
		              coords: [fromCoord, toCoord]
		            });
		        }
		      }
		    return res;
		    };

		    var color = ['#a6c84c', '#ffa022', '#46bee9'];
		    var mySeries = [];
		    [
		      [myHosName, BJData]
		    ].forEach(function(item, i) {
		      mySeries.push({ //线
		        name: item[0],
		        type: 'lines',
		        zlevel: 1,
		        effect: {
		          show: true,
		          period: 2,
		          trailLength: 2,
		          color: '#fff',
		          symbolSize: 3
		        },
		        lineStyle: {
		          normal: {
		            color: color[0],
		            width: 0,
		            curveness: 0.2
		          }
		        },
		        data: convertData(item[1])
		      }, 
		      { //移动 点
		        name: item[0],
		        type: 'lines',
		        zlevel: 2,
		        effect: {
		          show: true,
		          period: 2,
		          trailLength: 0,
		          symbolSize: 15
		        },
		        lineStyle: {
		          normal: {
		            color: color[1],
		            width: 1,
		            opacity: 0.4,
		            curveness: 0.2
		          }
		        },
		        data: convertData(item[1])
		      }, 
		      { //省份圆点
		        name: item[0],
		        type: 'effectScatter',
		        coordinateSystem: 'geo',
		        zlevel: 2,
		        rippleEffect: {
		          brushType: 'stroke'
		        },
		        label: {
		          normal: {
		            show: true,
		            position: 'right',
		            formatter: '{b}'
		          }
		        },
		        symbolSize: 10,
		        itemStyle: {
		          normal: {
		            color: 'red'
		          }
		        },
		        data: item[1].map(function(dataItem) {
		          return {
		            name: dataItem[1].name,
		            value: geoCoordMap[dataItem[1].name].concat("<br>交易量").concat(dataItem[1].value)
		            };
		        })
		      });
		    });

		    var option = {
		      backgroundColor: 'white',
		      title: {
		        text: '',
		        subtext: '',
		        left: 'center',
		        textStyle: {
		          color: 'blue'
		        },
		        subtextStyle: {
		          color: 'yellow',
		          fontWeight: 'bold'
		        }
		      },
		      tooltip: {
		        trigger: 'item',  
		      },
		      geo: {
		        map: 'china',
		        label: {
		          emphasis: {
		            show: false
		          }
		        },
		        roam: true,
		        itemStyle: {
		          normal: {
		            areaColor: '#cccccc',
		            borderColor: '#404a59'
		          },
		          emphasis: {
		            areaColor: '#2a333d'
		          }
		        }
		      },
		      series: mySeries
		    };


		    if (option && typeof option === "object") {
		      myChart.setOption(option, true);
		    }

		    window.onresize = function() {
		      myChart.resize();
		    }
			
	}
	
}