export default {
  data: [
    {
      id: 1,
      type: 'pack',
      attributes: {
        name: 'Core',
        type: 'core',
      },
      relationships: {
        identities: {
          data: [
            {
              id: 1,
              type: 'identity',
            },
            {
              id: 2,
              type: 'identity',
            },
            {
              id: 3,
              type: 'identity',
            },
            {
              id: 4,
              type: 'identity',
            },
            {
              id: 5,
              type: 'identity',
            },
          ],
        },
        modularEncounterSets: {
          data: [
            {
              id: 1,
              type: 'modular-encounter-set',
            },
            {
              id: 2,
              type: 'modular-encounter-set',
            },
            {
              id: 3,
              type: 'modular-encounter-set',
            },
            {
              id: 4,
              type: 'modular-encounter-set',
            },
            {
              id: 5,
              type: 'modular-encounter-set',
            },
          ],
        },
        scenarios: {
          data: [
            {
              id: 1,
              type: 'scenario',
            },
            {
              id: 2,
              type: 'scenario',
            },
            {
              id: 3,
              type: 'scenario',
            },
          ],
        },
      },
    },
    {
      id: 2,
      type: 'pack',
      attributes: {
        name: 'Green Goblin',
        type: 'scenario',
      },
      relationships: {
        modularEncounterSets: {
          data: [
            {
              id: 5,
              type: 'modular-encounter-set',
            },
            {
              id: 6,
              type: 'modular-encounter-set',
            },
            {
              id: 7,
              type: 'modular-encounter-set',
            },
            {
              id: 8,
              type: 'modular-encounter-set',
            },
          ],
        },
        scenarios: {
          data: [
            {
              id: 4,
              type: 'scenario',
            },
            {
              id: 5,
              type: 'scenario',
            },
          ],
        },
      },
    },
    {
      id: 3,
      type: 'pack',
      attributes: {
        name: 'Captain America',
        type: 'hero',
      },
      relationships: {
        identities: {
          data: [
            {
              id: 6,
              type: 'identity',
            },
          ],
        },
      },
    },
    {
      id: 4,
      type: 'pack',
      attributes: {
        name: 'Ms. Marvel',
        type: 'hero',
      },
      relationships: {
        identities: {
          data: [
            {
              id: 7,
              type: 'identity',
            },
          ],
        },
      },
    },
    {
      id: 5,
      type: 'pack',
      attributes: {
        name: 'Thor',
        type: 'hero',
      },
      relationships: {
        identities: {
          data: [
            {
              id: 8,
              type: 'identity',
            },
          ],
        },
      },
    },
    {
      id: 6,
      type: 'pack',
      attributes: {
        name: 'Wrecking Crew',
        type: 'scenario',
      },
      relationships: {
        scenarios: {
          data: [
            {
              id: 6,
              type: 'scenario',
            },
          ],
        },
      },
    },
    {
      id: 7,
      type: 'pack',
      attributes: {
        name: 'Black Widow',
        type: 'hero',
      },
      relationships: {
        identities: {
          data: [
            {
              id: 9,
              type: 'identity',
            },
          ],
        },
      },
    },
    {
      id: 8,
      type: 'pack',
      attributes: {
        name: 'Doctor Strange',
        type: 'hero',
      },
      relationships: {
        identities: {
          data: [
            {
              id: 10,
              type: 'identity',
            },
          ],
        },
      },
    },
    {
      id: 9,
      type: 'pack',
      attributes: {
        name: 'Hulk',
        type: 'hero',
      },
      relationships: {
        identities: {
          data: [
            {
              id: 11,
              type: 'identity',
            },
          ],
        },
      },
    },
    {
      id: 10,
      type: 'pack',
      attributes: {
        name: 'Ronan Modular Set',
        type: 'print-n-play',
      },
      relationships: {
        modularEncounterSets: {
          data: [
            {
              id: 10,
              type: 'modular-encounter-set',
            },
          ],
        },
      },
    },
    {
      id: 11,
      type: 'pack',
      attributes: {
        name: 'The Rise of Red Skull',
        type: 'campaign',
      },
      relationships: {
        identities: {
          data: [
            {
              id: 12,
              type: 'identity',
            },
            {
              id: 13,
              type: 'identity',
            },
          ],
        },
        modularEncounterSets: {
          data: [
            {
              id: 11,
              type: 'modular-encounter-set',
            },
            {
              id: 12,
              type: 'modular-encounter-set',
            },
            {
              id: 13,
              type: 'modular-encounter-set',
            },
          ],
        },
        scenarios: {
          data: [
            {
              id: 7,
              type: 'scenario',
            },
            {
              id: 8,
              type: 'scenario',
            },
            {
              id: 9,
              type: 'scenario',
            },
            {
              id: 10,
              type: 'scenario',
            },
            {
              id: 11,
              type: 'scenario',
            },
          ],
        },
      },
    },
    {
      id: 1,
      type: 'identity',
      attributes: {
        alterEgo: 'Peter Parker',
        hero: 'Spider-Man',
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 2,
      type: 'identity',
      attributes: {
        alterEgo: 'Carol Danvers',
        hero: 'Captain Marvel',
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 3,
      type: 'identity',
      attributes: {
        alterEgo: 'Jennifer Walters',
        hero: 'She-Hulk',
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 4,
      type: 'identity',
      attributes: {
        alterEgo: 'Tony Stark',
        hero: 'Iron Man',
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 5,
      type: 'identity',
      attributes: {
        alterEgo: "T'Challa",
        hero: 'Black Panther',
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 6,
      type: 'identity',
      attributes: {
        alterEgo: 'Steve Rogers',
        hero: 'Captain America',
      },
      relationships: {
        pack: {
          id: 3,
          type: 'pack',
        },
      },
    },
    {
      id: 7,
      type: 'identity',
      attributes: {
        alterEgo: 'Kamala Khan',
        hero: 'Ms. Marvel',
      },
      relationships: {
        pack: {
          id: 4,
          type: 'pack',
        },
      },
    },
    {
      id: 8,
      type: 'identity',
      attributes: {
        alterEgo: 'Odinson',
        hero: 'Thor',
      },
      relationships: {
        pack: {
          id: 5,
          type: 'pack',
        },
      },
    },
    {
      id: 9,
      type: 'identity',
      attributes: {
        alterEgo: 'Natasha Romanoff',
        hero: 'Black Widow',
      },
      relationships: {
        pack: {
          id: 6,
          type: 'pack',
        },
      },
    },
    {
      id: 10,
      type: 'identity',
      attributes: {
        alterEgo: 'Stephen Strange',
        hero: 'Doctor Strange',
      },
      relationships: {
        pack: {
          id: 7,
          type: 'pack',
        },
      },
    },
    {
      id: 11,
      type: 'identity',
      attributes: {
        alterEgo: 'Bruce Banner',
        hero: 'Hulk',
      },
      relationships: {
        pack: {
          id: 8,
          type: 'pack',
        },
      },
    },
    {
      id: 12,
      type: 'identity',
      attributes: {
        alterEgo: 'Cliff Barton',
        hero: 'Hawkeye',
      },
      relationships: {
        pack: {
          id: 11,
          type: 'pack',
        },
      },
    },
    {
      id: 13,
      type: 'identity',
      attributes: {
        alterEgo: 'Jessica Drew',
        hero: 'Spider-Woman',
        features: ['dual-aspect'],
      },
      relationships: {
        pack: {
          id: 11,
          type: 'pack',
        },
      },
    },
    {
      id: 1,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Bomb Scare',
        difficulty: 1,
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 2,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Masters of Evil',
        difficulty: 2,
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 3,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Under Attack',
        difficulty: 3,
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 4,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Legions of Hydra',
        difficulty: 4,
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 5,
      type: 'modular-encounter-set',
      attributes: {
        name: 'The Doomsday Chair',
        difficulty: 5,
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 6,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Goblin Gimmicks',
      },
      relationships: {
        pack: {
          data: {
            id: 2,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 7,
      type: 'modular-encounter-set',
      attributes: {
        name: 'A Mess of Things',
      },
      relationships: {
        pack: {
          data: {
            id: 2,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 8,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Power Drain',
      },
      relationships: {
        pack: {
          data: {
            id: 2,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 9,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Running Interference',
      },
      relationships: {
        pack: {
          data: {
            id: 2,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 10,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Kree Fanatic',
      },
      relationships: {
        pack: {
          data: {
            id: 9,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 11,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Hydra Assault',
      },
      relationships: {
        pack: {
          data: {
            id: 11,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 11,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Hydra Patrol',
      },
      relationships: {
        pack: {
          data: {
            id: 11,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 11,
      type: 'modular-encounter-set',
      attributes: {
        name: 'Weapon Master',
      },
      relationships: {
        pack: {
          data: {
            id: 11,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 1,
      type: 'scenario',
      attributes: {
        name: 'Rhino',
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 2,
      type: 'scenario',
      attributes: {
        name: 'Klaw',
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 3,
      type: 'scenario',
      attributes: {
        name: 'Ultron',
      },
      relationships: {
        pack: {
          data: {
            id: 1,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 4,
      type: 'scenario',
      attributes: {
        name: 'Risky Business',
      },
      relationships: {
        pack: {
          data: {
            id: 2,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 5,
      type: 'scenario',
      attributes: {
        name: 'Mutagen Formula',
      },
      relationships: {
        pack: {
          data: {
            id: 2,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 6,
      type: 'scenario',
      attributes: {
        name: 'Wrecking Crew',
        features: ['no-modulars'],
      },
      relationships: {
        pack: {
          data: {
            id: 6,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 7,
      type: 'scenario',
      attributes: {
        name: 'Crossbones',
      },
      relationships: {
        pack: {
          data: {
            id: 11,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 8,
      type: 'scenario',
      attributes: {
        name: 'Absorbing Man',
      },
      relationships: {
        pack: {
          data: {
            id: 11,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 9,
      type: 'scenario',
      attributes: {
        name: 'Taskmaster',
      },
      relationships: {
        pack: {
          data: {
            id: 11,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 10,
      type: 'scenario',
      attributes: {
        name: 'Zola',
      },
      relationships: {
        pack: {
          data: {
            id: 11,
            type: 'pack',
          },
        },
      },
    },
    {
      id: 11,
      type: 'scenario',
      attributes: {
        name: 'Red Skull',
      },
      relationships: {
        pack: {
          data: {
            id: 11,
            type: 'pack',
          },
        },
      },
    },
  ],
};
