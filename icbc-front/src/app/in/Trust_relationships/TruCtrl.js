export default ($scope, $rootScope, qService, trustRes, ToasterTool, resultsRes, BASE_URL) => {
	

	const isNull = (value) => {
    	return typeof(value) == undefined || value == null;
    };

	

	$scope.getSome = () => {
		qService.httpPost(trustRes.trustAll, {},{}, {"user1":$scope.user1,
            "user2":$scope.user2,"time":$scope.time,"money":$scope.money}).then((data) => {
	        if (data.success) {
	           $scope.data = data.data;
               console.log($scope.data);
	        } else {
	        	
	        }
	    }, (err) => {
	    	ToasterTool.error("网络错误");
	    	$scope.items = null;
	    }).finally(() => {
	        $rootScope.loading = false;
	    });
	}


	// //////  画图
	var nodes = [ { name: "用户1"    }, { name: "用户2" },
					  { name: "用户3"    }, { name: "用户4"   },
					  { name: "用户5"   }, { name: "用户6"    },
					  { name: "用户7"    } ];
					 
		var edges = [  { source : 0  , target: 1 } , { source : 0  , target: 2 } ,
					   { source : 0  , target: 3 } , { source : 1  , target: 4 } ,
					   { source : 1  , target: 5 } , { source : 1  , target: 6 }  ];	
		
		var width = 330;
		var height = 330;
		
		
		var svg = d3.select("#container")
					.append("svg")
					.attr("width",width)
					.attr("height",height);
		
		var force = d3.layout.force()
				.nodes(nodes)		//指定节点数组
				.links(edges)		//指定连线数组
				.size([width,height])	//指定范围
				.linkDistance(150)	//指定连线长度
				.charge(-400);	//相互之间的作用力

		force.start();	//开始作用

		console.log(nodes);
		console.log(edges);
		
		//添加连线		
		var svg_edges = svg.selectAll("line")
							.data(edges)
							.enter()
							.append("line")
							.style("stroke","#ccc")
							.style("stroke-width",1);
		
		var color = d3.scale.category20();
				
		//添加节点			
		var svg_nodes = svg.selectAll("circle")
							.data(nodes)
							.enter()
							.append("circle")
							.attr("r",20)
							.style("fill",function(d,i){
								return color(i);
							})
							.call(force.drag);	//使得节点能够拖动

		//添加描述节点的文字
		var svg_texts = svg.selectAll("text")
							.data(nodes)
							.enter()
							.append("text")
							.style("fill", "black")
							.attr("dx", 20)
							.attr("dy", 8)
							.text(function(d){
								return d.name;
							});
					

		force.on("tick", function(){	//对于每一个时间间隔
		
			 //更新连线坐标
			 svg_edges.attr("x1",function(d){ return d.source.x; })
			 		.attr("y1",function(d){ return d.source.y; })
			 		.attr("x2",function(d){ return d.target.x; })
			 		.attr("y2",function(d){ return d.target.y; });
			 
			 //更新节点坐标
			 svg_nodes.attr("cx",function(d){ return d.x; })
			 		.attr("cy",function(d){ return d.y; });

			 //更新文字坐标
			 svg_texts.attr("x", function(d){ return d.x; })
			 	.attr("y", function(d){ return d.y; });
		});
		  


	
};