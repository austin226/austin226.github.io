var TARGET_1 = new Date('June 16, 2015 00:00:00');
var TARGET_2 = new Date('July 10, 2015 00:00:00');
var TARGET_3 = new Date('August 16, 2015 00:00:00');

window.setInterval(function(){
	doUpdate();
}, 1000);

function CountdownValue(targetDate) {
	var currentDate = new Date();
	
	this.weeks = targetDate.weeks - currentDate.weeks;
	this.days = targetDate.days - currentDate.days;
	this.hours = targetDate.hours - currentDate.hours;
	this.minutes = targetDate.minutes - currentDate.minutes;
	this.seconds = targetDate.seconds - currentDate.seconds;
}

// countdown: Integer corresponding to the countdown
// value: actual time to input
function updateCountdown(countdown, value) {
	var weekDiv = document.getElementById('week'+countdown);
	var dayDiv = document.getElementById('day'+countdown);
	var hourDiv = document.getElementById('hour'+countdown);
	var minuteDiv = document.getElementById('minute'+countdown);
	var secondDiv = document.getElementById('second'+countdown);
	
	weekDiv.innerHTML = value.weeks;
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