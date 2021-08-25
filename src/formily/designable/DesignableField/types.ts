import React from 'react';
import { ComponentNameMatcher } from '@formily/designable-antd/esm/shared';
import { ISchema } from '@formily/react';

export interface IDesignableFieldFactoryProps {
  registryName: string;
  components?: Record<string, React.JSXElementConstructor<unknown>>;
  componentsIcon?: Record<string, React.ReactNode>;
  componentsSourceIcon?: Record<string, React.ReactNode>;
  componentsPropsSchema?: Record<string, ISchema>;
  dropFormItemComponents?: ComponentNameMatcher[];
  dropReactionComponents?: ComponentNameMatcher[];
  selfRenderChildrenComponents?: ComponentNameMatcher[];
  inlineChildrenLayoutComponents?: ComponentNameMatcher[];
  inlineLayoutComponents?: ComponentNameMatcher[];
  restrictChildrenComponents?: Record<string, ComponentNameMatcher[]>;
  restrictSiblingComponents?: Record<string, ComponentNameMatcher[]>;
}
