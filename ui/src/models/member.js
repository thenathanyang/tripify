const validState = state => [MEMBER_OWNER, MEMBER_ACCEPTED, MEMBER_DECLINED].includes(state);

export const MEMBER_OWNER    = 'owner';
export const MEMBER_ACCEPTED = 'accepted';
export const MEMBER_DECLINED = 'declined';
export const MEMBER_UNKNOWN  = 'unknown';

/**
 * A Trip Member
 */
export default class Member {
  /**
   * Creates a Member
   * 
   * @param {String} id
   * @param {String} name
   * @param {String} email
   * @param {number} state
   */
  constructor(id, name, email, state) {
    this.id = id;
    this.name = name;
    this.email = email || null;
    this.state = validState(state) ? state : MEMBER_UNKNOWN;
  }

  accepted = () => this.state === MEMBER_ACCEPTED || this.state === MEMBER_OWNER;
  declined = () => this.state === MEMBER_DECLINED;

  /**
   * Creates a Member from an object with properties corresponding to the constructor
   * 
   * @param {Object} obj
   */
  static fromObject(obj) {
    return new Member(obj.id, obj.name, obj.email, obj.state);
  }
}
