import React from 'react';
import './CollapsibleCard.scss';
import Card, {CardProps} from 'antd/lib/card';
import classNames from 'classnames';

function CollapsibleCard(props: CardProps) {
  const {
    title,
    children,
    className,
    ...restProps
  } = props;

  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  const handleToggleCard = React.useCallback(
    () => {
      setCollapsed(!collapsed);
    },
    [collapsed],
  );

  return (
    <Card {...restProps}
          className={classNames('collapsible-card', 'head-borderless', className, {
            collapsed,
          })}
          title={(
            <div className="d-flex justify-content-between">
              <span>
                {title}
              </span>
              <button className="btn btn-link" onClick={handleToggleCard}>
                <i className={classNames('fa', {
                  'fa-caret-down': collapsed,
                  'fa-caret-up': !collapsed,
                })}/>
              </button>
            </div>
          )}
    >
      {children}
    </Card>
  );
}

export default CollapsibleCard;
