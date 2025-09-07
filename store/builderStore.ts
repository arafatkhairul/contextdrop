import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { WebComponent, ComponentStyle, BuilderState } from '@/types/builder';

export const useBuilderStore = create<BuilderState>((set, get) => ({
  components: [],
  selectedComponentId: null,
  hoveredComponentId: null,

  setSelectedComponent: (id) => set({ selectedComponentId: id }),
  
  setHoveredComponent: (id) => set({ hoveredComponentId: id }),

  addComponent: (component, parentId?: string) => {
    const newComponent: WebComponent = {
      ...component,
      id: nanoid(),
      styles: {
        // Default styles
        display: 'block',
        padding: '16px',
        margin: '0',
        backgroundColor: 'transparent',
        ...component.styles,
      },
    };
    
    if (parentId) {
      // Add as child to parent component
      set((state) => ({
        components: state.components.map((comp) =>
          comp.id === parentId
            ? {
                ...comp,
                children: [...(comp.children || []), newComponent],
              }
            : comp
        ),
        selectedComponentId: newComponent.id,
      }));
    } else {
      // Add to root level
      set((state) => ({
        components: [...state.components, newComponent],
        selectedComponentId: newComponent.id,
      }));
    }
  },

  updateComponentStyles: (id, newStyles) => {
    set((state) => ({
      components: state.components.map((component) =>
        component.id === id
          ? {
              ...component,
              styles: {
                ...component.styles,
                ...newStyles,
              },
            }
          : component
      ),
    }));
  },

  updateComponentContent: (id, content) => {
    set((state) => ({
      components: state.components.map((component) =>
        component.id === id
          ? { ...component, content }
          : component
      ),
    }));
  },

  updateComponentProps: (id, newProps) => {
    set((state) => ({
      components: state.components.map((component) =>
        component.id === id
          ? { ...component, props: { ...component.props, ...newProps } }
          : component
      ),
    }));
  },

  deleteComponent: (id) => {
    set((state) => ({
      components: state.components.filter((component) => component.id !== id),
      selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
    }));
  },

  duplicateComponent: (id) => {
    const component = get().getComponentById(id);
    if (component) {
      const duplicatedComponent: WebComponent = {
        ...component,
        id: nanoid(),
        styles: { ...component.styles },
        children: component.children ? [...component.children] : undefined,
      };
      
      set((state) => ({
        components: [...state.components, duplicatedComponent],
        selectedComponentId: duplicatedComponent.id,
      }));
    }
  },

  moveComponent: (dragIndex, hoverIndex) => {
    set((state) => {
      const updatedComponents = [...state.components];
      const [removed] = updatedComponents.splice(dragIndex, 1);
      updatedComponents.splice(hoverIndex, 0, removed);
      return { components: updatedComponents };
    });
  },

  clearCanvas: () => set({ components: [], selectedComponentId: null }),

  getComponentById: (id) => {
    return get().components.find((component) => component.id === id);
  },

  getSelectedComponent: () => {
    const state = get();
    return state.components.find((component) => component.id === state.selectedComponentId);
  },
}));
