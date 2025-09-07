import React, { useState } from 'react';
import { FiMenu, FiX, FiUser, FiChevronDown, FiShoppingCart, FiSearch, FiBell, FiSettings, FiLogOut, FiNavigation } from 'react-icons/fi';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';

// Header variants from HyperUI
const HEADER_VARIATIONS = [
  { name: 'Icon + Links Left, CTA Right', value: 'icon-links-left-cta-right' },
  { name: 'Icon + Links Left, CTA Right (Dark)', value: 'icon-links-left-cta-right-dark' },
  { name: 'Icon Left, Links Center, CTA Right', value: 'icon-left-links-center-cta-right' },
  { name: 'Icon Left, Links Center, CTA Right (Dark)', value: 'icon-left-links-center-cta-right-dark' },
  { name: 'Icon Left, Links + CTA Right', value: 'icon-left-links-cta-right' },
  { name: 'Icon Left, Links + CTA Right (Dark)', value: 'icon-left-links-cta-right-dark' },
  { name: 'Icon Left, Links + User Dropdown Right', value: 'icon-left-links-user-right' },
  { name: 'Icon Left, Links + User Dropdown Right (Dark)', value: 'icon-left-links-user-right-dark' },
];

// Button styles
const BUTTON_STYLES = [
  { name: 'Primary', value: 'primary' },
  { name: 'Secondary', value: 'secondary' },
  { name: 'Outline', value: 'outline' },
  { name: 'Ghost', value: 'ghost' },
  { name: 'Gradient', value: 'gradient' },
];

// Logo types
const LOGO_TYPES = [
  { name: 'Text Only', value: 'text' },
  { name: 'Icon + Text', value: 'icon-text' },
  { name: 'Icon Only', value: 'icon' },
];

// Header Render Component
export const HeaderRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const {
    variant = 'icon-links-left-cta-right',
    brandName = 'Brand',
    logoType = 'icon-text',
    logoIcon = '🚀',
    navItems = [
      { id: '1', label: 'Home', href: '#home', isActive: true },
      { id: '2', label: 'Features', href: '#features' },
      { id: '3', label: 'Pricing', href: '#pricing' },
      { id: '4', label: 'About', href: '#about' },
    ],
    primaryButtonText = 'Get Started',
    primaryButtonLink = '#get-started',
    secondaryButtonText = 'Sign In',
    secondaryButtonLink = '#signin',
    primaryButtonStyle = 'primary',
    secondaryButtonStyle = 'outline',
    showSecondaryButton = true,
    showUserDropdown = false,
    userAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=32&h=32&q=80',
    userName = 'John Doe',
    userEmail = 'john@example.com',
    showCart = false,
    cartCount = 0,
    showNotifications = false,
    notificationCount = 0,
    showSearch = false,
    backgroundColor = '#ffffff',
    textColor = '#1f2937',
    borderColor = '#e5e7eb',
    sticky = true,
    height = '4rem',
    padding = '0 1rem',
    borderRadius = '0',
    shadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    backdropBlur = 'blur(8px)',
    transparent = false,
  } = component.props || {};

  const isDark = variant.includes('dark');
  
  const getHeaderClasses = () => {
    const baseClasses = 'relative z-50 w-full border-b';
    const stickyClass = sticky ? 'sticky top-0' : '';
    const darkClass = isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
    const transparentClass = transparent ? 'bg-transparent border-transparent' : '';
    
    return `${baseClasses} ${stickyClass} ${darkClass} ${transparentClass}`;
  };

  const getHeaderStyles = () => {
    const styles: React.CSSProperties = {
      height: height,
      padding: padding,
      borderRadius: borderRadius,
      boxShadow: shadow !== 'none' ? shadow : undefined,
      backdropFilter: backdropBlur !== 'none' ? backdropBlur : undefined,
    };

    if (!isDark && !transparent) {
      styles.backgroundColor = backgroundColor;
      styles.color = textColor;
      styles.borderColor = borderColor;
    }

    return styles;
  };

  const getButtonClasses = (style: string) => {
    const baseClasses = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    if (isDark) {
      switch (style) {
        case 'primary':
          return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
        case 'secondary':
          return `${baseClasses} bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500`;
        case 'outline':
          return `${baseClasses} border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-500`;
        case 'ghost':
          return `${baseClasses} text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-500`;
        case 'gradient':
          return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500`;
        default:
          return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
      }
    } else {
      switch (style) {
        case 'primary':
          return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
        case 'secondary':
          return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500`;
        case 'outline':
          return `${baseClasses} border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500`;
        case 'ghost':
          return `${baseClasses} text-blue-600 hover:bg-blue-50 focus:ring-blue-500`;
        case 'gradient':
          return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500`;
        default:
          return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
      }
    }
  };

  const getTextClasses = () => {
    return isDark ? 'text-white' : 'text-gray-900';
  };

  const getHoverClasses = () => {
    return isDark ? 'hover:text-blue-400' : 'hover:text-blue-600';
  };

  const getActiveClasses = () => {
    return isDark ? 'text-blue-400' : 'text-blue-600';
  };

  const renderLogo = () => {
    return (
      <div className="flex items-center">
        <a href="#" className="flex items-center space-x-2">
          {logoType !== 'text' && (
            <span className="text-2xl">{logoIcon}</span>
          )}
          {logoType !== 'icon' && (
            <span className="text-xl font-bold">{brandName}</span>
          )}
        </a>
      </div>
    );
  };

  const renderNavigation = () => {
    return (
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item: { id: string; label: string; href: string; isActive?: boolean }) => (
          <a
            key={item.id}
            href={item.href}
            className={`text-sm font-medium transition-colors duration-300 ${getHoverClasses()} ${
              item.isActive ? getActiveClasses() : getTextClasses()
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    );
  };

  const renderActions = () => {
    return (
      <div className="flex items-center space-x-4">
        {showSearch && (
          <button className={`p-2 rounded-lg ${getHoverClasses()}`}>
            <FiSearch className="w-5 h-5" />
          </button>
        )}
        
        {showNotifications && (
          <button className={`relative p-2 rounded-lg ${getHoverClasses()}`}>
            <FiBell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
        )}
        
        {showCart && (
          <button className={`relative p-2 rounded-lg ${getHoverClasses()}`}>
            <FiShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        )}
        
        {showSecondaryButton && (
          <a
            href={secondaryButtonLink}
            className={getButtonClasses(secondaryButtonStyle)}
          >
            {secondaryButtonText}
          </a>
        )}
        
        <a
          href={primaryButtonLink}
          className={getButtonClasses(primaryButtonStyle)}
        >
          {primaryButtonText}
        </a>
      </div>
    );
  };

  const renderUserDropdown = () => {
    return (
      <div className="relative">
        <button
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        >
          <img
            src={userAvatar}
            alt={userName}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">{userName}</span>
          <FiChevronDown className="w-4 h-4" />
        </button>
        
        {isUserDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
            </div>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiUser className="w-4 h-4 mr-2" />
              Profile
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiSettings className="w-4 h-4 mr-2" />
              Settings
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiLogOut className="w-4 h-4 mr-2" />
              Sign Out
            </a>
          </div>
        )}
      </div>
    );
  };

  const renderMobileMenu = () => {
    return (
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2 rounded-lg ${getHoverClasses()}`}
        >
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
        
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item: { id: string; label: string; href: string; isActive?: boolean }) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                    item.isActive ? getActiveClasses() : getTextClasses()
                  } ${getHoverClasses()}`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 space-y-2">
                {showSecondaryButton && (
                  <a
                    href={secondaryButtonLink}
                    className={`block w-full text-center ${getButtonClasses(secondaryButtonStyle)}`}
                  >
                    {secondaryButtonText}
                  </a>
                )}
                <a
                  href={primaryButtonLink}
                  className={`block w-full text-center ${getButtonClasses(primaryButtonStyle)}`}
                >
                  {primaryButtonText}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLayout = () => {
    switch (variant) {
      case 'icon-links-left-cta-right':
      case 'icon-links-left-cta-right-dark':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {renderLogo()}
              {renderNavigation()}
            </div>
            {renderActions()}
          </div>
        );
      
      case 'icon-left-links-center-cta-right':
      case 'icon-left-links-center-cta-right-dark':
        return (
          <div className="flex items-center justify-between">
            {renderLogo()}
            {renderNavigation()}
            {renderActions()}
          </div>
        );
      
      case 'icon-left-links-cta-right':
      case 'icon-left-links-cta-right-dark':
        return (
          <div className="flex items-center justify-between">
            {renderLogo()}
            <div className="flex items-center space-x-8">
              {renderNavigation()}
              {renderActions()}
            </div>
          </div>
        );
      
      case 'icon-left-links-user-right':
      case 'icon-left-links-user-right-dark':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {renderLogo()}
              {renderNavigation()}
            </div>
            <div className="flex items-center space-x-4">
              {showSearch && (
                <button className={`p-2 rounded-lg ${getHoverClasses()}`}>
                  <FiSearch className="w-5 h-5" />
                </button>
              )}
              {showNotifications && (
                <button className={`relative p-2 rounded-lg ${getHoverClasses()}`}>
                  <FiBell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </button>
              )}
              {renderUserDropdown()}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {renderLogo()}
              {renderNavigation()}
            </div>
            {renderActions()}
          </div>
        );
    }
  };

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isHovered ? 'ring-1 ring-gray-300' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <header className={getHeaderClasses()} style={getHeaderStyles()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderLayout()}
          {renderMobileMenu()}
        </div>
      </header>
    </div>
  );
};

// Header Properties Component
export const HeaderPropertiesComponent: React.FC<{
  componentId: string;
}> = ({ componentId }) => {
  const { components, updateComponentProps } = useBuilderStore();
  const component = components.find(c => c.id === componentId);
  
  if (!component) return null;
  
  const handlePropChange = (key: string, value: string | boolean | number | { id: string; label: string; href: string; isActive?: boolean }[]) => {
    updateComponentProps(component.id, { [key]: value });
  };

  const handleNavItemChange = (index: number, field: string, value: string | boolean) => {
    const currentItems = component.props?.navItems || [];
    const updatedItems = [...currentItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handlePropChange('navItems', updatedItems);
  };

  const addNavItem = () => {
    const currentItems = component.props?.navItems || [];
    const newItem = { id: Date.now().toString(), label: 'New Item', href: '#new', isActive: false };
    handlePropChange('navItems', [...currentItems, newItem]);
  };

  const removeNavItem = (index: number) => {
    const currentItems = component.props?.navItems || [];
    const updatedItems = currentItems.filter((_: { id: string; label: string; href: string; isActive?: boolean }, i: number) => i !== index);
    handlePropChange('navItems', updatedItems);
  };

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Settings</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
          <select
            value={component.props?.variant || 'icon-links-left-cta-right'}
            onChange={(e) => handlePropChange('variant', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {HEADER_VARIATIONS.map((variation) => (
              <option key={variation.value} value={variation.value}>
                {variation.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
          <input
            type="text"
            value={component.props?.brandName || 'Brand'}
            onChange={(e) => handlePropChange('brandName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Logo Type</label>
          <select
            value={component.props?.logoType || 'icon-text'}
            onChange={(e) => handlePropChange('logoType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {LOGO_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {component.props?.logoType !== 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo Icon</label>
            <input
              type="text"
              value={component.props?.logoIcon || '🚀'}
              onChange={(e) => handlePropChange('logoIcon', e.target.value)}
              placeholder="🚀 or any emoji/text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={component.props?.sticky !== false}
              onChange={(e) => handlePropChange('sticky', e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Sticky Header</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={component.props?.transparent || false}
              onChange={(e) => handlePropChange('transparent', e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Transparent</label>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Navigation Items</h3>
          <button
            onClick={addNavItem}
            className="px-3 py-1 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Add Item
          </button>
        </div>

        {(component.props?.navItems || []).map((item: { id: string; label: string; href: string; isActive?: boolean }, index: number) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Item {index + 1}</span>
              <button
                onClick={() => removeNavItem(index)}
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
                  value={item.label}
                  onChange={(e) => handleNavItemChange(index, 'label', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Link</label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => handleNavItemChange(index, 'href', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.isActive || false}
                onChange={(e) => handleNavItemChange(index, 'isActive', e.target.checked)}
                className="mr-2"
              />
              <label className="text-xs font-medium text-gray-600">Active Page</label>
            </div>
          </div>
        ))}
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
                  value={component.props?.secondaryButtonText || 'Sign In'}
                  onChange={(e) => handlePropChange('secondaryButtonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Link</label>
                <input
                  type="text"
                  value={component.props?.secondaryButtonLink || '#signin'}
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

      {/* User Dropdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">User Dropdown</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.showUserDropdown || false}
            onChange={(e) => handlePropChange('showUserDropdown', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show User Dropdown</label>
        </div>

        {component.props?.showUserDropdown && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Avatar URL</label>
              <input
                type="url"
                value={component.props?.userAvatar || ''}
                onChange={(e) => handlePropChange('userAvatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
                <input
                  type="text"
                  value={component.props?.userName || 'John Doe'}
                  onChange={(e) => handlePropChange('userName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
                <input
                  type="email"
                  value={component.props?.userEmail || 'john@example.com'}
                  onChange={(e) => handlePropChange('userEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Additional Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Additional Features</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={component.props?.showSearch || false}
              onChange={(e) => handlePropChange('showSearch', e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Show Search</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={component.props?.showNotifications || false}
              onChange={(e) => handlePropChange('showNotifications', e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Show Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={component.props?.showCart || false}
              onChange={(e) => handlePropChange('showCart', e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Show Cart</label>
          </div>
        </div>

        {component.props?.showNotifications && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Count</label>
            <input
              type="number"
              min="0"
              value={component.props?.notificationCount || 0}
              onChange={(e) => handlePropChange('notificationCount', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        {component.props?.showCart && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cart Count</label>
            <input
              type="number"
              min="0"
              value={component.props?.cartCount || 0}
              onChange={(e) => handlePropChange('cartCount', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}
      </div>

      {/* Styling */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Styling</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
            <input
              type="text"
              value={component.props?.height || '4rem'}
              onChange={(e) => handlePropChange('height', e.target.value)}
              placeholder="4rem, 5rem, 64px"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
            <input
              type="text"
              value={component.props?.padding || '0 1rem'}
              onChange={(e) => handlePropChange('padding', e.target.value)}
              placeholder="0 1rem, 1rem 2rem"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
          <input
            type="color"
            value={component.props?.borderColor || '#e5e7eb'}
            onChange={(e) => handlePropChange('borderColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shadow</label>
          <input
            type="text"
            value={component.props?.shadow || '0 1px 3px 0 rgb(0 0 0 / 0.1)'}
            onChange={(e) => handlePropChange('shadow', e.target.value)}
            placeholder="0 1px 3px 0 rgb(0 0 0 / 0.1)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};

// Component Configuration
export const headerConfig = {
  type: 'Header' as const,
  name: 'Header',
  description: 'Responsive header with navigation and actions',
  icon: FiNavigation,
  category: 'navigation' as const,
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
    variant: 'icon-links-left-cta-right',
    brandName: 'Brand',
    logoType: 'icon-text',
    logoIcon: '🚀',
    navItems: [
      { id: '1', label: 'Home', href: '#home', isActive: true },
      { id: '2', label: 'Features', href: '#features' },
      { id: '3', label: 'Pricing', href: '#pricing' },
      { id: '4', label: 'About', href: '#about' },
    ],
    primaryButtonText: 'Get Started',
    primaryButtonLink: '#get-started',
    secondaryButtonText: 'Sign In',
    secondaryButtonLink: '#signin',
    primaryButtonStyle: 'primary',
    secondaryButtonStyle: 'outline',
    showSecondaryButton: true,
    showUserDropdown: false,
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=32&h=32&q=80',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    showCart: false,
    cartCount: 0,
    showNotifications: false,
    notificationCount: 0,
    showSearch: false,
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderColor: '#e5e7eb',
    sticky: true,
    height: '4rem',
    padding: '0 1rem',
    borderRadius: '0',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    backdropBlur: 'blur(8px)',
    transparent: false,
  },
  RenderComponent: HeaderRenderComponent,
  PropertiesComponent: HeaderPropertiesComponent,
};
