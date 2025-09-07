import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiBox } from 'react-icons/fi';

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
export const SectionRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
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
          <div key={child.id} className="p-2">
            {/* This would be rendered by the main ComponentRenderer */}
            <div className="text-sm text-gray-500">Child component: {child.type}</div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Drop components here
        </div>
      )}
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const SectionPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
  const { getComponentById, updateComponentStyles } = useBuilderStore();
  const component = getComponentById(componentId);

  if (!component) {
    return <div className="p-4 text-gray-500">Component not found</div>;
  }

  const handleStyleChange = (property: keyof WebComponent['styles'], value: string | number) => {
    updateComponentStyles(componentId, { [property]: value });
  };

  return (
    <div className="space-y-4">
      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={component.styles.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={component.styles.backgroundColor || '#ffffff'}
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
          value={component.styles.padding || '32px'}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="e.g., 32px"
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

      {/* Box Shadow */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Box Shadow</label>
        <select
          value={component.styles.boxShadow || '0 1px 3px rgba(0, 0, 0, 0.1)'}
          onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="none">None</option>
          <option value="0 1px 3px rgba(0, 0, 0, 0.1)">Small</option>
          <option value="0 4px 6px rgba(0, 0, 0, 0.1)">Medium</option>
          <option value="0 10px 15px rgba(0, 0, 0, 0.1)">Large</option>
        </select>
      </div>

      {/* Min Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Min Height</label>
        <input
          type="text"
          value={component.styles.minHeight || '100px'}
          onChange={(e) => handleStyleChange('minHeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="e.g., 100px"
        />
      </div>
    </div>
  );
};

// Section component configuration
export const sectionConfig = {
  type: 'Section',
  name: 'Section',
  description: 'Container section for grouping content',
  icon: FiBox,
  category: 'layout' as const,
  defaultProps: {
    content: '',
    styles: {
      display: 'block' as const,
      padding: '32px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      minHeight: '100px',
    },
    children: [],
  },
  RenderComponent: SectionRenderComponent,
  PropertiesComponent: SectionPropertiesComponent,
  defaultStyles: {
    display: 'block' as const,
    padding: '32px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    minHeight: '100px',
  },
  defaultContent: '',
};
