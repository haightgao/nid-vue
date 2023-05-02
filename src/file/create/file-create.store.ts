import {Module} from 'vuex';
import {RootState} from '@/app/app.store';
import {apiHttpClient} from '@/app/app.service';

export interface File{
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
}

export interface FileCreateStoreState {
  uploadProgress: number;
  previewImage: string;
  selectedFile: File|null;
  loading: boolean;
}

export interface CreateFileOptions {
  file?: File;
  postId?: number;
}

export const fileCreateStoreModule: Module<FileCreateStoreState, RootState> = {
  namespaced: true,

  state: {
    uploadProgress:0,
    previewImage: '',
    selectedFile: null,
    loading: false
  } as FileCreateStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },
    uploadProgress(state) {
      return state.uploadProgress;
    },
    previewImage(state) {
      return state.previewImage;
    },
    selectedFile(state) {
      return state.selectedFile;
    },
    uploading(state){
      return state.uploadProgress !== 0 && state.uploadProgress !== 100
    }
  },

  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setUploadProgress(state, uploadProgress) {
      state.uploadProgress = uploadProgress;
    },
    setPreviewImage(state, previewImage) {
      state.previewImage = previewImage;
    },
    setSelectedFile(state, selectedFile) {
      state.selectedFile = selectedFile;
    }
  },

  actions: {
    async createFile({commit,dispatch}, options: CreateFileOptions) {
      commit('setLoading', true);

      const {file, postId} = options

      const formData = new FormData()
      formData.append('file', file as any)

      try {
        const response = await apiHttpClient.post(
          `files?post=${postId}`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

              if(uploadProgress === 100){
                dispatch('notification/pushMessage', {
                  content: '上传成功，开始处理照片...'
                },{
                  root: true
                })
              }

              commit('setUploadProgress', uploadProgress)
            }
          });
        commit('setLoading', false);
        dispatch('notification/pushMessage', {
          content: '照片处理完成'
        },{
          root: true
        })
        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    }
  }
}