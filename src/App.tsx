import { useState } from 'react';
import { Collapse, CollapseItem } from './Collapse';

const contentStyles = {
  height: 300,

  background: 'lightgrey',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const headerStyles = {
  border: '1px solid lightgrey',
  padding: 8,
  cursor: 'pointer',
};

function App() {
  const [openedItems, setOpenedItems] = useState<string[]>([]);
  return (
    <div>
      <h1>Hello world</h1>

      <Collapse
        openedItems={openedItems}
        onChange={setOpenedItems}
        mode="accordion"
      >
        <CollapseItem name="first">
          {({ headerProps, contentVisible }) => (
            <div>
              <div
                {...headerProps}
                style={{
                  ...headerStyles,
                  borderBottom: 'none',
                }}
              >
                First collapse item
              </div>
              {contentVisible && <div style={contentStyles}>1</div>}
            </div>
          )}
        </CollapseItem>

        <CollapseItem name="second">
          {({ headerProps, contentVisible }) => (
            <div>
              <div {...headerProps} style={headerStyles}>
                Second collapse item
              </div>
              {contentVisible && <div style={contentStyles}>2</div>}
            </div>
          )}
        </CollapseItem>

        <CollapseItem name="third">
          {({ headerProps, contentVisible }) => (
            <div>
              <div
                {...headerProps}
                style={{
                  ...headerStyles,
                  borderTop: 'none',
                }}
              >
                Third collapse item
              </div>
              {contentVisible && <div style={contentStyles}>3</div>}
            </div>
          )}
        </CollapseItem>
      </Collapse>
    </div>
  );
}

export default App;
