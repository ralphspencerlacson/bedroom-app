export default function HudPanel({ mode, lightsOn, isFloating, view, debug, onToggleMode, onToggleLights, onToggleFloat, onView, onDebug }) {
  return <>
    <header className="room-header"><div><span className="eyebrow">Your own little corner</span><h1>My room<span>.</span></h1><p>Work, play, and a little time to unwind.</p></div><button className="quiet-button" onClick={() => onView('room')} aria-label="Reset camera to room view">↺ <span>Reset view</span></button></header>
    <aside className="room-controls" aria-label="Room controls">
      <div className="control-section"><span className="control-label">Take a look around</span><nav className="view-tabs" aria-label="Camera views">{[['room', 'Room'], ['workspace', 'Workspace'], ['gaming', 'Gaming']].map(([name, label]) => <button key={name} aria-pressed={view === name} onClick={() => onView(name)}>{label}</button>)}</nav></div>
      <div className="control-divider" />
      <div className="control-section"><span className="control-label">Set the mood</span><div className="mood-controls"><button aria-label="Night mode" aria-pressed={mode === 'night'} onClick={onToggleMode}>{mode === 'day' ? '☀ Daylight' : '☾ Nighttime'}</button><button aria-label="Room lights" aria-pressed={lightsOn} onClick={onToggleLights}><span className={`light-dot ${lightsOn ? 'on' : ''}`} />Lights {lightsOn ? 'on' : 'off'}</button></div></div>
      <div className="control-divider" />
      <button className="float-button" aria-pressed={isFloating} onClick={onToggleFloat}>{isFloating ? '↓ Bring it back' : '↑ A little magic'}<span>{isFloating ? 'Return the TV & controllers' : 'Make the TV & controllers float'}</span></button>
    </aside>
    <footer className="room-footer"><p>Drag to explore <span>·</span> Scroll or pinch to zoom <span>·</span> Click the TV for a surprise</p><button className="debug-toggle" aria-pressed={debug} onClick={onDebug}>Camera info</button></footer>
  </>
}
