function jQAjaxCallForJSON(servletPath, method, contentType, objectForPost,
		callBack) {
	var dataInJSON = '';

	if (objectForPost == null) {
		objectForPost = {};
	}

	if ('DELETE' != method) {
		dataInJSON = JSON.stringify(objectForPost);
		$.ajax({
			async : true,
			url : servletPath,
			type : method,
			crossDomain : true,
			beforeSend : function(jqXHR) {
				jqXHR.setRequestHeader("Content-type", contentType);

			},
			data : dataInJSON,
			dataType : 'json',
			processData : false,
			statusCode : {
				401 : function() {

					window.location = path + '/index.jsp';
				}
			},
			success : function(resultObject) {
				var callBackfunction = window[callBack];
				callBackfunction(resultObject);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				/*console.info('server error');*/
			}
		});
	}
}
function jQAjaxCallForJSON_Token(servletPath, method, contentType,
		objectForPost, callBack) {
	var dataInJSON = '';

	var accessToken = getAccessToken(getNewRefreshToken());
	
	var accessTokenVal = "bearer "+accessToken;

	// URL = path.concat(servletPath);

	if (objectForPost == null) {
		objectForPost = {};
	}

	// console.info(method);
	if ('DELETE' != method) {
		dataInJSON = JSON.stringify(objectForPost);
		$.ajax({
			async : true,
			url : servletPath,
			type : method,
			crossDomain : true,
			beforeSend : function(jqXHR) {
				jqXHR.setRequestHeader("Authorization", accessTokenVal);
				jqXHR.setRequestHeader("Content-type", contentType);
				
			},
			data : dataInJSON,
			dataType : 'json',
			processData : false,
			statusCode : {
				401 : function() {
					window.location = path + '/index.jsp';
				}
			},
			success : function(resultObject) {
				var callBackfunction = window[callBack];
				callBackfunction(resultObject);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				/* console.info('server error'); */
			}
		});
	}
}
function jQAjaxCallForAccountJSON(servletPath, method, contentType,
		objectForPost, callBack) {
	var dataInJSON = '';

	// URL = path.concat(servletPath);

	if (objectForPost == null) {
		objectForPost = {};
	}

	// console.info(method);
	if ('DELETE' != method) {
		dataInJSON = JSON.stringify(objectForPost);

		$.ajax({
			async : false,
			url : servletPath,
			type : method,
			crossDomain : true,
			beforeSend : function(jqXHR) {
				jqXHR.setRequestHeader("Content-type", contentType);

			},
			data : dataInJSON,
			dataType : 'json',
			processData : false,
			statusCode : {
				401 : function() {
					window.location = path + '/index.jsp';
				}
			},
			success : function(resultObject) {
				var callBackfunction = window[callBack];
				callBackfunction(resultObject);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				/* console.info('server error'); */
			}
		});
	}
}
function logout(){
	var accessid=localStorage.getItem("accessid");
	var objectForPost = null;
	var contentType = 'application/json; charset=utf-8';
	var servletPath = 'logout';
	var method = "POST";
		objectForPost = {	
				access_id : accessid
		};
		jQAjaxCallForAccountJSON(servletPath, method, contentType,
				objectForPost, 'logoutCallback');
}
function logoutCallback(resultobject){
	if(resultobject.status===1){
		localStorage.setItem("accessid",0);
	window.location.href="logout_main";
	}
	else
		$.amaran({'message':'Logout Error'});
}

function setcommon(){
	if(localStorage.getItem("accessid")==="0" || localStorage.getItem("accessid")===0)
		window.location.href="logout_main";
	
	var user_Type=localStorage.getItem("usertype");
	$("#usertype").text(user_Type);
	document.getElementById("welcome_name").innerHTML = "Welcome "
		+ localStorage.getItem("username");
	if(user_Type==="executive"){
		$("#createUser").hide();
		$("#create").hide();
		$("#createuser").hide();
		$("#create1").hide();
		$("#create2").hide();
		$("#updatecarmodel").hide();
		$("#updatecarfeature").hide();  
	} else if(user_Type==="admin"){
		$("#create").hide();
		$("#createuser").hide();
		$("#create1").hide();
		$("#create2").hide();
		$("#updatecarmodel").hide();
		$("#updatecarfeature").hide(); 
	}
}
function errMsg(msg)
{
	$.amaran({'message':msg});
	return false;
}
function notification(message){
	Materialize.toast(message, 4000);
	return false;
}