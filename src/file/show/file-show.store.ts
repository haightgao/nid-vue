import {Module} from 'vuex';
import {RootState} from '@/app/app.store';
import {apiHttpClient} from '@/app/app.service';

export interface FileMetaData {
  id: number;
  size: number;
  width: number;
  height: number;
  metaData: {
    Make: string; // 相机品牌
    Model: string; // 相机型号
    LensMake: string; // 镜头品牌
    LensModel: string; // 镜头型号
    Software: string; // 处理软件
    Orientation: number; // 方向
    CreateDate: number; // 创建时间
    ModifyDate: number; // 修改时间
    FNumber: number; // 光圈
    FocalLength: number; // 焦距
    ExposureTime: number; // 曝光时间
    ISO: number; // 感光度
  };
}

export interface FileShowStoreState {
  loading: boolean;
  fileMetaData: FileMetaData | null;
}

export interface MetaItem {
  title: string;
  value: string;
}

export const fileShowStoreModule: Module<FileShowStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    fileMetaData: null,
  } as FileShowStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    fileMetaData(state) {
      return state.fileMetaData;
    },

    // 设备信息
    kit(state){
      let kit: Array<MetaItem> = []

      if(state.fileMetaData && state.fileMetaData.metaData){
        const {
          Make = '',
          Model = '',
          LensMake = '',
          LensModel = ''
        } = state.fileMetaData.metaData

        const camera = {
          title: '相机',
          value: `${Make} ${Model}`.trim()
        }

        const lens = {
          title: '镜头',
          value: `${LensMake} ${LensModel}`.trim()
        }

        kit = [camera, lens]
      }

      return kit.filter(item => item.value !== '')
    },

    // 拍摄参数信息
    specs(state) {
      let specs: Array<MetaItem> = []

      if(state.fileMetaData && state.fileMetaData.metaData){
        const {FocalLength,FNumber, ExposureTime, ISO} = state.fileMetaData.metaData

        specs = [{
          title: '焦距',
          value: FocalLength ? `${FocalLength}mm` : ''
        },{
          title: '光圈',
          value: FNumber ? `f/${FNumber}` : ''
        },{
          title: '曝光',
          value: ExposureTime > 1 ? `${ExposureTime}s` : `1/${Math.round(1/ExposureTime)}s`
        },{
          title: '感光',
          value: `${ISO}`
        }]
      }

      return specs.filter(item => item.value !== '')
    }
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setFileMetaData(state, data){
      state.fileMetaData = data
    }
  },

  actions: {
    async getFileById({ commit }, fileId) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/files/${fileId}/metadata`);
        commit('setFileMetaData', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw (error as any).response;
      }
    },
  }
}