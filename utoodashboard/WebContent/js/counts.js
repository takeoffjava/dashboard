
var table;
var BOOKING_TYPE,urlpath="http://www.utootaxi.com/utoo/service/api/admin/";
$(document)
		.ready(
				function() {
					if(localStorage.getItem("accessid")==="0" || localStorage.getItem("accessid")===0)
						window.location.href="logout_main";
					$("#username").text(localStorage.getItem("username"));
					$.fn.dataTable.pipeline = function(opts) {
						// Configuration options
						var conf = $.extend({
							pages : 5, // number of pages to cache
							method : 'GET' // Ajax HTTP method
						}, opts);
	
						// Private variables for storing the cache
						var cacheLower = -1;
						var cacheUpper = null;
						var cacheLastRequest = null;
						var cacheLastJson = null;

						return function(request, drawCallback, settings) {
							var ajax = false;
							var requestStart = request.start;
							var drawStart = request.start;
							var requestLength = request.length;
							var requestEnd = requestStart + requestLength;

							if (settings.clearCache) {
								// API requested that the cache be cleared
								ajax = true;
								settings.clearCache = false;
							} else if (cacheLower < 0
									|| requestStart < cacheLower
									|| requestEnd > cacheUpper) {
								// outside cached data - need to make a request
								ajax = true;
							} else if (JSON.stringify(request.order) !== JSON
									.stringify(cacheLastRequest.order)
									|| JSON.stringify(request.columns) !== JSON
											.stringify(cacheLastRequest.columns)
									|| JSON.stringify(request.search) !== JSON
											.stringify(cacheLastRequest.search)) {
								// properties changed (ordering, columns, searching)
								ajax = true;
							}

							// Store the request for checking next time around
							cacheLastRequest = $.extend(true, {}, request);

							if (ajax) {
								// Need data from the server
								if (requestStart < cacheLower) {
									requestStart = requestStart
											- (requestLength * (conf.pages - 1));

									if (requestStart < 0) {
										requestStart = 0;
									}
								}

								cacheLower = requestStart;
								cacheUpper = requestStart
										+ (requestLength * conf.pages);

								request.start = requestStart;
								request.length = requestLength * conf.pages;

								// Provide the same `data` options as DataTables.
								if ($.isFunction(conf.data)) {
									// As a function it is executed with the data object as an arg
									// for manipulation. If an object is returned, it is used as the
									// data object to submit
									var d = conf.data(request);
									if (d) {
										$.extend(request, d);
									}
								} else if ($.isPlainObject(conf.data)) {
									// As an object, the data given extends the default
									$.extend(request, conf.data);
								}

								settings.jqXHR = $.ajax({
									"type" : conf.method,
									"url" : conf.url,
									"data" : request,
									"pageResize": true,
									"dataType" : "json",
									"cache" : false,
									"scrollY": "200px",
									"success" : function(json) {
										cacheLastJson = $
												.extend(true, {}, json);

										if (cacheLower != drawStart) {
											json.data.splice(0, drawStart
													- cacheLower);
										}
										json.data.splice(requestLength,
												json.data.length);

										drawCallback(json);
									}
								});
							} else {
								json = $.extend(true, {}, cacheLastJson);
								json.draw = request.draw; // Update the echo for each response
								json.data.splice(0, requestStart - cacheLower);
								json.data.splice(requestLength,
										json.data.length);

								drawCallback(json);
							}
						}
					};

					// Register an API method that will empty the pipelined data, forcing an Ajax
					// fetch on the next draw (i.e. `table.clearPipeline().draw()`)
					$.fn.dataTable.Api.register('clearPipeline()', function() {
						return this.iterator('table', function(settings) {
							settings.clearCache = true;
						});
					});

					table = $('#example')
							.DataTable(
									{
										"processing" : false,
										"serverSide" : true,
										"destroy" : true,
										"ajax" : $.fn.dataTable
												.pipeline({
													url : urlpath+"getbookings_datatable",
													pages : 5
												}),
												   "fnInitComplete": function(oSettings, json) {
													   oSettings.fnDrawCallback= $("#bookingcount").text(oSettings._iRecordsTotal);
													    $("#completedBooking").text(json.bookingCount.endtrip);
														$("#cancelledBooking").text(json.bookingCount.canceltrip);
														$("#totalBooking").text(json.recordsTotal);
														$("#totalAmount").text(json.bookingCount.totalamount);
													    },
												"columns" : [{
													"data" : "pbr_number",
													"defaultContent" : ""
												},
											     {
													"data" : "bto_mobile",
													"defaultContent" : ""
												} , {
													"data" : "odrivers.driver_name",
													"defaultContent" : ""
												}, {
													"data" : "opassenger.passenger_name",
													"defaultContent" : ""
												} ,{
					                                'mRender' : function(data, type, row) {
					                                    var span_str = "";
					                                    if (row.status === 1)
					                                        span_str = '<div class=\'guide\'>Guide</div>';
					                                    else if (row.status === 2)
					                                        span_str = '<div class=\'starttrip\'>Started</div>';
					                                    else if (row.status === 3)
					                                        span_str = '<div class=\'endtrip\'>Completed</div>';
					                                    else if (row.status === 4)
					                                        span_str = '<div class=\'canceltrip\'>Cancelled</div>';
					                                    else if (row.status === 5)
					                                        span_str = '<div class=\'pending\'>Pending</div>';
					                                    else if (row.status === 0)
					                                        span_str = '<div class=\'confirmbooked\'>Confirmed</div>';
					                                    
					                                    var EditLinkText = span_str;

					                                    return EditLinkText;
					                                }
					                            } ,{
					                                'mRender' : function(data, type, row) {
					                                    var span_str = "";
					                                    if (row.booking_type === 1)
					                                        span_str = '<div class=\'guide\'>Single</div>';
					                                    else if (row.booking_type === 2)
					                                        span_str = '<div class=\'starttrip\'>BTO</div>';
					                                    else if (row.booking_type === 3)
					                                        span_str = '<div class=\'endtrip\'>Ride Later</div>';
					                                    else if (row.booking_type === 4)
					                                        span_str = '<div class=\'canceltrip\'>Long Trip</div>';
					                                    else if (row.booking_type === 5)
					                                        span_str = '<div class=\'pending\'>Quick Book</div>';
					                                    else if (row.booking_type === 6)
					                                        span_str = '<div class=\'confirmbooked\'>QR Booking</div>';
					                                    
					                                    var EditLinkText = span_str;

					                                    return EditLinkText;
					                                }
					                            }, {
									                  'mRender': function (data, type, row) {
									                	  if(row.status === 3){
									                		  var EditLinkText = '<a href="#" id="bookingmap" data-a=\''+row.booked_source+'\' data-b=\''+row.destination+'\' onclick=\'return pop_up(this);\'> <img src=\'images/markIco.png\'/></a> | <a href=\'#\' id="invoice"  onclick="return getInvoiceDetails(\''+row.booking_number+'\',\''+row.bto_name+'\',\''+row.bto_mobile+'\',\''+row.booked_source+'\',\''+row.destination+'\',\''+row.booking_type+'\');"> <img src=\'images/billIco.png\'/></a>';
									                           return EditLinkText;
									                	  }else{
									                		  var EditLinkText = '<a href="#" id="bookingmap" data-a=\''+row.booked_source+'\' data-b=\''+row.destination+'\'  onclick="return false;"> <img src=\'images/markIco.png\' style="opacity:0.2;"/></a> | <a href=\'#\' id="invoice"  onclick="return getInvoiceDetails(\''+row.booking_number+'\',\''+row.bto_name+'\',\''+row.bto_mobile+'\',\''+row.booked_source+'\',\''+row.destination+'\',\''+row.booking_type+'\');"> <img src=\'images/billIco.png\'/></a>';
									                           return EditLinkText;
									                	  }
								                           
								                  }
												}
													]
										}	
									);
					});
$(document).ready(function() 
		{		
	var d=new Date();
	var fromdate = d.toISOString().substring(0, 10);
	var date=fromdate.replace('/', '-');
	var datefinal=date.replace('/', '-');
	table = $('#example')
			.DataTable(
					{
						"processing" : false,
						"serverSide" : true,
						"destroy" : true,
						"sDom": '‘<“top”t>t<tp>',
						"ordering": false,
						"ajax" : $.fn.dataTable
								.pipeline({
									url : urlpath+"getbookingsbydate/"
											+ datefinal + "/" + datefinal,
									pages : 5
								}),

								"fnInitComplete": function(oSettings, json) {
									   oSettings.fnDrawCallback= $("#bookingcount").text(oSettings._iRecordsTotal);
										    $("#today_complete").text(json.bookingCount.endtrip);
											$("#today_cancelled").text(json.bookingCount.canceltrip);
											$("#totalBooking").text(json.recordsTotal);
											$("#today_amount").text(json.bookingCount.totalamount);
									    },
								"columns" : [{
									"data" : "pbr_number",
									"defaultContent" : ""
								},
							     {
									"data" : "bto_mobile",
									"defaultContent" : ""
								} , {
									"data" : "odrivers.driver_name",
									"defaultContent" : ""
								}, {
									"data" : "opassenger.passenger_name",
									"defaultContent" : ""
								} ,{
	                                'mRender' : function(data, type, row) {
	                                    var span_str = "";
	                                    if (row.status === 1)
	                                        span_str = '<div class=\'guide\'>Guide</div>';
	                                    else if (row.status === 2)
	                                        span_str = '<div class=\'starttrip\'>Started</div>';
	                                    else if (row.status === 3)
	                                        span_str = '<div class=\'endtrip\'>Completed</div>';
	                                    else if (row.status === 4)
	                                        span_str = '<div class=\'canceltrip\'>Cancelled</div>';
	                                    else if (row.status === 5)
	                                        span_str = '<div class=\'pending\'>Pending</div>';
	                                    else if (row.status === 0)
	                                        span_str = '<div class=\'confirmbooked\'>Confirmed</div>';
	                                    var EditLinkText = span_str;

	                                    return EditLinkText;
	                                }
	                            } ,{
	                                'mRender' : function(data, type, row) {
	                                    var span_str = "";
	                                    if (row.booking_type === 1)
	                                        span_str = '<div class=\'guide\'>Single</div>';
	                                    else if (row.booking_type === 2)
	                                        span_str = '<div class=\'starttrip\'>BTO</div>';
	                                    else if (row.booking_type === 3)
	                                        span_str = '<div class=\'endtrip\'>Ride Later</div>';
	                                    else if (row.booking_type === 4)
	                                        span_str = '<div class=\'canceltrip\'>Long Trip</div>';
	                                    else if (row.booking_type === 5)
	                                        span_str = '<div class=\'pending\'>Quick Book</div>';
	                                    else if (row.booking_type === 6)
	                                        span_str = '<div class=\'confirmbooked\'>QR Booking</div>';
	                                    var EditLinkText = span_str;

	                                    return EditLinkText;
	                                }
	                            }, {
					                  'mRender': function (data, type, row) {
					                	  if(row.status === 3){
					                		  var EditLinkText = '<a href="#" id="bookingmap" data-a=\''+row.booked_source+'\' data-b=\''+row.destination+'\' onclick=\'return pop_up(this);\'> <img src=\'images/markIco.png\'/></a> | <a href=\'#\' id="invoice"  onclick="return getInvoiceDetails(\''+row.booking_number+'\',\''+row.bto_name+'\',\''+row.bto_mobile+'\',\''+row.booked_source+'\',\''+row.destination+'\',\''+row.booking_type+'\');"> <img src=\'images/billIco.png\'/></a>';
					                           return EditLinkText;
					                	  }else{
					                		  var EditLinkText = '<a href="#" id="bookingmap" data-a=\''+row.booked_source+'\' data-b=\''+row.destination+'\'  onclick="return false;"> <img src=\'images/markIco.png\' style="opacity:0.2;"/></a> | <a href=\'#\' id="invoice"  onclick="return getInvoiceDetails(\''+row.booking_number+'\',\''+row.bto_name+'\',\''+row.bto_mobile+'\',\''+row.booked_source+'\',\''+row.destination+'\',\''+row.booking_type+'\');"> <img src=\'images/billIco.png\'/></a>';
					                           return EditLinkText;
					                	  }
				                  }
								}]
						}
					);	
		});

