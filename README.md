# VET7.Well v2 (vet7well-v2)

VET7.Well new version / frontend

Please set format on save option on your editor to true to keep the code clean and consistent.
prettier is formatting the code on save.

Use quasar cli to add new components, pages, layouts etc. see https://quasar.dev/start/quasar-cli
```aiignore
npm i -g @quasar/cli
```

more: https://quasar.dev/quasar-cli-vite/commands-list/

```aiignore
quasar new -h
```


```aiignore
quasar new component folder/MyComponent
quasar new page dirname/MyPage
quasar new layout MyLayout
```

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev

# or

npm run dev
```

### Start app in docker container
```bash
npm run build
```
assuming you already have the docker container running

### Lint the files
```bash
npm run lint
```


### Format the files
```bash
npm run format
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
