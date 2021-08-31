import { createContext, useContext } from 'react';
import type { BuilderStore } from './BuilderStore';

const BuilderContext = createContext<BuilderStore>(null);

export const BuilderProvider = BuilderContext.Provider;

export const useBuilder = () => useContext(BuilderContext);
