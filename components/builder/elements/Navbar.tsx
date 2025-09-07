import React, { useState } from 'react';
import { FiX, FiShoppingCart, FiUser, FiSearch, FiBell, FiNavigation } from 'react-icons/fi';
import { WebComponent } from '@/types/builder';
import { useBuilderStore } from '@/store/builderStore';

// Navbar item interface
interface NavbarItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  children?: NavbarItem[];
}

// Navbar variations
const NAVBAR_VARIATIONS = [
  { name: 'Basic', value: 'basic' },
  { name: 'With CTA Button', value: 'cta' },
  { name: 'With Icons', value: 'icons' },
  { name: 'With User Avatar', value: 'avatar' },
  { name: 'With Top Bar', value: 'topbar' },
  { name: 'Dark Theme', value: 'dark' },
  { name: 'Transparent', value: 'transparent' },
];

// Brand logo options
const BRAND_OPTIONS = [
  { name: 'Text Only', value: 'text' },
  { name: 'Logo + Text', value: 'logo-text' },
  { name: 'Logo Only', value: 'logo' },
];

// Navbar Render Component
export const NavbarRenderComponent: React.FC<{
  component: WebComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ component, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const {
    brandName = 'Brand',
    brandLogo = 'text',
    variation = 'basic',
    showTopBar = false,
    topBarText = 'Welcome to our website',
    navItems = [
      { id: '1', label: 'Home', href: '#home', isActive: true },
      { id: '2', label: 'Features', href: '#features' },
      { id: '3', label: 'Pricing', href: '#pricing' },
      { id: '4', label: 'About', href: '#about' },
    ],
    showActions = true,
    ctaText = 'Get Started',
    ctaHref = '#cta',
    showCart = true,
    cartCount = 2,
    showUser = true,
    showNotifications = true,
    notificationCount = 3,
  } = component.props || {};

  const getNavbarClasses = () => {
    const baseClasses = 'relative z-20 w-full border-b shadow-lg';
    
    switch (variation) {
      case 'dark':
        return `${baseClasses} border-gray-700 bg-gray-900/90 shadow-gray-900/5`;
      case 'transparent':
        return `${baseClasses} border-transparent bg-transparent shadow-none`;
      default:
        return `${baseClasses} border-slate-200 bg-white/90 shadow-slate-700/5`;
    }
  };

  const getTextClasses = () => {
    switch (variation) {
      case 'dark':
        return 'text-white';
      default:
        return 'text-slate-700';
    }
  };

  const getHoverClasses = () => {
    switch (variation) {
      case 'dark':
        return 'hover:text-emerald-400 focus:text-emerald-300';
      default:
        return 'hover:text-emerald-500 focus:text-emerald-600';
    }
  };

  const getActiveClasses = () => {
    switch (variation) {
      case 'dark':
        return 'text-emerald-400';
      default:
        return 'text-emerald-500';
    }
  };

  const getMobileMenuClasses = () => {
    switch (variation) {
      case 'dark':
        return 'bg-gray-900/90';
      default:
        return 'bg-white/90';
    }
  };

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isHovered ? 'ring-1 ring-gray-300' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Top Bar */}
      {showTopBar && (
        <div className={`${variation === 'dark' ? 'bg-gray-800' : 'bg-slate-50'} border-b border-slate-200`}>
          <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
            <div className="flex h-9 items-center justify-between text-sm text-slate-600">
              <span>{topBarText}</span>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-emerald-500">Support</a>
                <a href="#" className="hover:text-emerald-500">Contact</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <header className={getNavbarClasses()}>
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav 
            aria-label="main navigation" 
            className={`flex h-[5.5rem] items-stretch justify-between font-medium ${getTextClasses()}`} 
            role="navigation"
          >
            {/* Brand */}
            <a 
              aria-label={`${brandName} logo`} 
              aria-current="page" 
              className="flex items-center gap-2 py-3 text-lg whitespace-nowrap focus:outline-none lg:flex-1" 
              href="javascript:void(0)"
            >
              {brandLogo !== 'text' && (
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
              )}
              {brandLogo !== 'logo' && <span>{brandName}</span>}
            </a>

            {/* Mobile Menu Button */}
            <button 
              className="relative self-center order-10 visible block w-10 h-10 opacity-100 lg:hidden" 
              aria-expanded={isMobileMenuOpen} 
              aria-label="Toggle navigation"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <>
                    <span className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-current transition-all duration-300"></span>
                    <span className="absolute block h-0.5 w-6 transform rounded-full bg-current transition duration-300"></span>
                    <span className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-current transition-all duration-300"></span>
                  </>
                )}
              </div>
            </button>

            {/* Navigation Links */}
            <ul 
              role="menubar" 
              aria-label="Select page" 
              className={`${
                isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
              } absolute top-0 left-0 z-[-1] ml-auto h-screen w-full justify-center overflow-hidden overflow-y-auto overscroll-contain ${getMobileMenuClasses()} px-8 pb-12 pt-28 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100`}
            >
              {navItems.map((item: NavbarItem) => (
                <li key={item.id} role="none" className="flex items-stretch">
                  <a 
                    role="menuitem" 
                    aria-haspopup="false" 
                    className={`flex items-center gap-2 py-4 transition-colors duration-300 ${getHoverClasses()} focus:outline-none focus-visible:outline-none lg:px-8 ${
                      item.isActive ? getActiveClasses() : ''
                    }`} 
                    href={item.href}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions */}
            {showActions && (
              <div className="flex items-center justify-end px-6 ml-auto lg:ml-0 lg:flex-1 lg:p-0">
                {/* Search */}
                {variation === 'icons' && (
                  <button className="relative inline-flex items-center justify-center w-10 h-10 text-lg rounded-full hover:text-emerald-500 transition-colors">
                    <FiSearch className="w-5 h-5" />
                  </button>
                )}

                {/* Notifications */}
                {showNotifications && (
                  <a href="#" className="relative inline-flex items-center justify-center w-10 h-10 text-lg rounded-full hover:text-emerald-500 transition-colors">
                    <FiBell className="w-5 h-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-red-500 px-1.5 text-sm text-white">
                        {notificationCount}
                      </span>
                    )}
                  </a>
                )}

                {/* Cart */}
                {showCart && (
                  <a href="#" className="relative inline-flex items-center justify-center w-10 h-10 text-lg rounded-full hover:text-emerald-500 transition-colors">
                    <FiShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                        {cartCount}
                      </span>
                    )}
                  </a>
                )}

                {/* User Avatar */}
                {showUser && variation === 'avatar' && (
                  <a href="#" className="relative inline-flex items-center justify-center w-10 h-10 text-lg rounded-full hover:text-emerald-500 transition-colors">
                    <FiUser className="w-5 h-5" />
                  </a>
                )}

                {/* CTA Button */}
                {variation === 'cta' && (
                  <a 
                    href={ctaHref}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                  >
                    {ctaText}
                  </a>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

// Navbar Properties Component
export const NavbarPropertiesComponent: React.FC<{
  componentId: string;
}> = ({ componentId }) => {
  const { components, updateComponentProps } = useBuilderStore();
  const component = components.find(c => c.id === componentId);
  
  if (!component) return null;
  
  const handlePropChange = (key: string, value: string | boolean | NavbarItem[]) => {
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
    const newItem: NavbarItem = {
      id: Date.now().toString(),
      label: 'New Item',
      href: '#new',
      isActive: false,
    };
    handlePropChange('navItems', [...currentItems, newItem]);
  };

  const removeNavItem = (index: number) => {
    const currentItems = component.props?.navItems || [];
    const updatedItems = currentItems.filter((_: NavbarItem, i: number) => i !== index);
    handlePropChange('navItems', updatedItems);
  };

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Settings</h3>
        
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
          <select
            value={component.props?.brandLogo || 'text'}
            onChange={(e) => handlePropChange('brandLogo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {BRAND_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variation</label>
          <select
            value={component.props?.variation || 'basic'}
            onChange={(e) => handlePropChange('variation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {NAVBAR_VARIATIONS.map((variation) => (
              <option key={variation.value} value={variation.value}>
                {variation.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Bar Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Bar</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.showTopBar || false}
            onChange={(e) => handlePropChange('showTopBar', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show Top Bar</label>
        </div>

        {component.props?.showTopBar && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Bar Text</label>
            <input
              type="text"
              value={component.props?.topBarText || 'Welcome to our website'}
              onChange={(e) => handlePropChange('topBarText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}
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

        {(component.props?.navItems || []).map((item: NavbarItem, index: number) => (
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

      {/* Actions Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.showActions !== false}
            onChange={(e) => handlePropChange('showActions', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show Actions</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.showCart !== false}
            onChange={(e) => handlePropChange('showCart', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show Cart</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={component.props?.showNotifications !== false}
            onChange={(e) => handlePropChange('showNotifications', e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Show Notifications</label>
        </div>

        {component.props?.variation === 'cta' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
              <input
                type="text"
                value={component.props?.ctaText || 'Get Started'}
                onChange={(e) => handlePropChange('ctaText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
              <input
                type="text"
                value={component.props?.ctaHref || '#cta'}
                onChange={(e) => handlePropChange('ctaHref', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Component Configuration
export const navbarConfig = {
  type: 'Navbar' as const,
  name: 'Navigation Bar',
  description: 'Responsive navigation bar with mobile menu',
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
    brandName: 'Brand',
    brandLogo: 'text',
    variation: 'basic',
    showTopBar: false,
    topBarText: 'Welcome to our website',
    navItems: [
      { id: '1', label: 'Home', href: '#home', isActive: true },
      { id: '2', label: 'Features', href: '#features' },
      { id: '3', label: 'Pricing', href: '#pricing' },
      { id: '4', label: 'About', href: '#about' },
    ],
    showActions: true,
    ctaText: 'Get Started',
    ctaHref: '#cta',
    showCart: true,
    cartCount: 2,
    showUser: true,
    showNotifications: true,
    notificationCount: 3,
  },
  RenderComponent: NavbarRenderComponent,
  PropertiesComponent: NavbarPropertiesComponent,
};
