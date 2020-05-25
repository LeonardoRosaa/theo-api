<p align="center"> 
  <img 
    src="https://user-images.githubusercontent.com/43169851/82767979-1bb21400-9e02-11ea-8ecb-af9b7c6125f1.png" width="80" /> 
</p>
<h3 align="center"> 
  THEO API
</h3>

<br>

### :motorway: Routes

Routes | type | description
--- | --- | ---
packages | PUT | Pass in body a json with devDependecies and or dependencies

#### Example

`
  PUT https://theo-api.herokuapp.com/packages
`

##### INPUT:

```
{
  "dependencies": {
    "axios": "^0.18.1",
    "cors": "2.8.5"
  }
}
```

##### OUTPUT:

```
{
  "yourUpdatedSettings": {
    "dependencies": {
      "axios": "^0.19.2",
      "cors": "2.8.5"
    },
    "devDependencies": {}
  },
  "yourCurrentSettings": {
    "dependencies": {
      "axios": "^0.18.1",
      "cors": "2.8.5"
    }
  }
}
```
