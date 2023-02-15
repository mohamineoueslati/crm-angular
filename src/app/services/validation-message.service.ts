import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ValidationMessageService {
  constructor() {}

  public getValidationMessages(state: any, fieldName: string): string[] {
    let messages: string[] = [];
    if (state) {
      if (state.errors) {
        for (let errorName in state.errors) {
          switch (errorName) {
            case "required":
              messages.push(`${fieldName} is required`);
              break;
          }
        }
      }
    }

    return messages;
  }
}
