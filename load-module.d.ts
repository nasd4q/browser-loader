/**
 *
 * @param {string} path the absolute path to the module to load
 * @param {string} name the name that it will be assigned to. (module.exports will be
 * assigned to window.name inside browser.) **No spaces**.
 * @param {string[]} ignoredModules names of module to ignore. ex : 'selenium-webdriver'
 *
 * @returns {Promise<string>}
 */
export function getModuleLoadingScript(path: string, name: string, ignoredModules: string[]): Promise<string>;
