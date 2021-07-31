import React, { Component } from 'react';
import formatCurrency from './../util';

class Products extends Component {
    state = {  }
    render() { 
        return ( 
            <>
                <ul className="products">
                    {this.props.products.map(product => <li key={product.id}>
                        <div className="product">
                            <a href={"#"+product.id}>
                                <img src={product.image} alt={product.title}/>
                                <p>{product.title}</p>
                            </a>
                            <div className="product-price">
                                <div>
                                    {formatCurrency(product.price)}
                                </div>
                                <button className="button primary" onClick={()=>{this.props.addToCart(product)}}>Add to cart</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </>
         );
    }
}
 
export default Products;