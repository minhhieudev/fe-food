export class Language {
  window;
  constructor(window: any) {
    this.window = window;
  }

  gen(content: string) {
    try {
      const currentLang = this.window.localStorage.getItem(LANG.KEY) || "vi";
      const lang: any = require("./language.json");
      return (
        lang[content][currentLang] ||
        (() => {
          throw "_";
        })()
      );
    } catch (error) {
      return content;
    }
  }
}

export const LANG = {
  KEY: "_LANG",
};
