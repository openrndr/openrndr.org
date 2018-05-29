Source code for [openrndr.org](https://openrndr.org)

## Setup

make sure you have following environment variables:

* `DATO_API_TOKEN`
* `MEDIUM_API_TOKEN` (https://medium.com/me/settings > Integration tokens)

## Run

If it is first time running, make sure you fetch the data.\*

* development: `yarn start`
* local build: `yarn build --staging`
* production build (on server): `yarn build`
* fetch/build data: `yarn fetch:data`
* deploy: `yarn deploy`

## Deploy

Website uses continuous deployment from a Git repository thanks to [Netlify](https://www.netlify.com/). So deployment can be triggered from Netlify interface.

OR
Use `build-hooks`:

```
curl -X POST -d '' https://api.netlify.com/build_hooks/5b0d1ecfb3127448d06e8e15
```

OR
Use `RNDR Slack` command integration by running the following command:

```
\deploy_openrndr
```

## Tech stack

It is a static website using [DatoCMS](https://www.datocms.com/) for CMS and [React Static](https://github.com/nozzle/react-static) for frontend. Website is hosted on [Netlify](https://www.netlify.com/).
