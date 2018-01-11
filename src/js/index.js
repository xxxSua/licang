require(["config"], function(){
	require(["jquery", "template","load"], function($,template){
		 $(function(){
			  var i=0;
			  var timer=null;
			  for (var j = 0; j < $('.carousel_img li').length; j++) { //创建圆点
			   $('.pages').append('<li></li>')
			  }
			  $('.pages').addClass('pages_style');
			  //给li设置样式
			  $('.pages li').addClass('pages_li_style');
			  $('.pages li').first().addClass('pages_li_first'); //给第一个圆点添加样式
			  var firstimg=$('.carousel_img li').first().clone(); //复制第一张图片
			  $('.carousel_img').append(firstimg).width($('.carousel_img li').length*($('.carousel_img img').width())); //将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度

			  // 下一个按钮
			  $('.next').click(function(){
			   i++;
			   if (i==$('.carousel_img li').length) {
			    i=1; //这里不是i=0
			    $('.carousel_img').css({left:0}); //保证无缝轮播，设置left值
			   };
			  
			   $('.carousel_img').stop().animate({left:-i*1073.55},300);
			   if (i==$('.carousel_img li').length-1) {  //设置小圆点指示
			    $('.pages li').eq(0).addClass('pages_li_first').siblings().removeClass('pages_li_first');
			   }else{
			    $('.pages li').eq(i).addClass('pages_li_first').siblings().removeClass('pages_li_first');
			   }
			     
			  })
			  
			  // 上一个按钮
			  $('.prve').click(function(){
			   i--;
			   if (i==-1) {
			    i=$('.carousel_img li').length-2;
			    $('.carousel_img').css({left:-($('.carousel_img li').length-1)*1073.55});
			   }
			   $('.carousel_img').stop().animate({left:-i*1073.55},300);
			   $('.pages li').eq(i).addClass('pages_li_first').siblings().removeClass('pages_li_first');
			  })
			  //鼠标划入圆点
			  $('.pages li').mouseover(function(){
			   var _index=$(this).index();
			   $('.carousel_img').stop().animate({left:-_index*1073.55},300);
			   $('.pages li').eq(_index).addClass('pages_li_first').siblings().removeClass('pages_li_first');
			  })
			  
			  //定时器自动播放
			  timer=setInterval(function(){
			   i++;
			   if (i==$('.carousel_img li').length) {
			    i=1;
			    $('.carousel_img').css({left:0});
			   };
			  
			   $('.carousel_img').stop().animate({left:-i*1073.55},300);
			   if (i==$('.carousel_img li').length-1) { 
			    $('.pages li').eq(0).addClass('pages_li_first').siblings().removeClass('pages_li_first');
			   }else{
			    $('.pages li').eq(i).addClass('pages_li_first').siblings().removeClass('pages_li_first');
			   }
			  },3000)
			  
			  //鼠标移入，暂停自动播放，移出，开始自动播放
			  $('.mycarousel').hover(function(){ 
			   clearInterval(timer);
			  },function(){
			   timer=setInterval(function(){
			   i++;
			   if (i==$('.carousel_img li').length) {
			    i=1;
			    $('.carousel_img').css({left:0});
			   };
			  
			   $('.carousel_img').stop().animate({left:-i*1073.55},300);
			   if (i==$('.carousel_img li').length-1) { 
			    $('.pages li').eq(0).addClass('pages_li_first').siblings().removeClass('pages_li_first');
			   }else{
			    $('.pages li').eq(i).addClass('pages_li_first').siblings().removeClass('pages_li_first');
			   }
			  },3000)
		 	 })
		 });
		 // 异步加载列表页面数据，使用模板引擎渲染
		 $.getJSON('../mock/goods.json', function(data) {
		 	// 准备渲染数据
		 	var renderData = {products : data.res_body.data};
		 	var html = template("list_template",renderData);
		 	$(".shoplist").html(html);	
		 });
	});
});