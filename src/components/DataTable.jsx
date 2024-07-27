import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

const DataTable = ({ data, onDelete, onSearch , onSort }) => {
    const sRef = React.useRef()
    const handleDelete = (index) => {
        //console.log(`Delete ${index}`)
        //data.splice(index, 1)
        onDelete(index)

    }

    const handleSearch = () => {
        //console.debug(sRef.current.value)
        const keyword = sRef.current.value
        //data = data.filter(item => item.name.includes(keyword))
        //console.table(data)
        onSearch(keyword)
    }


    return (
        <Container>
            <input type="text" placeholder="Search..." ref={sRef} />{ ' ' } 
            <Button onClick={handleSearch}variant='outline-dark'>
                <i className="bi bi-search"></i>Search
            </Button> 

            Sort

            <Button onClick={() => onSort('asc')}> 
                <i className="bi bi-chevron-double-up"></i>
            </Button>
            <Button onClick={() => onSort('desc')}> 
                <i className="bi bi-chevron-double-down"></i>
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td><i className="bi bi-trash3" onClick={() => handleDelete(index)}></i></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DataTable;