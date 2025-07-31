class Order {
  constructor(id, items, customerId, status = 'pending') {
    this.id = id;
    this.items = items; 
    this.customerId = customerId;
    this.status = status;
  }
}

module.exports = Order;
