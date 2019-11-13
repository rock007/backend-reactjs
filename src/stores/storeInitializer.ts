
import AccountStore from './AccountStore';
import PermissionEditStore from './PermissionEditStore';
import SystemStore from './SystemStore';
export default function initializeStores() {
  return {
    accountStore: new AccountStore(),
    permissionEditStore:new PermissionEditStore(),
    systemStore:new SystemStore(),
  };
}
