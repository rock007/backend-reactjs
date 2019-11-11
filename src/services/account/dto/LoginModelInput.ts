export interface LoginModelInput {
  username: string;
  password: string;
  validCode?: string;
  grant_type:string;//password
  scope:string;//all
}
