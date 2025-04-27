module.exports = {
  extends: [
    "stylelint-config-standard",
    // opcional: se instalar tailwind plugin
    "stylelint-config-tailwindcss"
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen"
        ]
      }
    ]
  }
};
