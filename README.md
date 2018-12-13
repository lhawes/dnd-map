# dnd-map
Map tool experiments

### Goals
- Iso view
- over head view
- extract object from coordinate system
- extract coordinate system
- JSON for map

### long term
- user system
- login system
- shared map
- users moving objects on shared map
- permissions
- Assets (grass, dirt, building, wall, blank)
- streaming updates between the group
- DM events (change map, popups, scenic view)

### JSON schema for map
```json
{
    "x-y": {
        "x": 0,
        "y": 0,
        "floorTile": "",
        "contentTile": "", 
        "topTile": "",
    },
}
```
Ex:
```json
{
    "3-4": {
        "x": 3,
        "y": 4, 
        "floorTile": "grass",
        "contentTile": null,
        "topTile": null,
    },
    "5-18": {
        "x": 5,
        "y": 18, 
        "floorTile": "dirt",
        "contentTile": "building-small",
        "topTile": null,
    },"
}
```
