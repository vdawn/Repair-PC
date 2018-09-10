$(function() {
	var name;
	var phone;
	var code;
	var address;
	var countdown = 60;
	//取机型,对应id,故障，故障id和总价
	var model = localStorage.getItem('model');
	var serviceid = localStorage.getItem('serviceid');
	var moreFault = JSON.parse(localStorage.getItem('moreFault'));
	var moreFaultid = JSON.parse(localStorage.getItem('moreFaultid'));
	var priceAll = localStorage.getItem('priceAll');
	
	$("#modelText").html(localStorage.getItem('model'))
	$("#priceAll").html(localStorage.getItem('priceAll'))
	$("#moreFault").html(template("tpl1", {
		moreFault: moreFault
	}));
	//获取姓名，电话，验证码，详细地址
	$("#name").blur(function() {
		name = $("#name").val()
	})
	$("#phone").blur(function() {
		phone = $("#phone").val()
	})
	$("#code").blur(function() {
		code = $("#code").val()
	})
	$("#address").blur(function() {
		address = $("#address").val()
	})
	//获取验证码
	$("#saveCode").click(function() {
			var obj = $("#saveCode");
			if (phone == "" || phone == undefined) {
				$("#phoneTips").children('span').text("! 手机号不能为空");
				setTimeout(function() {
					$("#phoneTips").children('span').text("");
				}, 3000);
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
						Phone: phone,
					},
					success: function(data) {
//						console.log("获取验证码" + data)
					}
				});
			}
		})
		//确定下单
	$("#confirm").click(function() {
		//console.log(code)
		//获取地区
		var selectArea = $('#selectArea option:selected').text();
		if (code == "" || code == undefined) {
			$("#codeTips").children('span').text("! 验证码不能为空");
			setTimeout(function() {
				$("#codeTips").children('span').text("");
			}, 3000);
		} else {
			$.ajax({ //校验验证码
				url: 'https://www.topfix.cn/repair-api/sms/Verification',
				xhrFields: {      
					withCredentials: true    
				},
				crossDomain: true,
				type: "POST",
				data: {
					Verification: code,
				},
				success: function(data) {
//					console.log("校验验证码" + data)
					if (data == "ok") {
						// console.log(serviceid)
						// console.log(priceAll)
						// console.log(moreFaultid)
						// console.log(name)
						// console.log(selectArea + address)
							//下单
						var datas = {
							"serviceid": serviceid, //机型对应的id
							"prices": priceAll, //总价
							"partsidArr": moreFaultid, //故障类型id
							"name": name, //姓名
							"address": selectArea + address //地区+详细地址
						}
						$.ajax({
							url: 'https://www.topfix.cn/repair-api/order/add',
							type: "POST",
							headers: {
								"Content-Type": "application/json;charset=utf-8",
							},
							xhrFields: {      
								withCredentials: true    
							},
							crossDomain: true,
//							dataType: 'json',
							data: JSON.stringify(datas),
							success: function(data){
//								console.log(data)
								if (data == "ok") {
									location.href = "finish.html";
								}
							}
						});
					}else{
						$("#codeTips").children('span').text("! 验证码错误，请重新发送");
					}
				}
			});
		}
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