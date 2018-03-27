let countdown;
const timerDisplay=document.querySelector('.display__time-left');
const endTime=document.querySelector('.display__end-time');
const buttons=document.querySelectorAll('[data-time]');
function timer(s){
	clearInterval(countdown);
	const now=Date.now();
	const then=now+s*1000;
	displayTimeLeft(s);
	displayEndTime(then);
	countdown=setInterval(()=>{
		const secondsLeft=Math.round((then-Date.now())/1000);
		if (secondsLeft<0){
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	},1000);
}
function displayTimeLeft(s){
	const min=Math.floor(s/60);
	const sec=s%60;
	const display=`${min}:${sec<10?'0':''}${sec}`;
	document.title=display;
	timerDisplay.textContent=display;
}
function displayEndTime(t){
	const end=new Date(t);
	const hour=end.getHours();
	const hh=hour>12?hour-12:hour;
	const mm=end.getMinutes();
	endTime.textContent=`Be Back At ${hh}:${mm<10?'0':''}${mm}`;
}
function startTimer(){
	const s=parseInt(this.dataset.time);
	timer(s);
}
buttons.forEach(x=>x.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',(e)=>{
	e.preventDefault();
	const m=this.minutes.value;
	timer(m*60);
	this.reset();
});
