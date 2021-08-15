
Hi there! This project is a simple images-placeholder. Build on Node.js with TypeScript. 

###Commands for development mode
First you should install all project dependencies by running `npm install`

After that use these:

- to run the tests
```
npm run test
```

- to build from src

```
npm run build
```

- to start the development server in watch mode

```
npm run start
```


###Commands for production mode
If you haven't run `npm install` for dev mode earlier, you can install only production dependencies by running `npm install --production` 

After that use this command to build from src and start the server for production:

```
npm run start-prod
```


###How to use
This project isn't hosted anywhere at the moment. So you should run it locally with the commands listed above. 

When the server is started visit `/img` path with the following query params to get an image:

- `filename`: `encenadaport | fjord | icelandwaterfall | palmtunnel | santamonica`
- `width`: any reasonable number of pixels
- `height`: same as width, only height

> E.g.:
>
> /img?filename=encenadaport&width=800&height=400
>
> /img?filename=fjord&width=600&height=600
>
> /img?filename=icelandwaterfall&width=1200&height=600
>
> /img?filename=palmtunnel&width=800&height=1200
>
> /img?filename=santamonica&width=300&height=300