'use client';

import { useDroppable } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builderStore';
import ComponentRenderer from './ComponentRenderer';

export default function Canvas() {
  const { components, selectedComponentId, hoveredComponentId, setSelectedComponent, setHoveredComponent } = useBuilderStore();
  
  const { isOver, setNodeRef } = useDroppable({
    id: 'canvas-drop-zone',
  });

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking on the canvas itself, not on a component
    if (e.target === e.currentTarget) {
      setSelectedComponent(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Canvas Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Canvas</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {components.length} component{components.length !== 1 ? 's' : ''}
            </span>
            {components.length > 0 && (
              <button
                onClick={() => useBuilderStore.getState().clearCanvas()}
                className="text-xs text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
              >
                Clear Canvas
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div
            ref={setNodeRef}
            className={`
              bg-white rounded-lg shadow-sm border-2 border-dashed min-h-[600px] p-8
              ${isOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'}
              transition-colors duration-200
            `}
            onClick={handleCanvasClick}
          >
            {components.length === 0 ? (
              <div className="text-center text-gray-500 py-20">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Website</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Drag components from the library to start creating
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-indigo-200 rounded-full"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {components.map((component) => (
                  <ComponentRenderer
                    key={component.id}
                    component={component}
                    isSelected={selectedComponentId === component.id}
                    isHovered={hoveredComponentId === component.id}
                    onClick={() => setSelectedComponent(component.id)}
                    onMouseEnter={() => setHoveredComponent(component.id)}
                    onMouseLeave={() => setHoveredComponent(null)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
