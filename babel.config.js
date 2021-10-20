module.exports = {
  presets: [ 'module:metro-react-native-babel-preset' ],
  plugins: [
    [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
     [ 'module-resolver', {
      "cwd": "packagejson",
      "root": [ "./src" ],
      "extensions": [ ".js", ".ios.js", '.android.js', '.ts', '.ios.ts', '.android.ts', '.tsx', '.jsx' ],
      "alias": {
        "common-components": "./src/common-components",
        "apis": "./src/apis",
        "consts": "./src/consts",
        "db": "./src/db",
        "defaults": "./src/defaults",
        "hooks": "./src/hooks",
        "providers": "./src/providers",
        "types": "./src/types",
        "utils": "./src/utils",
      }
    } ]
  ]
}
