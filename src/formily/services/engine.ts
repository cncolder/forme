import { createDesigner, KeyCode, Shortcut } from '@designable/core';
import { saveSchema } from './schema';

const SaveShortCut = new Shortcut({
  codes: [
    [KeyCode.Meta, KeyCode.S],
    [KeyCode.Control, KeyCode.S],
  ],
  handler(ctx) {
    saveSchema(ctx.engine);
  },
});

export const engine = createDesigner({
  shortcuts: [SaveShortCut],
});
