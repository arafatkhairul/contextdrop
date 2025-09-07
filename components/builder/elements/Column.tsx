import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiColumns } from 'react-icons/fi';
import ComponentRenderer from '../ComponentRenderer';

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
export const ColumnRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const width = component.props?.width || 'auto';
  const minWidth = component.props?.minWidth || '200px';
  const maxWidth = component.props?.maxWidth || 'none';
  const gap = component.props?.gap || '16px';
  const alignItems = component.props?.alignItems || 'stretch';
  const justifyContent = component.props?.justifyContent || 'flex-start';

  const getColumnStyles = (): React.CSSProperties => {
    return {
      display: 'flex',
      flexDirection: 'column' as React.CSSProperties['flexDirection'],
      width: width,
      minWidth: minWidth,
      maxWidth: maxWidth,
      gap: gap,
      alignItems: alignItems as React.CSSProperties['alignItems'],
      justifyContent: justifyContent as React.CSSProperties['justifyContent'],
      padding: component.styles.padding || '16px',
      backgroundColor: component.styles.backgroundColor || '#f8fafc',
      borderRadius: component.styles.borderRadius || '8px',
      border: component.styles.border || '1px dashed #cbd5e1',
      minHeight: component.styles.minHeight || '200px',
    };
  };

  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        ${isHovered ? 'shadow-lg' : 'shadow-sm'}
        hover:shadow-md
      `}
      style={getColumnStyles()}
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
      {/* Column container content */}
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
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm min-h-[100px]">
          <div className="text-center">
            <FiColumns className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Column Container</p>
            <p className="text-xs mt-1">Drop components here</p>
            <p className="text-xs mt-1">Vertical Layout</p>
          </div>
        </div>
      )}
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Column
        </div>
      )}
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const ColumnPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
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
      {/* Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
        <input
          type="text"
          value={component.props?.width || 'auto'}
          onChange={(e) => handlePropChange('width', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., auto, 300px, 50%, 1fr"
        />
      </div>

      {/* Min Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Min Width</label>
        <input
          type="text"
          value={component.props?.minWidth || '200px'}
          onChange={(e) => handlePropChange('minWidth', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 200px, 20rem"
        />
      </div>

      {/* Max Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Max Width</label>
        <input
          type="text"
          value={component.props?.maxWidth || 'none'}
          onChange={(e) => handlePropChange('maxWidth', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., none, 500px, 50vw"
        />
      </div>

      {/* Gap */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gap</label>
        <input
          type="text"
          value={component.props?.gap || '16px'}
          onChange={(e) => handlePropChange('gap', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 16px, 1rem"
        />
      </div>

      {/* Align Items */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Align Items</label>
        <select
          value={component.props?.alignItems || 'stretch'}
          onChange={(e) => handlePropChange('alignItems', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
          <option value="space-evenly">Space Evenly</option>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 16px, 1rem 2rem"
        />
      </div>

      {/* Min Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Min Height</label>
        <input
          type="text"
          value={component.styles.minHeight || '200px'}
          onChange={(e) => handleStyleChange('minHeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 200px, 50vh"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., 1px solid #e5e7eb"
        />
      </div>
    </div>
  );
};

// Column component configuration
export const columnConfig = {
  type: 'Column',
  name: 'Column',
  description: 'Vertical column container with customizable width and alignment',
  icon: FiColumns,
  category: 'layout' as const,
  defaultProps: {
    content: '',
    styles: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px dashed #cbd5e1',
      minHeight: '200px',
    },
    children: [],
    props: {
      width: 'auto',
      minWidth: '200px',
      maxWidth: 'none',
      gap: '16px',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
  },
  RenderComponent: ColumnRenderComponent,
  PropertiesComponent: ColumnPropertiesComponent,
  defaultStyles: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1',
    minHeight: '200px',
  },
  defaultContent: '',
};
