import { createContext, useContext } from 'react';

interface CollapseContext {
  openedItems: Set<string>;
  onHeaderClick: (name: string) => void;
}

const CollapseContext = createContext<CollapseContext | null>(null);

export const CollapseProvider = CollapseContext.Provider;

export const useCollapseItem = (name: string) => {
  const context = useContext(CollapseContext);

  if (context === null) {
    throw new Error(
      'can not `useCollapseItem` outside of the `<Collapse />` component'
    );
  }

  const { openedItems, onHeaderClick } = context;

  return {
    isOpened: openedItems.has(name),
    onHeaderClick,
  };
};
