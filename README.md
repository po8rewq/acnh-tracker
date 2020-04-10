
Tracker for Animal Crossing: New Horizons, you can find the project [here](https://po8rewq.github.io/acnh-tracker/).

## Features 

 * View/track bugs by hemisphere and when/where you can catch them
 * View/track fish by hemisphere and when/where you can catch them
 * View/track fossils
 * View/track events recipe list (Bunny Day - Cherry-blossom)
 * Follow your town's turnip price market (based on [mikebryant/ac-nh-turnip-prices](https://github.com/mikebryant/ac-nh-turnip-prices) project)

## Local storage

Schema for the local storage:

```json
{ 
  '05-04-2020': {
    'sundayPrice': 123,
    'isFirstTime': true,
    'graph': [
        {when: 'mon_am', value: 90, order: 1},
    ]
  } 
}
```

The index is the date of the sunday for the week ahead