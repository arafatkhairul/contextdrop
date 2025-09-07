import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiAlignLeft } from 'react-icons/fi';
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
export const RowRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const { addComponent } = useBuilderStore();
  const height = component.props?.height || 'auto';
  const minHeight = component.props?.minHeight || '100px';
  const maxHeight = component.props?.maxHeight || 'none';
  const gap = component.props?.gap || '16px';
  const alignItems = component.props?.alignItems || 'stretch';
  const justifyContent = component.props?.justifyContent || 'flex-start';
  const wrap = component.props?.wrap || 'nowrap';

  const { isOver, setNodeRef } = useDroppable({
    id: `row-drop-zone-${component.id}`,
    data: {
      isLayoutDropZone: true,
      parentId: component.id,
    },
  });

  const getRowStyles = (): React.CSSProperties => {
    return {
      display: 'flex',
      flexDirection: 'row' as React.CSSProperties['flexDirection'],
      height: height,
      minHeight: minHeight,
      maxHeight: maxHeight,
      gap: gap,
      alignItems: alignItems as React.CSSProperties['alignItems'],
      justifyContent: justifyContent as React.CSSProperties['justifyContent'],
      flexWrap: wrap as React.CSSProperties['flexWrap'],
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
      style={getRowStyles()}
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
      {/* Row container content */}
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
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm min-h-[60px]">
          <div className="text-center">
            <FiAlignLeft className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Row Container</p>
            <p className="text-xs mt-1">Drop components here</p>
            <p className="text-xs mt-1">Horizontal Layout</p>
          </div>
        </div>
      )}
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Row
        </div>
      )}
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const RowPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
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
      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
        <input
          type="text"
          value={component.props?.height || 'auto'}
          onChange={(e) => handlePropChange('height', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., auto, 100px, 20vh"
        />
      </div>

      {/* Min Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Min Height</label>
        <input
          type="text"
          value={component.props?.minHeight || '100px'}
          onChange={(e) => handlePropChange('minHeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 100px, 10rem"
        />
      </div>

      {/* Max Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Max Height</label>
        <input
          type="text"
          value={component.props?.maxHeight || 'none'}
          onChange={(e) => handlePropChange('maxHeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., none, 300px, 50vh"
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

      {/* Align Items */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Align Items</label>
        <select
          value={component.props?.alignItems || 'stretch'}
          onChange={(e) => handlePropChange('alignItems', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="stretch">Stretch</option>
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="baseline">Baseline</option>
        </select>
      </div>

      {/* Justify Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Justify Content</label>
        <select
          value={component.props?.justifyContent || 'flex-start'}
          onChange={(e) => handlePropChange('justifyContent', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
          <option value="space-evenly">Space Evenly</option>
        </select>
      </div>

      {/* Wrap */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Wrap</label>
        <select
          value={component.props?.wrap || 'nowrap'}
          onChange={(e) => handlePropChange('wrap', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="nowrap">No Wrap</option>
          <option value="wrap">Wrap</option>
          <option value="wrap-reverse">Wrap Reverse</option>
        </select>
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
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={component.styles.borderWidth || ''}
            onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Width: 1px"
          />
          <select
            value={component.styles.borderStyle || 'solid'}
            onChange={(e) => handleStyleChange('borderStyle', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
            <option value="none">None</option>
          </select>
        </div>
        <input
          type="color"
          value={component.styles.borderColor || '#e5e7eb'}
          onChange={(e) => handleStyleChange('borderColor', e.target.value)}
          className="w-full h-8 border border-gray-300 rounded mt-2"
        />
      </div>

      {/* Shadow */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Box Shadow</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={!!component.styles.boxShadow && component.styles.boxShadow !== 'none'}
              onChange={(e) => handleStyleChange('boxShadow', e.target.checked ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none')}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Enable</span>
          </div>
        </div>
        {component.styles.boxShadow && component.styles.boxShadow !== 'none' && (
          <input
            type="text"
            value={component.styles.boxShadow || ''}
            onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0 4px 6px -1px rgb(0 0 0 / 0.1)"
          />
        )}
      </div>

      {/* Margin */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Margin</label>
        <input
          type="text"
          value={component.styles.margin || '0'}
          onChange={(e) => handleStyleChange('margin', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 16px, 1rem 2rem"
        />
      </div>

      {/* Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
        <input
          type="text"
          value={component.styles.width || '100%'}
          onChange={(e) => handleStyleChange('width', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 100%, 800px, auto"
        />
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
        <input
          type="text"
          value={component.styles.height || 'auto'}
          onChange={(e) => handleStyleChange('height', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., auto, 200px, 50vh"
        />
      </div>
    </div>
  );
};

// Row component configuration
export const rowConfig = {
  type: 'Row',
  name: 'Row',
  description: 'Horizontal row container with customizable height and alignment',
  icon: FiAlignLeft,
  category: 'layout' as const,
  defaultProps: {
    content: '',
    styles: {
      display: 'flex' as const,
      flexDirection: 'row' as const,
      padding: '0',
      backgroundColor: 'transparent',
      borderRadius: '0',
      border: 'none',
    },
    children: [],
    props: {
      height: 'auto',
      minHeight: '100px',
      maxHeight: 'none',
      gap: '16px',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      wrap: 'nowrap',
    },
  },
  RenderComponent: RowRenderComponent,
  PropertiesComponent: RowPropertiesComponent,
  defaultStyles: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    padding: '0',
    backgroundColor: 'transparent',
    borderRadius: '0',
    border: 'none',
  },
  defaultContent: '',
};
