export default async function playSound(soundFile: string): Promise<AudioBufferSourceNode> {
  const audioContext = new AudioContext();
  const response = await fetch(soundFile);
  const arrayBuffer = await response.arrayBuffer();
  const soundBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const source = audioContext.createBufferSource();
  source.buffer = soundBuffer;
  source.connect(audioContext.destination);
  source.start();
  
  return source;
}
