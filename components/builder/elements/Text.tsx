import React, { useState, useEffect } from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiFileText, FiType, FiDroplet, FiZap } from 'react-icons/fi';

// Google Fonts list
const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Source Sans Pro',
  'Raleway', 'Ubuntu', 'Playfair Display', 'Merriweather', 'Oswald', 'Lora',
  'Nunito', 'Crimson Text', 'Fira Sans', 'Libre Baskerville', 'PT Sans', 'PT Serif',
  'Dancing Script', 'Pacifico', 'Lobster', 'Bebas Neue', 'Anton', 'Righteous',
  'Fredoka One', 'Comfortaa', 'Quicksand', 'Work Sans', 'Rubik', 'Mukti', 'Noto Sans'
];

// Animation presets
const ANIMATION_PRESETS = [
  { name: 'None', value: 'none' },
  { name: 'Fade In', value: 'fadeIn' },
  { name: 'Slide Up', value: 'slideUp' },
  { name: 'Bounce', value: 'bounce' },
  { name: 'Pulse', value: 'pulse' },
  { name: 'Shake', value: 'shake' },
  { name: 'Typewriter', value: 'typewriter' },
  { name: 'Glow', value: 'glow' },
];

// Gradient presets
const GRADIENT_PRESETS = [
  { name: 'None', value: 'none' },
  { name: 'Sunset', value: 'linear-gradient(45deg, #ff6b6b, #feca57)' },
  { name: 'Ocean', value: 'linear-gradient(45deg, #74b9ff, #0984e3)' },
  { name: 'Forest', value: 'linear-gradient(45deg, #00b894, #00cec9)' },
  { name: 'Purple', value: 'linear-gradient(45deg, #a29bfe, #6c5ce7)' },
  { name: 'Pink', value: 'linear-gradient(45deg, #fd79a8, #e84393)' },
  { name: 'Gold', value: 'linear-gradient(45deg, #fdcb6e, #e17055)' },
  { name: 'Rainbow', value: 'linear-gradient(45deg, #ff7675, #74b9ff, #00b894, #fdcb6e)' },
  { name: 'Fire', value: 'linear-gradient(45deg, #ff9a56, #ff6b6b)' },
  { name: 'Ice', value: 'linear-gradient(45deg, #74b9ff, #0984e3)' },
  { name: 'Nature', value: 'linear-gradient(45deg, #00b894, #00cec9)' },
  { name: 'Royal', value: 'linear-gradient(45deg, #6c5ce7, #a29bfe)' },
  { name: 'Sunrise', value: 'linear-gradient(45deg, #fdcb6e, #e17055)' },
  { name: 'Midnight', value: 'linear-gradient(45deg, #2d3436, #636e72)' },
  { name: 'Aurora', value: 'linear-gradient(45deg, #00cec9, #55a3ff, #fd79a8)' },
];

// Helper function to convert styles object to CSS string
const stylesToCSS = (styles: WebComponent['styles']): React.CSSProperties => {
  const css: React.CSSProperties = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Handle special cases
      if (key === 'fontFamily' && value !== 'none') {
        css.fontFamily = `"${value}", sans-serif`;
      } else if (key === 'background' && value !== 'none') {
        // Apply gradient as background
        css.background = value;
        // Make text transparent to show gradient
        (css as Record<string, string>).webkitBackgroundClip = 'text';
        (css as Record<string, string>).webkitTextFillColor = 'transparent';
        css.backgroundClip = 'text';
        // Don't apply textColor when gradient is active
        css.color = 'transparent';
      } else if (key === 'textColor' && styles.background === 'none') {
        // Only apply textColor if no gradient is active
        css.color = value;
      } else if (key !== 'textColor') {
        // Convert camelCase to kebab-case for CSS properties
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        (css as Record<string, string | number>)[cssKey] = value;
      }
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
  const animation = component.props?.animation || 'none';
  
  const getAnimationClass = () => {
    switch (animation) {
      case 'fadeIn':
        return 'animate-fade-in';
      case 'slideUp':
        return 'animate-slide-up';
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse';
      case 'shake':
        return 'animate-shake';
      case 'typewriter':
        return 'animate-typewriter';
      case 'glow':
        return 'animate-glow';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        relative cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
        ${getAnimationClass()}
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
  const { getComponentById, updateComponentStyles, updateComponentContent, updateComponentProps } = useBuilderStore();
  const component = getComponentById(componentId);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700&family=Raleway:wght@300;400;500;600;700&family=Ubuntu:wght@300;400;500;700&family=Playfair+Display:wght@400;500;600;700&family=Merriweather:wght@300;400;700&family=Oswald:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Fira+Sans:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=PT+Sans:wght@400;700&family=PT+Serif:wght@400;700&family=Dancing+Script:wght@400;500;600;700&family=Pacifico:wght@400&family=Lobster:wght@400&family=Bebas+Neue:wght@400&family=Anton:wght@400&family=Righteous:wght@400&family=Fredoka+One:wght@400&family=Comfortaa:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&family=Mukti:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  if (!component) {
    return <div className="p-4 text-gray-500">Component not found</div>;
  }

  const handleStyleChange = (property: keyof WebComponent['styles'], value: string | number) => {
    updateComponentStyles(componentId, { [property]: value });
  };

  const handleContentChange = (content: string) => {
    updateComponentContent(componentId, content);
  };

  const handlePropChange = (property: string, value: string | number) => {
    updateComponentProps(componentId, { [property]: value });
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'basic'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiFileText className="w-4 h-4 inline mr-1" />
          Basic
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'typography'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiType className="w-4 h-4 inline mr-1" />
          Typography
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'colors'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiDroplet className="w-4 h-4 inline mr-1" />
          Colors
        </button>
        <button
          onClick={() => setActiveTab('animation')}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'animation'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiZap className="w-4 h-4 inline mr-1" />
          Animation
        </button>
      </div>

      {/* Basic Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-4">
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
            <textarea
              value={component.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              max="120"
              value={component.styles.fontSize || 16}
              onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{component.styles.fontSize || 16}px</div>
          </div>

          {/* Text Align */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
            <select
              value={component.styles.textAlign || 'left'}
              onChange={(e) => handleStyleChange('textAlign', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
      )}

      {/* Typography Tab */}
      {activeTab === 'typography' && (
        <div className="space-y-4">
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select
              value={component.styles.fontFamily || 'Inter'}
              onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{ fontFamily: `"${component.styles.fontFamily || 'Inter'}", sans-serif` }}
            >
              {GOOGLE_FONTS.map((font) => (
                <option key={font} value={font} style={{ fontFamily: `"${font}", sans-serif` }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
            <select
              value={component.styles.fontWeight || 'normal'}
              onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="300">Light (300)</option>
              <option value="normal">Normal (400)</option>
              <option value="500">Medium (500)</option>
              <option value="600">Semibold (600)</option>
              <option value="bold">Bold (700)</option>
            </select>
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Letter Spacing</label>
            <input
              type="range"
              min="-2"
              max="10"
              step="0.5"
              value={component.styles.letterSpacing || 0}
              onChange={(e) => handleStyleChange('letterSpacing', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{component.styles.letterSpacing || 0}px</div>
          </div>

          {/* Text Transform */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Transform</label>
            <select
              value={component.styles.textTransform || 'none'}
              onChange={(e) => handleStyleChange('textTransform', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="none">None</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </div>

          {/* Text Decoration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Decoration</label>
            <select
              value={component.styles.textDecoration || 'none'}
              onChange={(e) => handleStyleChange('textDecoration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="none">None</option>
              <option value="underline">Underline</option>
              <option value="line-through">Line Through</option>
              <option value="overline">Overline</option>
            </select>
          </div>
        </div>
      )}

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Gradient Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Text</label>
            <select
              value={component.styles.background || 'none'}
              onChange={(e) => handleStyleChange('background', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {GRADIENT_PRESETS.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Gradient */}
          {component.styles.background !== 'none' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Gradient</label>
              <input
                type="text"
                value={component.styles.background || ''}
                onChange={(e) => handleStyleChange('background', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="linear-gradient(45deg, #ff6b6b, #feca57)"
              />
            </div>
          )}

          {/* Text Shadow */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Shadow</label>
            <input
              type="text"
              value={component.styles.textShadow || 'none'}
              onChange={(e) => handleStyleChange('textShadow', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="2px 2px 4px rgba(0,0,0,0.3)"
            />
          </div>
        </div>
      )}

      {/* Animation Tab */}
      {activeTab === 'animation' && (
        <div className="space-y-4">
          {/* Animation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
            <select
              value={component.props?.animation || 'none'}
              onChange={(e) => handlePropChange('animation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {ANIMATION_PRESETS.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Animation Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={component.props?.animationDuration || 1}
              onChange={(e) => handlePropChange('animationDuration', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{component.props?.animationDuration || 1}s</div>
          </div>

          {/* Animation Delay */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delay</label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={component.props?.animationDelay || 0}
              onChange={(e) => handlePropChange('animationDelay', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{component.props?.animationDelay || 0}s</div>
          </div>

          {/* Animation Iteration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Iteration</label>
            <select
              value={component.props?.animationIteration || '1'}
              onChange={(e) => handlePropChange('animationIteration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="1">Once</option>
              <option value="2">Twice</option>
              <option value="3">Three times</option>
              <option value="infinite">Infinite</option>
            </select>
          </div>
        </div>
      )}
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
