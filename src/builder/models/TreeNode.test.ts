import { ISchema } from '@formily/react';
import { TreeNode } from './TreeNode';

const schema: ISchema = {
  type: 'object',
  properties: {
    A: {
      type: 'void',
      'x-component': 'Section',
      'x-component-props': {
        title: 'A',
      },
      properties: {
        I: {
          type: 'void',
          'x-component': 'Term',
          'x-component-props': {
            title: 'I',
          },
          properties: {
            1: {
              type: 'string',
              'x-component': 'ShortAnswer',
              'x-component-props': {
                question: "What's your name?",
                description: 'Please fill in your full name.',
                label: 'Name',
              },
            },
          },
        },
      },
    },
  },
};

describe('TreeNode', () => {
  it('create tree node from schema', () => {
    expect(TreeNode.fromSchema(schema, '')).toMatchInlineSnapshot(`
_TreeNode {
  "children": Array [
    _TreeNode {
      "children": Array [
        _TreeNode {
          "children": Array [
            _TreeNode {
              "children": Array [],
              "component": "ShortAnswer",
              "id": "1",
              "parent": [Circular],
              "props": Object {
                "description": "Please fill in your full name.",
                "label": "Name",
                "question": "What's your name?",
              },
              "title": "",
              "type": "string",
            },
          ],
          "component": "Term",
          "id": "I",
          "parent": [Circular],
          "props": Object {
            "title": "I",
          },
          "title": "",
          "type": "void",
        },
      ],
      "component": "Section",
      "id": "A",
      "parent": [Circular],
      "props": Object {
        "title": "A",
      },
      "title": "",
      "type": "void",
    },
  ],
  "component": undefined,
  "id": "",
  "parent": undefined,
  "props": undefined,
  "title": "",
  "type": "object",
}
`);
  });
});
