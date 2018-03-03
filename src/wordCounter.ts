import { StatusBarItem, window, StatusBarAlignment, TextDocument } from "vscode";


export default class WordCounter {

  private _statusBarItem: StatusBarItem;
  constructor() {
    this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
  }
  public updateWordCount() {
    //get the current text editor
    let editor = window.activeTextEditor;
    if (!editor) {
      this._statusBarItem.hide();
      return;
    }

    let doc = editor.document;
    console.log(doc.languageId);
    if (doc.languageId === "javascript") {
      let wordCount = this._getWordCount(doc);
      this._statusBarItem.text = wordCount !== 1 ? `${wordCount} words;  ` : `1 Word`;
      this._statusBarItem.show();
    }
    else {
      this._statusBarItem.hide();
    }
  }
  public _getWordCount(doc: TextDocument): number {
    let docContent = doc.getText();
    docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
    docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    let wordCount = 0;
    if (docContent !== "") {
      wordCount = docContent.split(" ").length;
    }
    return wordCount;
  }
  dispose() {
    this._statusBarItem.dispose();
  }
}