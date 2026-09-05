import { Cell } from './Cell'
import { StatusBlob } from './StatusBlob'

export function StatusCell() {
  return (
    <Cell className="c10 col-4 row-3" to="/obscuro">
      <StatusBlob fill="white" />
      <div className="sys-status">ONLINE // 2024 ©</div>
    </Cell>
  )
}
