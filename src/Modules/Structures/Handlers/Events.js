import { BryanBot } from "../BryanBot.js";
import { manager } from "../../../index.js";
import { readdirSync } from "fs";
import path from "path";

export class EventHandler {
  /** @type {BryanBot} */ manager;
  /** @type {string} */ eventDir;
  /** @type {string[]} */ eventFiles;

  /**
   * @param {BryanBot} manager @param {string} eventDir
   */
  constructor(manager, eventDir) {
    if (!manager)
      throw new Error("[EventHandler] Missing manager parameter.");
    if (!eventDir)
      throw new Error("[EventHandler] Missing eventDir parameter.");

    this.manager = manager;
    this.eventDir = eventDir;
    this.eventFiles = readdirSync(eventDir).filter((file) =>
      file.endsWith(".js")
    );

    return this;
  }

  async initialize() {
    for (let i = 0; i < this.eventFiles.length; i++) {
      // Import the event file as an ESM
      import(`file://` + path.join(this.eventDir, this.eventFiles[i])).then(
        () => {
          // The event file has been imported
        }
      );
    }

    return this;
  }
}

export class EventListener {
  /** @type {string} */
  name;
  /** @type {(client: BryanBot) => any} */
  handler;

  /**
   * @param {string} name @param {(client: BryanBot, ...params: any) => { }} handler
   */
  constructor(name, handler) {
    this.name = name;
    this.handler = handler;

    manager.events.push({ name, handler });
    manager.on(name, async (...params) => await handler(manager, ...params));
  }
}

export class EventEmitter {
  /**
   * @param {string} name @param  {...any} params
   */
  constructor(name, ...params) {
    manager.emit(name, ...params);
  }
}
