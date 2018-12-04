import moment from 'moment';
import Event from './event';
import Member from './member';
import { getBlackImage } from './image';

/**
 * A Trip
 */
export default class Trip {
  /**
   * Creates a Trip
   * 
   * @param {String} id 
   * @param {String} name 
   * @param {String} description 
   * @param {Array<Member>} members 
   * @param {Array<Event>} events 
   */
  constructor(id, name, description, members, events) {
    this.id = id;
    this.name = name;
    this.description = description || null;
    this.members = members || [];
    this.events = events || [];
  }

  startTime() {
    if (!this.events.length)
      return null;
    return moment.min(this.events.map(e => e.startDate));
  }

  endTime() {
    if (!this.events.length)
      return null;
    return moment.max(this.events.map(e => e.endDate));
  }

  price() {
    return this.events.reduce((total, event) => total + event.price, 0);
  }

  background() {
    return this.events.length ? this.events[0].images[0] : getBlackImage();
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      members: this.members,
      events: this.events,
    };
  }

  /**
   * Creates a Trip from an object with properties corresponding to the constructor
   * 
   * @param {Object} obj
   */
  static fromObject(obj) {
    return new Trip(
      obj.id,
      obj.name,
      obj.description,
      (obj.members || []).map(Member.fromObject),
      (obj.events || []).map(Event.fromObject)
    );
  }
}