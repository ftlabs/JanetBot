let lastSentUpdate = 0;
const schedule = [7, 9, 11, 13, 15, 17];

function canSend() {
	const checkTime = new Date().getHours();
	const isScheduled = schedule.find(time => {
		return time === checkTime;
	});
	
	if(isScheduled && lastSentUpdate !== checkTime) {
		lastSentUpdate = checkTime;
		return true;
	}

	return false;
}

module.exports = {
	onSchedule: canSend
}