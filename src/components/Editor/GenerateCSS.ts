const generateStyle = ( fontSettings ): string => {
  // const androidImport = Platform.OS === "android" ? `@font-face{font-family: OpenGurbaniAkhar-Regular; src: url('file://android_asset/fonts/OpenGurbaniAkhar-Regular.otf');};` : ""
  return `.pangtee {
    font-size: ${fontSettings.gurbaniFont}px;
    font-family: "Arial";
  }
  .translations {
    font-size: ${fontSettings.translationFont}px;
  }
  .transliteration {
    font-size: ${fontSettings.transliterationFont}px;
  }
  .teeka {
    font-size: ${fontSettings.teekaFont}px;
  }
  `
}
export { generateStyle }
