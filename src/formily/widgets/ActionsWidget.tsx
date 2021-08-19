import React, { useCallback, useEffect } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { GlobalRegistry } from '@designable/core';
import { useDesigner, TextWidget } from '@designable/react';
import { observer } from '@formily/react';
import { Space, Button, Radio, message } from 'antd';
import { loadInitialSchema, saveSchema } from '../services';

export const ActionsWidget = observer(() => {
  const designer = useDesigner();

  const handleSaveClick = useCallback(() => {
    saveSchema(designer);
    message.success('Save Success');
  }, [designer]);

  useEffect(() => {
    loadInitialSchema(designer);
  }, []);

  return (
    <Space style={{ marginRight: 10 }}>
      {/* <Button href="https://designable-fusion.formilyjs.org">
        Alibaba Fusion
      </Button> */}
      {/* <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      /> */}
      {/* <Button href="https://github.com/alibaba/formily" target="_blank">
        <GithubOutlined />
        Github
      </Button> */}
      <Button onClick={handleSaveClick}>
        <TextWidget>Save</TextWidget>
      </Button>
      <Button type="primary" onClick={handleSaveClick}>
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  );
});
