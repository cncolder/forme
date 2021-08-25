import { toJS } from '@formily/reactive';
import Debug from 'debug';

export const debug = (arg: string) => {
  let namespace = '';

  if (typeof arg === 'string') {
    if (arg.startsWith('http')) {
      const { pathname } = new URL(arg);
      namespace = pathname.split('/src/').pop();
    } else {
      namespace = arg;
    }
  }

  const instance = Debug(namespace);

  instance.enabled = true;
  instance.log = console.log.bind(console);

  return (formatter: any, ...args: any[]) =>
    instance.apply(instance, [formatter, ...args].map(toJS));
};
