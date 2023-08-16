import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
player.on('timeupdate', throttle(onTimeupdate, 1000));

function onTimeupdate({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}
const time = localStorage.getItem(STORAGE_KEY) || 0;
console.log(time);

player.setCurrentTime(time);
