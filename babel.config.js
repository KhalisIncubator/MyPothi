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
        "consts": "./src/consts",
        "db": "./src/db",
        "hooks": "./src/hooks",
        "providers": "./src/providers",
        "utils": "./src/utils",
      }
    } ]
  ]
}
