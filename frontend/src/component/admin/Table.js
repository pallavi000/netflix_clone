import React from 'react'

function Table() {
  return (
    <table>
        <thead>
            <tr className='table-head'>
                <th>Name</th>
                <th>Category</th>
                <th>Popularity/Interest</th>
                <th>Watchlist</th>
                <th>Staream Date</th>
                <th>Release </th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr class="table-body">
            <td className='row'><img src="" className='img-fluid table-image'/> movie name</td>
            <td ><div className='table-category-flex'><div className="table-category">ACTION</div> <div className="table-category">CRIIME</div></div></td>
            <td></td>
            <td>2,34,567</td>
            <td>21,980</td>
            <td>21 May, 2003</td>
            <td><div className="table-edit">Edit</div></td>
        </tr>
        <tr class="table-body">
            <td className='row'><img src="" className='img-fluid table-image'/> movie name</td>
            <td ><div className='table-category-flex'><div className="table-category">ACTION</div> <div className="table-category">CRIIME</div></div></td>
            <td></td>
            <td>2,34,567</td>
            <td>21,980</td>
            <td>21 May, 2003</td>
            <td><div className="table-edit">Edit</div></td>
        </tr>

        </tbody>
    </table>
  )
}

export default Table