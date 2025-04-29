export interface sidenavPropType {
    menu:string;
    id:string;
    menuChange:(event ,menuObj)=>void ;
    selectedItem:boolean;

}

export interface settingSidemenuProps {
    selectedMenu:string;
    menuList :{ menu: string; id: string; }[];
    handleMenuChange :any;   
}
export interface changePasswordProps {
    getBackToAccountDetail: (value: boolean) => void;
  }
export interface passwordValidatorProps {
    passwordValidateArray: string[];
    passwordChecks: string[];
  }