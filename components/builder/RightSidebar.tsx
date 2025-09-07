'use client';

import { useBuilderStore } from '@/store/builderStore';
import { FiCopy, FiTrash2 } from 'react-icons/fi';
import { getComponentConfig } from '@/lib/componentRegistry';

export default function RightSidebar() {
  const { 
    selectedComponentId, 
    getSelectedComponent, 
    deleteComponent,
    duplicateComponent 
  } = useBuilderStore();
  
  const selectedComponent = getSelectedComponent();

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col items-center justify-center text-gray-500 text-sm h-full">
        <p>Select a component to edit its properties.</p>
      </div>
    );
  }

  const config = getComponentConfig(selectedComponent.type);
  
  if (!config) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col items-center justify-center text-red-500 text-sm h-full">
        <p>Unknown component type: {selectedComponent.type}</p>
      </div>
    );
  }

  const { PropertiesComponent } = config;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Properties</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => duplicateComponent(selectedComponentId!)}
              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Duplicate"
            >
              <FiCopy className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteComponent(selectedComponentId!)}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {config.name} Component
        </div>
      </div>

      {/* Properties Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <PropertiesComponent componentId={selectedComponentId!} />
      </div>
    </div>
  );
}
