import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { getSession, useSession } from "next-auth/react";
import dbPool from "@/lib/db";
import Footer from "@/components/Footer";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 130px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

export default function CartPage({Address}) {
  const { data: session } = useSession();
  const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
  const [products,setProducts] = useState([]);
  const [name,setName] = useState(session?.user?.name);
  const [email,setEmail] = useState(session?.user?.email);
  const [city,setCity] = useState(Address.city);
  const [postalCode,setPostalCode] = useState(Address.zipcode);
  const [streetAddress,setStreetAddress] = useState(Address.street);
  const [country,setCountry] = useState(Address.country);
  const [isSuccess,setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  let total = 0;
  async function goToPayment() {
    const userid = session?.user?.id;
    const response = await axios.post('/api/checkout', {
      userid,total,cartProducts,
    });
    if (response) {
      setIsSuccess(true);
      clearCart();
    }
  }
  
  for (const productId of cartProducts) {
    const price = products.find(p => p.ProductID === productId)?.Price || 0;
    total += Number(price);
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.ProductID}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          { <img src={product.ImgURL} alt=""/> }
                        </ProductImageBox>
                        {product.Title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product.ProductID)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product.ProductID).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product.ProductID)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product.ProductID).length * product.Price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>Total</td>
                    <td>${total}</td>
                  </tr>
                  <tr>
                    <td><Button onClick={clearCart}>Clear Cart</Button></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <Input type="text"
                     placeholder="Name"
                     value={name}
                     name="name"
                     onChange={ev => setName(ev.target.value)} />
              <Input type="text"
                     placeholder="Email"
                     value={email}
                     name="email"
                     onChange={ev => setEmail(ev.target.value)}/>
              <CityHolder>
                <Input type="text"
                       placeholder="City"
                       value={city}
                       name="city"
                       onChange={ev => setCity(ev.target.value)}/>
                <Input type="text"
                       placeholder="Postal Code"
                       value={postalCode}
                       name="postalCode"
                       onChange={ev => setPostalCode(ev.target.value)}/>
              </CityHolder>
              <Input type="text"
                     placeholder="Street Address"
                     value={streetAddress}
                     name="streetAddress"
                     onChange={ev => setStreetAddress(ev.target.value)}/>
              <Input type="text"
                     placeholder="Country"
                     value={country}
                     name="country"
                     onChange={ev => setCountry(ev.target.value)}/>
              <Button black block
                      onClick={goToPayment}>
                Checkout
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
        
      </Center>
    </>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  const UserID = session?.user?.id;
  //console.log(UserID);
  const poolPromise = dbPool.promise();
  const [rows] = await poolPromise
    .query("Select * from `Addresses` Where UserID = ?", [UserID])
    .catch((err) => {
      console.log(err);
    });
  //console.log(rows[0]);
  return {
    props: {
      Address: JSON.parse(JSON.stringify(rows[0])),
    },
  };
}