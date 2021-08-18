import React from 'react';
import { createDesigner, KeyCode, Shortcut } from '@designable/core';
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  DragSourceWidget,
  HistoryWidget,
  MainPanel,
  OutlineTreeWidget,
  SettingsPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel,
} from '@designable/react';
import { SettingsForm } from '@designable/react-settings-form';
import { createDesignableField, createDesignableForm } from '@formily/designable-antd';
import { ActionsWidget, LogoWidget, PreviewWidget, SchemaEditorWidget } from './components';
import { saveSchema } from './services';

// GlobalRegistry.registerDesignerLocales({
//   'en-US': {
//     sources: {
//       Inputs: 'Inputs',
//       Layouts: 'Layouts',
//       Arrays: 'Arrays',
//     },
//   },
// });

const Root = createDesignableForm({
  registryName: 'Root',
});

const DesignableField = createDesignableField({
  registryName: 'DesignableField',
});

const SaveShortCut = new Shortcut({
  codes: [
    [KeyCode.Meta, KeyCode.S],
    [KeyCode.Control, KeyCode.S],
  ],
  handler(ctx) {
    saveSchema(ctx.engine);
  },
});

const engine = createDesigner({
  shortcuts: [SaveShortCut],
});

export const App = () => {
  return (
    <Designer engine={engine}>
      <MainPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        <CompositePanel>
          <CompositePanel.Item title="Component" icon="Component">
            <DragSourceWidget title="sources.Inputs" name="inputs" />
            <DragSourceWidget title="sources.Layouts" name="layouts" />
            <DragSourceWidget title="sources.Arrays" name="arrays" />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', /* 'MARKUP',*/ 'PREVIEW']} />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Root,
                      DesignableField,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => <SchemaEditorWidget tree={tree} onChange={onChange} />}
              </ViewPanel>
              {/* <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel> */}
              <ViewPanel type="PREVIEW">{(tree) => <PreviewWidget tree={tree} />}</ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </MainPanel>
    </Designer>
  );
};
