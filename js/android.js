$(function() {
	$.ajax({ //得到所有安卓机型
		url: 'https://www.topfix.cn/repair-api/business/queryserver',
		type: "POST",
		data: {
			pid: 5,
		},
		success: function(data) {
//			console.log(data)
			$("#brand").html(template("tpl1", {
				data: data
			}));
			$("#brand div").click(function() {
			var	serviceid1 = $(this).context.dataset.serviceid
				$(this).css({
					"color": "#fff",
					"background-color": "#f83f4d"
				});
				$(this).siblings().css({
					"color": "#666",
					"background-color": "#fff"
				});
				$.ajax({
					url: 'https://www.topfix.cn/repair-api/business/queryserver',
					type: "POST",
					data: {
						pid: serviceid1,
					},
					success: function(data) {
//						console.log(data)
						$("#type").html(template("tpl2", {
							data: data
						}));
						//切换选择图片
						$("#type div").click(function() {
							$(this).css({
								"color": "#fff",
								"background-color": "#f83f4d"
							});
							$(this).siblings().css({
								"color": "#666",
								"background-color": "#fff"
							});
						})
                        $("#type div").eq(0).click(); //默认点击事件
					}
				});

			})
			$("#brand div").eq(0).click(); //默认点击事件
		}
	});
	$("#next").click(function() {
		var serviceid ="";
		$("#type div").each(function() {
			if ($(this).css("background-color") == "rgb(248, 63, 77)") {
					//存储机型,机型id和图片
					serviceid =$(this).context.dataset.serviceid;
					localStorage.setItem("serviceid", serviceid);
					localStorage.setItem("model", $(this).html());
					localStorage.setItem("mpic", $(this).context.dataset.mpic);
			}
		});
		location.href = "androidfault.html?"+"serviceid=" + serviceid;
	})
})