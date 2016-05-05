function login(){
	
	var objectForPost = null;
	var contentType = 'application/json; charset=utf-8';
	var servletPath = 'login';
	var mobile=document.getElementById("mobilenumber").value;
	var password=document.getElementById("password").value;
	var method = "POST";
	if(mobile==""){
		
		$.amaran({'message':'Mobilenumber should not be empty!'});
		return false;
		}else if (mobile.length < 10) {
		
			$.amaran({'message':'please enter a valid mobile number'});
			return false;
		} else if ($("#mobilenumber").val().substr(0, 1) != "7"
				&& $("#mobilenumber").val().substr(0, 1) != "8"
				&& $("#mobilenumber").val().substr(0, 1) != "9") {
			
			$.amaran({'message':'Please enter a valid mobile number'});
			return false;
		}else if(password==""){
			$.amaran({'message':'Password should not be empty...!'});
			return false;
		}
	
		objectForPost = {				
				mobile : mobile,
				password : password
		};
		jQAjaxCallForAccountJSON(servletPath, method, contentType,
				objectForPost, 'loginCallback');
}
function loginCallback(resultobject){
	if(resultobject.status===0){
		$.amaran({'message':'Invalid Credentials'});
		return false;
	}else{
		  
		   if(resultobject.response.objuser_type.usertype_name==="superuser"){
			   localStorage.setItem("accessid", resultobject.response.access_id);
			   localStorage.setItem("username", resultobject.response.username);
			   $("#loginForm").hide();
	            $("#otpForm").show();
		   
		   }
		   else
		   window.location.href="utoodashboard";
		
	}
}
function otpverification()
{
	var superuserotp=$("#otp_password").val();
	if(superuserotp==="")
	$.amaran({'message':'Invalid OTP'});
	
	var objectForPost = null;
	var contentType = 'application/json; charset=utf-8';
	var servletPath = "";
	var method = "POST";
	
		servletPath = 'verifyotp';
		objectForPost = {
				access_id: localStorage.getItem("accessid"),
				superuser_otp:superuserotp
			
		};
	
	jQAjaxCallForAccountJSON(servletPath, method, contentType, objectForPost,
			'getOtpCallback');
}

function getOtpCallback(resultObject)
{
	
	if(resultObject.status===1)
		{
	    window.location.href="utoodashboard";
		}
	else
		{
		errMsg("Invalid OTP");
		}
	
}