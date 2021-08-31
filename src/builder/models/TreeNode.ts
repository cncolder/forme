import { ISchema } from '@formily/react';
import { debug, uid } from '../utils';
import { makeAutoObservable, toJS } from './mobx';

export interface ITreeNode<P extends Record<string, any> = Record<string, any>> {
  id?: string;
  type: string;
  title?: string;
  component?: string;
  props?: P;
  children?: ITreeNode[];
}

const log = debug(import.meta?.url);

export class TreeNode<P extends Record<string, any> = Record<string, any>> implements ITreeNode<P> {
  static map = new Map<string, TreeNode>();

  static fromSchema(schema: ISchema, id?: string, parent?: TreeNode) {
    const {
      type = '',
      title = '',
      'x-component': component,
      'x-component-props': props,
      properties,
    } = schema;

    const node = new TreeNode(
      {
        id,
        type: type,
        title: title,
        component: component,
        props: props,
      },
      parent
    );
    node.children = properties
      ? Object.keys(properties).map((id) => TreeNode.fromSchema(properties[id], id, node))
      : [];

    return node;
  }

  static findById(id: string) {
    return TreeNode.map.get(id);
  }

  constructor(node?: ITreeNode, parent?: TreeNode) {
    if (node instanceof TreeNode) {
      return node;
    }

    this.id = node.id ?? uid();
    this.parent = parent;
    this.type = node.type;
    this.title = node.title;
    this.component = node.component;
    this.props = node.props as P;
    this.children = node.children as TreeNode[];

    TreeNode.map.set(this.id, this);

    makeAutoObservable(this);
  }

  id = '';
  parent: TreeNode;
  type = '';
  title = '';
  component = '';
  props = {} as P;
  children: TreeNode[] = [];

  get index() {
    if (!this.parent) return 0;
    return this.parent.children.indexOf(this);
  }

  get previous() {
    if (!this.parent) return;
    return this.parent.children[this.index - 1];
  }

  get next() {
    if (!this.parent) return;
    return this.parent.children[this.index + 1];
  }

  get siblings() {
    if (!this.parent) return [];
    return this.parent.children.filter((node) => node !== this);
  }

  clone(parent?: TreeNode) {
    const newNode = new TreeNode(
      {
        id: uid(),
        type: this.type,
        title: this.title,
        component: this.component,
        props: toJS(this.props),
      },
      parent
    );
    newNode.children = this.children.map((child) => child.clone(newNode));
    return newNode;
  }

  duplicate() {
    log('duplicate', this);
    const newNode = this.clone();
    this.parent.insert(this.index + 1, newNode);
    return newNode;
  }

  remove() {
    if (!this.parent) return this;
    this.parent.children.splice(this.index, 1);
    this.parent = undefined;
    return this;
  }

  adopt(...nodes: TreeNode[]) {
    return nodes
      .filter((node) => node.parent !== this)
      .map((node) => {
        node.remove();
        node.parent = this;
        return node;
      });
  }

  prepend(...nodes: TreeNode[]) {
    const newNodes = this.adopt(...nodes);
    this.children.unshift(...newNodes);
    return newNodes;
  }

  append(...nodes: TreeNode[]) {
    const newNodes = this.adopt(...nodes);
    this.children.push(...newNodes);
    return newNodes;
  }

  insert(start: number, ...nodes: TreeNode[]) {
    log('insert', this, start, ...nodes);
    const newNodes = this.adopt(...nodes);
    this.children.splice(start, 0, ...newNodes);
    return newNodes;
  }

  toSchema(): ISchema {
    return {
      type: this.type,
      title: this.title,
      'x-component': this.component,
      'x-component-props': toJS(this.props),
      properties: this.children.reduce(
        (schema, child) => ({ ...schema, [child.id]: child.toSchema() }),
        {} as Record<string, ISchema>
      ),
    };
  }
}
