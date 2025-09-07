'use client';

import { useDraggable } from '@dnd-kit/core';
import { FiSearch } from 'react-icons/fi';
import { componentRegistry, getComponentsByCategory, getCategories } from '@/lib/componentRegistry';

interface DraggableComponentProps {
  config: typeof componentRegistry[string];
}

function DraggableComponent({ config }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${config.type}`,
    data: {
      isSidebarComponent: true,
      type: config.type,
      name: config.name,
      defaultProps: config.defaultProps,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        flex items-center space-x-3 p-3 border border-gray-200 rounded-lg 
        hover:border-indigo-300 hover:bg-indigo-50 cursor-move transition-colors group
        ${isDragging ? 'opacity-50 shadow-lg' : ''}
      `}
    >
      <config.icon className="text-lg text-gray-600" />
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{config.name}</div>
        <div className="text-xs text-gray-500">{config.description}</div>
      </div>
      <div className="text-gray-400 group-hover:text-indigo-500">
        <FiSearch className="w-4 h-4" />
      </div>
    </div>
  );
}

export default function LeftSidebar() {
  const categories = getCategories().map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    components: getComponentsByCategory(category),
  }));

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Components</h2>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Component Categories */}
      <div className="flex-1 overflow-y-auto p-4">
        {categories.map((category) => (
          <div key={category.name} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{category.name}</h3>
            <div className="space-y-2">
              {category.components.map((config) => (
                <DraggableComponent key={config.type} config={config} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          Drag components to the canvas to start building
        </div>
      </div>
    </div>
  );
}
