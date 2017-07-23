
const ø = Object.create(null);
const speaker = String.fromCodePoint('0x1f509');
const folder = String.fromCodePoint('0x1f4c1');
const keyboard = String.fromCodePoint('0x2328');
const audioCtx = new AudioContext();

let timeoutId;
const debounce = (fn, delay) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(fn, delay);
};

const logSound = (name, gain, key) => {
  console.clear();
  console.dir();
  console.dir(`${folder} ${name}`);
  console.dir(`${speaker} ${gain}`);
  console.dir(`${keyboard} [${key}]`.toUpperCase());
  debounce(console.clear, 1000);
};

const playAudio = (soundBuffer, gain) => {
  let src = audioCtx.createBufferSource();
  src.buffer = soundBuffer;
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = gain;
  src.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  src.start(0);
};

const attachTriggers = (name, {keys, gain}, soundBuffer) => {
  window.addEventListener('keydown', (e) => {
    let key = keys.find(k => {
      return k.toUpperCase().codePointAt(0) === e.keyCode;
    });
    if (key) {
      playAudio(soundBuffer, gain);
      logSound(name, gain, key);
    }
  });
};

const loadSound = (url, done) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = () => audioCtx.decodeAudioData(xhr.response, done);
  xhr.send();
};

const soundMap808 = new Map(Object.entries({
  'BD5025': {keys: ['a'], gain: 1},
  'SD1010': {keys: ['s'], gain: .3},
  'RS': {keys: ['d'], gain: .5},
  'CH': {keys: ['f', 't'], gain: .5},
  'OH50': {keys: ['g'], gain: .3},
  'CY2550': {keys: ['h'], gain: .3},
  'CY7525': {keys: ['j'], gain: .3},
  'CP': {keys: ['k'], gain: .3},
  'HC10': {keys: ['l'], gain: .3},
  'LC50': {keys: ['q'], gain: .6},
  'MA': {keys: ['w'], gain: .3},
  'SD1075': {keys: ['e'], gain: .3},
  'MT75': {keys: ['r'], gain: .7},
  'CB': {keys: ['y'], gain: .3},
  'CL': {keys: ['u'], gain: .3},
  'HT50': {keys: ['i'], gain: .3},
  'LT50': {keys: ['o'], gain: .7},
  'MC50': {keys: ['p'], gain: .4},
}));

const soundMapRock = new Map(Object.entries({
  'kick': {keys: ['d'], gain: 1},
  'snare': {keys: ['f'], gain: .7},
  'hihat': {keys: ['j', 'k'], gain: .3},
}));

const loadSoundMap = (path, soundMap) => {
  for (const [name, config] of soundMap) {
    let file = `sounds/${path}/${name}.wav`;
    loadSound(file, attachTriggers.bind(ø, name, config));
  }
};


// loadSoundMap('rock', soundMapRock);
loadSoundMap('808', soundMap808);