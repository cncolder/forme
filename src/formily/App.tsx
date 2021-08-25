import React from 'react';
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
import styles from './App.module.less';
import { DesignableField, Root } from './designable';
import { engine } from './services';
import { ActionsWidget, PreviewWidget, SchemaEditorWidget } from './widgets';
import './register';

export const App = () => {
  return (
    <Designer engine={engine}>
      <MainPanel
        // logo={<LogoWidget />}
        actions={<ActionsWidget />}
      >
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <DragSourceWidget title="sources.Layouts" name="layouts" />
            <DragSourceWidget title="sources.Inputs" name="inputs" />
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
              <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']} />
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
              <ViewPanel type="PREVIEW">{(tree) => <PreviewWidget tree={tree} />}</ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm
          //  uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          />
        </SettingsPanel>
      </MainPanel>
    </Designer>
  );
};
