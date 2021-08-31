import { ISchema } from '@formily/react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import * as icons from '../assets/icons';
import { debug } from '../utils';
import { TreeNode } from './TreeNode';
import { builderConfigs } from './builderConfigs';
import { makeAutoObservable } from './mobx';

const log = debug(import.meta?.url);

export class BuilderStore {
  private static config = builderConfigs;
  private static icons = icons;

  constructor(public schema: ISchema = {}) {
    this.treeNode = TreeNode.fromSchema(schema);
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
}
