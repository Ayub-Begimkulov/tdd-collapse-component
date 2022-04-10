import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  ACCORDION_MODE_ERROR,
  Collapse,
  CollapseItem,
  CollapseProps,
} from './Collapse';

interface TestAppProps {
  initialOpened?: string[];
  mode?: CollapseProps['mode'];
}

const TestApp = ({ initialOpened = [], mode }: TestAppProps) => {
  const [opened, setOpened] = useState(initialOpened);

  return (
    <Collapse openedItems={opened} onChange={setOpened} mode={mode}>
      <CollapseItem name="a">
        {props => (
          <div>
            <div {...props.headerProps}>A header</div>
            {props.contentVisible && <div>A content</div>}
          </div>
        )}
      </CollapseItem>
      <CollapseItem name="b">
        {props => (
          <div>
            <div {...props.headerProps}>B header</div>
            {props.contentVisible && <div>B content</div>}
          </div>
        )}
      </CollapseItem>
    </Collapse>
  );
};

describe('Collapse', () => {
  it('should show always show headers', () => {
    render(<TestApp />);

    expect(screen.getByText('A header')).toBeInTheDocument();
    expect(screen.getByText('B header')).toBeInTheDocument();

    const aContent = screen.queryByText('A content');
    const bContent = screen.queryByText('B content');
    expect(aContent).toBeNull();
    expect(bContent).toBeNull();
  });

  it('should show content of opened element', () => {
    render(<TestApp initialOpened={['a']} />);

    const aContent = screen.queryByText('A content');
    expect(aContent).toBeVisible();

    const bContent = screen.queryByText('B content');
    expect(bContent).toBeNull();
  });

  it('should open element on click', () => {
    render(<TestApp />);

    const aHeader = screen.getByText('A header');
    userEvent.click(aHeader);

    expect(screen.getByText('A content')).toBeInTheDocument();
  });

  it('should close element on click if its opened', () => {
    render(<TestApp initialOpened={['a']} />);

    const aHeader = screen.getByText('A header');
    userEvent.click(aHeader);

    expect(screen.queryByText('A content')).toBeNull();
  });

  it('should work in accordion mode', () => {
    render(<TestApp initialOpened={['a']} mode="accordion" />);

    expect(screen.getByText('A content')).toBeInTheDocument();

    // open another item
    const bHeader = screen.getByText('B header');
    userEvent.click(bHeader);

    expect(screen.queryByText('A content')).toBeNull();
    expect(screen.queryByText('B content')).toBeInTheDocument();

    userEvent.click(bHeader);
    expect(screen.queryByText('B content')).toBeNull();
  });

  it('should warn about multiple opened items in accordion mode', () => {
    const logErrorSpy = jest.spyOn(console, 'warn');
    render(<TestApp initialOpened={['a', 'b']} mode="accordion" />);

    expect(logErrorSpy).toBeCalledWith(ACCORDION_MODE_ERROR);
  });
});
