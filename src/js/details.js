require(["config"], function(){
	require(["jquery","template","load"], function($,template){
		$(function(){
			//轮播图
			  var i=0;
			  var timer=null;
			  for (var j = 0; j < $('.cf li').length; j++) { //创建圆点
			   $('.cf_list').append('<li></li>')
			  }
			  $('.cf_list').addClass('cf_list_style');
			  //给li设置样式
			  $('.cf_list li').addClass('cf_list_li_style');
			  $('.cf_list li').first().addClass('choose_bd'); //给第一个圆点添加样式
			  var firstimg=$('.cf li').first().clone(); //复制第一张图片
			  $('.cf').append(firstimg).width($('.cf li').length*($('.cf img').width())); //将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度

			  // 下一个按钮
			  $('.next').click(function(){
			   i++;
			   if (i==$('.cf li').length) {
			    i=1; //这里不是i=0
			    $('.cf').css({left:0}); //保证无缝轮播，设置left值
			   };
			  
			   $('.cf').stop().animate({left:-i*350},300);
			   if (i==$('.cf li').length-1) {  //设置小圆点指示
			    $('.cf_list li').eq(0).addClass('choose_bd').siblings().removeClass('choose_bd');
			   }else{
			    $('.cf_list li').eq(i).addClass('choose_bd').siblings().removeClass('choose_bd');
			   }
			     
			  })
			  
			  // 上一个按钮
			  $('.prve').click(function(){
			   i--;
			   if (i==-1) {
			    i=$('.cf li').length-2;
			    $('.cf').css({left:-($('.cf li').length-1)*350});
			   }
			   $('.cf').stop().animate({left:-i*350},300);
			   $('.cf_list li').eq(i).addClass('choose_bd').siblings().removeClass('choose_bd');
			  })
			  //鼠标划入圆点
			  $('.cf_list li').mouseover(function(){
			   var _index=$(this).index();
			   $('.cf').stop().animate({left:-_index*350},300);
			   $('.cf_list li').eq(_index).addClass('choose_bd').siblings().removeClass('choose_bd');
			  })
			  
			  //定时器自动播放
			  timer=setInterval(function(){
			   i++;
			   if (i==$('.cf li').length) {
			    i=1;
			    $('.cf').css({left:0});
			   };
			  
			   $('.cf').stop().animate({left:-i*350},300);
			   if (i==$('.cf li').length-1) { 
			    $('.cf_list li').eq(0).addClass('choose_bd').siblings().removeClass('choose_bd');
			   }else{
			    $('.cf_list li').eq(i).addClass('choose_bd').siblings().removeClass('choose_bd');
			   }
			  },3000)
			  
			  //鼠标移入，暂停自动播放，移出，开始自动播放
			  $('.mod').hover(function(){ 
			   clearInterval(timer);
			  },function(){
			   timer=setInterval(function(){
			   i++;
			   if (i==$('.cf li').length) {
			    i=1;
			    $('.cf').css({left:0});
			   };
			  
			   $('.cf').stop().animate({left:-i*350},300);
			   if (i==$('.cf li').length-1) { 
			    $('.cf_list li').eq(0).addClass('choose_bd').siblings().removeClass('choose_bd');
			   }else{
			    $('.cf_list li').eq(i).addClass('choose_bd').siblings().removeClass('choose_bd');
			   }
			  },3000)
		 	 })

			//选择颜色添加样式
			$(".choose .choose_color:first-child").addClass('bk');
			$(".choose .choose_color").click(function(){
				$(this).addClass("bk").siblings().removeClass("bk")
			});
			//点击加减数值
			var num = $(".inpt").val();
			$(".jian").click(function(){
				num--;
				if (num < 1) {
				num = 1;	
				}
				$(".inpt").val(num);
				
			});
			$(".jia").click(function(){
				num++;
				$(".inpt").val(num);
			})
			//点击立即购买
			$(".buyall").click(function(){
				
			})
		
			// 查找 color 所表示的商品在 products 中位置
			function exist(color, products) {
			var idx = -1;
			$.each(products, function(index, elemenet){
				if (elemenet.color == color) {
					idx = index;
					return false;
				}
			});

			return idx;
		}	
			// cookie 配置
			$.cookie.json = true;

			//点击加入购物车
			$(".addbuy").click(function(){
				//事件根元素
				var _box = $(this).parents(".middle");
				//创建对象保存cookie
				var prod = {
					 color : _box.find(".bk .colorname").text(),
					 name : _box.find("#p_name").text(),
					 img : _box.find(".bk img").attr("src"),
					 amount :_box.find(".inpt").val(),
					 money : parseFloat(_box.find(".money i").text().substr(1))
				};
				//查找cookie已有结构
				var _product = $.cookie('product') || [];
				console.log(_product)
				//判断当选商品是否在数组中已经存在
				var index = exist(prod.color,_product); 
				if(index === -1){
					// 将当前选购商品保存到数组中
					_product.push(prod);					
					} else {
					// 将已选购商品的数量自增
					_product[index].amount++;
				}
				//保存回数组中
				$.cookie('product',_product,{expires:7, path:"/"})
			})
		})
	});
});