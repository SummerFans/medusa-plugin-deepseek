# Medusa Plugin Deepseek

## Install plugin
1. Install plugin by adding to your package.json:
```
npm install medusa-plugin-deepseek
```

2. Add plugin to your medusa-config.js:
```
...
plugins: [
    {
      resolve: "@rsc-labs/medusa-products-bought-together-v2",
      options: {
        api_key: process.env.DEEPSEEK_API_KEY,
      }
    }
]
...
```
3. Run migrations, e.g. npx medusa db:migrate

## How can I use it?

