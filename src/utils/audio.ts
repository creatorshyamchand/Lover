// Audio Player for Romantic Love Song Track

let bgAudio: HTMLAudioElement | null = null;
let isMusicPlaying = false;

const listeners: Set<(isPlaying: boolean) => void> = new Set();

export function subscribeMusicState(listener: (isPlaying: boolean) => void) {
  listeners.add(listener);
  listener(isMusicPlaying);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => fn(isMusicPlaying));
}

function getBgAudio(): HTMLAudioElement {
  if (!bgAudio) {
    bgAudio = new Audio();
    bgAudio.crossOrigin = 'anonymous';
    // Loads custom song from /public/song/song.mp3
    const customSongPath = '/song/song.mp3';
    const fallbackSrc = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3';

    bgAudio.src = customSongPath;
    bgAudio.loop = true; // Repeated automatically when finished
    bgAudio.volume = 0.8;

    bgAudio.onerror = () => {
      // If /song/song.mp3 is missing or not yet uploaded, use gentle fallback
      if (bgAudio && !bgAudio.src.includes(fallbackSrc)) {
        console.log('Using default romantic music until /public/song/song.mp3 is uploaded.');
        bgAudio.src = fallbackSrc;
        if (isMusicPlaying) {
          bgAudio.play().catch(() => {});
        }
      }
    };

    bgAudio.addEventListener('ended', () => {
      bgAudio?.play().catch(() => {});
    });
  }
  return bgAudio;
}

// Silent sound effect handlers (all secondary sounds removed as requested)
export function playChimeSound() {}
export function playPopSound() {}
export function playFanfareSound() {}

// Start playing romantic music track
export function startRomanticMusic() {
  try {
    const audio = getBgAudio();
    audio.play().then(() => {
      isMusicPlaying = true;
      notifyListeners();
    }).catch(() => {
      isMusicPlaying = false;
      notifyListeners();
    });
  } catch {
    isMusicPlaying = false;
    notifyListeners();
  }
}

export function stopRomanticMusic() {
  if (bgAudio) {
    bgAudio.pause();
  }
  isMusicPlaying = false;
  notifyListeners();
}

export function toggleBackgroundMusic(enable?: boolean): boolean {
  if (enable === false || (enable === undefined && isMusicPlaying)) {
    stopRomanticMusic();
    return false;
  } else {
    startRomanticMusic();
    return true;
  }
}

export function getIsMusicPlaying() {
  return isMusicPlaying;
}
