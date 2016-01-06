var Item = React.createClass({

  getInitialState: function() {
    return { edit: false };
  },

  toggleEdit: function() {
    this.setState({ edit: !this.state.edit });
  },

  purchaseItem: function() {
    var self = this;
    $.ajax({
      url: '/purchase_item',
      type: 'PUT',
      data: { item: { quantity: this.props.quantity}, id: this.props.id },
      success: function() {
        self.props.refreshStore();
      }
    });
  },

  item: function(){
    var id = 'item-' + this.props.id;
    return(<div className='col s12 m4 l3'>
              <div className='card white hoverable'>
                <div className='card-content'>
                  <span className='card-title'>{this.props.name}</span>
                  <p>{this.props.description}</p>
                </div>
                <div className='card-action'>
                  <div className='row'>
                    <div className='col s12 l6'>
                      <p>Price: ${this.props.price}</p>
                      <p>Quantity: {this.props.quantity}</p>
                    </div>
                    <div className='col s12 l6'>
                      <a className='btn-flat hoverable' onClick={this.toggleEdit}>Edit</a>
                      <a className='btn-flat hoverable' onClick={this.deleteItem}>Delete</a>
                      <a className='btn-flat hoverable' onClick={this.purchaseItem}>Purchase</a>
                    </div>
                   </div> 
                </div>

              </div>
            </div>);
  },

  updateItem: function(e) {
    e.preventDefault();
    var name = ReactDOM.findDOMNode(this.refs.itemName).value;
    var price = ReactDOM.findDOMNode(this.refs.itemPrice).value;
    var description = ReactDOM.findDOMNode(this.refs.itemDescription).value;
    var self = this;
    $.ajax({
      url: '/items/' + this.props.id,
      type: 'PUT',
      data: { item: { name: name, price: price, description: description }},
      success: function() {
        self.setState({edit: false});
        self.props.refreshStore();
      }
    });
  },

  deleteItem: function() {
    var self = this;
    $.ajax({
      url: '/items/' + this.props.id,
      type: 'DELETE',
      success: function() {
        self.props.refreshStore();
      }
    });
  },

  edit: function() {
    return( <li>
              <div className='row'>
                <div className='col s10'>
                  <form onSubmit={this.updateItem}>
                    <label for='name'>Name</label>
                    <input autoFocus={true} placeholder='name' type='text' defaultValue={this.props.name} ref='itemName' />
                    <label for='price'>Price</label>
                    <input type='text' defaultValue={this.props.price} ref='itemPrice' />
                    <label for='description'>Description</label>
                    <input type='text' defaultValue={this.props.description} ref='itemDescription' />
                    <button className='btn-flat hoverable' type='submit'>Save</button>
                  </form>
                </div>
                <div className='col s2'>
                  <a onClick={this.toggleEdit}>Cancel</a>
                </div>
              </div>
            </li>);
  },

  render: function(){
    if(this.state.edit){
      return this.edit();
    } else {
      return this.item();
    }
  }
});