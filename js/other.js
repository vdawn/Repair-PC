$(function() {
	var fastName;
	var fastPhone;
	var fastCode;
	var fastName;
	var countdown = 60;
//获取姓名，电话，验证码，详细地址
	$("#fastName").blur(function() {
		fastName = $("#fastName").val()
	})
	$("#fastPhone").blur(function() {
		fastPhone = $("#fastPhone").val()
	})
	$("#fastCode").blur(function() {
		fastCode = $("#fastCode").val()
	})
	//获取验证码
	$("#saveCode").click(function() {
		console.log(fastPhone)
			var obj = $("#saveCode");
			if (fastPhone == "" || fastPhone == undefined) {
			} else {
				settime(obj);
				$.ajax({
					url: 'https://www.topfix.cn/repair-api/sms/out',
					type: "POST",
					xhrFields: {      
						withCredentials: true    
					},
					crossDomain: true,
					data: {
						Phone: fastPhone,
					},
					success: function(data) {
//						console.log("获取验证码" + data)
					}
				});
			}
		})
		//确定下单
	$("#confirm").click(function(){
//		console.log(fastCode)
		$.ajax({ //校验验证码
				url: 'https://www.topfix.cn/repair-api/sms/Verification',
				xhrFields: {      
					withCredentials: true    
				},
				crossDomain: true,
				type: "POST",
				data: {
					Verification: fastCode,
				},
				success: function(data) {
//					console.log("校验验证码" + data)
					if (data == "ok") {
							//下单
						$.ajax({
							url: 'https://www.topfix.cn/repair-api/order/Quick',
							type: "POST",
							headers: {
								"Content-Type": "application/json;charset=utf-8",
							},
							xhrFields: {      
								withCredentials: true    
							},
							crossDomain: true,
							data: {
								name:fastName
							},
							success: function(data){
//								console.log("下单"+data)
								if (data == "ok") {
									location.href = "finish.html";
								}
							}
						});
					}
				}
			});
	})
	
	
		function settime(obj) { //发送验证码倒计时
		if (countdown == 0) {
			obj.attr('disabled', false);
			//obj.removeattr("disabled"); 
			obj.val("获取验证码");
			countdown = 60;
			return;
		} else {
			obj.attr('disabled', true);
			obj.val("重新发送(" + countdown + ")");
			countdown--;
		}
		setTimeout(function() {
			settime(obj)
		}, 1000)
	}
})