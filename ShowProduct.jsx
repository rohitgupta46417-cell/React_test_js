import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'

const ShowProduct = () => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:4000/product/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Product not found.'))
  }, [id])

  const handleDelete = () => {
    if (!window.confirm('Delete this product? This action cannot be undone.')) return
    axios.delete(`http://localhost:4000/product/${id}`)
      .then(() => navigate('/'))
      .catch(() => setError('Could not delete product.'))
  }

  if (error) return <main className="container page-wrap"><div className="alert alert-danger">{error}</div><NavLink to="/" className="btn btn-outline-secondary">Back to Products</NavLink></main>

  return (
    <main className="container page-wrap">
        <div className="detail-card">
            <div className="row g-0">

                <div className="col-md-5">
                    {product.thumbnail ? (
                        <img
                            className="detail-image"
                            src={product.thumbnail}
                            alt={product.productName || 'Product'}
                        />
                    ) : (
                        <div className="detail-image placeholder-thumb">
                            No image
                        </div>
                    )}
                </div>

                <div className="col-md-7">
                    <div className="detail-content">

                        <p className="eyebrow">
                            {product.category || 'PRODUCT'}
                        </p>

                        <h1 className="detail-title">
                            {product.productName}
                        </h1>

                        <p className="text-muted">
                            Brand: {product.brand}
                        </p>

                        <h2 className="detail-price">
                            ₹{Number(product.price || 0).toLocaleString('en-IN')}
                        </h2>

                        <div className="detail-stock">
                            Stock available: <strong>{product.stock} units</strong>
                        </div>

                        <h6 className="mt-4">Description</h6>

                        <p className="text-muted description">
                            {product.description || 'No description added.'}
                        </p>

                        <div className="d-flex flex-wrap gap-2 mt-4">

                            <NavLink to="/" className="btn btn-outline-secondary">
                                Back to Products
                            </NavLink>

                            <NavLink to={`/edit/${id}`} className="btn btn-warning">
                                Edit Product
                            </NavLink>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete Product
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
)
}

export default ShowProduct