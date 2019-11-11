
import AccountStore from './AccountStore';
import PermissionEditStore from './PermissionEditStore';
export default function initializeStores() {
  return {
    accountStore: new AccountStore(),
    permissionEditStore:new PermissionEditStore()
  };
}
