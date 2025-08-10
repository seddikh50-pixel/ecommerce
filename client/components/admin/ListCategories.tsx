import React from 'react'
interface Props {
    id : string
    name : string
    image : string
}

interface ListCategories {
    categories :Props []
}
const ListCategories = ({categories} : ListCategories) => {
  return (
    <div>ListCategories</div>
  )
}

export default ListCategories