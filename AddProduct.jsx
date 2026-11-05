import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'

const emptyProduct = {
  productName: '', brand: '', category: '', price: '', stock: '',
  description: '', thumbnail: ''
}

const AddProduct = () => {
  const [product, setProduct] = useState(emptyProduct)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be 5 MB or smaller.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setProduct((current) => ({ ...current, thumbnail: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    axios.post('http://localhost:4000/product/add', {
      ...product, price: Number(product.price), stock: Number(product.stock)
    })
      .then(() => navigate('/'))
      .catch((err) => setError(err.response?.data?.message || 'Could not add product. Check that the backend is running.'))
  }
  return(

  <main className="container page-wrap">
    <div className="form-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <p className="eyebrow"></p>
                <h2 className="mb-0">Add Product</h2>
            </div>
            <NavLink to="/" className="btn btn-outline-secondary">
                Back
            </NavLink>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
            <div className="row g-3">

                <div className="col-md-6">
                    <label className="form-label">Product Name</label>
                    <input
                        className="form-control"
                        required
                        value={product.productName}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                productName: e.target.value
                            })
                        }
                        placeholder="e.g. Wireless Headphones"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Brand</label>
                    <input
                        className="form-control"
                        required
                        value={product.brand}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                brand: e.target.value
                            })
                        }
                        placeholder="e.g. Sony"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <input
                        className="form-control"
                        required
                        value={product.category}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                category: e.target.value
                            })
                        }
                        placeholder="e.g. Electronics"
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Price (₹)</label>
                    <input
                        className="form-control"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={product.price}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price: e.target.value
                            })
                        }
                        placeholder="0.00"
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Stock</label>
                    <input
                        className="form-control"
                        type="number"
                        min="0"
                        step="1"
                        required
                        value={product.stock}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                stock: e.target.value
                            })
                        }
                        placeholder="0"
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={product.description}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                description: e.target.value
                            })
                        }
                        placeholder="A short product description"
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">Product Thumbnail</label>
                    <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />
                   
                    {product.thumbnail && (
                        <img
                            className="image-preview mt-3"
                            src={product.thumbnail}
                            alt="Product preview"
                        />
                    )}
                </div>

            </div>

            <button
                type="submit"
                className="btn btn-primary mt-4 px-4"
            >
                Add Product
            </button>
        </form>
    </div>
</main>
  )
}

export default AddProduct
