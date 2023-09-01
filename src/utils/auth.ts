import {
  handleIncomingRedirect,
  login,
} from "@inrupt/solid-client-authn-browser";

export class Auth {

  static async completeLogin() {
    console.log("Auth::completeLogin");
    
    await handleIncomingRedirect({ restorePreviousSession: true });
  }

  static async login(oidcIssuer: string) {
    await login({
      oidcIssuer: oidcIssuer,
      redirectUrl: new URL("/callback", window.location.href).toString(),
      clientName: "bookmarks",
      // clientId: "bookmarks",
      // handleRedirect(redirectUrl) {
      //   console.log("🚀 ~ file: auth.ts:28 ~ Auth ~ handleRedirect ~ redirectUrl:", redirectUrl)
      //   // window.location.href = redirectUrl;
      // },
    });
  }
}
