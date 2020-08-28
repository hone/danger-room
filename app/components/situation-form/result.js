import Component from '@glimmer/component';
import { shraId } from 'danger-room/helpers/shra-id';

export default class Result extends Component {
  get result() {
    return this.args.result;
  }

  get shraUrl() {
    let urlParts = [];
    urlParts.push(`scenario=${shraId([this.result.scenario.name])}`);
    urlParts.push(
      `modularEncounter=${shraId([this.result.modularEncounterSets[0].name])}`
    );
    urlParts.push(`mode=${shraId([this.result.difficultyMode])}`);
    if (this.result.players.length > 0) {
      this.result.players.forEach((player, index) => {
        let prefix = `gameDecks[${index + 1}]`;
        urlParts.push(
          `${encodeURI(prefix)}.hero=${shraId([player.identity.hero])}`
        );
        urlParts.push(`${encodeURI(prefix)}.aspect=${shraId([player.aspect])}`);
      });
    }

    return 'https://superhumanregistrationact.com/?'.concat(urlParts.join('&'));
  }
}
