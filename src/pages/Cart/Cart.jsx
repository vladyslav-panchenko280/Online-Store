import React from 'react';
import CartProduct from '../../components/CartProduct/CartProduct';
import { findObjectValues } from '../../functions/findObjectValues';
import UserContext from "../../UserContext";

class Cart extends React.PureComponent {
     static contextType = UserContext;

     componentDidMount() {
          this.context.getUniqProds();
     }

     componentWillUnmount() {
          this.context.getUniqProds()
     }

     renderItems = uniqProductsArray => {
          return uniqProductsArray.map(el => {
               const id = findObjectValues(el, 'id');
               const name = findObjectValues(el, 'name');
               const brand = findObjectValues(el, 'brand');
               const prices = findObjectValues(el, 'prices');
               const attributes = findObjectValues(el, 'attributes');
               const gallery = findObjectValues(el, 'gallery');
               const inStock = findObjectValues(el, 'inStock');
               const selectedAttributes = findObjectValues(el, 'selectedAttributes');
               const count = findObjectValues(el, 'count');

               return (
                    <li key={id}>
                         <CartProduct id={id} name={name} brand={brand} prices={prices} attributes={attributes} gallery={gallery} selectedAttributes={selectedAttributes} uniqProductsArray={uniqProductsArray} inStock={inStock} count={count} />
                    </li>
               )
          })
     }

     checkout = () => {
               console.group();
               console.log('Products:');
               console.log(this.context.productCart);
               console.log('Total:');
               console.log(this.context.totalPrice);
               console.groupEnd();
     }

     render() {
          const { uniqProductsArray, tax } = this.context;

          return (
               <section className='cart'>
                    <div>
                         <h2>Cart</h2>
                         <ul className='cart__products'>{this.renderItems(uniqProductsArray)}</ul>
                         <div className='cart__footer'>
                              <div className='cart__footerKeys'>
                                   <p>Tax { tax }%:</p>
                                   <p>Quantity:</p>
                                   <p>Total:</p>
                              </div>
                              <div className='cart__footerValues'>
                                   <p>{(this.context.totalPrice * (tax / 100)).toFixed(2)}</p>
                                   <p>{this.context.productCart.length}</p>
                                   <p>{this.context.totalPrice}</p>
                              </div>
                         </div>
                         <button className='cart__orderBtn' onClick={this.checkout}>ORDER</button>
                    </div>
               </section>
          )
     }
}

export default Cart;