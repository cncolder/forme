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
  describe('schema', () => {
    const node = TreeNode.fromSchema(schema, '/');

    it('create tree node from schema', () => {
      expect(node).toMatchInlineSnapshot(`
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
              "title": undefined,
              "type": "string",
            },
          ],
          "component": "Term",
          "id": "I",
          "parent": [Circular],
          "props": Object {
            "title": "I",
          },
          "title": undefined,
          "type": "void",
        },
      ],
      "component": "Section",
      "id": "A",
      "parent": [Circular],
      "props": Object {
        "title": "A",
      },
      "title": undefined,
      "type": "void",
    },
  ],
  "component": undefined,
  "id": "/",
  "parent": undefined,
  "props": undefined,
  "title": undefined,
  "type": "object",
}
`);
    });

    it('serialize to schema', () => {
      expect(node.toSchema()).toMatchInlineSnapshot(`
Object {
  "properties": Object {
    "A": Object {
      "properties": Object {
        "I": Object {
          "properties": Object {
            "1": Object {
              "properties": Object {},
              "title": undefined,
              "type": "string",
              "x-component": "ShortAnswer",
              "x-component-props": Object {
                "description": "Please fill in your full name.",
                "label": "Name",
                "question": "What's your name?",
              },
            },
          },
          "title": undefined,
          "type": "void",
          "x-component": "Term",
          "x-component-props": Object {
            "title": "I",
          },
        },
      },
      "title": undefined,
      "type": "void",
      "x-component": "Section",
      "x-component-props": Object {
        "title": "A",
      },
    },
  },
  "title": undefined,
  "type": "object",
  "x-component": undefined,
  "x-component-props": undefined,
}
`);
    });
  });
});
