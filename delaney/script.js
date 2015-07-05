var TARGET_1 = new Date('June 16, 2015 00:00:00');
var TARGET_2 = new Date('July 10, 2015 23:30:00');
var TARGET_3 = new Date('August 16, 2015 18:30:00');

window.onload = function() {
	showTarget(1, TARGET_1);
	showTarget(2, TARGET_2);
	showTarget(3, TARGET_3);
	
	doUpdate();
};

window.setInterval(function(){
	doUpdate();
}, 1000);

function CountdownValue(targetDate) {
	var currentDate = new Date();
	
	this.months = this.days = this.hours = this.minutes = this.seconds = 0;
	
	var dMonth = targetDate.getMonth() - currentDate.getMonth();
	this.months = Math.abs(dMonth);
	if (dMonth < 0) {
		this.months = 0;
		return;
	}
	
	var dDate = targetDate.getDate() - currentDate.getDate();
	this.days = Math.abs(dDate);
	if (dMonth < 0 && dDate < 0) {
		this.days = 0;
		return;
	}
	
	var dHours = targetDate.getHours() - currentDate.getHours();
	var dMinutes = targetDate.getMinutes() - currentDate.getMinutes();
	var dSeconds = targetDate.getSeconds() - currentDate.getSeconds();
	
	if (dSeconds < 0) {
		dMinutes -= 1;
	}
	if (dMinutes < 0) {
		dHours -= 1;
	}
	
	if (dHours < 0) {
		this.hours = dHours + 24;
	} else {
		this.hours = dHours;
	}
	if (dMinutes < 0) {
		this.minutes = dMinutes + 60;
	} else {
		this.minutes = dMinutes;
	}
	if (dSeconds < 0) {
		this.seconds = dSeconds + 60;
	} else {
		this.seconds = dSeconds;
	}
};

// countdown: Integer corresponding to the countdown
// value: actual time to input
function updateCountdown(countdown, value) {
	var monthDiv = document.getElementById('months'+countdown);
	var dayDiv = document.getElementById('days'+countdown);
	var hourDiv = document.getElementById('hours'+countdown);
	var minuteDiv = document.getElementById('minutes'+countdown);
	var secondDiv = document.getElementById('seconds'+countdown);
	
	monthDiv.innerHTML = value.months;
	dayDiv.innerHTML = value.days;
	hourDiv.innerHTML = value.hours;
	minuteDiv.innerHTML = value.minutes;
	secondDiv.innerHTML = value.seconds;
};

function doUpdate() {
	var cv1 = new CountdownValue(TARGET_1);
	var cv2 = new CountdownValue(TARGET_2);
	var cv3 = new CountdownValue(TARGET_3);
	
	updateCountdown(1, cv1);
	updateCountdown(2, cv2);
	updateCountdown(3, cv3);
};

function showTarget(index, date) {
	var untilDiv = document.getElementById('until'+index);
	
	var monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
	
	var month = monthNames[date.getMonth()];
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	
	if (hour < 10) hour = '0' + hour;
	if (minute < 10) minute = '0' + minute;
	
	var output = month + '&nbsp;' + day + ' (' + hour + ':' + minute + ')';
	untilDiv.innerHTML = output;
}