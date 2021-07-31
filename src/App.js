import React, {Component} from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size:"",
      sort:""
    }
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
                <Products products={this.state.products}/>
            </div>
            <div className="sidebar">
                Cart items
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    );
  }
}

export default App;
