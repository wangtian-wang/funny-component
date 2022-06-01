export const constantRouteComponents = {};
const modulesFiles = require.context('.', true, /\.ts$/);
modulesFiles.keys().forEach((path) => {
  if (path.startsWith('./index.')) return;
  const value = modulesFiles(path).default;
  Object.keys(value).forEach((ele) => {
    constantRouteComponents[ele] = value[ele];
  });
});
