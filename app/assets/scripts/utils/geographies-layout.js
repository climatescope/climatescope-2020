'use strict'

const renewableTypes = [
  'Biomass & Waste',
  'Geothermal',
  'Small Hydro',
  'Solar',
  'Wind'
]

export default [
  {
    id: 'power-market',
    title: 'Power Market',
    type: 'linear',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'installedCapacity',
        size: 'large',
        mainDataLayers: renewableTypes
      },
      {
        id: 'utilityPrivatisation',
        size: 'small'
      },
      {
        id: 'concentrationGeneration',
        size: 'small'
      },
      {
        id: 'powerPlantFleet',
        size: 'small'
      },
      {
        id: 'powerGeneration',
        size: 'medium',
        mainDataLayers: renewableTypes
      }
    ]
  },
  {
    id: 'clean-energy-policy',
    title: 'Clean Energy Policy',
    type: 'linear',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'gapToTarget',
        size: 'small'
      },
      {
        id: 'upcomingAuctions',
        size: 'small'
      }
    ]
  },
  {
    id: 'clean-energy-investment',
    title: 'Clean Energy Investment',
    type: 'linear',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'cleanEnergyInvestment',
        size: 'medium',
        mainDataLayers: [/* Empty keeps all */]
      },
      {
        id: 'foreignInvestment',
        size: 'small'
      }
    ]
  },
  {
    id: 'power-prices-and-lcoes',
    title: 'Price environment',
    type: 'linear',
    areaAlpha: [
      {
        id: 'sectionHeader'
      }
    ],
    areaBeta: [
      {
        id: 'sectorWholesale',
        size: 'small'
      },
      {
        id: 'electricityPrice',
        size: 'small'
      }
    ]
  },
  {
    id: 'doing-business',
    title: 'Doing Business',
    type: 'split',
    areaAlpha: [
      {
        id: 'sectionHeader'
      },
      {
        id: 'doingBusinessFeatures',
        size: 'large'
      }
    ],
    areaBeta: []
  },
  {
    id: 'barriers',
    title: 'Barriers',
    type: 'split',
    areaAlpha: [
      {
        id: 'sectionHeader'
      },
      {
        id: 'barriersFeatures',
        size: 'large'
      }
    ],
    areaBeta: [
      {
        id: 'currencyVariation',
        size: 'small'
      },
      {
        id: 'offtakerRisk',
        size: 'small'
      }
    ]
  }
]

export const compareLayoutDef = [
  {
    id: 'installedCapacity',
    size: 'large',
    mainDataLayers: renewableTypes
  },
  {
    id: 'utilityPrivatisation',
    size: 'large'
  },
  {
    id: 'concentrationGeneration',
    size: 'large'
  },
  {
    id: 'powerPlantFleet',
    size: 'large'
  },
  {
    id: 'powerGeneration',
    size: 'large',
    mainDataLayers: renewableTypes
  },
  {
    id: 'gapToTarget',
    size: 'large'
  },
  {
    id: 'upcomingAuctions',
    size: 'large'
  },
  {
    id: 'cleanEnergyInvestment',
    size: 'large',
    mainDataLayers: [/* Empty keeps all */]
  },
  {
    id: 'foreignInvestment',
    size: 'large'
  },
  {
    id: 'sectorWholesale',
    size: 'large'
  },
  {
    id: 'electricityPrice',
    size: 'large'
  },
  {
    id: 'currencyVariation',
    size: 'large'
  },
  {
    id: 'offtakerRisk',
    size: 'large'
  }
]
