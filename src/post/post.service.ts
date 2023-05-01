/**
 * 处理文件内容
 */
import { Post } from '@/post/show/post-show.store';
import { API_BASE_URL } from '@/app/app.config';

export const postFileProcess = (post: Post) => {
  let {file } = post

  if (file) {
    const { id: fileId, width, height } = file;
    const fileBseUrl = `${API_BASE_URL}/files/${fileId}/serve`;
    const orientation = width > height ? 'horizontal' : 'portrait';

    file = {
      ...file,
      orientation,
      size: {
        thumbnail: `${fileBseUrl}?size=thumbnail`,
        medium: `${fileBseUrl}?size=medium`,
        large: `${fileBseUrl}?size=large`,
      },
    };

    post = {
      ...post,
      file,
    };
  }

  return post
}

export const filterProcess = (filterObject: {[name: string]: string}) =>{
  const allowedFilterNames = ['tag','user','action','post']

  Object.keys(filterObject).forEach((filterName) => {
    const allowed = allowedFilterNames.some(allowedFilterName => allowedFilterName === filterName);

    if(!allowed){
      delete filterObject[filterName]
    }
  })

  return filterObject
}