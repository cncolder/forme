import { createDesignableField, createDesignableForm } from '@formily/designable-antd';
import { TextInput } from '../components';

export const DesignableField = createDesignableField({
  registryName: 'DesignableField',
  components: {
    TextInput,
  },
});
