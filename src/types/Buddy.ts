export interface Buddy {
    uuid: string;
    displayName: string;
    displayIcon: string;
    isHiddenIfNotOwned: boolean;
    themeUuid: string;
  }
  
  export interface BuddyDetail {
    uuid: string;
    displayName: string;
    displayIcon: string;
    assetPath: string;
  }
  