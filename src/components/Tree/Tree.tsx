import React, {ReactElement} from 'react';
import './Tree.scss';
import {TreeProps as AntTreeProps} from 'antd/lib/tree';
import {Model} from 'core/models';
import classNames from 'classnames';
import TreeNode from 'components/Tree/TreeNode/TreeNode';

export interface TreeProps<T> extends AntTreeProps {
  className?: string;

  parent?: T;

  tree?: T[];

  nodePadding?: number;

  children?: ReactElement<any> | ReactElement<any>[];

  nodeLevel?: number;

  onAdd?(node: T): () => void;

  onChange?(value: T[]): void;

  onDelete?(node: T): () => void;

  onEdit?(node: T): () => void;

  onPreview?(node: T): () => void;
}

function Tree<T extends Model>(props: TreeProps<T>) {
  const {
    tree,
    className,
    onAdd,
    onEdit,
    onPreview,
    onDelete,
    nodeLevel,
    nodePadding,
    children,
  } = props;

  return (
    <ul className={classNames('tree', className)}>

      {typeof children === 'object' ? children : (
        <>
          {tree?.map((node: T) => {
            return (
              <TreeNode
                key={node.id}
                node={node}
                onAdd={onAdd}
                onPreview={onPreview}
                onEdit={onEdit}
                onDelete={onDelete}
                nodeLevel={nodeLevel}
                nodePadding={nodePadding}
              >
              </TreeNode>
            );
          })}
        </>
      )}
    </ul>
  );
}

Tree.defaultProps = {
  nodePadding: 12,
  nodeLevel: 0,
};

export default Tree;

