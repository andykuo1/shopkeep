import Actor from 'craftem/actor/Actor.js';

class Market
{
  constructor(playerContainer)
  {
    this.actors = [];
    this.actors.push(new Actor("Bob", playerContainer));
    this.actors.push(new Actor("Bobbaline", playerContainer));
    this.actors.push(new Actor("Bobbily", playerContainer));
    this.actors.push(new Actor("Rob", playerContainer));
    this.actors.push(new Actor("Ribbet", playerContainer));
    this.actors.push(new Actor("Ridley", playerContainer));

    this.maxActors = 10;
  }

  getActors()
  {
    return this.actors;
  }
}

export default Market;
