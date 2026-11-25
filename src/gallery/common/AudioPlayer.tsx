import { useEffect, useRef, useState } from 'react'

/**
 * Procedural Ambient Audio Synthesizer for Museum Gallery
 * Generates soothing, serene acoustic drone chords and gentle museum pads using Web Audio API.
 * Completely autonomous, zero external mp3 files required!
 */
export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)

  const toggleAudio = () => {
    if (!isPlaying) {
      startAmbient()
      setIsPlaying(true)
    } else {
      stopAmbient()
      setIsPlaying(false)
    }
  }

  const startAmbient = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const master = ctx.createGain()
      master.gain.setValueAtTime(0.001, ctx.currentTime)
      master.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 3.0)
      master.connect(ctx.destination)
      masterGainRef.current = master

      // Harmony frequencies for academic heritage atmosphere (D Major pentatonic pad: D, F#, A, B, E)
      const freqs = [73.42, 110.0, 146.83, 220.0, 293.66, 369.99]

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle slow lfo modulation for calming airiness
        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.setValueAtTime(0.15 + idx * 0.05, ctx.currentTime)
        lfoGain.gain.setValueAtTime(2.5, ctx.currentTime)
        lfo.connect(osc.frequency)
        lfo.start()

        oscGain.gain.setValueAtTime(0.04 / (idx * 0.4 + 1), ctx.currentTime)
        osc.connect(oscGain)
        oscGain.connect(master)
        osc.start()
      })
    } catch {
      // Audio autoplay policy fallback
    }
  }

  const stopAmbient = () => {
    if (audioCtxRef.current && masterGainRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2)
      setTimeout(() => {
        audioCtxRef.current?.close()
        audioCtxRef.current = null
      }, 1300)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return (
    <button
      type="button"
      className={`undip-audio-btn ${isPlaying ? 'is-active' : ''}`}
      onClick={toggleAudio}
      title={isPlaying ? 'Matikan Suara Musik Ambient' : 'Nyalakan Musik Ambient Museum'}
      aria-label="Toggle Musik Ambient"
    >
      <span className="undip-audio-icon">{isPlaying ? '🔊' : '🔇'}</span>
      <span className="undip-audio-label">{isPlaying ? 'MUSIK AKTIF' : 'MUSIK HENING'}</span>
    </button>
  )
}
