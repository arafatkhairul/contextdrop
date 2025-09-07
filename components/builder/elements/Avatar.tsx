import React from 'react';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';
import { FiUser } from 'react-icons/fi';

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
export const AvatarRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const size = component.props?.size || 'medium';
  const shape = component.props?.shape || 'circle';
  const showStatus = component.props?.showStatus || false;
  const statusType = component.props?.statusType || 'online';
  const imageUrl = component.props?.imageUrl || '';
  const initials = component.props?.initials || 'JD';
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 text-xs';
      case 'large':
        return 'w-16 h-16 text-lg';
      case 'xl':
        return 'w-20 h-20 text-xl';
      default:
        return 'w-12 h-12 text-sm';
    }
  };

  const getShapeStyles = () => {
    switch (shape) {
      case 'square':
        return 'rounded-lg';
      case 'rounded':
        return 'rounded-xl';
      default:
        return 'rounded-full';
    }
  };

  const getStatusStyles = () => {
    switch (statusType) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'busy':
        return 'bg-red-400';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-green-400';
    }
  };

  return (
    <div
      className={`
        relative inline-flex items-center justify-center
        ${getSizeStyles()}
        ${getShapeStyles()}
        ${isSelected ? 'ring-2 ring-blue-200' : ''}
        ${isHovered ? 'shadow-lg' : ''}
      `}
      style={stylesToCSS(component.styles)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Avatar"
          className={`w-full h-full object-cover ${getShapeStyles()}`}
        />
      ) : (
        <div className={`w-full h-full ${getShapeStyles()} bg-gray-300 flex items-center justify-center text-gray-600 font-medium`}>
          {initials}
        </div>
      )}
      
      {showStatus && (
        <span className={`absolute bottom-0 right-0 block w-3 h-3 ${getStatusStyles()} border-2 border-white ${getShapeStyles()}`}></span>
      )}
    </div>
  );
};

// 2. The component that renders in the Properties panel
export const AvatarPropertiesComponent: React.FC<{ componentId: string }> = ({ componentId }) => {
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
      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
        <input
          type="url"
          value={component.props?.imageUrl || ''}
          onChange={(e) => handlePropChange('imageUrl', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>

      {/* Initials */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Initials</label>
        <input
          type="text"
          value={component.props?.initials || ''}
          onChange={(e) => handlePropChange('initials', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="JD"
          maxLength={3}
        />
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <select
          value={component.props?.size || 'medium'}
          onChange={(e) => handlePropChange('size', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="small">Small (32px)</option>
          <option value="medium">Medium (48px)</option>
          <option value="large">Large (64px)</option>
          <option value="xl">Extra Large (80px)</option>
        </select>
      </div>

      {/* Shape */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
        <select
          value={component.props?.shape || 'circle'}
          onChange={(e) => handlePropChange('shape', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="circle">Circle</option>
          <option value="rounded">Rounded</option>
          <option value="square">Square</option>
        </select>
      </div>

      {/* Show Status */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={component.props?.showStatus || false}
          onChange={(e) => handlePropChange('showStatus', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Show Status</label>
      </div>

      {/* Status Type */}
      {component.props?.showStatus && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status Type</label>
          <select
            value={component.props?.statusType || 'online'}
            onChange={(e) => handlePropChange('statusType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="online">Online</option>
            <option value="away">Away</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      )}

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={component.styles.backgroundColor || '#d1d5db'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={component.styles.backgroundColor || '#d1d5db'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Border */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Border</label>
        <input
          type="text"
          value={component.styles.border || 'none'}
          onChange={(e) => handleStyleChange('border', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="e.g., 2px solid #e5e7eb"
        />
      </div>
    </div>
  );
};

// Avatar component configuration
export const avatarConfig = {
  type: 'Avatar',
  name: 'Avatar',
  description: 'User profile picture with various sizes and status indicators',
  icon: FiUser,
  category: 'general' as const,
  defaultProps: {
    content: '',
    styles: {
      display: 'inline-block' as const,
      backgroundColor: '#d1d5db',
    },
    children: [],
    props: {
      size: 'medium',
      shape: 'circle',
      initials: 'JD',
      imageUrl: '',
      showStatus: false,
      statusType: 'online',
    },
  },
  RenderComponent: AvatarRenderComponent,
  PropertiesComponent: AvatarPropertiesComponent,
  defaultStyles: {
    display: 'inline-block' as const,
    backgroundColor: '#d1d5db',
  },
  defaultContent: '',
};
