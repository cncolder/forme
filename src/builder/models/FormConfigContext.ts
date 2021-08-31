import { createContext, useContext } from 'react';

export interface FormConfigContextProps {
  designable?: boolean;
}

const FormConfigContext = createContext<FormConfigContextProps>(null);

export const FormConfigProvider = FormConfigContext.Provider;

export const useFormConfig = () => useContext(FormConfigContext);
