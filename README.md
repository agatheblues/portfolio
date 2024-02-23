# Portfolio

This is the code for my portfolio.

## Run in dev

```
npm install && npm start
```

Assets go in a `static` folder at the root of the project. `static` must contain a file `main.json`:

```
{
  "projects": {
    "projectList": []
  },
  "about": {
    "aboutMe": {
      "title": "Hi there!",
      "description": []
    },
    "links": {
      "foo": {"url": "/foo", "isExternal": false}
    }
  }
}
```

## Prod 

```
npm run build
```
