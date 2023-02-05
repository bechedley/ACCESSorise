import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AllProducts from "../components/AllProducts";
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CATEGORIES, UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_CATEGORIES, QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";

const ProductList = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [thisCategory, setThisCategory] = useState(id);

  const [productFilters, setProductFilters] = useState(id);

  const [productFilterState, setProductFilterState] = useState(false);

  const handleFilterProductBtn = () => {
    setProductFilterState(true);
};
  
  const filterProductModalDismissHandler = () => {
    setCreatingProductState(false);
  };

  const filterProductModalConfirmHandler = () => {
    setCreatingProductState(false);
  };

  const handleProductFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    })
  }

  const { currentCategory } = state;

  const { products } = state;

  const { loadingProducts, dataProducts } = useQuery(QUERY_PRODUCTS);

  const { loading, data } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: data.categories,
      });
      data.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((category) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [data, loading, dispatch]);

  useEffect(() => {
    if (dataProducts) {
      dispatch({
        type: UPDATE_PRODUCTS,
        categories: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loadingProducts) {
      idbPromise('products', 'get').then((product) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [dataProducts, loadingProducts, dispatch]);

  function filterCategories() {
    if (!currentCategory) {
      return state.categories;
    }

    return state.categories.filter(
      (category) => category._id === currentCategory
    );
  }

  return (
    <div className="w-screen p-5">
         <React.Fragment>
    {/* Modal Input */}
    {productFilterState && <Backdrop />}
    {productFilterState && <Modal title="Filter Options" btnText="Apply" canCancel canConfirm onCancel={filterProductModalDismissHandler} onConfirm={filterProductModalConfirmHandler}>
        {/* Form for filtering products */}
        <form className='form-control text-center font-mont-alt text-lg text-slate border-grey border-1 items-stretch'>
            <div className='flex-row space-between p-2'>
                <div>
                    <label className="font-satisfy text-mauve text-xl" htmlFor="location">Location:</label>
                </div>
                <div>
                    <select className="form-select flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="location" id="filter-location" onChange={handleProductFilters}>
                    {products.map((product) => (
                            <option
                                key={product._id} value={product.location}>
                                {product.location}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='flex-row space-between p-2'>
                <div>
                    <label className="font-satisfy text-mauve text-xl" htmlFor="size">Size:</label>
                </div>
                <div>
                <select className="form-select flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="size" id="filter-size" onChange={handleProductFilters}>
                    {products.map((product) => (
                            <option
                                key={product._id} value={product.size}>
                                {product.size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='flex-row space-between p-2'>
                <div>
                    <label className="font-satisfy text-mauve text-xl" htmlFor="colour">Colour:</label>
                </div>
                <div>
                <select className="form-select flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="colour" id="filter-colour" onChange={handleProductFilters}>
                    {products.map((product) => (
                            <option
                                key={product._id} value={product.colour}>
                                {product.colour}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </form>
    </Modal>}
      <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
        <div className="container p-5 text-center sm:text-left float-left">
          {filterCategories().map((category) => (
            <h2 className="font-satisfy text-lg sm:text-3xl lg:text-5xl text-slate" key={category._id}>{category.name}
            </h2>
          ))}
        </div>
        <div className="float-right">
          <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" onClick={handleFilterProductBtn}>Filter</button>
        </div>
      </div>
      <div>
        <allProducts cat={thisCategory} filters={productFilters}/>
      </div>
      </React.Fragment>
    </div>

  );
};

export default ProductList;