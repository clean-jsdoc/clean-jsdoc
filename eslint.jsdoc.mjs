import jsdoc from "eslint-plugin-jsdoc";

export default [
  {
      "files": [
        "demo/src/*.js"
      ],
      "plugins": {
        jsdoc
      },
      "languageOptions": {
        "globals": {
            "Alive": "readonly",
            "Environment": "readonly",
            "Energy": "readonly",
            "TAFFY": "readonly",
            "Tutorial": "readonly"
        }
      },
      "rules": {
          "class-methods-use-this": "off",
          "no-empty-function": "off",
          "no-invalid-this": "off",
          "jsdoc/require-param-description": "off",
          "jsdoc/require-yields-check":"off"
      }
  }
];
