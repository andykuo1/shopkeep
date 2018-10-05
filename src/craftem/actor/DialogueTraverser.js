class DialogueTraverser
{
  constructor(dialogue)
  {
    this.rootDialogue = dialogue;
    this.currentDialogue = dialogue;

    this.onDialogueOption = this.onDialogueOption.bind(this);
  }

  restart()
  {
    this.currentDialogue = this.rootDialogue;
  }

  onDialogueOption(option)
  {
    if (option.isExitOption())
    {
      this.currentDialogue = null;
    }
    else
    {
      if (option.callback) option.callback();
      if (option.target) this.currentDialogue = option.target;
    }
  }

  getCurrentDialogue()
  {
    return this.currentDialogue;
  }

  isFinished()
  {
    return this.currentDialogue == null;
  }
}

export default DialogueTraverser;
