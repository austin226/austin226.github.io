var TARGET_1 = new Date('June 16, 2015 00:00:00');
var TARGET_2 = new Date('July 10, 2015 00:00:00');
var TARGET_3 = new Date('August 16, 2015 00:00:00');

window.setInterval(function(){
	doUpdate();
}, 1000);

function CountdownValue(targetDate) {
	var currentDate = new Date();
	
	this.months = targetDate.getMonth() - currentDate.getMonth();
	this.days = targetDate.getDate() - currentDate.getDate();
	this.hours = targetDate.getHours() - currentDate.getHours();
	this.minutes = targetDate.getMinutes() - currentDate.getMinutes();
	this.seconds = targetDate.getSeconds() - currentDate.getSeconds();
}

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
}

function doUpdate() {
	var cv1 = new CountdownValue(TARGET_1);
	var cv2 = new CountdownValue(TARGET_2);
	var cv3 = new CountdownValue(TARGET_3);
	
	updateCountdown(1, cv1);
	updateCountdown(2, cv2);
	updateCountdown(3, cv3);
}