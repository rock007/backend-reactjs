
import AccountStore from './AccountStore';
import PermissionEditStore from './PermissionEditStore';
import SystemStore from './SystemStore';
import ManStore from './ManStore';
import BeeGridStore from './BeeGridStore';

export default function initializeStores() {
  return {
    accountStore: new AccountStore(),
    permissionEditStore:new PermissionEditStore(),
    systemStore:new SystemStore(),
    manStore:new ManStore(),
    beeGridStore:new BeeGridStore(),
  };
}
