import { LiveClock } from './LiveClock'

export function PillarLeft() {
  return (
    <div className="pillar-left">
      <div className="pillar-meta">
        <div className="timer-group">
          <div className="timer-icon" />
          <LiveClock />
        </div>
        <div>CUT: ASYMMETRIC</div>
        <div>FIBER: KEVLAR 400G</div>
        <div>YIELD: 0.04%</div>
      </div>

      <div className="kanji-vertical">
        構造
        <br />
        緊張
      </div>

      <div className="primary-vertical">OBSIDIAN</div>

      <div className="abs-meta-1">
        ENG. DEPT. 40.7128° N, 74.0060° W
        <br />
        BATCH_ID: 994-A / LANE-1/36
      </div>
    </div>
  )
}
