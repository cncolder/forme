import { TreeNode } from '../models';

export interface StandardBuilderProps<P extends Record<string, any> = Record<string, any>> {
  treeNode: TreeNode<P>;
  onRename?(): void;
  onDuplicate?(): void;
  onDelete?(): void;
}
