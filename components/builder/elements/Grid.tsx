import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiGrid } from 'react-icons/fi';
import ComponentRenderer from '../ComponentRenderer';
import { useDroppable } from '@dnd-kit/core';

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

// 1. The component that renders on the canvas
export const GridRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const { addComponent } = useBuilderStore();
  const columns = component.props?.columns || 3;
  const rows = component.props?.rows || 2;
  const gap = component.props?.gap || '16px';
  const columnGap = component.props?.columnGap || '16px';
  const rowGap = component.props?.rowGap || '16px';
  const minHeight = component.props?.minHeight || '200px';

  const { isOver, setNodeRef } = useDroppable({
    id: `grid-drop-zone-${component.id}`,
    data: {
      isLayoutDropZone: true,
      parentId: component.id,
    },
  });

  const getGridStyles = () => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: gap,
      columnGap: columnGap,
      rowGap: rowGap,
      minHeight: minHeight,
      padding: component.styles.padding || '16px',
      backgroundColor: component.styles.backgroundColor || '#f8fafc',
      borderRadius: component.styles.borderRadius || '8px',
      border: component.styles.border || '1px dashed #cbd5e1',
    };
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        relative cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        ${isHovered ? 'shadow-lg' : 'shadow-sm'}
        ${isOver ? 'ring-2 ring-green-500 ring-opacity-50 bg-green-50' : ''}
        hover:shadow-md
      `}
      style={getGridStyles()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        onMouseEnter();
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        onMouseLeave();
      }}
    >
      {/* Grid container content */}
      {component.children && component.children.length > 0 ? (
        component.children.map((child) => (
          <ComponentRenderer
            key={child.id}
            component={child}
            isSelected={false}
            isHovered={false}
            onClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center text-gray-400 text-sm min-h-[100px]">
          <div className="text-center">
            <FiGrid className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Grid Container</p>
            <p className="text-xs mt-1">Drop components here</p>
            <p className="text-xs mt-1">{columns} × {rows} Grid</p>
          </div>
        </div>
      )}
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Grid {columns}×{rows}
        </div>
      )}
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const GridPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
  const { getComponentById, updateComponentStyles, updateComponentProps } = useBuilderStore();
  const component = getComponentById(componentId);

  if (!component) {
    return <div className="p-4 text-gray-500">Component not found</div>;
  }

  const handleStyleChange = (property: keyof WebComponent['styles'], value: string | number) => {
    updateComponentStyles(componentId, { [property]: value });
  };

  const handlePropChange = (property: string, value: string | number) => {
    updateComponentProps(componentId, { [property]: value });
  };

  return (
    <div className="space-y-4">
      {/* Columns */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
        <input
          type="number"
          min="1"
          max="12"
          value={component.props?.columns || 3}
          onChange={(e) => handlePropChange('columns', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Rows */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rows</label>
        <input
          type="number"
          min="1"
          max="12"
          value={component.props?.rows || 2}
          onChange={(e) => handlePropChange('rows', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Gap */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gap</label>
        <input
          type="text"
          value={component.props?.gap || '16px'}
          onChange={(e) => handlePropChange('gap', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 16px, 1rem"
        />
      </div>

      {/* Column Gap */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Column Gap</label>
        <input
          type="text"
          value={component.props?.columnGap || '16px'}
          onChange={(e) => handlePropChange('columnGap', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 16px, 1rem"
        />
      </div>

      {/* Row Gap */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Row Gap</label>
        <input
          type="text"
          value={component.props?.rowGap || '16px'}
          onChange={(e) => handlePropChange('rowGap', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 16px, 1rem"
        />
      </div>

      {/* Min Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Min Height</label>
        <input
          type="text"
          value={component.props?.minHeight || '200px'}
          onChange={(e) => handlePropChange('minHeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 200px, 50vh"
        />
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={component.styles.backgroundColor || '#f8fafc'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={component.styles.backgroundColor || '#f8fafc'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
        <input
          type="text"
          value={component.styles.padding || '16px'}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 16px, 1rem 2rem"
        />
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(component.styles.borderRadius || '8')}
          onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{component.styles.borderRadius || '8px'}</div>
      </div>

      {/* Border */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Border</label>
        <input
          type="text"
          value={component.styles.border || '1px dashed #cbd5e1'}
          onChange={(e) => handleStyleChange('border', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 1px solid #e5e7eb"
        />
      </div>
    </div>
  );
};

// Grid component configuration
export const gridConfig = {
  type: 'Grid',
  name: 'Grid',
  description: 'CSS Grid container with customizable columns, rows, and spacing',
  icon: FiGrid,
  category: 'layout' as const,
  defaultProps: {
    content: '',
    styles: {
      display: 'grid' as const,
      padding: '0',
      backgroundColor: 'transparent',
      borderRadius: '0',
      border: 'none',
    },
    children: [],
    props: {
      columns: 3,
      rows: 2,
      gap: '16px',
      columnGap: '16px',
      rowGap: '16px',
      minHeight: '200px',
    },
  },
  RenderComponent: GridRenderComponent,
  PropertiesComponent: GridPropertiesComponent,
  defaultStyles: {
    display: 'grid' as const,
    padding: '0',
    backgroundColor: 'transparent',
    borderRadius: '0',
    border: 'none',
  },
  defaultContent: '',
};
