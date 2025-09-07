import React from 'react';
import { WebComponent, ComponentStyle } from '@/types/builder';
import { buttonConfig } from '@/components/builder/elements/Button';
import { textConfig } from '@/components/builder/elements/Text';
import { sectionConfig } from '@/components/builder/elements/Section';
import { cardConfig } from '@/components/builder/elements/Card';
import { badgeConfig } from '@/components/builder/elements/Badge';
import { alertConfig } from '@/components/builder/elements/Alert';
import { inputConfig } from '@/components/builder/elements/Input';
import { avatarConfig } from '@/components/builder/elements/Avatar';
import { dropdownConfig } from '@/components/builder/elements/Dropdown';
import { flexConfig } from '@/components/builder/elements/Flex';
import { gridConfig } from '@/components/builder/elements/Grid';
import { columnConfig } from '@/components/builder/elements/Column';
import { rowConfig } from '@/components/builder/elements/Row';
import { heroConfig } from '@/components/builder/elements/Hero';
import { headerConfig } from '@/components/builder/elements/Header';

// This interface defines everything a component needs to function in the builder
export interface ComponentConfig {
  // Unique identifier
  type: string;

  // Display name for the sidebar
  name: string;

  // Description for the sidebar
  description: string;

  // Icon for the sidebar
  icon: React.ComponentType<{ className?: string }>;

  // Category for grouping in sidebar
  category: 'layout' | 'typography' | 'media' | 'interactive' | 'forms' | 'navigation' | 'general' | 'feedback' | 'marketing';

  // The initial properties and styles when a new component is created
  defaultProps: Omit<WebComponent, 'id' | 'type'>;

  // The actual React component that renders on the canvas
  RenderComponent: React.FC<{
    component: WebComponent;
    isSelected: boolean;
    isHovered: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  }>;

  // The React component that renders the settings form in the Properties panel
  PropertiesComponent: React.FC<{ componentId: string }>;

  // Default styles for the component
  defaultStyles?: Partial<ComponentStyle>;

  // Default content for the component
  defaultContent?: string;
}

// The central registry object
export const componentRegistry: Record<string, ComponentConfig> = {};

// Helper function to register a component
export const registerComponent = (config: ComponentConfig) => {
  componentRegistry[config.type] = config;
};

// Register components
registerComponent(buttonConfig);
registerComponent(textConfig);
registerComponent(sectionConfig);
registerComponent(cardConfig);
registerComponent(badgeConfig);
registerComponent(alertConfig);
registerComponent(inputConfig);
registerComponent(avatarConfig);
registerComponent(dropdownConfig);
registerComponent(flexConfig);
registerComponent(gridConfig);
registerComponent(columnConfig);
registerComponent(rowConfig);
registerComponent(heroConfig);
registerComponent(headerConfig);

// Helper function to get all components by category
export const getComponentsByCategory = (category: ComponentConfig['category']) => {
  return Object.values(componentRegistry).filter(config => config.category === category);
};

// Helper function to get all categories
export const getCategories = () => {
  const categories = new Set(Object.values(componentRegistry).map(config => config.category));
  return Array.from(categories);
};

// Helper function to get component config by type
export const getComponentConfig = (type: string): ComponentConfig | undefined => {
  return componentRegistry[type];
};
