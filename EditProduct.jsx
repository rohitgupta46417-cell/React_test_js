import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'

const EditProduct = () => {
  const [product, setProduct] = useState({
    productName:'', brand:'', category:'', price:'', stock:'', description:'', thumbnail:''
  })
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:4000/product/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Could not load this product.'))
  }, [id])

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      setError('Choose an image file up to 5 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setProduct((current) => ({...current, thumbnail:reader.result}))
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    axios.put(`http://localhost:4000/product/${id}`, {
      ...product, price:Number(product.price), stock:Number(product.stock)
    })
      .then(() => navigate(`/show/${id}`))
      .catch((err) => setError(err.response?.data?.message || 'Could not update product.'))
  }

  return (
    <main className="container page-wrap">
        <div className="form-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                
                    <h2 className="mb-0">Edit Product</h2>
                </div>

                <NavLink to={`/show/${id}`} className="btn btn-outline-secondary">
                    Cancel
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
                            value={product.productName || ''}
                            onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Brand</label>
                        <input
                            className="form-control"
                            required
                            value={product.brand || ''}
                            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Category</label>
                        <input
                            className="form-control"
                            required
                            value={product.category || ''}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
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
                            value={product.price ?? ''}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
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
                            value={product.stock ?? ''}
                            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={product.description || ''}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
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

                        <div className="form-text">
                            Leave empty to keep the existing thumbnail.
                        </div>

                        {product.thumbnail && (
                            <img
                                className="image-preview mt-3"
                                src={product.thumbnail}
                                alt="Product preview"
                            />
                        )}
                    </div>

                </div>

                <button type="submit" className="btn btn-primary mt-4 px-4">
                    Save Changes
                </button>
            </form>
        </div>
    </main>
)
}

export default EditProduct
