import { Plugin } from 'vuex';
import { setStorage } from './app.service';
import { RootState } from './app.store';

/**
 * 本地存储插件
 */
export const localStoragePlugin: Plugin<RootState> = store => {
  store.subscribe(mutation => {
    switch (mutation.type) {
      case 'layout/setTheme':
        setStorage('theme', mutation.payload);
        break;
      case 'auth/login/setLoginResponseData':
        if(!mutation.payload){
          setStorage('nid', '');
          setStorage('uid', '');
        }else{
          setStorage('nid', mutation.payload.token);
          setStorage('uid', mutation.payload.id);
        }
        break;
    }
  });
};
