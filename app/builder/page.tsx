'use client';

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import { componentRegistry } from '@/lib/componentRegistry';
import { WebComponent } from '@/types/builder';
import LeftSidebar from '@/components/builder/LeftSidebar';
import Canvas from '@/components/builder/Canvas';
import RightSidebar from '@/components/builder/RightSidebar';
import {  
  FiSave, 
  FiSend, 
  FiUser 
} from 'react-icons/fi';
import { CiUndo, CiRedo } from "react-icons/ci";


export default function BuilderPage() {
  const { components, addComponent, moveComponent } = useBuilderStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const isSidebarComponent = active.data.current?.isSidebarComponent;
    const isCanvasComponent = active.data.current?.isCanvasComponent;

    // SCENARIO 1: Dragging a NEW component from the sidebar
    if (isSidebarComponent) {
      // Check if we're dropping on the canvas
      if (over.id === 'canvas-drop-zone') {
        const componentType = active.data.current?.type;
        const config = componentRegistry[componentType];

        if (config) {
          addComponent({
            type: config.type as WebComponent['type'],
            content: config.defaultContent,
            styles: config.defaultStyles || {},
            children: config.defaultProps.children || [],
            props: config.defaultProps.props || {},
          });
        }
      }
      return;
    }

    // SCENARIO 2: Reordering an EXISTING component within the canvas
    if (isCanvasComponent) {
      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return; // Dropped on itself

      const activeIndex = components.findIndex((comp) => comp.id === activeId);
      const overIndex = components.findIndex((comp) => comp.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        moveComponent(activeIndex, overIndex);
      }
    }
  };

  const activeItem = Object.values(componentRegistry).find(
    (config) => `draggable-${config.type}` === activeId
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Header/Toolbar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">ContextDrop Builder</h1>
          </div>
          <div className="text-sm text-gray-500">Drag & Drop Website Builder</div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <CiUndo className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <CiRedo className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Save/Publish */}
          <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            <div className="flex items-center space-x-1">
              <FiSave className="w-4 h-4" />
              <span>Save</span>
            </div>
          </button>
          <button className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
            <div className="flex items-center space-x-1">
              <FiSend className="w-4 h-4" />
              <span>Publish</span>
            </div>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* User Profile */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <FiUser className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Builder Area */}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Canvas Area */}
          <Canvas />

          {/* Right Sidebar */}
          <RightSidebar />
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
        {activeItem ? (
          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white shadow-lg">
            <activeItem.icon className="text-lg text-gray-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{activeItem.name}</div>
              <div className="text-xs text-gray-500">{activeItem.description}</div>
            </div>
          </div>
        ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
