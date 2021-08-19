import { FontColorsOutlined } from '@ant-design/icons';
import { GlobalDragSource, GlobalRegistry } from '@designable/core';

GlobalDragSource.setSourcesByGroup('inputs', [
  {
    componentName: 'DesignableField',
    props: {
      title: 'Input',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      title: 'TextInput',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TextInput',
    },
  },
]);

// GlobalRegistry.registerDesignerIcons({
//   FontColorsOutlined,
// });
// GlobalRegistry.setComponentDesignerProps('Input', { icon: 'FontColorsOutlined' });

// GlobalRegistry.registerDesignerProps({
//   Root: {
//     title: 'components.Root',
//   },
//   Field: (node) => ({
//     title: `components.${node.props['x-component']}`,
//     draggable: true,
//     inlineLayout: true,
//     propsSchema: {
//       type: 'object',
//       $namespace: 'Field',
//       properties: {
//         title: {
//           type: 'string',
//           'x-decorator': 'FormItem',
//           'x-component': 'Input',
//         },

//         hidden: {
//           type: 'string',
//           'x-decorator': 'FormItem',
//           'x-component': 'Switch',
//         },
//         default: {
//           'x-decorator': 'FormItem',
//           'x-component': 'ValueInput',
//         },
//         'style.width': {
//           type: 'string',
//           'x-decorator': 'FormItem',
//           'x-component': 'SizeInput',
//         },
//         'style.height': {
//           type: 'string',
//           'x-decorator': 'FormItem',
//           'x-component': 'SizeInput',
//         },
//         'style.display': {
//           'x-component': 'DisplayStyleSetter',
//         },
//         'style.background': {
//           'x-component': 'BackgroundStyleSetter',
//         },
//         'style.boxShadow': {
//           'x-component': 'BoxShadowStyleSetter',
//         },
//         'style.font': {
//           'x-component': 'FontStyleSetter',
//         },
//         'style.margin': {
//           'x-component': 'BoxStyleSetter',
//         },
//         'style.padding': {
//           'x-component': 'BoxStyleSetter',
//         },
//         'style.borderRadius': {
//           'x-component': 'BorderRadiusStyleSetter',
//         },
//         'style.border': {
//           'x-component': 'BorderStyleSetter',
//         },
//         test: {
//           type: 'void',
//           title: '测试',
//           'x-decorator': 'FormItem',
//           'x-component': 'DrawerSetter',
//           'x-component-props': {
//             text: '打开抽屉',
//           },
//           properties: {
//             test: {
//               type: 'string',
//               title: '测试输入',
//               'x-decorator': 'FormItem',
//               'x-component': 'Input',
//             },
//           },
//         },
//       },
//     },
//   }),
//   Card: {
//     title: 'components.Card',
//     droppable: true,
//     inlineChildrenLayout: true,
//     // allowAppend: (target, sources) =>
//     //   sources.every((node) => node.componentName === 'Field'),
//   },
// })
