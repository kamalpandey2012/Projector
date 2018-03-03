import WordCounter from "./wordCounter";
import { window, Disposable } from "vscode";
export default class WordCounterController {
  private _wordCounter: WordCounter;
  private _disposable: Disposable;
  constructor(wordCounter: WordCounter) {
    this._wordCounter = wordCounter;

    let subscriptions: Disposable[] = [];
    window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
    window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
    this._wordCounter.updateWordCount();
    this._disposable = Disposable.from(...subscriptions);

  }
  dispose() {
    this._disposable.dispose();
  }
  private _onEvent() {
    this._wordCounter.updateWordCount();
  }
}