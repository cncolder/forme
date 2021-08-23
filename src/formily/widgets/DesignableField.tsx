import { GlobalRegistry } from '@designable/core';
import { createDesignableField } from '@formily/designable-antd';
import { isFn } from '@formily/shared';
import { Section, ShortAnswer, LongAnswer } from '../components';
import { icons } from '../icons';

const registryName = 'DesignableField';

export const DesignableField = createDesignableField({
  registryName,
  components: {
    Section,
    ShortAnswer,
    LongAnswer,
  },
});

const designerProps = GlobalRegistry.getComponentDesignerProps(registryName);

if (isFn(designerProps)) {
  GlobalRegistry.registerDesignerProps({
    [registryName]: (node) => {
      // console.log('registerDesignerProps node', node);
      const props = designerProps(node);
      // console.log('registerDesignerProps props', props);

      const component = node.props['x-component'];
      if (component && component in icons) {
        props.icon = component;
      }

      return props;
    },
  });
}
