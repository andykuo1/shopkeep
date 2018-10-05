import Actor from 'craftem/actor/Actor.js';

class Market
{
  constructor()
  {
    this.actors = [];
    this.actors.push(new Actor("Bob"));
    this.actors.push(new Actor("Bobbaline"));
    this.actors.push(new Actor("Bobbily"));
    this.actors.push(new Actor("Rob"));
    this.actors.push(new Actor("Ribbet"));
    this.actors.push(new Actor("Ridley"));

    this.maxActors = 10;
  }

  getActors()
  {
    return this.actors;
  }
}

export default Market;
