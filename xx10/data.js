var APP_DATA = {
  "scenes": [
    {
      "id": "0-entrance1",
      "name": "entrance1",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "yaw": 0,
        "pitch": 0,
        "fov": 1.3474042771833745
      },
      "linkHotspots": [
        {
          "yaw": -0.6488684244244087,
          "pitch": 0.43421863516968173,
          "rotation": 0,
          "target": "3-kitchen"
        },
        {
          "yaw": 2.3717246288628697,
          "pitch": 0.6978826787532988,
          "rotation": 0,
          "target": "2-laundry"
        },
        {
          "yaw": 0.2720681719894742,
          "pitch": 0.34465917773843735,
          "rotation": 0,
          "target": "4-salon-centre"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-entrace2",
      "name": "entrace2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.13245499593134902,
          "pitch": 0.4293492803754724,
          "rotation": 6.283185307179586,
          "target": "4-salon-centre"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-laundry",
      "name": "laundry",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -2.0964429654386656,
          "pitch": 0.573840969378761,
          "rotation": 0,
          "target": "0-entrance1"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -1.4617018752041755,
          "pitch": -0.11289807800891438,
          "title": "Laundry",
          "text": "Washer Machine and Dryer are included"
        }
      ]
    },
    {
      "id": "3-kitchen",
      "name": "kitchen",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "yaw": -2.5671665477148,
        "pitch": -0.0026626412730426097,
        "fov": 1.3474042771833745
      },
      "linkHotspots": [
        {
          "yaw": -1.7626506823773571,
          "pitch": 0.5090190561521517,
          "rotation": 4.71238898038469,
          "target": "1-entrace2"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -0.1305135430808022,
          "pitch": 0.26590689148890867,
          "title": "Kitchen",
          "text": "All appliances are included"
        }
      ]
    },
    {
      "id": "4-salon-centre",
      "name": "salon centre",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.5261281027957381,
          "pitch": 0.3288486026699253,
          "rotation": 0,
          "target": "0-entrance1"
        },
        {
          "yaw": 3.082873940736377,
          "pitch": 0.5221668641499679,
          "rotation": 0,
          "target": "6-balcony"
        },
        {
          "yaw": -1.3398758411464282,
          "pitch": 0.6026756729557121,
          "rotation": 0,
          "target": "9-aisle"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-aisle2",
      "name": "aisle2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [],
      "infoHotspots": []
    },
    {
      "id": "6-balcony",
      "name": "balcony",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.013724750942532893,
          "pitch": 0.7561622130797456,
          "rotation": 0,
          "target": "4-salon-centre"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-bedroom",
      "name": "bedroom",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.5689633679114188,
          "pitch": 0.49256045267390824,
          "rotation": 0,
          "target": "9-aisle"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "8-bathroom",
      "name": "bathroom",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.7709206204747066,
          "pitch": 0.8436831827307003,
          "rotation": 0,
          "target": "9-aisle"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "9-aisle",
      "name": "aisle",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1920,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.2946168372424278,
          "pitch": 0.6166965636080199,
          "rotation": 0,
          "target": "4-salon-centre"
        },
        {
          "yaw": 2.1352725984340593,
          "pitch": 0.6048896480548223,
          "rotation": 0,
          "target": "7-bedroom"
        },
        {
          "yaw": -2.074286184991955,
          "pitch": 0.8626324199117459,
          "rotation": 0,
          "target": "8-bathroom"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Serenity Towers 3 1/2-XX10",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
