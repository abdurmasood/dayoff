type WaveformProps = {
  variant: 'left' | 'right'
}

type WavePath = {
  d: string
  dashed?: boolean
}

const LEFT_PATHS: WavePath[] = [
  {
    d: 'M0,15 Q5,5 10,15 T20,15 T30,15 T40,15 T50,15 T60,15 T70,15 T80,15 T90,15 T100,15',
    dashed: true,
  },
  {
    d: 'M0,15 Q5,0 10,15 T20,15 T30,15 Q35,30 40,15 T50,15 Q55,0 60,15 T70,15 Q75,30 80,15 T90,15 T100,15',
  },
]

const RIGHT_PATHS: WavePath[] = [
  {
    d: 'M0,15 Q5,30 10,15 T20,15 Q25,0 30,15 T40,15 T50,15 Q55,30 60,15 T70,15 T80,15 Q85,0 90,15 T100,15',
  },
]

export function Waveform({ variant }: WaveformProps) {
  const paths = variant === 'left' ? LEFT_PATHS : RIGHT_PATHS

  return (
    <svg className="waveform" viewBox="0 0 100 30" preserveAspectRatio="none">
      {paths.map((path) => (
        <path
          key={path.d}
          d={path.d}
          strokeDasharray={path.dashed ? '2 2' : undefined}
          strokeWidth={path.dashed ? 1 : undefined}
          stroke={path.dashed ? '#555' : undefined}
        />
      ))}
    </svg>
  )
}
