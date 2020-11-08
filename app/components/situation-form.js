import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import shuffle from 'lodash.shuffle';

const DIFFICULTY_MODES = ['standard', 'expert'];
const CHOSEN_DIFFICULTY_MODES = ['random', 'standard', 'expert'];
const ASPECTS = ['Aggression', 'Justice', 'Leadership', 'Protection'];

export default class SituationForm extends Component {
  @tracked result = null;
  @tracked modularRadioIndex = 0;
  @tracked activeTab = 'scenario';

  // Unrelated to the refactor, but you may want to use a Set for this.
  @tracked unusedPacks = [];

  players = [0, 1, 2, 3, 4];
  numModularEncounterSets = [...Array(3).keys()].map(i => i + 1);

  constructor(owner, args) {
    super(owner, args);

    this.result = this.buildResult(args.state.result);
  }

  /*
    Most of these getters are strictly necessary, as they simply alias
    `this.args.foo` to `this.foo` or rename it to `this.otherFoo`. If
    the shorter name reads better, that's great, but if not, it's fine
    to delete them and just use `this.args.foo` directly.
  */

  get allIdentities() {
    return this.args.model.identities;
  }

  get allModularEncounterSets() {
    return this.args.model.modularEncounterSets;
  }

  get allScenarios() {
    return this.args.model.scenarios;
  }

  get difficultyModeOptions() {
    return ['random', ...DIFFICULTY_MODES];
  }

  get packs() {
    return this.args.model.packs;
  }

  get submit() {
    return this.args.submit;
  }

  /*
    These getters are derived state.
   */

  // Unrelated to the refactor, but this may also want to be a Set.
  get ownedPacks() {
    return Object.values(this.packs)
      .flat()
      .map(pack => pack.id)
      .filter(pack => !this.unusedPacks.includes(pack));
  }

  get identities() {
    return this.allIdentities.filter(identity => {
      return identity.pack.then(pack => this.ownedPacks.includes(pack.id));
    });
  }

  get scenarios() {
    return this.allScenarios.filter(scenario => {
      return scenario.pack.then(pack => this.ownedPacks.includes(pack.id));
    });
  }

  get modularEncounterSets() {
    return this.allModularEncounterSets.filter(modularEncounterSet => {
      return modularEncounterSet.pack.then(pack =>
        this.ownedPacks.includes(pack.id)
      );
    });
  }

  get parameters() {
    let parameters = this.args.state.parameters;

    if (!CHOSEN_DIFFICULTY_MODES.includes(parameters.difficultyMode)) {
      parameters.difficultyMode = 'random';
    }
    if (
      !this.numModularEncounterSets.includes(parameters.numModularEncounterSets)
    ) {
      parameters.numModularEncounterSets = 1;
    }
    if (parameters.numOfPlayers > 4 && parameters.numOfPlayers < 0) {
      parameters.numOfPlayers = 0;
    }

    return parameters;
  }

  @action
  togglePack(pack) {
    // A Set would make this nicer
    let index = this.unusedPacks.indexOf(pack);

    if (index === -1) {
      this.unusedPacks.push(pack);
    } else {
      this.unusedPacks.splice(index, 1);
    }

    // This is necessary to "update" the tracked property, so Ember knows to
    // recompute the state derived from this, as Ember can't see the interior
    // mutation inside the array (using a Set will have the same issue).
    //
    // @tracked is "shallow" in the sense that it is only tracking updates
    // (assignments) to the property itself, not whatever deep mutation inside
    // the object stored in the property. If this bothers you, an alternative
    // is to use @pzuraq's tracked-built-ins addon, which implements tracked
    // versions of arrays, sets, etc.
    // eslint-disable-next-line no-self-assign
    this.unusedPacks = this.unusedPacks;
  }

  @action
  generate() {
    let difficultyMode = this.generateDifficultyMode();
    let scenario = this.generateScenario();
    let sets = this.generateModularEncounterSets(scenario);
    let players = this.generatePlayers();

    this.result = {
      scenario,
      difficultyMode,
      modularEncounterSets: sets,
      players,
    };

    let resultState = {
      parameters: {
        difficultyMode: this.parameters.difficultyMode,
        numModularEncounterSets: this.parameters.numModularEncounterSets,
        scenario: this.parameters.scenario,
        numOfPlayers: this.parameters.numOfPlayers,
      },
      result: {
        scenario: this.result.scenario.slug,
        difficultyMode: this.result.difficultyMode,
        modularEncounterSets: this.result.modularEncounterSets.map(
          set => set.slug
        ),
        players: this.result.players.map(player => {
          return {
            identity: player.identity.id,
            aspects: player.aspects,
          };
        }),
      },
    };
    this.submit(resultState);
  }

  buildResult(result) {
    let scenario = null;
    let difficultyMode = null;
    let modularEncounterSets = [];
    let players = [];

    if (result.scenario.length > 0) {
      scenario = this.scenarios.find(
        element => element.slug === result.scenario
      );
    }
    if (result.difficultyMode.length > 0) {
      if (DIFFICULTY_MODES.includes(result.difficultyMode)) {
        difficultyMode = result.difficultyMode;
      }
    }
    result.modularEncounterSets.forEach(inputSet => {
      let foundSet = this.modularEncounterSets.find(
        dataSet => dataSet.slug === inputSet
      );
      if (foundSet) {
        modularEncounterSets.push(foundSet);
      }
    });
    if (result.players) {
      players = result.players.map(player => {
        let id = this.identities.find(i => i.id === player.identity);
        if (id) {
          return {
            identity: id,
            aspects: player.aspects,
          };
        }
      });
    }

    if (scenario && difficultyMode && modularEncounterSets.length > 0) {
      return {
        scenario,
        difficultyMode,
        modularEncounterSets,
        players,
      };
    }
  }

  generateModularEncounterSets(scenario) {
    let modulars = shuffle(this.modularEncounterSets.toArray());
    let numModularEncounterSets = scenario.features.includes('no-modulars')
      ? 0
      : this.parameters.numModularEncounterSets;
    let sets = [];
    for (let i = 0; i < numModularEncounterSets; i++) {
      sets.push(modulars.pop());
    }

    return sets;
  }

  generateDifficultyMode() {
    if (this.parameters.difficultyMode === 'random') {
      return shuffle(DIFFICULTY_MODES).pop();
    } else {
      return this.parameters.difficultyMode;
    }
  }

  generateScenario() {
    let scenario = this.scenarios.find(s => s.id == this.parameters.scenario);
    if (!scenario) {
      scenario = shuffle(this.scenarios.toArray())[0];
    }

    return scenario;
  }

  generatePlayers() {
    let players = [];
    if (this.parameters.numOfPlayers > 0) {
      let identities = shuffle(this.identities.toArray());
      for (let i = 0; i < this.parameters.numOfPlayers; i++) {
        let identity = identities.pop();
        let aspects = [];
        let shuffledAspects = shuffle(ASPECTS);
        aspects.push(shuffledAspects[0]);

        if (identity.features.includes('dual-aspect')) {
          aspects.push(shuffledAspects[1]);
        }

        players.push({
          identity,
          aspects,
        });
      }
    }

    return players;
  }
}
