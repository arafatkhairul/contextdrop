// TypeScript interfaces for the website builder
export interface ComponentStyle {
  // Typography
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  textColor?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  letterSpacing?: number;
  
  // Sizing
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  
  // Spacing
  margin?: string;
  padding?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  
  // Colors & Background
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  
  // Border
  border?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  
  // Layout
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'grid' | 'none';
  flex?: string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  
  // Position
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  
  // Effects
  boxShadow?: string;
  opacity?: number;
  transform?: string;
  transition?: string;
  cursor?: string;
  
  // Custom CSS
  customCSS?: string;
  className?: string;
}

export interface WebComponent {
  id: string; // Unique ID for each component
  type: 'Section' | 'Column' | 'Row' | 'Text' | 'Button' | 'Image' | 'Heading' | 'Paragraph' | 'Container' | 'Card' | 'Badge' | 'Alert' | 'Input' | 'Avatar' | 'Dropdown' | 'Flex' | 'Grid';
  content?: string; // For text-based components
  styles: ComponentStyle;
  children?: WebComponent[]; // For container components like Section or Column
  props?: Record<string,any>; // Additional props for specific component types
}

// Component types available in the library
export interface ComponentLibraryItem {
  type: WebComponent['type'];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  defaultStyles?: Partial<ComponentStyle>;
  defaultContent?: string;
}

// Zustand Store State
export interface BuilderState {
  components: WebComponent[];
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  
  // Actions
  setSelectedComponent: (id: string | null) => void;
  setHoveredComponent: (id: string | null) => void;
  addComponent: (component: Omit<WebComponent, 'id'>) => void;
  updateComponentStyles: (id: string, newStyles: Partial<ComponentStyle>) => void;
  updateComponentContent: (id: string, content: string) => void;
  updateComponentProps: (id: string, newProps: Record<string, any>) => void;
  deleteComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  clearCanvas: () => void;
  
  // Utility functions
  getComponentById: (id: string) => WebComponent | undefined;
  getSelectedComponent: () => WebComponent | undefined;
}
