import Link from 'next/link'
import { ObscuroEmblem } from './ObscuroEmblem'

export function ObscuroPage() {
  return (
    <div className="obscuro">
      <header>
        <div className="data-text corner-data corner-tl">
          <span>SYS.LOC // 51.5074 N</span>
          <span>0.1278 W // London, United Kingdom</span>
          <span>STATUS // ONLINE</span>
        </div>
        <div className="data-text corner-data corner-tr">
          <span>COLLECTION // FW.25</span>
          <span>PROTOCOL // BETA</span>
          <span>V. 1.0.44</span>
        </div>

        <div className="header-main-row display-text">
          <span className="hover-invert">OBSCURO</span>
          <span className="hover-invert">STUDIO</span>
        </div>
        <div className="header-sub-row display-text">
          <div className="char-spread">
            <span>R</span>
            <span>O</span>
          </div>
          <span className="amp">&amp;</span>
          <div className="char-spread">
            <span>D</span>
            <span>O</span>
          </div>
        </div>
        <div className="num-row">
          <span className="large-num">27</span>
          <span className="large-num">09</span>
        </div>
      </header>

      <main>
        <div className="data-text micro-cluster mc-left">
          SEQ_01
          <br />
          GARMENT
          <br />
          ARCHIVE
          <br />
          <br />
          MAT: NYLON
          <br />
          WT: 450GSM
        </div>

        <ObscuroEmblem />

        <div className="data-text micro-cluster mc-right">
          CUT_04
          <br />
          PATTERN
          <br />
          INDEX
          <br />
          <br />
          TENSION: HI
          <br />
          YIELD: LOW
        </div>

        <nav>
          <Link href="/" className="nav-link">
            DAY OFF
          </Link>
          <Link href="/tops" className="nav-link">
            COLLECTION
          </Link>
          <Link href="/manifesto" className="nav-link">
            MANIFESTO
          </Link>
          <span className="nav-link">LIMITED EDITION</span>
        </nav>
      </main>

      <footer>
        <div className="num-row">
          <span className="large-num">27</span>
          <span className="large-num">09</span>
        </div>
        <div className="footer-sub-row display-text">
          <div className="char-spread">
            <span>R</span>
            <span>O</span>
          </div>
          <span className="amp">&amp;</span>
          <div className="char-spread">
            <span>D</span>
            <span>O</span>
          </div>
        </div>
        <div className="footer-main-row display-text">
          <span className="hover-invert">STUDIO</span>
          <span className="hover-invert">OBSCURO</span>
        </div>

        <div className="data-text corner-data corner-bl">
          <span>COPYRIGHT // 2025</span>
          <span>ALL RIGHTS RSRVD</span>
        </div>
        <div className="data-text corner-data corner-br">
          <span>TERMINAL // 001</span>
          <span>AWAITING INPUT</span>
          <span className="blink">_</span>
        </div>
      </footer>
    </div>
  )
}
