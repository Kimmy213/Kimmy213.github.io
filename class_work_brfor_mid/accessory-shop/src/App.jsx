import { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DataTable from './components/DataTable'
import productList from './accessory-products.json'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const productRef = useRef()
  const quantityRef = useRef()

  const [price, setPrice] = useState(productList[0].price)
  const [selectedItems, setSelectedItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])

  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1)
    setSelectedItems([...selectedItems])
    setFilteredItems([...selectedItems])
    
  }
  
  const filter = (keyword) => {
    const filteredItems = selectedItems.filter(item => item.name.includes(keyword))
    setFilteredItems(filteredItems)
  }

  const Sort = (order) => {  
    const sortedItems = [...filteredItems].sort((a, b) => {  
      if (order === 'asc') {  
        return a.name.localeCompare(b.name); 
      } else {  
        return b.name.localeCompare(a.name)
      }  
    })  
    setFilteredItems(sortedItems)
  }
  
  

  const handleSelect = (e) => {
    const pid = parseInt(productRef.current.value)
    const product = productList.find(p => p.id === pid)
    console.table(product)

    setPrice(product.price)
  }

  const handleAdd = (e) => {
    const pid = parseInt(productRef.current.value)
    console.log(typeof pid)
    const product = productList.find(p => p.id === pid)
    const q = quantityRef.current.value
    // console.log(pid, q)
    // console.table(product)

    selectedItems.push({
      // id: product.id,
      // name: product.name,
      // price: product.price,
      ...product,
      quantity: q
    })

    setSelectedItems([...selectedItems])
    setFilteredItems([...selectedItems])

    console.table(selectedItems)
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>
            <Form.Label htmlFor="inputProductName">Product Name</Form.Label>
            <Form.Select
              id="inputProductName"
              ref={productRef}
              onChange={handleSelect}>
              {
                productList.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))
              }
            </Form.Select>

            <Form.Label htmlFor="inputPrice">Price</Form.Label>
            <Form.Control type="number"
              id="inputPrice"
              readOnly
              value={price}
            />

            <Form.Label htmlFor="inputQuantity">Quantity</Form.Label>
            <Form.Control
              type="number"
              id="inputQuantity"
              aria-describedby="Quantity"
              defaultValue={1}
              ref={quantityRef}
            />

            <Button variant="success" onClick={handleAdd}>Add</Button>
          </Col>
          <Col>
            <DataTable 
              data={filteredItems} 
              onDelete={deleteItemByIndex}
              onSearch={filter}
              onSort={Sort}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App