import {
  handleIncomingRedirect,
  login,
} from "@inrupt/solid-client-authn-browser";

export async function completeLogin() {
  console.log("completeLogin");

  await handleIncomingRedirect({ restorePreviousSession: true });
}

export class Auth {
  //   private static callbackURL: string = "/callback";
  //   constructor() {}

  static async completeLogin() {
    console.log("Auth::completeLogin");
    
    await handleIncomingRedirect({ restorePreviousSession: true });
  }

  static async login(oidcIssuer: string) {
    await login({
      oidcIssuer: oidcIssuer,
      // redirectUrl: new URL(window.location.href).toString(),
      redirectUrl: window.location.href,
      clientName: "bookmarker",
      // handleRedirect(redirectUrl) {
      //   window.location.href = redirectUrl;
      // },
    });
  }
}
