/*This script for avoid back button in browser*/
window.history.forward();
function noBack() {
	window.history.forward();
}
function inputKeyUp(e) {
	e.which = e.which || e.keyCode;
	if (e.which == 13) {
		login();		
	}
}

function inputKeyUpotp(e) {
	e.which = e.which || e.keyCode;
	if (e.which == 13) {
		otpverification();		
	}
}

/* Mobilenumber Validation JQuery keycode and QRCode advance amount & Allow only numbers*/
$('#mobilenumber').keypress(function(e) {
	if ((e.which >= 32 && e.which <= 47) || (e.which >= 58 && e.which <= 126))		
		return false;	
});

/* Password Validation JQuery keycode */
$('#password').keypress(
		function(e) {
			if (e.which === 32 || e.which === 34 || e.which === 37
					|| e.which === 38 || e.which === 39 || e.which === 40
					|| e.which === 41 || e.which === 43 || e.which === 44
					|| e.which === 47 || e.which === 58 || e.which === 59
					|| e.which === 60 || e.which === 61 || e.which === 62
					|| e.which === 63 || e.which === 91 || e.which === 93
					|| e.which === 94 || e.which === 96 || e.which === 123
					|| e.which === 124 || e.which === 125 || e.which === 126)
				return false;
		});

/* OTP Validation JQuery keycode */
$('#otp_password').keypress(
		function(e) {
			if ((e.which >= 32 && e.which <= 47)
					|| (e.which >= 58 && e.which <= 64)
					|| (e.which >= 91 && e.which <= 96)
					|| (e.which >= 123 && e.which <= 126))
				return false;
		});

/* OTP popup text box clear jquery */
$("#otpverification,#resendotp").on('click', function() {
	$('input[type="text"]').val('');
});