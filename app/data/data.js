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
  ],
};
