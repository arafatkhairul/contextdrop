import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiTag } from 'react-icons/fi';

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
export const BadgeRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const variant = component.props?.variant || 'default';
  const size = component.props?.size || 'medium';
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'primary':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-xs';
      case 'large':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
        ${isHovered ? 'shadow-sm' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component.content || 'Badge'}
      {component.props?.showDot && (
        <span className="ml-1 w-2 h-2 bg-current rounded-full"></span>
      )}
    </span>
  );
};

// 2. The component that renders in the Properties panel
export const BadgePropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
        <input
          type="text"
          value={component.content || ''}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter badge text..."
        />
      </div>

      {/* Variant */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
        <select
          value={component.props?.variant || 'default'}
          onChange={(e) => handlePropChange('variant', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="default">Default</option>
          <option value="primary">Primary</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <select
          value={component.props?.size || 'medium'}
          onChange={(e) => handlePropChange('size', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Show Dot */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.showDot || false}
          onChange={(e) => handlePropChange('showDot', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Show Dot</label>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
        <select
          value={component.styles.fontWeight || 'medium'}
          onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="semibold">Semibold</option>
          <option value="bold">Bold</option>
        </select>
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(component.styles.borderRadius || '9999')}
          onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{component.styles.borderRadius || '9999px'}</div>
      </div>
    </div>
  );
};

// Badge component configuration
export const badgeConfig = {
  type: 'Badge',
  name: 'Badge',
  description: 'Small status indicator with various styles and sizes',
  icon: FiTag,
  category: 'interactive' as const,
  defaultProps: {
    content: 'Badge',
    styles: {
      display: 'inline-block' as const,
      fontWeight: 'medium',
      borderRadius: '9999px',
    },
    children: [],
    props: {
      variant: 'default',
      size: 'medium',
      showDot: false,
    },
  },
  RenderComponent: BadgeRenderComponent,
  PropertiesComponent: BadgePropertiesComponent,
  defaultStyles: {
    display: 'inline-block' as const,
    fontWeight: 'medium',
    borderRadius: '9999px',
  },
  defaultContent: 'Badge',
};
