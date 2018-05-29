import * as path from 'path';
import * as nconf from 'nconf';

const rootPath = path.join(__dirname, '../');
const baseConfigFilePath = path.join(__dirname, './config-files');

/**
 * this file has the highest configuration priority.
 * Add properties to it if you woule like these properties overrides everything else.
 */
nconf.file('configOverrides', path.join(baseConfigFilePath, 'config.overrides.json'));

/**
 * load the values parsed from process.argv by yargs into the configuration
 */
nconf.argv();

/**
 * load configurations from env parameters
 */
nconf.env();

nconf.add('rootPaths', { type: 'literal', store: { 'paths': { 'root': rootPath } } });

export default nconf;