'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { WebComponent } from '@/types/builder';
import { getComponentConfig } from '@/lib/componentRegistry';
import { FlexRenderComponent } from '@/components/builder/elements/Flex';
import { GridRenderComponent } from '@/components/builder/elements/Grid';
import { ColumnRenderComponent } from '@/components/builder/elements/Column';
import { RowRenderComponent } from '@/components/builder/elements/Row';

interface ComponentRendererProps {
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Helper function to convert styles object to CSS string
const stylesToCSS = (styles: WebComponent['styles']): React.CSSProperties => {
  const css: React.CSSProperties = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Convert camelCase to kebab-case for CSS properties
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      (css as Record<string, string | number>)[cssKey] = value;
    }
  });
  
  return css;
};

// Individual component renderers
function SectionComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <div
      className={`
        relative min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg
        ${isSelected ? 'border-blue-500 border-solid' : ''}
        ${isHovered ? 'border-gray-400' : ''}
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.children && component.children.length > 0 ? (
        component.children.map((child) => (
          <ComponentRenderer
            key={child.id}
            component={child}
            isSelected={isSelected}
            isHovered={isHovered}
            onClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Drop components here
        </div>
      )}
    </div>
  );
}

function ContainerComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <div
      className={`
        relative min-h-[80px] border-2 border-dashed border-gray-300 rounded-lg
        ${isSelected ? 'border-blue-500 border-solid' : ''}
        ${isHovered ? 'border-gray-400' : ''}
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.children && component.children.length > 0 ? (
        component.children.map((child) => (
          <ComponentRenderer
            key={child.id}
            component={child}
            isSelected={isSelected}
            isHovered={isHovered}
            onClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Container
        </div>
      )}
    </div>
  );
}

function RowComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <div
      className={`
        relative min-h-[60px] border-2 border-dashed border-gray-300 rounded-lg
        ${isSelected ? 'border-blue-500 border-solid' : ''}
        ${isHovered ? 'border-gray-400' : ''}
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.children && component.children.length > 0 ? (
        component.children.map((child) => (
          <ComponentRenderer
            key={child.id}
            component={child}
            isSelected={isSelected}
            isHovered={isHovered}
            onClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Row
        </div>
      )}
    </div>
  );
}

function ColumnComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <div
      className={`
        relative min-h-[60px] border-2 border-dashed border-gray-300 rounded-lg
        ${isSelected ? 'border-blue-500 border-solid' : ''}
        ${isHovered ? 'border-gray-400' : ''}
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.children && component.children.length > 0 ? (
        component.children.map((child) => (
          <ComponentRenderer
            key={child.id}
            component={child}
            isSelected={isSelected}
            isHovered={isHovered}
            onClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Column
        </div>
      )}
    </div>
  );
}

function HeadingComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <h1
      className={`
        relative cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.content || 'Your Heading Here'}
    </h1>
  );
}

function TextComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <div
      className={`
        relative cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.content || 'Add your text content here'}
    </div>
  );
}

function ParagraphComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <p
      className={`
        relative cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.content || 'This is a paragraph component.'}
    </p>
  );
}

function ButtonComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <button
      className={`
        relative cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.content || 'Click Me'}
    </button>
  );
}

function ImageComponent({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  return (
    <div
      className={`
        relative cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={component.content || 'https://via.placeholder.com/400x300?text=Your+Image'}
        alt="Component image"
        style={stylesToCSS(component.styles)}
        className="block"
      />
    </div>
  );
}

// Main component renderer with drag and drop functionality
export default function ComponentRenderer({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }: ComponentRendererProps) {
  const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform } = useDraggable({
    id: component.id,
    data: {
      isCanvasComponent: true,
      component,
    },
  });

  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: component.id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  // Combine refs for both draggable and droppable
  const setCombinedNodeRef = (node: HTMLElement | null) => {
    setDraggableNodeRef(node);
    setDroppableNodeRef(node);
  };

  const config = getComponentConfig(component.type);
  
  if (!config) {
    return (
      <div
        ref={setCombinedNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="relative p-4 border border-red-300 rounded bg-red-50"
      >
        <div className="text-red-600">Unknown component type: {component.type}</div>
      </div>
    );
  }

  const { RenderComponent } = config;

  return (
    <div
      ref={setCombinedNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="relative"
    >
      <RenderComponent
        component={component}
        isSelected={isSelected}
        isHovered={isHovered}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
}
