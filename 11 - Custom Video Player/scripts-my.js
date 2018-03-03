const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const bar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skips=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');

function togglePlay(){
	video.paused?video.play():video.pause();
}
function updateButton(){
	toggle.textContent=this.paused?'>>':'||';
}
function skip(){
	video.currentTime+=parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
	video[this.name]=this.value;
}
function handleProgress(){
	const p=video.currentTime/video.duration*100;
	bar.style.flexBasis=`${p}%`;
}
function clickBar(e){
	video.currentTime=e.offsetX/progress.offsetWidth*video.duration;
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);
skips.forEach(x=>x.addEventListener('click',skip));
ranges.forEach(x=>x.addEventListener('change',handleRangeUpdate));
ranges.forEach(x=>x.addEventListener('mousemove',handleRangeUpdate));
let mousedown=false;
progress.addEventListener('click',clickBar);
progress.addEventListener('mousemove',(e)=>mousedown&&clickBar(e));
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);

