import { ISchema } from '@formily/react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import * as icons from '../assets/icons';
import { debug } from '../utils';
import { TreeNode } from './TreeNode';
import { builderConfigs } from './builderConfigs';
import { makeAutoObservable } from './mobx';
import { romanNumerals } from './romanNumerals';

const log = debug(import.meta?.url);

export class BuilderStore {
  private static config = builderConfigs;
  private static icons = icons;

  constructor(public schema: ISchema = {}) {
    this.treeNode = TreeNode.fromSchema(schema, '/');
    makeAutoObservable(this);
  }

  treeNode: TreeNode;

  private get config() {
    return BuilderStore.config;
  }

  private get icons(): Record<string, string> {
    return BuilderStore.icons;
  }

  getIcon(name: string) {
    return this.icons[name];
  }

  getSchema(keys: string[] = []): ISchema {
    const path = keys.flatMap((key) => ['properties', key]);
    return get(this.schema, path);
  }

  getParentSchema(keys: string[] = []) {
    return this.getSchema(keys.slice(0, -1));
  }

  getComponentConfig(componentName: string) {
    return this.config[componentName];
  }

  getComponentSchemaTemplate(componentName: string) {
    return cloneDeep(this.getComponentConfig(componentName).schema);
  }

  insertNewComponent(start: number, componentName: string, parent: TreeNode) {
    const schema = this.getComponentSchemaTemplate(componentName);
    const node = TreeNode.fromSchema(schema);

    if (componentName === 'Section') {
      const latestId =
        [...TreeNode.map.values()]
          .filter((node) => node.component === 'Section')
          .map((node) => node.id)
          .sort()
          .pop() || '?';
      const id = String.fromCharCode(latestId.charCodeAt(0) + 1);
      node.id = id;
      node.props.title = `${id}. Section`;
    } else if (componentName === 'Term') {
      const latestId =
        parent.children
          .map((node) => node.id)
          .sort((a, b) => romanNumerals.indexOf(a) - romanNumerals.indexOf(b))
          .pop() || 'N';
      const id = romanNumerals[romanNumerals.indexOf(latestId) + 1];
      node.id = id;
      node.props.title = `${id}. Term`;
    }

    parent.insert(start, node);
  }
}
