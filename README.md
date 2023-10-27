# nuxt-mkdocs [![npm](https://img.shields.io/npm/v/nuxt-mkdocs.svg)](https://www.npmjs.com/package/nuxt-mkdocs)

Combining the style and flexibility of [Nuxt Content](https://content.nuxt.com/) with the syntax of [MkDocs](https://www.mkdocs.org/).

## Usage

Make sure you have npx installed (npx is shipped by default since npm 5.2.0)

```sh
npx nuxt-mkdocs
```

This will create the following directory structure:

```
/
├─ .nuxt-content/
├─ docs/
│  ├─ index.md
│  ├─ mkdocs.yml
├─ package.json
├─ .gitignore
```

You can view the pages to your local browser by running:

```sh
npm run serve
```

And you can generate the static site for hosting using:

```sh
npm run generate
```

This command will take the markdown files in the `docs` directory and generate a site in the in a `dist` directory with the following routes:

| File                  | URL            |
| --------------------- | -------------- |
| docs/index.md         | /              |
| docs/about.md         | /about         |
| docs/api/endpoints.md | /api/endpoints |

`mkdocs.yml` is where you will you will store metadata and configuration info about your docs. Read more about `mkdocs.yml` [here](https://www.mkdocs.org/user-guide/configuration/).

## Contribute

Accepting pull requests for features which help improve the UX of nuxt-mkdocs. Right now the two main development priorities are:

1. Replicating a more compete set of `mkdocs.yml` [customization](https://www.mkdocs.org/user-guide/configuration/).
2. Creating components and themes users can select to style their docs.

## License

[MIT](./LICENSE)
