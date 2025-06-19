import { FunctionComponent } from 'preact';

export const SoundTest: FunctionComponent = () => {
    const playSound = () => {
        // Create an audio context
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Create an oscillator for a simple beep sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        // Connect oscillator to gain to speakers
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Configure the sound
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
        oscillator.type = 'sine';

        // Configure volume envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

        // Play the sound
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    };

    return (
        <button onClick={playSound}>
            Play Sound
        </button>
    );
};
