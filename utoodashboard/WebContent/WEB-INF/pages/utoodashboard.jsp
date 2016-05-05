<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>UTOO DASHBOARD</title>

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
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/DateTimePicker.css" />
    <!-- <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/> -->
    <link rel="stylesheet" href="css/U2Popup.css" />
     <link rel="stylesheet" href="css/amaran.min.css">
</head>

<body>

    <div>
        <div id="page-wrapper">

            <div class="container-fluid">

                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-12">
                        <h2 class="page-header">
                             <div class="header_font"> <img width="80" class="" src="img/utooico.png"> UTOO <small class="line">Dashboard</small>
                             <div style="float:right;font-size:14px;padding-right:10px">WELCOME <span id="username" ></span>!!  <a href="javascript:void(0);" style="padding-left:10px;" onclick="return logout();"><i class="fa fa-sign-out "><small></small></i> LOGOUT</a></div>
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                            <h1 class="page-header">
                                 <div class="">Today's Status</div>
                            </h1>                        
                        </div> 
                </div>
                <div class="row">                    
                                           
                    <div class="col-lg-4 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">                                    
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-inr fa-5x"><small></small></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge" id="today_amount"></div>
                                        <div>Earned</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-book fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge" id="today_complete"></div>
                                        <div>Bookings Completed</div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="panel panel-yellow">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-remove fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge" id="today_cancelled"></div>
                                        <div>Bookings Cancelled</div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                  
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                            <h1 class="page-header">
                                 <div class="">Overall Status</div>
                            </h1>                        
                        </div> 
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="panel panel-good_green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-inr fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge" id="totalAmount"></div>
                                        <div>Earned</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="panel panel-pink">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-book fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge" id="completedBooking"></div>
                                        <div>Bookings Completed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="panel panel-craker">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-remove fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge" id="cancelledBooking"></div>
                                        <div>Bookings Cancelled</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="display:none;">
<table id="example" class="display" cellspacing="0" width="100%" >
				<thead>
					<tr>
						<th>PBR Number</th>
						<th>Mobile</th>
						<th>Driver Name</th>
						<th>Passenger Name</th>
						<th>Booking Status</th>
						<th>Booking Type</th>
						<th>Map / Invoice</th>
						</tr>
				</thead>				
			</table>
			</div>
			<div style="display:none;">
<table id="date" class="display" cellspacing="0" width="100%" >
				<thead>
					<tr>
						<th>PBR Number</th>
						<th>Mobile</th>
						<th>Driver Name</th>
						<th>Passenger Name</th>
						<th>Booking Status</th>
						<th>Booking Type</th>
						<th>Map / Invoice</th>
						</tr>
				</thead>				
			</table>
			</div>
    <!-- jQuery -->
   <!--  <script src="js/jquery.js"></script> -->
<script src="js/plugins/jquery-1.11.1.min.js"></script>
 <script src="js/jquery.dataTables.min.js"></script>
 <script src="js/plugins/utilities.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
     <script src="js/counts.js"></script>

</body>
</html>