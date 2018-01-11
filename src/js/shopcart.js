require(["config"], function(){
	require(["jquery","template","load"], function($,template){
		//配置cookie
		$.cookie.json = true;
		//读取cookie数据
		var _product = $.cookie("product") || [];
		//判断
		if(_product.length === 0){
			alert("购物车为空 请选购商品");
		} 
		console.log(_product[0].amount);
		/* 将购物车中保存的商品渲染显示到页面中 */
		var html = template("cart_template", {products: _product});
		$(".shopping_pay").html(html);
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
		//删除选购商品
		$(".shopping_pay").on("click", ".del", function(){
			if (confirm("确认删除？")){
				// 当前“删除”链接所在行
				var _row = $(this).parents(".product");
				// 获取当前删除商品的 id
				var _id = _row.children(".id").text();
				// 当前删除商品在所有数组元素中的下标
				var index = exist(_id, _product);
				// 删除数组中对应下标处元素
				_product.splice(index, 1);
				// 保存回 cookie 中
				$.cookie("product", _product, {expires:7, path:"/"});
				// 从页面删除DOM元素
				_row.remove();	
				// 计算合计
				calcTotal();		
			}
		});
		/* 修改商品数量 */
		$(".shopping_pay").on("click", ".add,.minus", function(){
			// 当前“+/-”所在行
			var _row = $(this).parents(".product");
			// 获取当前删除商品的 id
			var _color = _row.find(".color").text();
			// 当前删除商品在所有数组元素中的下标
			var index = exist(_color, _product);
			// 当前行所对应的商品对象
			var _prod = _product[index];
			if ($(this).is(".add")) { // 数量加			
				_prod.amount++;
			} else { // 数量减
				if (_prod.amount <= 1)
					return;
				_prod.amount--;
			}
			// console.log(index)
			// 保存回 cookie 中
			$.cookie("product", _product, {expires:7, path:"/"});
			// 显示修改后的数量
			_row.find(".amount_num").val(_prod.amount);
			// 显示小计
			_row.find(".sub").text(_prod.amount * +_prod.money+'.00');
			console.log(_prod.money)
			// 计算合计money
			calcTotal();
			/* 计算合计 */
		function calcTotal() {
			// 获取所有选中的商品行前的复选框
			var sum = 0;
			$(".ck_product:checked").each(function(index, element){
				sum += Number($(this).parents(".product").find(".sub").text())
			});
			$(".total .paymoney").text(sum.toFixed(2));
		}
		});
	});
});