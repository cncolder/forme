import { GlobalRegistry, TreeNode } from '@designable/core';
import { includesComponent } from '@formily/designable-antd/esm/shared';
import { isFn } from '@formily/shared';
import { icons } from '../icons';
import { DesignableFieldRegistryName } from './DesignableField';

export const registerDesignerProps = () => {
  const originalDesignerProps = GlobalRegistry.getComponentDesignerProps(
    DesignableFieldRegistryName
  );

  if (isFn(originalDesignerProps)) {
    GlobalRegistry.registerDesignerProps({
      [DesignableFieldRegistryName]: (node) => {
        const designerProps = originalDesignerProps(node);
        const component: string = node.props['x-component'];

        /** Display drag source icon */
        if (component && component in icons) {
          designerProps.sourceIcon = component;
        }

        /** Define which components can be drop on the target. */
        if (isFn(designerProps.allowAppend)) {
          const originalAllowAppend = designerProps.allowAppend;
          designerProps.allowAppend = (target, source) => {
            const targetComponent = target.props['x-component'];
            if (originalAllowAppend(target, source)) {
              switch (targetComponent) {
                case 'Section': {
                  return source.every((node) => includesComponent(node, ['Term'], target));
                }
                case 'Term': {
                  return source.every((node) =>
                    includesComponent(
                      node,
                      [(name: string, node: TreeNode) => node.props.type !== 'void'],
                      target
                    )
                  );
                }
              }
            }
            return false;
          };
        }

        // if (['Section', 'Term'].includes(component)) {
        //   const originalProperties = designerProps.propsSchema.properties;
        //   designerProps.propsSchema.properties = {
        //     name: { ...originalProperties.name, 'x-index': 0 },
        //     'x-component-props': {
        //       type: 'object',
        //       properties: {
        //         title: {
        //           type: 'string',
        //           'x-component': 'Input',
        //           'x-decorator': 'FormItem',
        //         },
        //       },
        //       'x-index': 1,
        //     },
        //   };
        // }

        // if (['ShortAnswer'].includes(component)) {
        //   const originalProperties = designerProps.propsSchema.properties;
        //   designerProps.propsSchema.properties = {
        //     name: { ...originalProperties.name, 'x-index': 0 },
        //     title: { ...originalProperties.title, 'x-index': 1 },
        //     description: { ...originalProperties.description, 'x-index': 2 },
        //     'x-component-props': {
        //       type: 'object',
        //       properties: {
        //         question: {
        //           type: 'string',
        //           'x-component': 'Input.TextArea',
        //           'x-decorator': 'FormItem',
        //         },
        //       },
        //       'x-index': 3,
        //     },
        //   };
        // }

        return designerProps;
      },
    });
  }
};
