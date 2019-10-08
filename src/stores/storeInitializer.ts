
import AccountStore from './accountStore';

export default function initializeStores() {
  return {

    accountStore: new AccountStore(),
  };
}
