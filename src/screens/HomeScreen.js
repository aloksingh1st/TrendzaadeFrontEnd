import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Trendzaade</title>
      </Helmet>

      <div class="overflow-hidden">
        <div class="col-xxl-8">
          <div class="row flex-lg-nowrap align-items-center g-5">
            <div class="order-lg-1 w-100">
              <img
                src="https://thumbs.dreamstime.com/b/online-shopping-vector-sale-banner-design-text-smartphone-cart-paper-bag-elements-internet-buying-selling-service-app-199752113.jpg"
                class="d-block mx-lg-auto img-fluid"
                alt="Photo by Milad Fakurian"
                width="2160"
                height="768"
              />
            </div>
            <div class="col-lg-6 col-xl-5 text-center text-lg-start pt-lg-5 mt-xl-4">
              <div class="lc-block mb-4">
                <div editable="rich">
                  <h1 class="fw-bold display-3">
                    The quick brown fox jumps over the lazy dog
                  </h1>
                </div>
              </div>

              <div class="lc-block mb-5">
                <div editable="rich">
                  <p class="rfs-8">
                    {' '}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc et metus id ligula malesuada placerat sit amet quis
                    enim.
                  </p>
                </div>
              </div>

              <div class="lc-block mb-6">
                <a
                  class="btn btn-primary px-4 me-md-2 btn-lg L-Affiliate-Tagged"
                  href="/search"
                  role="button"
                >
                  Explore
                </a>
              </div>

              <div class="lc-block">
                <div editable="rich">
                  <p class="fw-bold"> Business collaboration based on trust:</p>
                </div>
              </div>
              <div class="row">
                <div class="lc-block col-3">
                  <img
                    class="img-fluid wp-image-975"
                    src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/motorola.svg"
                    width=""
                    height="300"
                    srcset=""
                    sizes=""
                    alt=""
                  />
                </div>
                <div class="lc-block col-3">
                  <img
                    class="img-fluid wp-image-977"
                    src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/asus.svg"
                    width=""
                    height="300"
                    srcset=""
                    sizes=""
                    alt=""
                  />
                </div>
                <div class="lc-block col-3">
                  <img
                    class="img-fluid wp-image-974"
                    src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/sony.svg"
                    width=""
                    height="300"
                    srcset=""
                    sizes=""
                    alt=""
                  />
                </div>
                <div class="lc-block col-3">
                  <img
                    class="img-fluid wp-image-967"
                    src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/samsung-282297.svg"
                    width=""
                    height="300"
                    srcset=""
                    sizes=""
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className='my-5 text-center'>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
