/**
 *  将路径中重复的//login 替换成单个/
 * @param path 'api//login/user'
 * @returns {string} 去重/后的路径 api/login/user
 */

export const uniqueSlash = (path: string) => path.replace(/(?<!:)\/{2,}/g, '/');
export const isUrl = (path: string): boolean => {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};
