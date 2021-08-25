import { Section, Term, ShortAnswer, LongAnswer } from '../../components';
import { createDesignableField } from './createDesignableField';

export const DesignableFieldRegistryName = 'DesignableField';

export const DesignableField = createDesignableField({
  registryName: DesignableFieldRegistryName,
  inlineChildrenLayoutComponents: ['ShortAnswer'],
  components: {
    Section,
    Term,
    ShortAnswer,
    LongAnswer,
  },
  // componentsPropsSchema: {
  //   ShortAnswer: {
  //     type: 'object',
  //     properties: {
  //       question: {
  //         type: 'string',
  //         'x-component': 'Input.TextArea',
  //         'x-decorator': 'FormItem',
  //       },
  //     },
  //   },
  // },
});
