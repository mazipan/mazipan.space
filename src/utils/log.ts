// @ts-expect-error, js lib
import treeify from 'object-treeify';

export const prettyPrintObject = (object: Record<string, unknown>, prefix = ''): void => {
  const stringData = treeify(object);
  console.log(`${prefix}:\n\n${stringData}`);
};
