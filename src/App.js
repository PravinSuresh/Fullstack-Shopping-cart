import React, {Component} from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size:"",
      sort:"",
      cartItems:[]
    }
  }
  removeFromCart = (product)=>{
    const cartItems = [...this.state.cartItems];
    this.setState({cartItems:cartItems.filter(x=>x.id!==product.id)});
    
  }
  addToCart = (product)=>{
    const cartItems = [...this.state.cartItems];
    console.log("C=",cartItems);
    let alreadyIncart = false;
    cartItems.forEach((item)=>{
      if(item.id===product.id){
        item.count++;
        alreadyIncart=true;
      }
    });
    if(!alreadyIncart){
      cartItems.push({...product, count: 1});
      console.log(this.state.cartItems);
    }
    this.setState({cartItems});
  }
  sortProducts=(event)=>{
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState(state=>({
      sort: sort,
      products: this.state.products.slice().sort((a,b)=>(
        sort==="lowest"? ((a.price<b.price) ? -1 : 1):
        sort==="highest"? ((a.price>b.price) ? -1 : 1):
        ((a.id>b.id) ? 1 : -1)
      ))
    }));
  }
  filterProducts=(e)=>{
    console.log(e.target.value);
    if(e.target.value===""){
      this.setState({size: e.target.value, products: data.products});
    }
    else{
      this.setState({
        size:e.target.value,
        products: data.products.filter(p=>p.availableSizes.some((a)=> a===e.target.value))
      });
    }
  }
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
                <Filter 
                  count={this.state.products.length} 
                  size={this.state.size} 
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}    
                />
                <Products products={this.state.products} addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}/>
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    );
  }
}

export default App;
