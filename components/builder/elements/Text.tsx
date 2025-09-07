import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiFileText } from 'react-icons/fi';

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
export const TextRenderComponent: React.FC<{
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
};

// 2. The component that renders in the Properties panel
export const TextPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
  const { getComponentById, updateComponentStyles, updateComponentContent } = useBuilderStore();
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

  return (
    <div className="space-y-4">
      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
        <textarea
          value={component.content || ''}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
          placeholder="Enter your text content..."
        />
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
        <input
          type="range"
          min="8"
          max="72"
          value={component.styles.fontSize || 16}
          onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{component.styles.fontSize || 16}px</div>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={component.styles.textColor || '#374151'}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={component.styles.textColor || '#374151'}
            onChange={(e) => handleStyleChange('textColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
        <select
          value={component.styles.fontWeight || 'normal'}
          onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="semibold">Semibold</option>
          <option value="bold">Bold</option>
        </select>
      </div>

      {/* Text Align */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
        <select
          value={component.styles.textAlign || 'left'}
          onChange={(e) => handleStyleChange('textAlign', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>

      {/* Line Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Line Height</label>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={component.styles.lineHeight || 1.6}
          onChange={(e) => handleStyleChange('lineHeight', parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{component.styles.lineHeight || 1.6}</div>
      </div>
    </div>
  );
};

// Text component configuration
export const textConfig = {
  type: 'Text',
  name: 'Text',
  description: 'Plain text paragraph',
  icon: FiFileText,
  category: 'typography' as const,
  defaultProps: {
    content: 'Add your text content here. You can edit this by selecting the text and typing.',
    styles: {
      fontSize: 16,
      textColor: '#374151',
      lineHeight: 1.6,
      margin: '0 0 16px 0',
    },
    children: [],
  },
  RenderComponent: TextRenderComponent,
  PropertiesComponent: TextPropertiesComponent,
  defaultStyles: {
    fontSize: 16,
    textColor: '#374151',
    lineHeight: 1.6,
    margin: '0 0 16px 0',
  },
  defaultContent: 'Add your text content here. You can edit this by selecting the text and typing.',
};
