import { Component, Suspense, lazy, useState } from 'react'
import HudPanel from './components/common/HudPanel'
import './App.css'

const RoomCanvas = lazy(() => import('./components/RoomCanvas'))

class RoomBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <div className="loading-screen" role="alert"><div className="loading-card"><span className="eyebrow">A little interruption</span><h2>The room couldn’t load</h2><p>Check your connection and try again.</p><button onClick={() => window.location.reload()}>Reload room</button></div></div>
    return this.props.children
  }
}

export default function App() {
  const [mode, setMode] = useState('day')
  const [lightsOn, setLightsOn] = useState(true)
  const [isFloating, setIsFloating] = useState(false)
  const [view, setView] = useState({ name: 'room', request: 0 })
  const [debug, setDebug] = useState(false)
  return <main className="room-app">
    <RoomBoundary>
      <Suspense fallback={<div className="loading-screen" role="status"><div className="loading-card"><span className="eyebrow">Make yourself at home</span><h2>Opening your room…</h2></div></div>}>
        <RoomCanvas mode={mode} lightsOn={lightsOn} isFloating={isFloating} onToggleFloat={() => setIsFloating(value => !value)} view={view} debug={debug} />
      </Suspense>
    </RoomBoundary>
    <HudPanel mode={mode} lightsOn={lightsOn} isFloating={isFloating} view={view.name} debug={debug}
      onToggleMode={() => setMode(value => value === 'day' ? 'night' : 'day')}
      onToggleLights={() => setLightsOn(value => !value)} onToggleFloat={() => setIsFloating(value => !value)}
      onView={name => setView(value => ({ name, request: value.request + 1 }))} onDebug={() => setDebug(value => !value)} />
  </main>
}
