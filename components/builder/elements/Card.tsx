import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiCreditCard } from 'react-icons/fi';

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
export const CardRenderComponent: React.FC<{
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
        relative cursor-pointer bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
        ${isHovered ? 'shadow-md' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {component.props?.title || 'Card Title'}
        </h3>
        {component.props?.subtitle && (
          <p className="text-sm text-gray-600 mt-1">
            {component.props.subtitle}
          </p>
        )}
      </div>
      
      {/* Card Body */}
      <div className="px-6 py-4">
        <p className="text-gray-700">
          {component.content || 'This is a card component. You can customize its content and styling using the properties panel.'}
        </p>
      </div>
      
      {/* Card Footer */}
      {component.props?.showFooter && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const CardPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
  const { getComponentById, updateComponentStyles, updateComponentContent, updateComponentProps } = useBuilderStore();
  const component = getComponentById(componentId);

  if (!component) {
    return <div className="p-4 text-gray-500">Component not found</div>;
  }

  const handleStyleChange = (property: keyof WebComponent['styles'], value: string | number) => {
    updateComponentStyles(componentId, { [property]: value });
  };

  const handleContentChange = (content: string) => {
    updateComponentContent(componentId, content);
  };

  const handlePropChange = (property: string, value: string | boolean) => {
    updateComponentProps(componentId, { [property]: value });
  };

  return (
    <div className="space-y-4">
      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Content</label>
        <textarea
          value={component.content || ''}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
          placeholder="Enter card content..."
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Title</label>
        <input
          type="text"
          value={component.props?.title || ''}
          onChange={(e) => handlePropChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter card title..."
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Subtitle</label>
        <input
          type="text"
          value={component.props?.subtitle || ''}
          onChange={(e) => handlePropChange('subtitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter card subtitle..."
        />
      </div>

      {/* Show Footer */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.showFooter || false}
          onChange={(e) => handlePropChange('showFooter', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Show Footer</label>
      </div>

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
          <option value="0 20px 25px rgba(0, 0, 0, 0.1)">Extra Large</option>
        </select>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
        <input
          type="text"
          value={component.styles.padding || '0'}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="e.g., 24px"
        />
      </div>
    </div>
  );
};

// Card component configuration
export const cardConfig = {
  type: 'Card',
  name: 'Card',
  description: 'Flexible content container with header, body, and optional footer',
  icon: FiCreditCard,
  category: 'layout' as const,
  defaultProps: {
    content: 'This is a card component. You can customize its content and styling using the properties panel.',
    styles: {
      display: 'block' as const,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '0',
      maxWidth: '400px',
    },
    children: [],
    props: {
      title: 'Card Title',
      subtitle: '',
      showFooter: false,
    },
  },
  RenderComponent: CardRenderComponent,
  PropertiesComponent: CardPropertiesComponent,
  defaultStyles: {
    display: 'block' as const,
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    padding: '0',
    maxWidth: '400px',
  },
  defaultContent: 'This is a card component. You can customize its content and styling using the properties panel.',
};
