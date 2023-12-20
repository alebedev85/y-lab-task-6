export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего состаяния и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Коментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  postComments: (data, user) => {
    return async (dispatch, getState, services) => {
      try {
        const token = localStorage.getItem('token');
        const newData = JSON.stringify(data);
        if (token) {
          const res = await services.api.request({
            url: "/api/v1/comments",
            method: "POST",
            body: newData
          })
          dispatch({type: 'oneComments/load-success', payload: {data: {...res.data.result, author: {profile: {name: user, _id: res.data.result.author._id}}}}});
        } else console.log('fail token')
      } catch ( e ) {
        dispatch({type: 'comments/load-error'});
      }
    }
  }
}