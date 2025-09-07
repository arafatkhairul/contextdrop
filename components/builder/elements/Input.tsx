import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiEdit3 } from 'react-icons/fi';

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
export const InputRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const inputType = component.props?.type || 'text';
  const placeholder = component.props?.placeholder || 'Enter text...';
  const disabled = component.props?.disabled || false;
  const required = component.props?.required || false;
  const label = component.props?.label || '';
  
  return (
    <div
      className={`
        relative
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
        ${isHovered ? 'shadow-sm' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${component.styles.borderColor ? '' : 'border-gray-300'}
          `}
          style={{
            ...stylesToCSS(component.styles),
            borderColor: component.styles.borderColor || undefined,
          }}
        />
        {component.props?.showIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        )}
      </div>
      {component.props?.helpText && (
        <p className="mt-1 text-xs text-gray-500">{component.props.helpText}</p>
      )}
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const InputPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
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
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
        <input
          type="text"
          value={component.props?.label || ''}
          onChange={(e) => handlePropChange('label', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter label..."
        />
      </div>

      {/* Placeholder */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
        <input
          type="text"
          value={component.props?.placeholder || ''}
          onChange={(e) => handlePropChange('placeholder', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter placeholder text..."
        />
      </div>

      {/* Input Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Input Type</label>
        <select
          value={component.props?.type || 'text'}
          onChange={(e) => handlePropChange('type', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="tel">Phone</option>
          <option value="url">URL</option>
          <option value="search">Search</option>
        </select>
      </div>

      {/* Help Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Help Text</label>
        <input
          type="text"
          value={component.props?.helpText || ''}
          onChange={(e) => handlePropChange('helpText', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter help text..."
        />
      </div>

      {/* Required */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.required || false}
          onChange={(e) => handlePropChange('required', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Required</label>
      </div>

      {/* Disabled */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.disabled || false}
          onChange={(e) => handlePropChange('disabled', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Disabled</label>
      </div>

      {/* Show Icon */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.showIcon || false}
          onChange={(e) => handlePropChange('showIcon', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Show Icon</label>
      </div>

      {/* Border Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={component.styles.borderColor || '#d1d5db'}
            onChange={(e) => handleStyleChange('borderColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={component.styles.borderColor || '#d1d5db'}
            onChange={(e) => handleStyleChange('borderColor', e.target.value)}
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
          value={component.styles.padding || '12px 16px'}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="e.g., 12px 16px"
        />
      </div>
    </div>
  );
};

// Input component configuration
export const inputConfig = {
  type: 'Input',
  name: 'Input',
  description: 'Text input field with various types and validation options',
  icon: FiEdit3,
  category: 'forms' as const,
  defaultProps: {
    content: '',
    styles: {
      display: 'block' as const,
      padding: '12px 16px',
      borderRadius: '8px',
      borderColor: '#d1d5db',
      borderWidth: '1px',
      fontSize: 14,
    },
    children: [],
    props: {
      type: 'text',
      label: '',
      placeholder: 'Enter text...',
      helpText: '',
      required: false,
      disabled: false,
      showIcon: false,
    },
  },
  RenderComponent: InputRenderComponent,
  PropertiesComponent: InputPropertiesComponent,
  defaultStyles: {
    display: 'block' as const,
    padding: '12px 16px',
    borderRadius: '8px',
    borderColor: '#d1d5db',
    borderWidth: '1px',
    fontSize: 14,
  },
  defaultContent: '',
};
