import Component from '@glimmer/component';
import Sortable from 'sortablejs';
import { bind } from '@ember/runloop';
import { action } from '@ember/object';

export default class SortableJsComponent extends Component {
  sortable = null;

  #events = [
    'onChoose',
    'onUnchoose',
    'onStart',
    'onEnd',
    'onAdd',
    'onUpdate',
    'onSort',
    'onRemove',
    'onMove',
    'onClone',
    'onChange',
    'scrollFn',
    'onSetData',
    'setData',
    'onFilter',
  ];

  @action
  setOptions() {
    for (let [key, value] of Object.entries(this.args.options)) {
      this.setOption(key, value);
    }
  }

  /**
   *
   * @param {HTMLElement} element
   */
  @action
  didInsert(element) {
    const defaults = {};
    const options = Object.assign({}, defaults, this.args.options);

    this.sortable = Sortable.create(element, options);
    this.setupEventHandlers();
  }

  willDestroy() {
    this.sortable.destroy();
  }

  setupEventHandlers() {
    this.#events.forEach(eventName => {
      const action = this.args[eventName];
      if (typeof action === 'function') {
        this.sortable.option(eventName, bind(this, 'performExternalAction', eventName));
      }
    });
  }

  performExternalAction(actionName, ...args) {
    let action = this.args[actionName];

    action = (action === 'onSetData') ? 'setData' : action;

    if (typeof action === 'function') {
      action(...args, this.sortable);
    }
  }

  setOption(option, value) {
    this.sortable.option(option, value);
  }
}
