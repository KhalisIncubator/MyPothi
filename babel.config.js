module.exports = {
  presets: [ 'module:metro-react-native-babel-preset' ],
  plugins: [
    [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
    [ 'module-resolver', {
      "cwd": "packagejson",
      "root": [ "./src" ],
      "extensions": [ ".js", ".ios.js", '.android.js', '.ios.ts', '.android.ts', '.tsx', '.jsx' ],
      "alias": {
        "components": "./src/components",
        "database": "./src/database",
        "navigation": "./src/navigation",
        "screens": "./src/screens",
        "store": "./src/store",
        "utils": "./src/utils"
      }
    } ]
  ]
}
