import React from 'react';
import { FiArrowRight, FiStar, FiPlay, FiImage } from 'react-icons/fi';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';

// Hero/Banner variants
const BANNER_VARIATIONS = [
  { name: 'Center', value: 'center' },
  { name: 'Center Dark', value: 'center-dark' },
  { name: 'Left', value: 'left' },
  { name: 'Left Dark', value: 'left-dark' },
  { name: 'Left with Image', value: 'left-image' },
  { name: 'Left with Image Dark', value: 'left-image-dark' },
  { name: 'Right with Image', value: 'right-image' },
  { name: 'Right with Image Dark', value: 'right-image-dark' },
  { name: 'Split Layout', value: 'split' },
  { name: 'Split Layout Dark', value: 'split-dark' },
];

// Button styles
const BUTTON_STYLES = [
  { name: 'Primary', value: 'primary' },
  { name: 'Secondary', value: 'secondary' },
  { name: 'Outline', value: 'outline' },
  { name: 'Ghost', value: 'ghost' },
  { name: 'Gradient', value: 'gradient' },
];

// Text alignments
const TEXT_ALIGNMENTS = [
  { name: 'Left', value: 'left' },
  { name: 'Center', value: 'center' },
  { name: 'Right', value: 'right' },
];

// Background types
const BACKGROUND_TYPES = [
  { name: 'Solid Color', value: 'solid' },
  { name: 'Gradient', value: 'gradient' },
  { name: 'Image', value: 'image' },
  { name: 'Pattern', value: 'pattern' },
];

// Gradient presets
const GRADIENT_PRESETS = [
  { name: 'Blue to Purple', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Pink to Orange', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Green to Blue', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Purple to Pink', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { name: 'Orange to Red', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  { name: 'Dark Blue', value: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' },
];

// Hero/Banner Render Component
export const HeroRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const {
    variant = 'center',
    title = 'Build something amazing',
    subtitle = 'Create beautiful websites with our drag-and-drop builder',
    description = 'Get started today and build your dream website in minutes. No coding required.',
    primaryButtonText = 'Get Started',
    primaryButtonLink = '#get-started',
    secondaryButtonText = 'Learn More',
    secondaryButtonLink = '#learn-more',
    primaryButtonStyle = 'primary',
    secondaryButtonStyle = 'outline',
    showSecondaryButton = true,
    imageUrl = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    imageAlt = 'Hero Image',
    backgroundColor = '#ffffff',
    textColor = '#1f2937',
    backgroundType = 'solid',
    gradientPreset = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    customGradient = '',
    backgroundImage = '',
    textAlignment = 'center',
    showBadge = true,
    badgeText = 'New Feature',
    showStats = false,
    stats = [
      { label: 'Users', value: '10K+' },
      { label: 'Downloads', value: '50K+' },
      { label: 'Rating', value: '4.9' },
    ],
    showVideo = false,
    videoUrl = '',
    videoThumbnail = '',
    height = 'auto',
    padding = '4rem',
    borderRadius = '0',
    shadow = 'none',
    overlay = false,
    overlayOpacity = '0.5',
  } = component.props || {};

  const getBackgroundStyle = () => {
    const styles: React.CSSProperties = {
      backgroundColor: backgroundColor,
      color: textColor,
      padding: padding,
      borderRadius: borderRadius,
      boxShadow: shadow !== 'none' ? shadow : undefined,
      minHeight: height === 'auto' ? '500px' : height,
    };

    if (backgroundType === 'gradient') {
      styles.background = customGradient || gradientPreset;
    } else if (backgroundType === 'image' && backgroundImage) {
      styles.backgroundImage = `url(${backgroundImage})`;
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
      styles.backgroundRepeat = 'no-repeat';
    }

    return styles;
  };

  const getButtonClasses = (style: string) => {
    const baseClasses = 'inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    switch (style) {
      case 'primary':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
      case 'secondary':
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500`;
      case 'outline':
        return `${baseClasses} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500`;
      case 'ghost':
        return `${baseClasses} text-blue-600 hover:bg-blue-50 focus:ring-blue-500`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500`;
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
    }
  };

  const getTextAlignmentClasses = () => {
    switch (textAlignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  const getVariantClasses = () => {
    const isDark = variant.includes('dark');
    const baseClasses = 'relative overflow-hidden';
    
    if (isDark) {
      return `${baseClasses} bg-gray-900 text-white`;
    }
    
    return baseClasses;
  };

  const renderContent = () => {
    const contentClasses = `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${getTextAlignmentClasses()}`;
    
    if (variant.includes('image') || variant.includes('split')) {
      return (
        <div className={contentClasses}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {showBadge && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <FiStar className="w-4 h-4 mr-1" />
                  {badgeText}
                </div>
              )}
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                {title}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                {subtitle}
              </p>
              
              <p className="text-lg text-gray-500 max-w-2xl">
                {description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={primaryButtonLink}
                  className={getButtonClasses(primaryButtonStyle)}
                >
                  {primaryButtonText}
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </a>
                
                {showSecondaryButton && (
                  <a
                    href={secondaryButtonLink}
                    className={getButtonClasses(secondaryButtonStyle)}
                  >
                    {secondaryButtonText}
                  </a>
                )}
              </div>
              
              {showStats && (
                <div className="grid grid-cols-3 gap-8 pt-8">
                  {stats.map((stat: { label: string; value: string }, index: number) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              {showVideo ? (
                <div className="relative">
                  <img
                    src={videoThumbnail || imageUrl}
                    alt={imageAlt}
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <FiPlay className="w-6 h-6 text-blue-600" />
                    </div>
                  </button>
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className={contentClasses}>
        <div className="max-w-3xl mx-auto">
          {showBadge && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-8">
              <FiStar className="w-4 h-4 mr-1" />
              {badgeText}
            </div>
          )}
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primaryButtonLink}
              className={getButtonClasses(primaryButtonStyle)}
            >
              {primaryButtonText}
              <FiArrowRight className="ml-2 w-4 h-4" />
            </a>
            
            {showSecondaryButton && (
              <a
                href={secondaryButtonLink}
                className={getButtonClasses(secondaryButtonStyle)}
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
          
          {showStats && (
            <div className="grid grid-cols-3 gap-8 pt-12">
              {stats.map((stat: { label: string; value: string }, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isHovered ? 'ring-1 ring-gray-300' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <section className={getVariantClasses()} style={getBackgroundStyle()}>
        {overlay && (
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        )}
        
        <div className="relative z-10">
          {renderContent()}
        </div>
      </section>
    </div>
  );
};

// Hero/Banner Properties Component
export const HeroPropertiesComponent: React.FC<{
  componentId: string;
}> = ({ componentId }) => {
  const { components, updateComponentProps } = useBuilderStore();
  const component = components.find(c => c.id === componentId);
  
  if (!component) return null;
  
  const handlePropChange = (key: string, value: string | boolean | { label: string; value: string }[]) => {
    updateComponentProps(component.id, { [key]: value });
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const currentStats = component.props?.stats || [];
    const updatedStats = [...currentStats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handlePropChange('stats', updatedStats);
  };

  const addStat = () => {
    const currentStats = component.props?.stats || [];
    const newStat = { label: 'New Stat', value: '0' };
    handlePropChange('stats', [...currentStats, newStat]);
  };

  const removeStat = (index: number) => {
    const currentStats = component.props?.stats || [];
    const updatedStats = currentStats.filter((_: { label: string; value: string }, i: number) => i !== index);
    handlePropChange('stats', updatedStats);
  };

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Settings</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
          <select
            value={component.props?.variant || 'center'}
            onChange={(e) => handlePropChange('variant', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {BANNER_VARIATIONS.map((variation) => (
              <option key={variation.value} value={variation.value}>
                {variation.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={component.props?.title || 'Build something amazing'}
            onChange={(e) => handlePropChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={component.props?.subtitle || 'Create beautiful websites with our drag-and-drop builder'}
            onChange={(e) => handlePropChange('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={component.props?.description || 'Get started today and build your dream website in minutes. No coding required.'}
            onChange={(e) => handlePropChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
          <select
            value={component.props?.textAlignment || 'center'}
            onChange={(e) => handlePropChange('textAlignment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {TEXT_ALIGNMENTS.map((alignment) => (
              <option key={alignment.value} value={alignment.value}>
                {alignment.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Buttons</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
            <input
              type="text"
              value={component.props?.primaryButtonText || 'Get Started'}
              onChange={(e) => handlePropChange('primaryButtonText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Link</label>
            <input
              type="text"
              value={component.props?.primaryButtonLink || '#get-started'}
              onChange={(e) => handlePropChange('primaryButtonLink', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Style</label>
          <select
            value={component.props?.primaryButtonStyle || 'primary'}
            onChange={(e) => handlePropChange('primaryButtonStyle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {BUTTON_STYLES.map((style) => (
              <option key={style.value} value={style.value}>
                {style.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.showSecondaryButton !== false}
            onChange={(e) => handlePropChange('showSecondaryButton', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show Secondary Button</label>
        </div>

        {component.props?.showSecondaryButton && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
                <input
                  type="text"
                  value={component.props?.secondaryButtonText || 'Learn More'}
                  onChange={(e) => handlePropChange('secondaryButtonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Link</label>
                <input
                  type="text"
                  value={component.props?.secondaryButtonLink || '#learn-more'}
                  onChange={(e) => handlePropChange('secondaryButtonLink', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Style</label>
              <select
                value={component.props?.secondaryButtonStyle || 'outline'}
                onChange={(e) => handlePropChange('secondaryButtonStyle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {BUTTON_STYLES.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {/* Background */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Background</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Background Type</label>
          <select
            value={component.props?.backgroundType || 'solid'}
            onChange={(e) => handlePropChange('backgroundType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {BACKGROUND_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {component.props?.backgroundType === 'solid' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <input
                type="color"
                value={component.props?.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={component.props?.textColor || '#1f2937'}
                onChange={(e) => handlePropChange('textColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        )}

        {component.props?.backgroundType === 'gradient' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Preset</label>
              <select
                value={component.props?.gradientPreset || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}
                onChange={(e) => handlePropChange('gradientPreset', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {GRADIENT_PRESETS.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Gradient</label>
              <input
                type="text"
                value={component.props?.customGradient || ''}
                onChange={(e) => handlePropChange('customGradient', e.target.value)}
                placeholder="linear-gradient(135deg, #color1, #color2)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </>
        )}

        {component.props?.backgroundType === 'image' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
            <input
              type="url"
              value={component.props?.backgroundImage || ''}
              onChange={(e) => handlePropChange('backgroundImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.overlay || false}
            onChange={(e) => handlePropChange('overlay', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show Overlay</label>
        </div>

        {component.props?.overlay && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Overlay Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={component.props?.overlayOpacity || '0.5'}
              onChange={(e) => handlePropChange('overlayOpacity', e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Image & Video */}
      {(component.props?.variant?.includes('image') || component.props?.variant?.includes('split')) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Image & Video</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={component.props?.imageUrl || ''}
              onChange={(e) => handlePropChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
            <input
              type="text"
              value={component.props?.imageAlt || 'Hero Image'}
              onChange={(e) => handlePropChange('imageAlt', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={component.props?.showVideo || false}
              onChange={(e) => handlePropChange('showVideo', e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Show as Video</label>
          </div>

          {component.props?.showVideo && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                type="url"
                value={component.props?.videoUrl || ''}
                onChange={(e) => handlePropChange('videoUrl', e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>
      )}

      {/* Badge */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Badge</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.showBadge !== false}
            onChange={(e) => handlePropChange('showBadge', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show Badge</label>
        </div>

        {component.props?.showBadge && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
            <input
              type="text"
              value={component.props?.badgeText || 'New Feature'}
              onChange={(e) => handlePropChange('badgeText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
          <button
            onClick={addStat}
            className="px-3 py-1 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Add Stat
          </button>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.showStats || false}
            onChange={(e) => handlePropChange('showStats', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show Statistics</label>
        </div>

        {component.props?.showStats && (
          <div className="space-y-3">
            {(component.props?.stats || []).map((stat: { label: string; value: string }, index: number) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Stat {index + 1}</span>
                  <button
                    onClick={() => removeStat(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Layout */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Layout</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
            <input
              type="text"
              value={component.props?.height || 'auto'}
              onChange={(e) => handlePropChange('height', e.target.value)}
              placeholder="500px, auto, 100vh"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
            <input
              type="text"
              value={component.props?.padding || '4rem'}
              onChange={(e) => handlePropChange('padding', e.target.value)}
              placeholder="4rem, 2rem, 1rem"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
            <input
              type="text"
              value={component.props?.borderRadius || '0'}
              onChange={(e) => handlePropChange('borderRadius', e.target.value)}
              placeholder="0, 0.5rem, 1rem"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shadow</label>
            <input
              type="text"
              value={component.props?.shadow || 'none'}
              onChange={(e) => handlePropChange('shadow', e.target.value)}
              placeholder="none, 0 4px 6px -1px rgb(0 0 0 / 0.1)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component Configuration
export const heroConfig = {
  type: 'Hero' as const,
  name: 'Hero Banner',
  description: 'Responsive hero section with multiple variants',
  icon: FiImage,
  category: 'marketing' as const,
  defaultContent: '',
  defaultStyles: {
    display: 'block' as const,
    width: '100%',
    backgroundColor: 'transparent',
    padding: '0',
    margin: '0',
  },
  defaultProps: {
    content: '',
    styles: {
      display: 'block' as const,
      width: '100%',
      backgroundColor: 'transparent',
      padding: '0',
      margin: '0',
    },
    children: [],
    variant: 'center',
    title: 'Build something amazing',
    subtitle: 'Create beautiful websites with our drag-and-drop builder',
    description: 'Get started today and build your dream website in minutes. No coding required.',
    primaryButtonText: 'Get Started',
    primaryButtonLink: '#get-started',
    secondaryButtonText: 'Learn More',
    secondaryButtonLink: '#learn-more',
    primaryButtonStyle: 'primary',
    secondaryButtonStyle: 'outline',
    showSecondaryButton: true,
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    imageAlt: 'Hero Image',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    backgroundType: 'solid',
    gradientPreset: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    customGradient: '',
    backgroundImage: '',
    textAlignment: 'center',
    showBadge: true,
    badgeText: 'New Feature',
    showStats: false,
    stats: [
      { label: 'Users', value: '10K+' },
      { label: 'Downloads', value: '50K+' },
      { label: 'Rating', value: '4.9' },
    ],
    showVideo: false,
    videoUrl: '',
    videoThumbnail: '',
    height: 'auto',
    padding: '4rem',
    borderRadius: '0',
    shadow: 'none',
    overlay: false,
    overlayOpacity: '0.5',
  },
  RenderComponent: HeroRenderComponent,
  PropertiesComponent: HeroPropertiesComponent,
};
