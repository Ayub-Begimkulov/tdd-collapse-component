import { Children, useMemo } from 'react';
import { CollapseProvider, useCollapseItem } from './Collapse.context';

export interface CollapseProps {
  openedItems: string[];
  onChange: (openedItems: string[]) => void;
  children: React.ReactElement[];
  mode?: 'default' | 'accordion';
}

export const ACCORDION_MODE_ERROR =
  '<Collapse /> can only accept 1 opened item in `accordion` mode';

export function Collapse({
  openedItems,
  onChange,
  children,
  mode = 'default',
}: CollapseProps) {
  const childrenArray = Children.toArray(children);

  const openedItemsSet = useMemo(() => {
    if (mode === 'accordion' && openedItems.length > 1) {
      console.warn(ACCORDION_MODE_ERROR);

      return new Set(openedItems.slice(0, 1));
    }

    return new Set(openedItems);
  }, [openedItems]);

  const onHeaderClick = (name: string) => {
    const isOpened = openedItemsSet.has(name);

    if (mode === 'default') {
      const newOpenedItems = isOpened
        ? openedItems.filter(item => item !== name)
        : [...openedItems, name];

      onChange(newOpenedItems);

      return;
    }

    onChange(isOpened ? [] : [name]);
  };

  return (
    <CollapseProvider value={{ openedItems: openedItemsSet, onHeaderClick }}>
      {childrenArray}
    </CollapseProvider>
  );
}

interface CollapseItemChildrenProps {
  headerProps: CollapseItemChildrenHeaderProps;
  contentVisible: boolean;
}

interface CollapseItemChildrenHeaderProps {
  onClick: React.MouseEventHandler;
}

interface CollapseItemProps {
  name: string;
  children: (props: CollapseItemChildrenProps) => React.ReactElement;
}

export function CollapseItem({ name, children }: CollapseItemProps) {
  const { isOpened, onHeaderClick } = useCollapseItem(name);

  return children({
    headerProps: { onClick: () => onHeaderClick(name) },
    contentVisible: isOpened,
  });
}
