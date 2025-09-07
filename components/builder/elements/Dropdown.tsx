import React, { useState } from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiChevronDown, FiMenu } from 'react-icons/fi';

interface DropdownItem {
  text: string;
  description?: string;
  separator?: boolean;
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

// 1. The component that renders on the canvas
export const DropdownRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const variant = component.props?.variant || 'basic';
  const buttonText = component.props?.buttonText || 'Choose one';
  const items = component.props?.items || [
    { text: 'Dashboard', description: 'Quick overview of all basic metrics and settings' },
    { text: 'Metrics and analytics', description: 'Detailed analytic date reviews management' },
    { text: 'Multi-Channel Funnels overview', description: 'Generated from conversion paths, the sequences of interactions' },
    { text: 'User settings', description: 'User settings allow you to configure your email preferences' },
    { text: 'User Profile', description: 'A collection of settings and information about your account' }
  ];
  const showIcons = component.props?.showIcons || false;
  const showDescriptions = component.props?.showDescriptions || false;
  const activeItem = component.props?.activeItem || 1; // Index of active item

  const getButtonStyles = () => {
    const baseStyles = 'inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap';
    const colorStyles = 'bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none';
    return `${baseStyles} ${colorStyles}`;
  };

  const getMenuStyles = () => {
    return 'absolute z-20 flex flex-col py-2 mt-1 list-none bg-white rounded shadow-md w-72 top-full shadow-slate-500/10';
  };

  const getItemStyles = (index: number) => {
    const isActive = index === activeItem;
    const baseStyles = 'flex items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 text-slate-500 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none focus-visible:outline-none';
    return isActive ? `${baseStyles} bg-emerald-50 text-emerald-600` : baseStyles;
  };

  return (
    <div
      className={`
        relative inline-flex
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
        ${isHovered ? 'shadow-sm' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Dropdown trigger */}
      <button
        className={getButtonStyles()}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{buttonText}</span>
        <span className="relative only:-mx-5">
          <FiChevronDown className="w-5 h-5" />
        </span>
      </button>

      {/* Menu list */}
      {isOpen && (
        <ul className={getMenuStyles()}>
          {items.map((item: DropdownItem, index: number) => (
            <li key={index}>
              {item.separator ? (
                <div role="separator" className="border-b border-slate-200"></div>
              ) : (
                <a
                  className={getItemStyles(index)}
                  href="#"
                  aria-current={index === activeItem ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                >
                  {showIcons && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="flex-shrink-0 w-5 h-5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                      />
                    </svg>
                  )}
                  <span className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                    <span className="leading-5 truncate">{item.text}</span>
                    {showDescriptions && item.description && (
                      <span className="text-sm whitespace-normal opacity-70">
                        {item.description}
                      </span>
                    )}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const DropdownPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
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

  const handlePropChange = (property: string, value: string | boolean | number | DropdownItem[]) => {
    updateComponentProps(componentId, { [property]: value });
  };

  const addMenuItem = () => {
    const currentItems = component.props?.items || [];
    const newItem: DropdownItem = {
      text: 'New Item',
      description: 'Item description',
      separator: false
    };
    handlePropChange('items', [...currentItems, newItem]);
  };

  const removeMenuItem = (index: number) => {
    const currentItems = component.props?.items || [];
    handlePropChange('items', currentItems.filter((_: DropdownItem, i: number) => i !== index));
  };

  const updateMenuItem = (index: number, field: string, value: string | boolean) => {
    const currentItems = component.props?.items || [];
    const updatedItems = currentItems.map((item: DropdownItem, i: number) => 
      i === index ? { ...item, [field]: value } : item
    );
    handlePropChange('items', updatedItems);
  };

  return (
    <div className="space-y-4">
      {/* Button Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
        <input
          type="text"
          value={component.props?.buttonText || ''}
          onChange={(e) => handlePropChange('buttonText', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter button text..."
        />
      </div>

      {/* Variant */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
        <select
          value={component.props?.variant || 'basic'}
          onChange={(e) => handlePropChange('variant', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="basic">Basic</option>
          <option value="with-icons">With Icons</option>
        </select>
      </div>

      {/* Show Icons */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.showIcons || false}
          onChange={(e) => handlePropChange('showIcons', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Show Icons</label>
      </div>

      {/* Show Descriptions */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.showDescriptions || false}
          onChange={(e) => handlePropChange('showDescriptions', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Show Descriptions</label>
      </div>

      {/* Active Item */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Active Item Index</label>
        <input
          type="number"
          min="0"
          max={(component.props?.items?.length || 1) - 1}
          value={component.props?.activeItem || 0}
          onChange={(e) => handlePropChange('activeItem', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Menu Items */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Menu Items</label>
          <button
            onClick={addMenuItem}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Item
          </button>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {(component.props?.items || []).map((item: DropdownItem, index: number) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Item {index + 1}</span>
                <button
                  onClick={() => removeMenuItem(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={item.text || ''}
                  onChange={(e) => updateMenuItem(index, 'text', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Item text..."
                />
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={(e) => updateMenuItem(index, 'description', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Item description..."
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.separator || false}
                    onChange={(e) => updateMenuItem(index, 'separator', e.target.checked)}
                    className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-xs text-gray-700">Separator</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Button Background Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={component.styles.backgroundColor || '#10b981'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={component.styles.backgroundColor || '#10b981'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Menu Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Menu Width</label>
        <input
          type="text"
          value={component.styles.width || '288px'}
          onChange={(e) => handleStyleChange('width', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="e.g., 288px, 100%"
        />
      </div>
    </div>
  );
};

// Dropdown component configuration
export const dropdownConfig = {
  type: 'Dropdown',
  name: 'Dropdown',
  description: 'Menu component for displaying a list of choices with proper accessibility',
  icon: FiMenu,
  category: 'interactive' as const,
  defaultProps: {
    content: '',
    styles: {
      display: 'inline-block' as const,
      backgroundColor: '#10b981',
      width: '288px',
    },
    children: [],
    props: {
      variant: 'basic',
      buttonText: 'Choose one',
      showIcons: false,
      showDescriptions: false,
      activeItem: 1,
      items: [
        { text: 'Dashboard', description: 'Quick overview of all basic metrics and settings', separator: false },
        { text: 'Metrics and analytics', description: 'Detailed analytic date reviews management', separator: false },
        { text: 'Multi-Channel Funnels overview', description: 'Generated from conversion paths, the sequences of interactions', separator: false },
        { text: 'User settings', description: 'User settings allow you to configure your email preferences', separator: false },
        { text: 'User Profile', description: 'A collection of settings and information about your account', separator: false }
      ],
    },
  },
  RenderComponent: DropdownRenderComponent,
  PropertiesComponent: DropdownPropertiesComponent,
  defaultStyles: {
    display: 'inline-block' as const,
    backgroundColor: '#10b981',
    width: '288px',
  },
  defaultContent: '',
};
