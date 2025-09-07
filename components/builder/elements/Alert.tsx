import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

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
export const AlertRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const variant = component.props?.variant || 'info';
  const showIcon = component.props?.showIcon !== false;
  const dismissible = component.props?.dismissible || false;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: FiCheckCircle,
          iconColor: 'text-green-400',
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: FiAlertTriangle,
          iconColor: 'text-yellow-400',
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: FiAlertCircle,
          iconColor: 'text-red-400',
        };
      default:
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: FiInfo,
          iconColor: 'text-blue-400',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const IconComponent = variantStyles.icon;

  return (
    <div
      className={`
        relative border rounded-lg p-4
        ${variantStyles.container}
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
        ${isHovered ? 'shadow-sm' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-start">
        {showIcon && (
          <div className="flex-shrink-0 mr-3">
            <IconComponent className={`h-5 w-5 ${variantStyles.iconColor}`} />
          </div>
        )}
        <div className="flex-1">
          {component.props?.title && (
            <h3 className="text-sm font-medium mb-1">
              {component.props.title}
            </h3>
          )}
          <p className="text-sm">
            {component.content || 'This is an alert message. You can customize its content and appearance.'}
          </p>
        </div>
        {dismissible && (
          <div className="flex-shrink-0 ml-3">
            <button className="inline-flex text-current hover:opacity-75 focus:outline-none">
              <span className="sr-only">Dismiss</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const AlertPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Alert Message</label>
        <textarea
          value={component.content || ''}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
          placeholder="Enter alert message..."
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Alert Title</label>
        <input
          type="text"
          value={component.props?.title || ''}
          onChange={(e) => handlePropChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter alert title..."
        />
      </div>

      {/* Variant */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
        <select
          value={component.props?.variant || 'info'}
          onChange={(e) => handlePropChange('variant', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Show Icon */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.showIcon !== false}
          onChange={(e) => handlePropChange('showIcon', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Show Icon</label>
      </div>

      {/* Dismissible */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.dismissible || false}
          onChange={(e) => handlePropChange('dismissible', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Dismissible</label>
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
        <input
          type="range"
          min="0"
          max="20"
          value={parseInt(component.styles.borderRadius || '8')}
          onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{component.styles.borderRadius || '8px'}</div>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
        <input
          type="text"
          value={component.styles.padding || '16px'}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="e.g., 16px"
        />
      </div>
    </div>
  );
};

// Alert component configuration
export const alertConfig = {
  type: 'Alert',
  name: 'Alert',
  description: 'Contextual feedback message with different variants and icons',
  icon: FiAlertCircle,
  category: 'feedback' as const,
  defaultProps: {
    content: 'This is an alert message. You can customize its content and appearance.',
    styles: {
      display: 'block' as const,
      borderRadius: '8px',
      padding: '16px',
    },
    children: [],
    props: {
      variant: 'info',
      title: '',
      showIcon: true,
      dismissible: false,
    },
  },
  RenderComponent: AlertRenderComponent,
  PropertiesComponent: AlertPropertiesComponent,
  defaultStyles: {
    display: 'block' as const,
    borderRadius: '8px',
    padding: '16px',
  },
  defaultContent: 'This is an alert message. You can customize its content and appearance.',
};
