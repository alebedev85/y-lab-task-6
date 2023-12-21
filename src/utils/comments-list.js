export const generatorCommentsList = (initialCommentList, id) => {
  let resulList = [];

  initialCommentList.forEach(item => {
    if (item.parent._id === id) {
      resulList.push([{...item}])
    }
  })

  const changeList = (comment) => {
    resulList.forEach((item, i)=> {
      item.forEach(item2 => {
        if (item2._id === comment.parent._id) {
          resulList[i].push({...comment})
        }
      })
    })
  }
  initialCommentList.forEach(item => changeList(item))

  return resulList;
}