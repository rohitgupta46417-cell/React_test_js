import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4000/product')
      .then((res) => setProducts(res.data))
      .catch(() => setError('Could not load products. Start the backend and make sure MongoDB is running.'))
  }, [])

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return products
    return products.filter((p) =>
      [p.productName, p.brand, p.category].some((value) => value?.toLowerCase().includes(term))
    )
  }, [products, search])

  return (
    <main className="container page-wrap">
    <div className="page-heading">
        <div>
            
            <h1>Product inventory</h1>
            <p className="text-muted mb-0">
                Manage your products, pricing and stock in one place.
            </p>
        </div>

        <NavLink to="/add" className="btn btn-primary">
            ＋ Add Product
        </NavLink>
    </div>

    <div className="toolbar">
        <input
            className="form-control search-input"
            type="search"
            placeholder="Search by product, brand or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <span className="text-muted small">
            {filteredProducts.length} product
            {filteredProducts.length === 1 ? '' : 's'}
        </span>
    </div>

    <div className="row g-4">
        {filteredProducts.map((product) => (
            <div className="col-sm-6 col-lg-4" key={product._id}>
                <div className="card product-card h-100">

                    {product.thumbnail ? (
                        <img
                            className="product-thumb"
                            src={product.thumbnail}
                            alt={product.productName}
                        />
                    ) : (
                        <div className="product-thumb placeholder-thumb">
                            No image
                        </div>
                    )}

                    <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between gap-2 align-items-start">

                            <div>
                                <span className="category-label">
                                    {product.category}
                                </span>

                                <h5 className="card-title mt-2 mb-1">
                                    {product.productName}
                                </h5>

                                <p className="text-muted small mb-3">
                                    {product.brand}
                                </p>
                            </div>

                            <strong className="price">
                                ₹{Number(product.price || 0).toLocaleString('en-IN')}
                            </strong>
                        </div>

                        <div className="stock-row mt-auto">
                            <span>Available stock</span>

                            <strong className={Number(product.stock) === 0 ? 'text-danger' : ''}>
                                {product.stock} units
                            </strong>
                        </div>

                        <NavLink
                            to={`/show/${product._id}`}
                            className="btn btn-outline-primary w-100 mt-3"
                        >
                            View Product
                        </NavLink>
                    </div>
                </div>
            </div>
        ))}
    </div>
</main>
  )
}

export default Home
