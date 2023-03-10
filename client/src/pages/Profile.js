import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useStoreContext } from '../utils/GlobalState';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_USER } from '../utils/actions';
import { QUERY_CATEGORIES, QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_PRODUCT } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { UserIcon } from '@heroicons/react/24/solid';
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import AllProducts from "../components/AllProducts";
import Auth from '../utils/auth';

const Profile = () => {
    const { id: userParams } = useParams();
    const [state, dispatch] = useStoreContext();

    const [thisId, setThisId] = useState(userParams)

    const [creatingProductState, setCreatingProductState] = useState(false);

    const [me, setMe] = useState(false);

    const [productId, setProductId] = useState('');

    const [formState, setFormState] = useState({
        name: '',
        description: ''
    });

    const { categories } = state;

    const [addProduct] = useMutation(ADD_PRODUCT);

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    const { loadingUser, dataUser } = useQuery(userParams ? QUERY_USER : QUERY_ME, {
        variables: { _id: userParams },
    });

    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
            categoryData.categories.forEach((category) => {
                idbPromise('categories', 'put', category);
            });
        } else if (!loading) {
            idbPromise('categories', 'get').then((categories) => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories,
                });
            });
        }
    },[categoryData, dispatch]);

    const user = dataUser?.me || dataUser?.user || {};
    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getUser().data._id === userParams) {
        setMe(true);
    }

    if (loadingUser) {
        return <div>Loading...</div>;
    }

    if (user?._id) {
        return (
            <h4 className="font-mont-alt text-large text-slate">
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }


    const handleCreateProductStart = () => {
        setCreatingProductState(true);
    };

    const createProductModalConfirmHandler = async (event) => {
        event.preventDefault();

        setCreatingProductState(false);

        const mutationResponse = await addProduct({
            variables: {
                name: formState.name,
                description: formState.description,
                location: formState.location,
                productStatus: formState.productStatus,
                image: formState.image,
                gallery: formState.gallery,
                deposit: formState.deposit,
                size: formState.size,
                colour: formState.colour,
                tags: formState.tags,
                categories: formState.categories,
            },
        });

        setProductId(mutationResponse.data.addProduct._id);
        console.log(productId);
    };

    const handleFriendClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_USER,
            currentUser: id,
        });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setFormState({
          ...formState,
          [e.target.name]: value
        })
      };

    const createProductModalDismissHandler = () => {
        setCreatingProductState(false);
    };


    return (
        <div className="w-screen min-h-screen p-5 pb-10">
            <React.Fragment>
                {/* Modal Input */}
                {creatingProductState && <Backdrop />}
                {creatingProductState && <Modal title="Add Product" btnText="Add" canCancel canConfirm onCancel={createProductModalDismissHandler} onConfirm={createProductModalConfirmHandler}>
                    {/* Form for new product */}
                    <form className='form-control text-center font-mont-alt text-lg text-slate border-grey border-1 items-stretch'>
                        <div className='flex-row p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="name">Product Name:</label>
                            </div>
                            <div>
                                <input type='text' className="form-input flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="name" id="newName" placeholder='product name' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="description">Description:</label>
                            </div>
                            <div>
                                <textarea rows={3} type='text' className="form-textarea flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="description" id="newDescription" placeholder='description' onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="location">Location:</label>
                            </div>
                            <div>
                                <input type='text' className="form-input flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="location" id="new-location" placeholder='pickup city eg. Melbourne' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="productStatus">Product Status:</label>
                            </div>
                            <div>
                                <select type='select' className="form-select flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="productStatus" id="newProductStatus" onChange={handleChange}>
                                    <option value="public" key="public">Public</option>
                                    <option value="friendsOnly" key="friendsOnly">Friends Only</option>
                                    <option value="hidden" key="hidden">Hidden</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="image">Select an image:</label>
                            </div>
                            <div>
                                <input type='file' className="form-input flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="image" id="newImage" placeholder='image url' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="gallery">Gallery Images:</label>
                            </div>
                            <div>
                                <input type='text' className="form-input flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="gallery" id="newGallery" placeholder='image url' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="deposit">Deposit:</label>
                            </div>
                            <div>
                                <input type='number' className="form-input flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="deposit" id="newDeposit" placeholder='30.00' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="size">Size:</label>
                            </div>
                            <div>
                                <input type='text' className="form-input flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="size" id="newSize" placeholder='Eg. universal' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="colour">Colour:</label>
                            </div>
                            <div>
                                <input type='text' className="form-input flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="colour" id="newColour" placeholder='colour' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="tags">Tags:</label>
                            </div>
                            <div>
                                <input type='text' className="form-input flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="tags" id="newTags" placeholder='separate tag names by comma' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="categories">Product Categories:</label>
                            </div>
                            <div>
                                <select multiple="true" className="form-multiselect flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="categories" id="newCategories" onChange={handleChange}>
                                    {categories.map((item) => (
                                        <option
                                            key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </Modal>}

                <div className="flex flex-col float-left">
                    <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
                        <div className="flex flex-col  sm:flex-row justify-center md:justify-between items-center">
                            <div className="p-5 text-center sm:text-left float-left">
                                <div className='flex items-center'>
                                    <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                                    <h4 className='pl-1 font-satisfy text-xl md:text-2xl lg:text-3xl text-slate'>{me === false ? `${user.username}` : `${Auth.getUser().data.username}`}</h4>
                                </div>
                            </div>
                            {me && (
                                <div className="block float-right">
                                    <h6 className="px-1 mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                                        <Link to={`/booking-history/${Auth.getUser().data._id}`}>
                                            View Booking History
                                        </Link>
                                    </h6>
                                </div>
                                                    )}
                        </div>
                        {me && (
                        <div className="float-left">
                            <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" onClick={handleCreateProductStart}>Add Product</button>
                        </div>
                        )}
                    </div>
                    <div className="flex pb-5 p-5">
                        <AllProducts />
                    </div>
                </div>
                {me && (
                    <div className="float-center flex flex-col border-grey border-t p-5 justify-center">
                        <div className="p-5 text-center sm:text-left float-left">

                            <h2 className="font-satisfy text-lg sm:text-3xl lg:text-5xl text-slate">
                                Friends
                            </h2>
                        </div>
                        <div>
                            <ul className="flex flex-row flex-wrap mb-5 font-mont-alt items-center justify-start text-sm text-center text-slate p-5">
                                {/* {(me).map((friend) => (
                                    <li key={friend._id} className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                                        <Link to={`/users/${friend._id}`}><UserIcon className='block float-left fill-mauve h-6 w-6' onClick={() => {
                                            handleFriendClick(`${friend._id}`);
                                        }}></UserIcon>{friend.username}
                                        </Link>
                                    </li>))} */}
                            </ul>
                        </div>
                    </div>
                )}
            </React.Fragment>
        </div>

    );
};

export default Profile;