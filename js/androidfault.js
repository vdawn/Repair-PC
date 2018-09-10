//通过url截取serviceid
var faultLoc = location.href;
var n3 = faultLoc.substr(faultLoc.indexOf('?') + 1);
var faultserviceid = n3.substr(n3.indexOf('=') + 1);
console.log(faultserviceid)
$(function() {
	//	图片和对应型号
$("#padpic").attr("src",localStorage.getItem("mpic"))
$("#infoText2").html("型号："+localStorage.getItem("model"))
	$.ajax({ //获取故障
		url: 'https://www.topfix.cn/repair-api/parts/queryserver',
		type: "POST",
		data: {
			PartsService: faultserviceid,
		},
		success: function(data) {
//			console.log(data)
			$("#chooseFault").html(template("tpl2", {
				data: data
			}));
			//选择故障
			$("#chooseFault>#selFault").click(function() {
				($(this).children('img').css("display") == "none") ? $(this).children('img').css('display', 'block'): $(this).children('img').css('display', 'none');
			})
			$("#chooseFault>#selFault").eq(0).click(); //默认点击事件
		}
	});
		
		 $("#next").click(function() {
		//存储故障和价格总和
		var moreFault = [];
		var moreFaultid = [];
		var priceAll = 0;
		$("#chooseFault>#selFault").each(function() {
			if ($(this).children('img').css("display") == "block") {
				//console.log($(this).children('span').html())
				var prices = parseInt($(this).children('p').children('#price').html())
				priceAll += prices
				moreFault.push($(this).children('span').html())
				moreFaultid.push($(this).children('span').attr("data-partsId"))
					//console.log(moreFault)
				localStorage.setItem('priceAll', priceAll);
				localStorage.setItem('moreFault', JSON.stringify(moreFault));
				localStorage.setItem('moreFaultid', JSON.stringify(moreFaultid));
			}
			
			
		});
          	
		location.href = "information.html";

	})
	
	

	
})