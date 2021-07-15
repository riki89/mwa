import { InjectionToken } from "@angular/core";

export class Storage {

}

export const BROWSER_STORAGE = new InjectionToken<Storage> ("games-token");