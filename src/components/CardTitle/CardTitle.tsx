import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import 'components/CardTitle/CardTitle.scss';
import React from 'react';

interface CardTitleProps {
  title?: string;

  onBack?: () => void;

  onNext?: () => void;
}

function CardTitle(props: CardTitleProps) {
  const {title, onBack, onNext} = props;

  return (
    <div className="card-title">
      {typeof onBack === 'function' && (
        <Button type="link" htmlType="button" onClick={onBack}>
          <Icon type="arrow-left"/>
        </Button>
      )}
      {title}
      {typeof onNext === 'function' && (
        <Button type="link" htmlType="button" onClick={onNext}>
          <Icon type="arrow-right"/>
        </Button>
      )}
    </div>
  );
}

export default CardTitle;
