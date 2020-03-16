import {Model} from 'core/models';
import React, {ReactElement, ReactNode} from 'react';
import classNames from 'classnames';
import './TreeNode.scss';
import Tree from 'components/Tree/Tree';

export interface TreeNodeProps<T extends Model> {
  node?: T;

  nodeLevel?: number;

  nodePadding?: number;

  children?: ReactElement<any> | ReactElement<any>[];

  onPreview?(node: T): () => void;

  onAdd?(node: T): () => void;

  onEdit?(node: T): () => void;

  onDelete?(node: T): () => void;

  onChange?(value: T[]): void;

  render?(node: T): ReactNode;
}

function TreeNode<T extends Model>(props: TreeNodeProps<T>) {
  const {
    node,
    onAdd,
    onPreview,
    onDelete,
    onEdit,
    render,
    children,
    nodeLevel,
    nodePadding,
  } = props;
  const hasChildren: boolean = node?.children?.length > 0;

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const handleToggle = React.useCallback(
    () => {
      setIsExpanded(!isExpanded);
    },
    [isExpanded],
  );

  return (
    <>
      <li className={classNames('tree-item', `tree-item-level-${nodeLevel}`)}
          style={{
            paddingLeft: `${nodeLevel * nodePadding}px`,
          }}
      >
        <i role="button"
           onClick={handleToggle}
           className={classNames('fa mr-2 node-toggler', {
             show: hasChildren,
             'fa-caret-right': !isExpanded,
             'fa-caret-down': isExpanded,
           })}
        />
        <div className="tree-content-wrapper">
          <span className="display"> {render(node)} </span>
          <div className="actions">
            {typeof onPreview === 'function' && (
              <i role="button" className="fa fa-eye" onClick={onPreview(node)}/>
            )}
            {typeof onAdd === 'function' && (
              <i role="button" className="fa fa-plus" onClick={onAdd(node)}/>
            )}
            {typeof onEdit === 'function' && (
              <i role="button" className="fa fa-edit" onClick={onEdit(node)}/>
            )}
            {typeof onDelete === 'function' && (
              <i role="button" className="fa fa-trash" onClick={onDelete(node)}/>
            )}
            {children}
          </div>
        </div>
      </li>
      {hasChildren && (
        <li className="tree-item">
          <Tree tree={node.children}
                className={classNames('sub-tree', {
                  'expanded': isExpanded,
                })}
                parent={node}
                onAdd={onAdd}
                onEdit={onEdit}
                nodeLevel={nodeLevel + 1}
                nodePadding={nodePadding}
          />
        </li>
      )}
    </>
  );
}

TreeNode.defaultProps = {
  nodeLevel: 0,
  nodePadding: 12,
  render<T extends Model>(node: T) {
    return node.name;
  },
};

export default TreeNode;
