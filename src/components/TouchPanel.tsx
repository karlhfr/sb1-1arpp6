import React from 'react';

interface TouchPanelProps {
  onToggleLight: () => void;
}

function TouchPanel({ onToggleLight }: TouchPanelProps) {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <button
        className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
        onClick={() => console.log('Raise cupboard')}
      >
        Raise
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => console.log('Lower cupboard')}
      >
        Lower
      </button>
      <button
        className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
        onClick={onToggleLight}
      >
        Toggle Light
      </button>
    </div>
  );
}

export default TouchPanel;