<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>UTOO DASHBOARD</title>
    <style type="text/css">
     body {
        background: #f0f0f0 !important;
     }
    </style>
    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <!-- <link href="css/plugins/morris.css" rel="stylesheet">-->

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- Fav Icon -->
    <link rel="SHORTCUT ICON" type="image/x-icon" href="img/UTOO logo.ico">
   
<link href="css/amaran.min.css" type="text/css" rel="stylesheet" media="screen,projection"/>
</head>

<body onload="noBack();" onpageshow="if(event.persisted) noBack();" onunload="">


<div id="page-wrapper">

            <div class="container-fluid">

                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-4"></div>
                    <div class="col-lg-4">
                        <!--login-->
                            <div class="loginCont">
                                <div class="logoIco">
                                <img src="img/utooico.png" class="" width="80" />
                                <h2 class="page-header" style="margin-top:20px;">UTOO <small>Dashboard Login</small></h2>
                                </div>
                                
                                <!---Hide after Login to get otp-->   

                                 <div id="loginForm">   
                                <div class="form-group">
                                <label>Mobile</label>
                                <input class="form-control" type="text" placeholder="Enter Mobile Number" maxlength="10" id="mobilenumber">
                            </div>
                                <div class="form-group">
                                <label>Password</label>
                                <input class="form-control" type="password" placeholder="Enter Password" id="password" onkeyup="inputKeyUp(event)">
                            </div>
                            <button type="button" class="btn btn-lg btn-warning" style="width:100%;margin-top:10px" id="loginBtn">Login</button>

                            </div>
                            <!---end of login form to gfet otp-->
                                <!--otp form -->
                                    <div id="otpForm">
                                         <div class="form-group">
                                <label>One Time Password</label>
                                <input class="form-control" type="text" placeholder="Enter OTP" maxlength="6" id="otp_password" onkeyup="inputKeyUpotp(event)">
                            </div>
                            <button type="button" class="btn btn-lg btn-warning" style="width:100%;margin-top:10px" onclick="return otpverification();">Submit</button>
                                    </div>
                                 <!--end of otp form -->   

                            </div>

                    </div>
                    <div class="col-lg-4"></div>
                </div>

                </div>
            </div>
    
<script src="js/plugins/jquery-1.11.1.min.js"></script>
    <!-- jQuery -->
    <script src="js/plugins/gendral.js"></script>
    <script src="js/plugins/utilities.js"></script>
    <script src="js/plugins/jquery.amaran.js"></script>
    <script src="js/login.js"></script>
    

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <script>
    $(document).ready(function() { 
        $("#loginBtn").click(function() {
           login();

        });
    })
    </script>
</body>
</html>