import webpack, { Configuration } from 'webpack';
import path from 'path';
import lessModules from '@kkt/less-modules';
import { LoaderConfOptions } from 'kkt';

export default (conf: Configuration, env: string, options: LoaderConfOptions) => {
  conf = lessModules(conf, env, options);
  const pkg = require(path.resolve(process.cwd(), 'package.json'));
  // Get the project version.
  conf.plugins!.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    })
  );
  return conf;
}
