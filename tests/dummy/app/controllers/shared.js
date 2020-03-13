import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

class Employee {
  @tracked id;
  @tracked name;
  @tracked type;

  constructor(id, { name, type }) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}

export default class SharedController extends Controller {
  @tracked list = [];
  @tracked devSort = [1, 2, 3];
  @tracked pmSort = [1, 2, 3];

  constructor() {
    super(...arguments);
    setTimeout(() => {
      const all = [
        { name: 'Luis', type: 'dev' },
        { name: 'Jaden', type: 'dev' },
        { name: 'Gustavo', type: 'dev' },
        { name: 'Lance', type: 'pm' },
        { name: 'Britni', type: 'pm' },
        { name: 'Kelly', type: 'pm' }
      ];
      this.list = all.map((person, i) => new Employee(i += 1, person));
    }, 5000);
  }

  get devList() {
    return this.list.filter(employee => employee.type === 'dev');
  }

  get sortedDevList() {
    return [...this.devList].sort((a, b) => a.id - b.id);
  }

  get pmList() {
    return this.list.filter(employee => employee.type === 'pm');
  }

  get sortedPmList() {
    return [...this.pmList].sort((a, b) => a.id - b.id);
  }

  onSort(evt) {
    console.log('*** Action *** - onSort', evt);
  }

  onAdd(evt) {
    console.log('*** Action *** - onAdd', evt);
  }

  onRemove(evt) {
    console.log('*** Action *** - onRemove', evt);
  }

  onEnd(evt) {
    console.log('*** Action *** - onEnd', evt);
  }
}
