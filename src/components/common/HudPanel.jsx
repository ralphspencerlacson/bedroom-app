export default function HudPanel({ info, mode, lightsOn, onToggleMode, onToggleLights }) {
    return (
        <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 9999, padding: 12 }} className='bg-gray-700/90 rounded-lg font-mono text-xs pointer-events-none'>
            <h1 className='text-white text-sm font-semibold mb-2 pointer-events-none'>Camera Position</h1>
            <p className='pointer-events-none'><span className='text-white mr-2'>FOV:</span><span className='text-white'>{info.fov}</span></p>
            <p className='pointer-events-none'><span className='text-red-400 mr-2'>X:</span><span className='text-white'>{info.x}</span></p>
            <p className='pointer-events-none'><span className='text-green-400 mr-2'>Y:</span><span className='text-white'>{info.y}</span></p>
            <p className='pointer-events-none'><span className='text-blue-400 mr-2'>Z:</span><span className='text-white'>{info.z}</span></p>


            <div className='flex gap-2 pointer-events-auto'>
                <button onClick={onToggleMode} className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold cursor-pointer min-w-[62px] justify-center ${mode === 'day' ? 'bg-yellow-500 text-black' : 'bg-indigo-700 text-white'}`}>
                    <span>{mode === 'day' ? '☀' : '☾'}</span>
                    <span>{mode === 'day' ? 'Day' : 'Night'}</span>
                </button>
                <button onClick={onToggleLights} className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold cursor-pointer min-w-[56px] justify-center ${lightsOn ? 'bg-orange-400 text-black' : 'bg-gray-700 text-gray-300'}`}>
                    <span>💡</span>
                    <span>{lightsOn ? 'On' : 'Off'}</span>
                </button>
            </div>
        </div>
    )
}
