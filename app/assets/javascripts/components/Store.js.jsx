var Store = React.createClass({
  getInitialState: function() {
    return {items: []}
  },

  componentDidMount: function() {
    this.refreshStore();
  },

  refreshStore: function() {
    var self = this;
    $.ajax({
      url: '/items',
      type: 'GET',
      success: function(data) {
        self.setState({items: data});
      }
    });
  },

  showAddForm: function() {
    this.setState({showAdd: !this.state.showAdd});
  },

  addItemName: function(e){
    this.setState({itemName: e.currentTarget.value})
  },

  addItemPrice: function(e){
    this.setState({itemPrice: e.currentTarget.value})
  },

  addItemQuantity: function(e){
    this.setState({itemQuantity: e.currentTarget.value})
  },

  addItemDescription: function(e){
    this.setState({itemDescription: e.currentTarget.value})
  },

  submitItem: function(e){
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/items',
      type: 'POST',
      data: {item: {name: this.state.itemName, price: this.state.itemPrice, description: this.state.itemDescription, quantity: this.state.itemQuantity }},
      success: function(data) {
        var items = self.state.items;
        items.push(data);
        self.setState({items: items, showAdd: false, itemName: null, itemPrice: null, itemDescription: null, itemQuantity: null});
      }
    });
  },

  addItemForm: function() {
    if (this.state.showAdd){
      return(<div className='row'>
              <div className='card hoverable col s4'>  
                <form onSubmit={this.submitItem}>
                  <div className='input-field'>
                    <input autoFocus="true" placeholder="Item Name" type='text' onChange={this.addItemName} />
                    <input placeholder="Item Description" type='text' onChange={this.addItemDescription} />
                    <input placeholder="Item Price" type='number' onChange={this.addItemPrice} />
                    <input placeholder="Item Quantity" type='number' onChange={this.addItemQuantity} />
                    <button className='btn-flat hoverable' type='submit'>Save</button>
                    <a className='btn-flat hoverable' onClick={this.showAddForm}>Cancel</a>
                  </div>
                </form>
               </div> 
            </div>);
    }
  },

  displayItems: function() {
    var items = [];
    for(var i =0; i < this.state.items.length; i++){
      var item = this.state.items[i];
      var key = "Item-" + item.id;
      items.push(<Item refreshStore={this.refreshStore} key={key} id={item.id} name={item.name} price={item.price} description={item.description} quantity={item.quantity} />);
    }
    return items;
  },

  render: function() {
    return(<div>
            <a className='btn-flat hoverable' onClick={this.showAddForm}>Add Item</a>
              {this.addItemForm()}
              <div className='row'>
                {this.displayItems()}
              </div>
            </div>);
  }


});